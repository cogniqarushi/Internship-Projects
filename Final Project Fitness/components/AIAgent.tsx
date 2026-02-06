import React, { useEffect, useRef, useState } from 'react';
import { Mic, MicOff, X, Loader2, Send, Headphones, MessageSquare, Activity } from 'lucide-react';
import { GoogleGenAI, LiveServerMessage, Modality, Chat, GenerateContentResponse } from '@google/genai';
import { SYSTEM_INSTRUCTION } from '../constants';
import { createPcmBlob, decodeAudioData, base64ToUint8Array, downsampleBuffer } from '../utils/audio';

// Hardcoded API Key for direct integration
const API_KEY = "AIzaSyCLG5W79GBBfSq9ql6E8pF-Edt9TnA9gjk";

interface AIAgentProps {
  isOpen: boolean;
  onClose: () => void;
}

type Mode = 'text' | 'voice';
type Message = { role: 'user' | 'model'; text: string };

const AIAgent: React.FC<AIAgentProps> = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState<Mode>('text');
  
  // Voice State
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState<number[]>([]);

  // Refs for State in Callbacks
  const isMutedRef = useRef(false);

  // Text Chat State
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Hello! I'm Coach AI. Ask me about our programs, pricing, or diet plans." }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Audio Refs
  const audioContextRef = useRef<AudioContext | null>(null);
  const inputContextRef = useRef<AudioContext | null>(null);
  const inputSourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const chatSessionRef = useRef<Chat | null>(null);

  // Sync isMuted state to Ref
  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  // Scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, mode]);

  // Cleanup on unmount/close
  useEffect(() => {
    if (!isOpen) {
      stopSession();
    }
  }, [isOpen]);

  // --- Voice Logic ---
  const startSession = async () => {
    try {
      setIsConnecting(true);
      
      // Init Output Audio Context
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      
      // Init Input Audio Context
      try {
        inputContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      } catch (e) {
        inputContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }

      if (inputContextRef.current.state === 'suspended') await inputContextRef.current.resume();
      if (audioContextRef.current.state === 'suspended') await audioContextRef.current.resume();

      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: { 
            channelCount: 1,
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true
        } 
      });

      const source = inputContextRef.current.createMediaStreamSource(stream);
      const scriptProcessor = inputContextRef.current.createScriptProcessor(4096, 1, 1);
      
      const monitorNode = inputContextRef.current.createGain();
      monitorNode.gain.value = 0;

      inputSourceRef.current = source;
      processorRef.current = scriptProcessor;

      const ai = new GoogleGenAI({ apiKey: API_KEY });
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
          },
          systemInstruction: SYSTEM_INSTRUCTION,
        },
        callbacks: {
          onopen: () => {
            setIsConnected(true);
            setIsConnecting(false);
            
            scriptProcessor.onaudioprocess = (e) => {
              if (isMutedRef.current) return; 
              
              const inputData = e.inputBuffer.getChannelData(0);
              let sum = 0;
              for(let i = 0; i < inputData.length; i++) sum += Math.abs(inputData[i]);
              const avg = sum / inputData.length;
              setVolume(prev => [...prev.slice(-10), avg * 100]);

              const currentRate = inputContextRef.current?.sampleRate || 16000;
              const resampledData = currentRate !== 16000 ? downsampleBuffer(inputData, currentRate, 16000) : inputData;
              const pcmBlob = createPcmBlob(resampledData);
              
              sessionPromise.then(session => {
                session.sendRealtimeInput({ media: pcmBlob });
              });
            };

            source.connect(scriptProcessor);
            scriptProcessor.connect(monitorNode);
            monitorNode.connect(inputContextRef.current!.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
             const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
             if (base64Audio && audioContextRef.current) {
                const ctx = audioContextRef.current;
                const audioData = base64ToUint8Array(base64Audio);
                nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
                const buffer = await decodeAudioData(audioData, ctx, 24000, 1);
                const source = ctx.createBufferSource();
                source.buffer = buffer;
                source.connect(ctx.destination);
                source.addEventListener('ended', () => sourcesRef.current.delete(source));
                source.start(nextStartTimeRef.current);
                nextStartTimeRef.current += buffer.duration;
                sourcesRef.current.add(source);
             }
             if (message.serverContent?.interrupted) {
                sourcesRef.current.forEach(s => { try { s.stop(); } catch(e) {} });
                sourcesRef.current.clear();
                nextStartTimeRef.current = 0;
             }
          },
          onclose: () => {
            setIsConnected(false);
            setIsConnecting(false);
          },
          onerror: (err) => {
            console.error("Gemini Live Error:", err);
            setIsConnected(false);
            setIsConnecting(false);
          }
        }
      });
    } catch (error) {
      console.error("Connection Error:", error);
      setIsConnecting(false);
    }
  };

  const stopSession = () => {
    inputSourceRef.current?.mediaStream?.getTracks().forEach(track => track.stop());
    inputSourceRef.current?.disconnect();
    processorRef.current?.disconnect();
    inputContextRef.current?.close();
    audioContextRef.current?.close();
    setIsConnected(false);
    setVolume([]);
  };

  const toggleMute = () => setIsMuted(!isMuted);

  // --- Text Logic ---
  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputText.trim() || isTyping) return;

    const userMsg = inputText.trim();
    setInputText('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      if (!chatSessionRef.current) {
        const ai = new GoogleGenAI({ apiKey: API_KEY });
        chatSessionRef.current = ai.chats.create({
          model: 'gemini-3-flash-preview',
          config: { systemInstruction: SYSTEM_INSTRUCTION }
        });
      }

      const result = await chatSessionRef.current.sendMessageStream({ message: userMsg });
      setMessages(prev => [...prev, { role: 'model', text: '' }]);

      let fullResponse = '';
      for await (const chunk of result) {
        const c = chunk as GenerateContentResponse;
        const text = c.text;
        if (text) {
          fullResponse += text;
          setMessages(prev => {
            const newArr = [...prev];
            newArr[newArr.length - 1].text = fullResponse;
            return newArr;
          });
        }
      }
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Connection error. Please check your network or API configuration." }]);
    } finally {
      setIsTyping(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 md:left-auto md:right-6 md:bottom-24 z-50 flex flex-col md:items-end perspective-1000 pointer-events-none">
      <div className="pointer-events-auto bg-brand-black/95 border border-brand-blue/30 rounded-3xl shadow-[0_0_50px_rgba(0,242,234,0.15)] w-full md:w-[400px] overflow-hidden backdrop-blur-xl flex flex-col transition-all duration-300 transform rotate-x-1">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-brand-blue/10 via-brand-gold/10 to-transparent p-4 flex justify-between items-center border-b border-white/10 shrink-0 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-blue to-transparent opacity-50" />
          <div className="flex items-center gap-3 relative z-10">
            <div className={`relative w-9 h-9 rounded-full flex items-center justify-center bg-black border border-brand-blue/50 shadow-[0_0_10px_rgba(0,242,234,0.3)]`}>
                <Activity size={18} className="text-brand-blue animate-pulse" />
                {isConnected && mode === 'voice' && <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse border border-black" />}
            </div>
            <div>
               <h3 className="font-heading font-bold text-white text-sm tracking-wide">COACH <span className="text-brand-blue">AI</span></h3>
               <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">
                 {mode === 'voice' ? (isConnected ? 'Live Uplink' : 'Voice Mode') : 'Text Interface'}
               </p>
            </div>
          </div>
          <div className="flex items-center gap-2 relative z-10">
            <div className="flex bg-black/60 rounded-full p-1 border border-white/10 backdrop-blur-md">
               <button onClick={() => { setMode('text'); stopSession(); }} className={`p-2 rounded-full transition-all duration-300 ${mode === 'text' ? 'bg-brand-blue text-black shadow-[0_0_15px_rgba(0,242,234,0.4)]' : 'text-gray-400 hover:text-white'}`}>
                 <MessageSquare size={16} />
               </button>
               <button onClick={() => { setMode('voice'); }} className={`p-2 rounded-full transition-all duration-300 ${mode === 'voice' ? 'bg-brand-gold text-black shadow-[0_0_15px_rgba(212,175,55,0.4)]' : 'text-gray-400 hover:text-white'}`}>
                 <Headphones size={16} />
               </button>
            </div>
            <button onClick={() => { stopSession(); onClose(); }} className="text-gray-400 hover:text-white transition bg-white/5 p-1.5 rounded-full hover:bg-white/10 ml-1">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="h-[400px] relative bg-gradient-to-b from-black/50 to-black/80">
          {mode === 'text' ? (
            <div className="absolute inset-0 flex flex-col">
              <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-brand-blue/20 scrollbar-track-transparent">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed backdrop-blur-sm border ${
                      msg.role === 'user' ? 'bg-brand-blue/10 border-brand-blue/30 text-brand-blue font-medium rounded-tr-none' : 'bg-white/5 text-gray-200 rounded-tl-none border-white/10'
                    }`}>{msg.text}</div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white/5 border border-white/10 px-4 py-3 rounded-2xl rounded-tl-none flex gap-1 items-center">
                       <span className="w-1.5 h-1.5 bg-brand-blue rounded-full animate-bounce" />
                       <span className="w-1.5 h-1.5 bg-brand-blue rounded-full animate-bounce delay-75" />
                       <span className="w-1.5 h-1.5 bg-brand-blue rounded-full animate-bounce delay-150" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
              <div className="p-4 bg-black/40 border-t border-white/10 backdrop-blur-md">
                <form onSubmit={handleSendMessage} className="relative">
                   <input
                     type="text"
                     value={inputText}
                     onChange={(e) => setInputText(e.target.value)}
                     placeholder="Ask Coach AI..."
                     className="w-full bg-black/60 border border-white/10 rounded-full pl-5 pr-12 py-3 text-sm text-white focus:outline-none focus:border-brand-blue/50 transition-colors placeholder:text-gray-600 shadow-inner"
                   />
                   <button type="submit" disabled={!inputText.trim() || isTyping} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-brand-blue text-black rounded-full hover:bg-white transition-all disabled:opacity-50">
                     {isTyping ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                   </button>
                </form>
              </div>
            </div>
          ) : (
             <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-blue/5 via-transparent to-transparent">
               {!isConnected && !isConnecting && (
                 <div className="text-center animate-fadeIn">
                   <div className="w-24 h-24 bg-black/50 rounded-full flex items-center justify-center mx-auto mb-6 border border-brand-blue/30 shadow-[0_0_30px_rgba(0,242,234,0.1)] relative">
                      <div className="absolute inset-0 rounded-full border border-brand-blue/20 animate-ping opacity-20" />
                      <Headphones size={36} className="text-brand-blue" />
                   </div>
                   <h4 className="text-white font-heading font-bold text-xl mb-2">Voice Coaching</h4>
                   <p className="text-gray-400 mb-8 text-sm max-w-[220px] mx-auto leading-relaxed">Experience zero-latency AI coaching. Speak naturally.</p>
                   <button onClick={startSession} className="bg-brand-blue text-black font-bold py-3 px-8 rounded-full hover:bg-white hover:scale-105 transition-all duration-300 flex items-center gap-2 mx-auto shadow-[0_0_20px_rgba(0,242,234,0.4)]">
                     <Mic size={18} /> Start Session
                   </button>
                 </div>
               )}
               {isConnecting && (
                 <div className="flex flex-col items-center gap-4">
                    <div className="relative">
                       <div className="absolute inset-0 bg-brand-blue blur-xl opacity-20 animate-pulse" />
                       <Loader2 className="animate-spin text-brand-blue relative z-10" size={48} />
                    </div>
                    <p className="text-xs text-brand-blue font-bold tracking-[0.2em] uppercase animate-pulse">Initializing...</p>
                 </div>
               )}
               {isConnected && (
                 <div className="w-full flex flex-col items-center animate-fadeIn">
                   <div className="flex items-center justify-center gap-1.5 h-24 w-full px-4 mb-8">
                      {[...Array(9)].map((_, i) => (
                        <div key={i} className="w-2 bg-gradient-to-t from-brand-blue to-purple-500 rounded-full transition-all duration-75 shadow-[0_0_15px_rgba(0,242,234,0.5)]" style={{ height: `${Math.max(15, (volume[volume.length - 1 - i] || 5) * 2.5 + 10)}%`, opacity: 0.8 }} />
                      ))}
                   </div>
                   <p className="text-brand-blue text-xs font-bold animate-pulse mb-8 tracking-widest uppercase border border-brand-blue/30 px-4 py-1.5 rounded-full bg-brand-blue/5">Listening Active</p>
                   <div className="flex gap-6 w-full justify-center items-center">
                     <button onClick={toggleMute} className={`p-4 rounded-full border transition-all duration-300 ${isMuted ? 'bg-red-500/20 text-red-500 border-red-500/50 scale-95' : 'bg-white/5 text-white border-white/10 hover:bg-brand-blue/10 hover:border-brand-blue/50'}`}>
                       {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
                     </button>
                     <button onClick={stopSession} className="px-8 py-4 rounded-full bg-red-600/90 text-white hover:bg-red-500 font-bold text-sm shadow-lg transition transform hover:scale-105">End Session</button>
                   </div>
                 </div>
               )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIAgent;