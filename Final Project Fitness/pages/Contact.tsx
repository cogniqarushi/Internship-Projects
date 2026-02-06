import React, { useState } from 'react';
import { Send, Phone, Sparkles, CheckCircle } from 'lucide-react';
import TiltCard from '../components/TiltCard';
import { motion, AnimatePresence } from 'framer-motion';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    goal: 'Weight Loss'
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      alert("Please fill in all fields.");
      return;
    }
    
    // Clear form details
    setFormData({
      name: '',
      email: '',
      phone: '',
      goal: 'Weight Loss'
    });

    // Show 3D Success Popup
    setShowSuccess(true);

    // Auto hide after 5 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 5000);
  };

  return (
    <div className="pt-24 min-h-screen bg-brand-black px-4 flex items-center justify-center relative overflow-hidden pb-12">
      
      {/* Dynamic Background Decor - Brighter */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-gold/20 via-transparent to-transparent -skew-x-12 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-blue/20 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute top-20 left-20 w-64 h-64 bg-brand-orange/20 rounded-full blur-[100px] pointer-events-none" />

      {/* 3D Success Popup Overlay */}
      <AnimatePresence>
        {showSuccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
             <motion.div
               initial={{ opacity: 0, scale: 0.5, rotateX: 90, y: 100 }}
               animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
               exit={{ opacity: 0, scale: 0.8, rotateX: -45, y: -50 }}
               transition={{ type: "spring", damping: 12, stiffness: 100 }}
               className="bg-brand-dark border border-brand-gold/50 p-10 rounded-3xl shadow-[0_0_100px_rgba(212,175,55,0.4)] text-center max-w-md w-full relative overflow-hidden perspective-1000"
               style={{ transformStyle: 'preserve-3d' }}
             >
                {/* Glossy sheen effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                <div className="absolute -top-20 -left-20 w-40 h-40 bg-brand-gold/30 rounded-full blur-[50px]" />
                
                <motion.div 
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="w-24 h-24 bg-gradient-to-br from-brand-gold to-brand-orange rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-brand-orange/30"
                >
                  <CheckCircle className="w-12 h-12 text-black" />
                </motion.div>
                
                <h3 className="text-4xl font-heading font-bold text-white mb-4 drop-shadow-lg">Received!</h3>
                <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                  Your application is in. <br/>
                  <span className="text-brand-gold font-bold">We will contact you shortly</span> to start your transformation.
                </p>
                
                <button 
                  onClick={() => setShowSuccess(false)}
                  className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-xl transition-all border border-white/10 hover:border-brand-gold/50"
                >
                  Close
                </button>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

      <TiltCard className="w-full max-w-5xl perspective-1000">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full bg-brand-dark/90 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(212,175,55,0.2)] relative z-10 grid md:grid-cols-2 group"
        >
           
           {/* Animated Border Gradient */}
           <div className="absolute inset-0 border-2 border-transparent rounded-3xl pointer-events-none" 
                style={{ 
                  background: 'linear-gradient(135deg, rgba(212,175,55,0.4), transparent, rgba(0,242,234,0.4)) border-box',
                  WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude'
                }} 
           />

           <div className="p-8 md:p-12 flex flex-col justify-center relative">
              {/* Subtle grid background */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                   <Sparkles className="text-brand-blue w-5 h-5 animate-pulse" />
                   <span className="text-brand-blue text-xs font-bold uppercase tracking-widest">Limited Spots Available</span>
                </div>
                <h2 className="font-heading text-5xl font-bold mb-6 text-white drop-shadow-lg leading-tight">
                  Ready to <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-brand-orange to-brand-gold animate-gradient-x">Transform?</span>
                </h2>
                <p className="text-gray-300 mb-8 leading-relaxed font-light">
                  Fill out the form below to book your <span className="text-brand-gold font-medium">free discovery call</span>. Let's discuss your genetics, lifestyle, and build a plan that works.
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                   <div className="group/input relative">
                     <label className="block text-xs font-bold text-brand-gold mb-1 uppercase tracking-wider ml-1">Full Name</label>
                     <input 
                       type="text" 
                       required
                       className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-brand-blue focus:bg-brand-blue/10 transition-all duration-300 shadow-inner placeholder:text-gray-500"
                       placeholder="Enter your name"
                       value={formData.name}
                       onChange={(e) => setFormData({...formData, name: e.target.value})}
                     />
                     <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-brand-blue group-focus-within/input:w-full transition-all duration-500" />
                   </div>
                   
                   <div className="group/input relative">
                     <label className="block text-xs font-bold text-brand-gold mb-1 uppercase tracking-wider ml-1">Email Address</label>
                     <input 
                       type="email" 
                       required
                       className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-brand-blue focus:bg-brand-blue/10 transition-all duration-300 shadow-inner placeholder:text-gray-500"
                       placeholder="Enter your email"
                       value={formData.email}
                       onChange={(e) => setFormData({...formData, email: e.target.value})}
                     />
                     <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-brand-blue group-focus-within/input:w-full transition-all duration-500" />
                   </div>

                   <div className="group/input relative">
                     <label className="block text-xs font-bold text-brand-gold mb-1 uppercase tracking-wider ml-1">Phone Number</label>
                     <input 
                       type="tel" 
                       required
                       className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-brand-blue focus:bg-brand-blue/10 transition-all duration-300 shadow-inner placeholder:text-gray-500"
                       placeholder="Enter your phone number"
                       value={formData.phone}
                       onChange={(e) => setFormData({...formData, phone: e.target.value})}
                     />
                     <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-brand-blue group-focus-within/input:w-full transition-all duration-500" />
                   </div>
                   
                   <div className="group/input relative">
                     <label className="block text-xs font-bold text-brand-gold mb-1 uppercase tracking-wider ml-1">Primary Goal</label>
                     <div className="relative">
                       <select 
                         className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-brand-blue focus:bg-brand-blue/10 transition-all duration-300 appearance-none shadow-inner cursor-pointer hover:border-brand-blue/30"
                         value={formData.goal}
                         onChange={(e) => setFormData({...formData, goal: e.target.value})}
                       >
                         <option className="bg-brand-dark text-white">Weight Loss & Toning</option>
                         <option className="bg-brand-dark text-white">Muscle Hypertrophy</option>
                         <option className="bg-brand-dark text-white">Strength & Conditioning</option>
                         <option className="bg-brand-dark text-white">Competition Prep</option>
                       </select>
                       <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-brand-blue">
                         ▼
                       </div>
                     </div>
                   </div>
                   
                   <button 
                     type="submit"
                     className="w-full mt-6 bg-gradient-to-r from-brand-gold via-brand-orange to-brand-gold bg-[length:200%_auto] hover:bg-[position:right_center] text-black font-black py-4 rounded-xl shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] transition-all duration-500 transform hover:-translate-y-1 flex items-center justify-center gap-2 uppercase tracking-widest text-sm"
                   >
                     <Send size={18} className="animate-pulse" /> Apply Now
                   </button>
                </form>
              </div>
           </div>

           <div className="bg-brand-black/90 p-8 md:p-12 flex flex-col justify-center items-center text-center relative overflow-hidden border-l border-white/5">
              {/* Animated Background for Right Side */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/20 via-transparent to-brand-gold/10 opacity-60" />
              <div className="absolute w-80 h-80 bg-brand-blue/20 rounded-full blur-[80px] -top-20 -right-20 animate-pulse" />
              <div className="absolute w-60 h-60 bg-brand-gold/10 rounded-full blur-[60px] bottom-0 left-0" />

              <div className="relative z-10 backdrop-blur-sm bg-black/30 p-8 rounded-3xl border border-white/10 shadow-2xl">
                <div className="mb-8 p-6 bg-gradient-to-br from-black to-brand-dark rounded-full border border-brand-blue/50 shadow-[0_0_30px_rgba(0,242,234,0.3)] inline-block transform group-hover:scale-110 transition-transform duration-500 group-hover:rotate-12">
                   <Phone size={48} className="text-brand-blue" />
                </div>
                
                <h3 className="font-heading text-3xl font-bold mb-3 text-white">Direct Access?</h3>
                <p className="text-gray-300 mb-8 text-sm max-w-xs mx-auto leading-relaxed">
                  Skip the email queue. Chat directly with our team on WhatsApp for instant onboarding details.
                </p>
                
                <a 
                  href="https://wa.me/918080616041" 
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-flex px-8 py-4 border border-brand-blue/50 text-brand-blue font-bold rounded-xl hover:bg-brand-blue hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(0,242,234,0.1)] hover:shadow-[0_0_30px_rgba(0,242,234,0.5)] items-center gap-3 justify-center group/btn"
                >
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-blue opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-blue"></span>
                  </span>
                  Chat on WhatsApp
                  <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                </a>
              </div>
           </div>

        </motion.div>
      </TiltCard>
    </div>
  );
};

export default Contact;