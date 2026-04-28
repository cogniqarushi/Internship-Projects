import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, User, Loader2, Mic, MicOff, Volume2, Trash2 } from 'lucide-react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import AnimatedButton from './AnimatedButton';

type Message = {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
};

const renderMessageText = (text: string) => {
  const parts = text.split(/(\[.*?\]\(.*?\))/g);
  return parts.map((part, i) => {
    const match = part.match(/\[(.*?)\]\((.*?)\)/);
    if (match) {
      return (
        <a key={i} href={match[2]} target="_blank" rel="noopener noreferrer" className="text-[#c9a34e] hover:underline font-bold">
          {match[1]}
        </a>
      );
    }
    return <span key={i}>{part.split('\n').map((line, j, arr) => <React.Fragment key={j}>{line}{j < arr.length - 1 && <br/>}</React.Fragment>)}</span>;
  });
};

const QUICK_TABS = ['Menu', 'Address', 'Hours', 'About', 'Contact'];

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState<'English' | 'Marathi' | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Welcome to Hotel Ashoka! Please select your preferred language.\n\nहॉटेल अशोका मध्ये आपले स्वागत आहे! कृपया तुमची पसंतीची भाषा निवडा.',
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

  const handleClearChat = () => {
    setMessages([
      {
        id: Date.now().toString(),
        text: 'Welcome to Hotel Ashoka! Please select your preferred language.\n\nहॉटेल अशोका मध्ये आपले स्वागत आहे! कृपया तुमची पसंतीची भाषा निवडा.',
        sender: 'bot',
        timestamp: new Date(),
      },
    ]);
    setLanguage(null);
    setInputValue('');
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

  const handleLanguageSelect = (lang: 'English' | 'Marathi') => {
    setLanguage(lang);
    const userMsg: Message = {
      id: Date.now().toString(),
      text: lang === 'English' ? 'English' : 'मराठी',
      sender: 'user',
      timestamp: new Date(),
    };
    const botMsg: Message = {
      id: (Date.now() + 1).toString(),
      text: lang === 'English' 
        ? 'Thank you! How can I help you today?' 
        : 'धन्यवाद! मी तुमची कशी मदत करू शकतो?',
      sender: 'bot',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMsg, botMsg]);
  };

  const processMessage = async (text: string) => {
    const lowerText = text.toLowerCase();
    
    // Intercept Address
    if (lowerText.includes('address') || lowerText.includes('location') || lowerText.includes('where are you') || lowerText.includes('पत्ता') || lowerText.includes('कुठे')) {
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: language === 'Marathi'
          ? "येथे आमचा पत्ता आहे:\nहॉटेल अशोका फॅमिली रेस्टॉरंट\nउस्मानाबाद रोड, जुन्या बस स्टँडजवळ, तुळजापूर, महाराष्ट्र ४१३६०१\n\n📍 [Google Maps वर पहा](https://maps.google.com/?q=Hotel+Ashoka+Family+Restaurant+Tuljapur)"
          : "Here is our address:\nHotel Ashoka Family Restaurant\nOsmanabad Rd, near old bus stand, Tuljapur, Maharashtra 413601\n\n📍 [View on Google Maps](https://maps.google.com/?q=Hotel+Ashoka+Family+Restaurant+Tuljapur)",
        sender: 'bot',
        timestamp: new Date(),
      };
      setTimeout(() => setMessages(prev => [...prev, botMsg]), 400);
      return;
    }

    // Intercept Contact
    if (lowerText.includes('contact') || lowerText.includes('phone') || lowerText.includes('call') || lowerText.includes('संपर्क') || lowerText.includes('फोन')) {
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: language === 'Marathi'
          ? "तुम्ही आमच्याशी येथे संपर्क साधू शकता:\n📞 फोन: +91 99227 72200\n💬 [WhatsApp वर चॅट करा](https://wa.me/919922772200)\n📸 [Instagram](https://www.instagram.com/hotel_ashoka_tuljapur)\n📘 [Facebook](https://www.facebook.com/p/HOTEL-AshokA-Family-Restaurant-100063635904665)"
          : "You can reach us here:\n📞 Phone: +91 99227 72200\n💬 [Chat on WhatsApp](https://wa.me/919922772200)\n📸 [Instagram](https://www.instagram.com/hotel_ashoka_tuljapur)\n📘 [Facebook](https://www.facebook.com/p/HOTEL-AshokA-Family-Restaurant-100063635904665)",
        sender: 'bot',
        timestamp: new Date(),
      };
      setTimeout(() => setMessages(prev => [...prev, botMsg]), 400);
      return;
    }

    setIsLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const systemInstruction = `You are a helpful customer service assistant for Hotel Ashoka Family Restaurant in Tuljapur, Maharashtra.
      IMPORTANT: The user has selected ${language || 'English'} as their preferred language. You MUST respond ONLY in ${language || 'English'}. Do not use any other language.
      
      Your job is to help customers with:
      - Table booking: Ask for the number of people, date, and time. Once all details are collected, confirm by saying exactly: "Your table for [X] people at [X] time is booked." (Translate this to ${language || 'English'}).
      - Menu questions: We serve 100% Pure Vegetarian Indian cuisine. Popular items include Maharashtrian thali, soups, breads, Lasuni Methi, Manchow Soup Veg.
      - Location: We are located on Osmanabad Rd, near the old bus stand, near Tulja Bhavani Temple.
      - Timings: We are open from 11 AM to 11:30 PM.
      - About: We are a family-friendly pure veg restaurant known for authentic taste and hygiene.
      
      Guidelines:
      - Keep responses short, polite, and conversational.
      - If you don't understand something, say exactly: "Sorry, I didn't understand. You can ask about menu, booking, location, or timings." (Translate to ${language || 'English'}).
      - Do not invent menu items not listed.`;

      const responseStream = await ai.models.generateContentStream({
        model: 'gemini-3-flash-preview',
        contents: text,
        config: {
          systemInstruction,
        }
      });

      const botMsgId = (Date.now() + 1).toString();
      setMessages((prev) => [
        ...prev,
        {
          id: botMsgId,
          text: '',
          sender: 'bot',
          timestamp: new Date(),
        },
      ]);
      setIsLoading(false);

      for await (const chunk of responseStream) {
        if (chunk.text) {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === botMsgId
                ? { ...msg, text: msg.text + chunk.text }
                : msg
            )
          );
        }
      }
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

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || !language) return;

    const text = inputValue;
    const userMsg: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    
    await processMessage(text);
  };

  const handleQuickTab = async (tab: string) => {
    const userMsg: Message = {
      id: Date.now().toString(),
      text: tab,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    await processMessage(tab);
  };

  const startVoiceMode = async () => {
    setVoiceError(null);
    setIsVoiceMode(true);
    setIsRecording(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
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
IMPORTANT: The user has selected ${language || 'English'} as their preferred language. You MUST respond ONLY in ${language || 'English'}. Do not use any other language.
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
      <AnimatedButton
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 p-4 bg-brand-yellow text-white rounded-full hover:bg-brand-yellow/90 transition-transform hover:scale-105 focus:outline-none animate-subtle-pulse ${isOpen ? 'hidden' : 'flex'}`}
        aria-label="Open chat"
      >
        <MessageCircle size={28} />
        {/* Notification dot */}
        <span className="absolute top-0 right-0 w-3 h-3 bg-brand-yellow rounded-full border-2 border-white"></span>
      </AnimatedButton>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 z-50 w-full sm:w-[400px] h-[100dvh] sm:h-[500px] sm:max-h-[80vh] bg-brand-cream sm:rounded-2xl flex flex-col overflow-hidden border-t sm:border border-brand-dark/10"
          >
            {/* Header */}
            <div className="bg-brand-dark text-white p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-cream rounded-full flex items-center justify-center overflow-hidden border border-brand-yellow/30">
                  <img 
                    src="https://lh3.googleusercontent.com/d/1fl1_PwYstotCqSb26KCzcoIlMIMkTr86" 
                    alt="Hotel Ashoka Logo" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Hotel Ashoka Assistant</h3>
                  <p className="text-xs text-brand-yellow">{isVoiceMode ? 'Voice Mode Active' : 'Online 24/7'}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <AnimatedButton
                  onClick={handleClearChat}
                  className="text-brand-cream/70 hover:text-brand-cream transition-colors p-2 rounded-full hover:bg-brand-cream/10"
                  aria-label="Clear chat"
                  title="Clear Chat"
                >
                  <Trash2 size={18} />
                </AnimatedButton>
                {!isVoiceMode ? (
                  <AnimatedButton
                    onClick={startVoiceMode}
                    className="text-brand-cream/70 hover:text-brand-cream transition-colors p-2 rounded-full hover:bg-brand-cream/10"
                    aria-label="Start voice chat"
                    title="Start Voice Chat"
                  >
                    <Mic size={18} />
                  </AnimatedButton>
                ) : (
                  <AnimatedButton
                    onClick={stopVoiceMode}
                    className="text-brand-yellow hover:text-brand-yellow/80 transition-colors p-2 rounded-full bg-brand-cream/10 hover:bg-brand-cream/20"
                    aria-label="Stop voice chat"
                    title="Stop Voice Chat"
                  >
                    <MicOff size={18} />
                  </AnimatedButton>
                )}
                <AnimatedButton
                  onClick={() => setIsOpen(false)}
                  className="text-white/70 hover:text-white transition-colors p-1"
                  aria-label="Close chat"
                >
                  <X size={20} />
                </AnimatedButton>
              </div>
            </div>

            {voiceError && (
              <div className="bg-red-50 text-red-600 p-3 text-sm border-b border-red-100 flex justify-between items-center">
                <span>{voiceError}</span>
                <AnimatedButton onClick={() => setVoiceError(null)} className="text-red-400 hover:text-red-600">
                  <X size={16} />
                </AnimatedButton>
              </div>
            )}

            {isVoiceMode ? (
              /* Voice Mode UI */
              <div className="flex-1 flex flex-col items-center justify-center bg-brand-cream/50 p-6">
                <div className="relative mb-8">
                  <div className="absolute inset-0 bg-brand-yellow/20 rounded-full animate-ping"></div>
                  <div className="absolute inset-[-1rem] bg-brand-yellow/10 rounded-full animate-pulse"></div>
                  <div className="relative w-24 h-24 bg-brand-yellow rounded-full flex items-center justify-center">
                    <Volume2 size={40} className="text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-serif text-brand-dark mb-2">Listening...</h3>
                <p className="text-center text-brand-dark/60 text-sm mb-8">
                  Speak naturally. The AI will respond with voice.
                </p>
                <AnimatedButton
                  onClick={stopVoiceMode}
                  className="px-6 py-3 bg-brand-cream border border-brand-dark/10 rounded-full text-brand-dark font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  <MicOff size={18} className="text-brand-yellow" />
                  End Voice Chat
                </AnimatedButton>
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
                        <div className="w-8 h-8 rounded-full bg-brand-cream flex items-center justify-center shrink-0 mt-1 overflow-hidden border border-brand-yellow/20">
                          <img 
                            src="https://lh3.googleusercontent.com/d/1fl1_PwYstotCqSb26KCzcoIlMIMkTr86" 
                            alt="Hotel Ashoka Logo" 
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      )}
                      <div
                        className={`max-w-[75%] p-3 rounded-2xl text-sm leading-relaxed ${
                          msg.sender === 'user'
                            ? 'bg-brand-yellow text-white rounded-br-sm'
                            : 'bg-brand-cream text-brand-dark border border-brand-dark/10 rounded-bl-sm'
                        }`}
                      >
                        {renderMessageText(msg.text)}
                      </div>
                      {msg.sender === 'user' && (
                        <div className="w-8 h-8 rounded-full bg-brand-dark/10 flex items-center justify-center shrink-0 mt-1">
                          <User size={16} className="text-brand-dark/60" />
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {!language && (
                    <div className="flex flex-col gap-3 mt-4 items-center">
                      <AnimatedButton 
                        onClick={() => handleLanguageSelect('English')}
                        className="w-3/4 py-3 bg-brand-dark text-brand-cream rounded-xl font-bold hover:bg-brand-yellow transition-colors shadow-md"
                      >
                        English
                      </AnimatedButton>
                      <AnimatedButton 
                        onClick={() => handleLanguageSelect('Marathi')}
                        className="w-3/4 py-3 bg-brand-dark text-brand-cream rounded-xl font-bold hover:bg-brand-yellow transition-colors shadow-md"
                      >
                        मराठी (Marathi)
                      </AnimatedButton>
                    </div>
                  )}

                  {isLoading && (
                    <div className="flex gap-3 justify-start">
                      <div className="w-8 h-8 rounded-full bg-brand-cream flex items-center justify-center shrink-0 mt-1 overflow-hidden border border-brand-yellow/20">
                        <img 
                          src="https://lh3.googleusercontent.com/d/1fl1_PwYstotCqSb26KCzcoIlMIMkTr86" 
                          alt="Hotel Ashoka Logo" 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="bg-brand-cream p-3 rounded-2xl border border-brand-dark/10 rounded-bl-sm flex items-center">
                        <Loader2 className="w-4 h-4 text-brand-yellow animate-spin" />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Tabs */}
                {language && !isVoiceMode && (
                  <div className="bg-brand-cream border-t border-brand-dark/10 p-3 pb-2 flex flex-wrap justify-center gap-2 shrink-0">
                    {QUICK_TABS.map(tab => (
                      <button 
                        key={tab}
                        onClick={() => handleQuickTab(tab)}
                        className="whitespace-nowrap px-4 py-1.5 bg-brand-cream border border-[#c9a34e]/50 rounded-full text-xs font-bold text-brand-dark hover:bg-[#c9a34e]/10 transition-colors shadow-sm"
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                )}

                {/* Input Area */}
                <form onSubmit={handleSend} className={`p-4 bg-brand-cream flex gap-2 ${language && !isVoiceMode ? 'pt-2' : 'border-t border-brand-dark/10'}`}>
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={language ? "Ask about menu, hours, location..." : "Please select a language first..."}
                    className="flex-1 bg-brand-cream/50 border border-brand-dark/10 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-yellow/50 transition-shadow disabled:opacity-50"
                    disabled={isLoading || !language}
                  />
                  <AnimatedButton
                    type="submit"
                    disabled={!inputValue.trim() || isLoading || !language}
                    className="w-10 h-10 rounded-full bg-brand-yellow text-white flex items-center justify-center shrink-0 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-brand-yellow/90 transition-colors"
                  >
                    <Send size={18} className="ml-0.5" />
                  </AnimatedButton>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}