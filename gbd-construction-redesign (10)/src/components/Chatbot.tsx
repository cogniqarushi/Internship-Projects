import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, User, Loader2, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import Markdown from 'react-markdown';

type Message = {
  role: 'user' | 'model';
  text: string;
};

const SUGGESTED_QUESTIONS = [
  "What services do you offer?",
  "Tell me about your projects",
  "Do you build new homes?",
  "Do you develop condos?",
  "Why choose GBD Construction?",
  "How can I contact you?"
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Hello! I am the GBD Construction assistant. How can I help you build your dream home today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', text };
    const currentHistory = [...messages];
    
    setMessages([...currentHistory, userMsg]);
    setIsLoading(true);

    try {
      let isBackendReachable = true;
      let response;
      try {
        response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            history: currentHistory,
            message: userMsg.text
          })
        });

        const contentType = response?.headers.get('content-type');
        if (contentType && contentType.includes('text/html')) {
          isBackendReachable = false;
        }
      } catch (e) {
        isBackendReachable = false;
      }

      if (isBackendReachable && response && response.ok && response.body) {
        setIsLoading(false);
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let done = false;
        let assistantMessageText = '';
        setMessages(prev => [...prev, { role: 'model', text: '' }]);

        while (!done) {
          const { value, done: doneReading } = await reader.read();
          done = doneReading;
          if (value) {
            const chunk = decoder.decode(value, { stream: true });
            assistantMessageText += chunk;
            setMessages(prev => {
              const newMessages = [...prev];
              newMessages[newMessages.length - 1] = { role: 'model', text: assistantMessageText };
              return newMessages;
            });
          }
        }
      } else {
        // Fallback to client-side API call if backend is not reachable (e.g. static site deployment)
        const envKey = typeof import.meta !== 'undefined' && 'env' in import.meta ? (import.meta as any).env.VITE_GEMINI_API_KEY : undefined;
        
        if (!envKey) {
          setMessages(prev => [...prev, { role: 'model', text: 'Error: The chatbot backend could not be reached. Please ensure your GEMINI_API_KEY is set in your Vercel Environment Variables.' }]);
          setIsLoading(false);
          return;
        }

        const { GoogleGenAI } = await import('@google/genai');
        const ai = new GoogleGenAI({ apiKey: envKey });
        
        const contents = currentHistory.map(msg => ({
          role: msg.role === 'model' ? 'model' : 'user',
          parts: [{ text: msg.text }]
        }));
        
        contents.push({
          role: 'user',
          parts: [{ text: userMsg.text }]
        });

        const responseStream = await ai.models.generateContentStream({
          model: "gemini-2.5-flash",
          contents: contents,
          config: {
            maxOutputTokens: 400,
            temperature: 0.7,
            systemInstruction: `You are the friendly and professional AI assistant for GBD Construction.
Your primary role is to accurately answer questions about our new home construction, condos, turnkey solutions, and residential projects, primarily located on Montreal's North Shore (Rive-Nord).

IMPORTANT GUIDELINES FOR PROPER AND ACCURATE REPLIES:
1. Always maintain a polite, professional, and welcoming tone.
2. Provide accurate and specific information based on your knowledge of GBD Construction. If you do not know the exact answer to highly specific pricing or availability questions, politely suggest contacting our sales team.
3. Keep your answers clear, concise, and highly relevant. Ensure fast, crisp responses. Answer conversational questions plainly.

LINKS AND CONTACT INFO (Provide these accurately when asked):
- Location/Address: 425 Mathers Ave Suite 101, Saint-Eustache, Quebec J7P 4C1
- Map Link: [View on Google Maps](https://maps.google.com/?q=425+Mathers+Ave+Suite+101,+Saint-Eustache,+Quebec+J7P+4C1)
- Facebook: [GBD Construction on Facebook](https://www.facebook.com/gbdconstruction?fref=ts)
- Instagram: [GBD Construction on Instagram](https://www.instagram.com/gbdconstruction/)

When referring users to our contact page, always provide this exact markdown link:
[Contact Us](/contact)

CRITICAL FORMATTING INSTRUCTION: You must NEVER use the asterisk character ("*") in your replies. Use hyphens ("-") for bullets if needed. Do not use bold or italics with asterisks.

Example of a great reply:
"Hello! We specialize in residential construction and new condos across Montreal's North Shore. Our office is located at 425 Mathers Ave Suite 101, Saint-Eustache. We would love to discuss your future project! Please reach out to our team here:
[Contact Us](/contact)"`
          }
        });

        setIsLoading(false);
        let assistantMessageText = '';
        setMessages(prev => [...prev, { role: 'model', text: '' }]);

        for await (const chunk of responseStream) {
          if (chunk.text) {
            assistantMessageText += chunk.text;
            setMessages(prev => {
              const newMessages = [...prev];
              newMessages[newMessages.length - 1] = { role: 'model', text: assistantMessageText };
              return newMessages;
            });
          }
        }
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: 'Sorry, I am having trouble connecting to the AI service.' }]);
      setIsLoading(false);
    }
  };

  const handleSend = () => {
    const text = input;
    setInput('');
    sendMessage(text);
  };

  const handleClearChat = () => {
    setMessages([
      { role: 'model', text: 'Hello! I am your GBD Construction assistant. How can I help you today?' }
    ]);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        className="fixed bottom-6 right-6 p-4 rounded-full bg-accent text-white shadow-xl hover:shadow-2xl transition-shadow z-[9999] flex items-center justify-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ display: isOpen ? 'none' : 'flex' }}
      >
        <MessageSquare className="w-6 h-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-4 right-4 left-4 sm:left-auto sm:right-6 sm:w-[400px] h-[80vh] sm:h-[550px] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col z-[10000] border border-gray-100"
          >
            {/* Header */}
            <div className="bg-accent text-white p-4 flex justify-between items-center shadow-md z-10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center overflow-hidden border border-white/20">
                  <img src="https://lh3.googleusercontent.com/d/1fWCG2m7utI6m8MO_KIYYbSe8KmXnmmMF" alt="GBD Logo" className="w-full h-full object-contain scale-[1.3]" />
                </div>
                <div>
                  <h3 className="font-display font-medium text-sm">GBD Assistant</h3>
                  <p className="text-xs text-white/70">Always here to help</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={handleClearChat} 
                  className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                  title="Clear Chat"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                  title="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center overflow-hidden ${msg.role === 'user' ? 'bg-accent/20 text-accent-dark' : 'bg-white shadow-sm border border-gray-100'}`}>
                      {msg.role === 'user' ? <User className="w-4 h-4" /> : <img src="https://lh3.googleusercontent.com/d/1fWCG2m7utI6m8MO_KIYYbSe8KmXnmmMF" alt="GBD Logo" className="w-full h-full object-contain scale-[1.3]" />}
                    </div>
                    <div className={`p-3 rounded-2xl text-sm ${
                      msg.role === 'user' 
                        ? 'bg-accent text-white rounded-tr-none' 
                        : 'bg-white border border-gray-100 shadow-sm text-gray-800 rounded-tl-none'
                    }`}>
                      {msg.role === 'user' ? (
                        msg.text
                      ) : (
                        <div className="text-sm">
                          <Markdown
                            components={{
                              p: ({node, ...props}) => <p className="mb-2 last:mb-0 leading-relaxed" {...props} />,
                              a: ({node, ...props}) => (
                                <a 
                                  className="inline-block bg-accent text-white px-4 py-2 rounded-lg font-medium no-underline my-1 hover:bg-accent-dark transition-colors" 
                                  {...props} 
                                  target="_blank"
                                  rel="noopener noreferrer"
                                />
                              ),
                              ul: ({node, ...props}) => <ul className="mb-2 ml-4 list-disc space-y-1" {...props} />,
                              li: ({node, ...props}) => <li className="mb-0" {...props} />,
                            }}
                          >
                            {msg.text}
                          </Markdown>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-2 max-w-[85%] flex-row">
                    <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center overflow-hidden bg-white shadow-sm border border-gray-100">
                      <img src="https://lh3.googleusercontent.com/d/1fWCG2m7utI6m8MO_KIYYbSe8KmXnmmMF" alt="GBD Logo" className="w-full h-full object-contain scale-[1.3]" />
                    </div>
                    <div className="p-3 bg-white border border-gray-100 shadow-sm rounded-2xl rounded-tl-none flex items-center gap-2">
                       <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input & Suggestions */}
            <div className="bg-white border-t border-gray-100 flex flex-col mt-auto z-20">
              {messages.length === 1 && (
                <div className="px-4 pt-4 pb-1 flex flex-wrap gap-2 items-center justify-center">
                  {SUGGESTED_QUESTIONS.map((q, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => sendMessage(q)}
                      disabled={isLoading}
                      className="text-xs font-medium bg-white text-accent border border-accent/40 hover:bg-accent hover:text-white px-3 py-1.5 rounded-full transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-sm text-center"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
              <div className="p-4">
                <form 
                  onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                  className="flex gap-2 items-center"
                >
                  <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                  <button 
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent-dark transition-colors"
                  >
                    <Send className="w-5 h-5 ml-1" />
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
