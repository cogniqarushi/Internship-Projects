import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Bot, User, Loader2, Mic, MicOff, Volume2 } from 'lucide-react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';

type Message = {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Namaste! Welcome to Hotel Ashoka. I can answer questions about our menu, location, and hours. How can I help you today? / नमस्कार! हॉटेल अशोका मध्ये आपले स्वागत आहे. मी तुमची कशी मदत करू शकतो?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Voice AI State
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [voiceError, setVoiceError] = useState<string | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const sessionRef = useRef<any>(null);
  const nextPlayTimeRef = useRef<number>(0);
  const activeSourcesRef = useRef<AudioBufferSourceNode[]>([]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (isVoiceMode) {
        stopVoiceMode();
      }
    };
  }, [isVoiceMode]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      // API Key integrated here
      const ai = new GoogleGenAI({ apiKey: "" });
      
      const systemInstruction = `You are a helpful customer service assistant for Hotel Ashoka Family Restaurant in Tuljapur, Maharashtra.
      You are fluent in both English and Marathi. Always respond in the language the user speaks to you. If they speak Marathi, reply in Marathi. If English, reply in English.
      Your job is to help customers with:
      - Table booking: Ask for the number of people, date, and time. Once all details are collected, confirm by saying exactly: "Your table for [X] people at [X] time is booked." (Translate this to Marathi if the conversation is in Marathi).
      - Menu questions: We serve 100% Pure Vegetarian Indian cuisine. Popular items include Maharashtrian thali, soups, breads, Lasuni Methi, Manchow Soup Veg.
      - Location: We are located on Osmanabad Rd, near the old bus stand, near Tulja Bhavani Temple.
      - Timings: We are open from 11 AM to 11:30 PM.
      
      Guidelines:
      - Keep responses short, polite, and conversational.
      - If you don't understand something, say exactly: "Sorry, I didn't understand. You can ask about menu, booking, location, or timings." (Or the Marathi equivalent).
      - Do not invent menu items not listed.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg.text,
        config: {
          systemInstruction,
        }
      });

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text || "I'm sorry, I couldn't process that request.",
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error("Error generating response:", error);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm having trouble connecting right now. Please call us at +91 99227 72200 for assistance.",
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const startVoiceMode = async () => {
    setVoiceError(null);
    setIsVoiceMode(true);
    setIsRecording(true);
    try {
      // API Key integrated here
      const ai = new GoogleGenAI({ apiKey: "" });
      
      // Initialize AudioContext
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      audioContextRef.current = audioCtx;
      nextPlayTimeRef.current = audioCtx.currentTime;

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const source = audioCtx.createMediaStreamSource(stream);
      sourceRef.current = source;

      const processor = audioCtx.createScriptProcessor(4096, 1, 1);
      processorRef.current = processor;

      const sessionPromise = ai.live.connect({
        model: "gemini-2.5-flash-native-audio-preview-12-2025",
        callbacks: {
          onopen: () => {
            processor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const pcm16 = new Int16Array(inputData.length);
              for (let i = 0; i < inputData.length; i++) {
                let s = Math.max(-1, Math.min(1, inputData[i]));
                pcm16[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
              }
              const buffer = new Uint8Array(pcm16.buffer);
              let binary = '';
              for (let i = 0; i < buffer.byteLength; i++) {
                binary += String.fromCharCode(buffer[i]);
              }
              const base64Data = btoa(binary);
              
              sessionPromise.then(session => {
                session.sendRealtimeInput({
                  audio: { data: base64Data, mimeType: 'audio/pcm;rate=16000' }
                });
              });
            };
            source.connect(processor);
            processor.connect(audioCtx.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64Audio) {
              const binaryString = atob(base64Audio);
              const bytes = new Uint8Array(binaryString.length);
              for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i);
              }
              const pcm16 = new Int16Array(bytes.buffer);
              const audioBuffer = audioCtx.createBuffer(1, pcm16.length, 24000);
              const channelData = audioBuffer.getChannelData(0);
              for (let i = 0; i < pcm16.length; i++) {
                channelData[i] = pcm16[i] / 32768.0;
              }
              
              const playSource = audioCtx.createBufferSource();
              playSource.buffer = audioBuffer;
              playSource.connect(audioCtx.destination);
              
              if (nextPlayTimeRef.current < audioCtx.currentTime) {
                nextPlayTimeRef.current = audioCtx.currentTime;
              }
              playSource.start(nextPlayTimeRef.current);
              nextPlayTimeRef.current += audioBuffer.duration;
              
              activeSourcesRef.current.push(playSource);
              playSource.onended = () => {
                activeSourcesRef.current = activeSourcesRef.current.filter(s => s !== playSource);
              };
            }
            
            if (message.serverContent?.interrupted) {
              activeSourcesRef.current.forEach(s => {
                try { s.stop(); } catch (e) {}
              });
              activeSourcesRef.current = [];
              if (audioCtx) {
                nextPlayTimeRef.current = audioCtx.currentTime;
              }
            }
          },
          onerror: (error) => {
            console.error("Live API Error:", error);
            setVoiceError("Connection lost. Please try again.");
            stopVoiceMode();
          },
          onclose: () => {
            stopVoiceMode();
          }
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: "Zephyr" } },
          },
          systemInstruction: `You are a voice AI assistant for Hotel Ashoka Family Restaurant in Tuljapur, Maharashtra.
