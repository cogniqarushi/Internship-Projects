import React, { useState } from 'react';
import { TESTIMONIALS } from '../constants';
import { Star, Plus, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Testimonial } from '../types';

const Testimonials: React.FC = () => {
  const [reviews, setReviews] = useState<Testimonial[]>(TESTIMONIALS);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    quote: '',
    rating: 5,
    result: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.quote) return;

    const reviewToAdd: Testimonial = {
      id: Date.now().toString(),
      name: newReview.name,
      quote: newReview.quote,
      rating: newReview.rating,
      result: newReview.result || 'New Member',
      image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200&auto=format&fit=crop', // Generic avatar
    };

    setReviews([reviewToAdd, ...reviews]);
    setNewReview({ name: '', quote: '', rating: 5, result: '' });
    setIsFormOpen(false);
  };

  return (
    <div className="pt-24 min-h-screen bg-brand-black px-4 pb-20 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-brand-dark via-brand-black to-brand-black -z-20" />
      <div className="absolute top-20 left-10 w-80 h-80 bg-brand-blue/10 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-brand-gold/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="text-center md:text-left">
                <h1 className="font-heading text-4xl md:text-5xl font-bold text-white">Transformations & <span className="text-brand-gold drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]">Stories</span></h1>
                <p className="text-gray-400 mt-2">Real results from real people. Join the community.</p>
            </div>
            
            <button 
                onClick={() => setIsFormOpen(!isFormOpen)}
                className="bg-brand-blue/10 text-brand-blue border border-brand-blue/50 hover:bg-brand-blue hover:text-black px-6 py-3 rounded-full font-bold transition-all duration-300 flex items-center gap-2 group shadow-[0_0_15px_rgba(0,242,234,0.2)]"
            >
                {isFormOpen ? 'Cancel' : 'Add Your Story'} 
                <Plus size={18} className={`transition-transform duration-300 ${isFormOpen ? 'rotate-45' : 'group-hover:rotate-90'}`} />
            </button>
        </div>
        
        {/* Real-time Review Form */}
        <AnimatePresence>
            {isFormOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0, marginBottom: 0 }}
                    animate={{ height: 'auto', opacity: 1, marginBottom: 48 }}
                    exit={{ height: 0, opacity: 0, marginBottom: 0 }}
                    className="overflow-hidden"
                >
                    <div className="bg-brand-dark/80 backdrop-blur-md border border-brand-gold/20 p-8 rounded-3xl max-w-2xl mx-auto shadow-[0_0_30px_rgba(0,0,0,0.5)] relative">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-gold to-transparent opacity-50" />
                        
                        <h3 className="text-2xl font-bold text-white mb-6 font-heading">Share Your Experience</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="block text-xs text-gray-400 ml-1 uppercase font-bold tracking-wider">Name</label>
                                    <input 
                                        type="text" 
                                        placeholder="Your Name"
                                        className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-blue/50 focus:bg-brand-blue/5 outline-none transition-all placeholder:text-gray-600"
                                        value={newReview.name}
                                        onChange={e => setNewReview({...newReview, name: e.target.value})}
                                        required
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="block text-xs text-gray-400 ml-1 uppercase font-bold tracking-wider">Result <span className="text-gray-600 font-normal normal-case">(Optional)</span></label>
                                    <input 
                                        type="text" 
                                        placeholder="e.g. Lost 5kg"
                                        className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-blue/50 focus:bg-brand-blue/5 outline-none transition-all placeholder:text-gray-600"
                                        value={newReview.result}
                                        onChange={e => setNewReview({...newReview, result: e.target.value})}
                                    />
                                </div>
                            </div>
                            
                            <div className="space-y-1">
                                <label className="block text-xs text-gray-400 ml-1 uppercase font-bold tracking-wider">Rating</label>
                                <div className="flex gap-2 bg-black/40 p-3 rounded-xl border border-white/5 w-fit">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setNewReview({...newReview, rating: star})}
                                            className="focus:outline-none transition-transform hover:scale-110 active:scale-95"
                                        >
                                            <Star 
                                                size={24} 
                                                fill={star <= newReview.rating ? "#FF8C00" : "none"} 
                                                className={`transition-colors duration-200 ${star <= newReview.rating ? "text-brand-orange drop-shadow-[0_0_8px_rgba(255,140,0,0.5)]" : "text-gray-700"}`} 
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="block text-xs text-gray-400 ml-1 uppercase font-bold tracking-wider">Your Story</label>
                                <textarea 
                                    placeholder="How has Project Fitness helped you achieve your goals?"
                                    rows={4}
                                    className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-blue/50 focus:bg-brand-blue/5 outline-none resize-none transition-all placeholder:text-gray-600"
                                    value={newReview.quote}
                                    onChange={e => setNewReview({...newReview, quote: e.target.value})}
                                    required
                                />
                            </div>

                            <button type="submit" className="w-full bg-gradient-to-r from-brand-gold to-brand-orange text-black font-bold py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] hover:-translate-y-1 flex justify-center items-center gap-2 uppercase tracking-wide text-sm">
                                <Send size={18} /> Submit Review
                            </button>
                        </form>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
          {reviews.map((t) => (
            <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                key={t.id} 
                className="bg-brand-dark/80 backdrop-blur-sm p-8 rounded-2xl border border-white/10 relative hover:border-brand-blue/30 transition-all duration-300 shadow-lg group h-full flex flex-col"
            >
              <div className="absolute -top-6 left-8 bg-brand-gold p-1 rounded-lg shadow-lg group-hover:scale-110 transition-transform z-10">
                <img src={t.image} alt={t.name} className="w-12 h-12 rounded bg-gray-300 object-cover" />
              </div>
              
              <div className="mt-8 flex-grow">
                <div className="flex gap-1 mb-4 text-brand-orange">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill={i < t.rating ? "currentColor" : "none"} className={i < t.rating ? "" : "text-gray-600"} />
                  ))}
                </div>
                <p className="text-gray-300 italic mb-6 leading-relaxed">"{t.quote}"</p>
              </div>
              
              <div className="border-t border-white/10 pt-4 flex justify-between items-center mt-auto">
                   <span className="font-bold text-white group-hover:text-brand-blue transition-colors">{t.name}</span>
                   {t.result && <span className="text-xs font-bold bg-white/10 px-2 py-1 rounded text-brand-gold shadow-sm">{t.result}</span>}
              </div>
            </motion.div>
          ))}
          </AnimatePresence>
        </motion.div>

        {/* How it Works Section integrated here for flow */}
        <div className="mt-32">
           <h2 className="font-heading text-3xl font-bold text-center mb-16 text-white">How It Works</h2>
           <div className="relative">
              {/* Line */}
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent -translate-y-1/2 z-0" />
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                 {[
                   { step: "01", title: "Apply", desc: "Fill out the quick form." },
                   { step: "02", title: "Assessment", desc: "We analyze your goals." },
                   { step: "03", title: "Plan", desc: "Get your custom roadmap." },
                   { step: "04", title: "Execute", desc: "Start your transformation." }
                 ].map((item, i) => (
                   <div key={i} className="bg-brand-black border border-brand-gold/20 p-6 rounded-xl text-center hover:-translate-y-2 transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(212,175,55,0.1)] hover:border-brand-gold/50">
                      <div className="w-12 h-12 bg-brand-dark rounded-full border border-brand-gold flex items-center justify-center text-brand-gold font-bold mx-auto mb-4 shadow-[0_0_10px_rgba(212,175,55,0.3)]">
                        {item.step}
                      </div>
                      <h3 className="font-bold text-white text-xl mb-2">{item.title}</h3>
                      <p className="text-gray-400 text-sm">{item.desc}</p>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;