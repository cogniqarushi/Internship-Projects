import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';
import TiltCard from '../components/TiltCard';

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=2069&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop"
];

// Expanded to High Quality Images
const RESULT_IMAGES = [
  "https://images.unsplash.com/photo-1534367507873-d2d7e24c797f?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=2069&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=2069&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1594882645126-14020914d58d?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1434596922112-19c563067271?q=80&w=2070&auto=format&fit=crop"
];

const Home: React.FC = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [currentResultImage, setCurrentResultImage] = useState(0);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    
    const resultTimer = setInterval(() => {
      setCurrentResultImage((prev) => (prev + 1) % RESULT_IMAGES.length);
    }, 3500); 

    return () => {
      clearInterval(timer);
      clearInterval(resultTimer);
    };
  }, []);

  return (
    <div className="w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-black">
        
        {/* Animated Slideshow Background */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="popLayout">
            <motion.div
                key={currentImage}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 0.6, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5 }}
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${HERO_IMAGES[currentImage]})` }}
             />
          </AnimatePresence>
          {/* Lighter Overlay Gradients */}
          <div className="absolute inset-0 bg-gradient-to-b from-brand-black/60 via-brand-black/20 to-brand-black" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(18,18,18,0.8)_100%)]" />
        </div>

        {/* Animated 3D Particles - Brighter/Higher Opacity */}
        <div className="absolute inset-0 pointer-events-none z-0">
           <motion.div 
             animate={{ rotate: 360 }}
             transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
             className="absolute -top-[20%] -left-[20%] w-[80vw] h-[80vw] rounded-full border border-brand-gold/20 blur-[80px]"
           />
           <motion.div 
             animate={{ rotate: -360 }}
             transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
             className="absolute top-[20%] right-[10%] w-[60vw] h-[60vw] rounded-full border border-brand-blue/20 blur-[80px]"
           />
           <motion.div 
             animate={{ rotate: 180 }}
             transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
             className="absolute bottom-[-10%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-brand-blue/10 blur-[100px]"
           />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center perspective-1000">
          <motion.div
            initial={{ opacity: 0, rotateX: 20, y: 50 }}
            animate={{ opacity: 1, rotateX: 0, y: 0 }}
            transition={{ duration: 1, type: "spring" }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <TiltCard className="inline-block">
               <span className="text-brand-blue tracking-[0.3em] font-bold text-sm uppercase mb-6 block drop-shadow-[0_0_15px_rgba(0,242,234,0.6)]">
                 Premium AI-Enhanced Coaching
               </span>
            </TiltCard>
            
            <h1 className="font-heading font-black text-5xl md:text-7xl lg:text-9xl leading-tight mb-8 text-white drop-shadow-2xl relative">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-300">TRANSFORM</span>
              <span className="block mt-2 text-stroke-white text-transparent bg-clip-text bg-gradient-to-b from-brand-gold via-brand-orange to-brand-gold">YOUR REALITY</span>
            </h1>
            
            <p className="text-gray-200 text-lg md:text-2xl max-w-2xl mx-auto mb-12 leading-relaxed font-light drop-shadow-md">
              The bridge between potential and performance. 
              <span className="text-brand-blue font-medium shadow-blue-500/50"> AI-driven insights</span> meet 
              <span className="text-brand-gold font-medium"> human expertise</span>.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link 
                to="/programs" 
                className="group relative px-10 py-5 bg-brand-gold text-black font-bold text-lg rounded-full overflow-hidden shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:shadow-[0_0_50px_rgba(212,175,55,0.6)] transition-all duration-300 transform hover:scale-105"
              >
                <div className="absolute inset-0 bg-white/40 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative flex items-center gap-2">
                  Start Transformation <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link 
                to="/about" 
                className="px-10 py-5 bg-white/10 backdrop-blur-md border border-white/20 hover:border-brand-blue hover:text-brand-blue text-white font-bold text-lg rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_20px_rgba(0,242,234,0.2)]"
              >
                Meet The Founder
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Parallax Feature Strip */}
      <section className="relative bg-brand-dark border-y border-white/10 py-16 overflow-hidden">
        <motion.div style={{ y: y1 }} className="absolute -top-20 right-0 text-[100px] md:text-[200px] font-black text-white/5 pointer-events-none select-none">
          STRENGTH
        </motion.div>
        <div className="relative z-10 max-w-7xl mx-auto px-4">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { title: "AI-Powered Analysis", desc: "Data-driven progress tracking" },
                { title: "Lifestyle Coaching", desc: "Sleep, stress, & habit optimization" },
                { title: "Elite Accountability", desc: "24/7 access to your coach" }
              ].map((feature, i) => (
                <TiltCard key={i} className="flex flex-col items-center text-center gap-4 p-6 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-brand-blue/30 transition-all duration-300 group shadow-lg">
                  <div className="p-4 rounded-full bg-black/40 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-shadow">
                    <CheckCircle className="text-brand-gold w-8 h-8 group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-xl text-white mb-2 group-hover:text-brand-blue transition-colors">{feature.title}</h3>
                    <p className="text-gray-400">{feature.desc}</p>
                  </div>
                </TiltCard>
              ))}
           </div>
        </div>
      </section>

      {/* Visual Impact Section */}
      <section className="py-32 px-4 bg-brand-black relative overflow-hidden">
         <motion.div style={{ y: y2 }} className="absolute -bottom-20 left-0 text-[100px] md:text-[200px] font-black text-white/5 pointer-events-none select-none">
           RESULTS
         </motion.div>
         <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">
            <div>
               <h2 className="font-heading text-5xl md:text-6xl font-bold mb-8 leading-tight text-white">
                 Results Driven.<br />
                 <span className="text-brand-blue drop-shadow-[0_0_15px_rgba(0,242,234,0.3)]">Science Backed.</span>
               </h2>
               <p className="text-gray-300 text-lg mb-10 leading-relaxed">
                 Stop guessing at the gym. Follow a structured path designed specifically for your body type and goals. We combine nutritional science with hypertrophy training to maximize your genetic potential.
               </p>
               <Link to="/programs" className="text-brand-gold font-bold text-xl flex items-center gap-2 hover:gap-4 transition-all hover:text-white group">
                 View Programs <ArrowRight className="group-hover:text-brand-blue transition-colors" />
               </Link>
            </div>
            
            <TiltCard>
               <div className="relative rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.6)] border border-white/10 group h-[500px] w-full bg-brand-dark perspective-1000">
                  
                  {/* Overlay Gradient/Effect */}
                  <div className="absolute inset-0 bg-brand-blue/20 mix-blend-overlay z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 opacity-80 pointer-events-none" />

                  {/* 3D Dynamic Image Slideshow with AnimatePresence */}
                  <div className="absolute inset-0 overflow-hidden">
                    <AnimatePresence mode="popLayout">
                      <motion.img 
                        key={currentResultImage}
                        src={RESULT_IMAGES[currentResultImage]}
                        initial={{ opacity: 0, scale: 1.2, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, scale: 1, filter: 'blur(5px)', zIndex: -1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="absolute inset-0 w-full h-full object-cover"
                        alt="Transformation Result"
                      />
                    </AnimatePresence>
                  </div>
                  
                  <div className="absolute bottom-6 left-6 z-30">
                     <div className="bg-brand-gold text-black text-xs font-bold px-3 py-1 rounded-full mb-2 inline-block shadow-lg">Real Results</div>
                     <div className="text-white text-sm font-medium opacity-90 drop-shadow-md">100% Natural Transformation</div>
                  </div>
               </div>
            </TiltCard>
         </div>
      </section>
    </div>
  );
};

export default Home;