You are fluent in both English and Marathi. Always respond in the language the user speaks to you. If they speak Marathi, reply in Marathi. If English, reply in English.
Your job is to help customers with:
- Table booking: Guide them step-by-step. Ask for the number of people, date, and time. Once all details are collected, confirm by saying exactly: "Your table for [X] people at [X] time is booked." (Translate to Marathi if needed).
- Menu questions: We serve 100% Pure Vegetarian Indian cuisine. Popular items include Maharashtrian thali, soups, breads, Lasuni Methi, Manchow Soup Veg.
- Location: We are located on Osmanabad Rd, near the old bus stand, near Tulja Bhavani Temple.
- Timings: We are open from 11 AM to 11:30 PM.

Guidelines:
- Keep responses short, polite, and conversational (voice-friendly).
- If you don't understand something, say exactly: "Sorry, I didn't understand. You can ask about menu, booking, location, or timings." (Or the Marathi equivalent).
- You are speaking to the customer directly over voice.
- Start the conversation by saying exactly: "Welcome to Hotel Ashoka Family Restaurant. How can I help you today? हॉटेल अशोका मध्ये आपले स्वागत आहे. मी तुमची कशी मदत करू शकतो?"`,
        },
      });
      
      sessionRef.current = sessionPromise;
      
    } catch (err: any) {
      console.error("Failed to start voice mode:", err);
      if (err.name === 'NotAllowedError' || err.message?.includes('permission')) {
        setVoiceError("Microphone access denied. Please allow microphone permissions in your browser.");
      } else {
        setVoiceError(err.message || "Failed to start voice chat. Please check your connection.");
      }
      stopVoiceMode();
    }
  };

  const stopVoiceMode = () => {
    setIsVoiceMode(false);
    setIsRecording(false);
    
    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current = null;
    }
    if (sourceRef.current) {
      sourceRef.current.disconnect();
      sourceRef.current.mediaStream.getTracks().forEach(t => t.stop());
      sourceRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    if (sessionRef.current) {
      sessionRef.current.then((session: any) => {
        try { session.close(); } catch(e) {}
      });
      sessionRef.current = null;
    }
    activeSourcesRef.current.forEach(s => {
      try { s.stop(); } catch (e) {}
    });
    activeSourcesRef.current = [];
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 p-4 bg-brand-orange text-white rounded-full shadow-xl hover:bg-brand-orange/90 transition-transform hover:scale-105 focus:outline-none animate-subtle-pulse ${isOpen ? 'hidden' : 'flex'}`}
        aria-label="Open chat"
      >
        <MessageCircle size={28} />
        {/* Notification dot */}
        <span className="absolute top-0 right-0 w-3 h-3 bg-brand-yellow rounded-full border-2 border-white"></span>
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 z-50 w-full sm:w-[400px] h-[100dvh] sm:h-[500px] sm:max-h-[80vh] bg-white sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden border-t sm:border border-brand-dark/10"
          >
            {/* Header */}
            <div className="bg-brand-dark text-white p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-orange rounded-full flex items-center justify-center">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Ashoka Assistant</h3>
                  <p className="text-xs text-brand-yellow">{isVoiceMode ? 'Voice Mode Active' : 'Online 24/7'}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {!isVoiceMode ? (
                  <button
                    onClick={startVoiceMode}
                    className="text-white/70 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
                    aria-label="Start voice chat"
                    title="Start Voice Chat"
                  >
                    <Mic size={18} />
                  </button>
                ) : (
                  <button
                    onClick={stopVoiceMode}
                    className="text-brand-orange hover:text-brand-orange/80 transition-colors p-2 rounded-full bg-white/10 hover:bg-white/20"
                    aria-label="Stop voice chat"
                    title="Stop Voice Chat"
                  >
                    <MicOff size={18} />
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/70 hover:text-white transition-colors p-1"
                  aria-label="Close chat"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {voiceError && (
              <div className="bg-red-50 text-red-600 p-3 text-sm border-b border-red-100 flex justify-between items-center">
                <span>{voiceError}</span>
                <button onClick={() => setVoiceError(null)} className="text-red-400 hover:text-red-600">
                  <X size={16} />
                </button>
              </div>
            )}

            {isVoiceMode ? (
              /* Voice Mode UI */
              <div className="flex-1 flex flex-col items-center justify-center bg-brand-cream/50 p-6">
                <div className="relative mb-8">
                  <div className="absolute inset-0 bg-brand-orange/20 rounded-full animate-ping"></div>
                  <div className="absolute inset-[-1rem] bg-brand-orange/10 rounded-full animate-pulse"></div>
                  <div className="relative w-24 h-24 bg-brand-orange rounded-full flex items-center justify-center shadow-lg">
                    <Volume2 size={40} className="text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-serif text-brand-dark mb-2">Listening...</h3>
                <p className="text-center text-brand-dark/60 text-sm mb-8">
                  Speak naturally. The AI will respond with voice.
                </p>
                <button
                  onClick={stopVoiceMode}
                  className="px-6 py-3 bg-white border border-brand-dark/10 rounded-full text-brand-dark font-medium hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2"
                >
                  <MicOff size={18} className="text-brand-orange" />
                  End Voice Chat
                </button>
              </div>
            ) : (
              <>
                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 bg-brand-cream/50 space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {msg.sender === 'bot' && (
                        <div className="w-8 h-8 rounded-full bg-brand-orange/20 flex items-center justify-center shrink-0 mt-1">
                          <Bot size={16} className="text-brand-orange" />
                        </div>
                      )}
                      <div
                        className={`max-w-[75%] p-3 rounded-2xl text-sm leading-relaxed ${
                          msg.sender === 'user'
                            ? 'bg-brand-orange text-white rounded-br-sm'
                            : 'bg-white text-brand-dark border border-brand-dark/10 rounded-bl-sm shadow-sm'
                        }`}
                      >
                        {msg.text}
                      </div>
                      {msg.sender === 'user' && (
                        <div className="w-8 h-8 rounded-full bg-brand-dark/10 flex items-center justify-center shrink-0 mt-1">
                          <User size={16} className="text-brand-dark/60" />
                        </div>
                      )}
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex gap-3 justify-start">
                      <div className="w-8 h-8 rounded-full bg-brand-orange/20 flex items-center justify-center shrink-0 mt-1">
                        <Bot size={16} className="text-brand-orange" />
                      </div>
                      <div className="bg-white p-3 rounded-2xl border border-brand-dark/10 rounded-bl-sm shadow-sm flex items-center">
                        <Loader2 className="w-4 h-4 text-brand-orange animate-spin" />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <form onSubmit={handleSend} className="p-4 bg-white border-t border-brand-dark/10 flex gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask about menu, hours, location..."
                    className="flex-1 bg-brand-cream/50 border border-brand-dark/10 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/50 transition-shadow"
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={!inputValue.trim() || isLoading}
                    className="w-10 h-10 rounded-full bg-brand-orange text-white flex items-center justify-center shrink-0 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-brand-orange/90 transition-colors"
                  >
                    <Send size={18} className="ml-0.5" />
                  </button>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}