import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Play } from 'lucide-react';
import { useState, useEffect } from 'react';

const backgroundImages = [
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=2000",
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=2000",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2000",
  "https://images.unsplash.com/photo-1628624747186-a941c476b7ef?auto=format&fit=crop&q=80&w=2000"
];

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, 100]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative w-full h-screen min-h-[600px] flex items-center pt-20 overflow-hidden bg-black perspective-1000">
      {/* Image Slider Background with Parallax */}
      <motion.div style={{ y: y1 }} className="absolute inset-0 z-0 origin-top">
        <AnimatePresence mode="popLayout">
          <motion.img
            key={currentImageIndex}
            src={backgroundImages[currentImageIndex]}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.7, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-[120%] -top-[10%] object-cover transform-gpu"
            alt="Estate Background"
          />
        </AnimatePresence>
        
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40 z-10 transition-opacity duration-1000"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10"></div>
      </motion.div>

      <motion.div style={{ y: y2, opacity }} className="relative z-20 max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-3xl">
          <motion.h1 
            initial={{ opacity: 0, y: 50, rotateX: 20 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-medium text-white leading-tight drop-shadow-2xl"
          >
            Building Modern <span className="text-accent italic font-light">Homes</span> for Tomorrow's Families.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="mt-6 text-lg md:text-xl text-white/90 max-w-2xl font-light leading-relaxed drop-shadow-lg"
          >
            Trusted residential construction and new condo developments across Montreal's North Shore. Turnkey solutions crafted with quality and care.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#projects"
              className="px-8 py-4 bg-accent text-white font-medium rounded-full shadow-[0_0_40px_rgba(220,160,76,0.3)] hover:shadow-[0_0_60px_rgba(220,160,76,0.5)] transition-all flex items-center justify-center gap-2 group"
            >
              View Our Projects
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#about"
              className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white font-medium hover:bg-white/20 transition-all flex items-center justify-center gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-4 h-4 fill-white text-white" />
              </div>
              Discover GBD
            </motion.a>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <span className="text-[10px] text-white/60 tracking-[0.3em] uppercase font-medium">Scroll</span>
        <div className="w-[1px] h-12 bg-white/20 overflow-hidden relative rounded-full">
          <motion.div 
            animate={{ y: [0, 48] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="w-full h-1/2 bg-accent absolute top-0"
          />
        </div>
      </motion.div>
    </section>
  );
}
