import { motion, useScroll, useTransform } from 'motion/react';

export default function Events() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <div className="w-full bg-brand-cream relative overflow-hidden">
      {/* Decorative Background Leaves */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <img 
          src="https://png.pngtree.com/png-clipart/20220804/ourmid/pngtree-aesthetic-paper-notes-png-image_6098989.png"
          alt=""
          className="absolute -left-20 top-[400px] w-[500px] h-[500px] opacity-15 pointer-events-none object-contain mix-blend-multiply grayscale brightness-[1.05] contrast-[1.1] -scale-x-100 rotate-12"
          referrerPolicy="no-referrer"
        />
        <img 
          src="https://png.pngtree.com/png-clipart/20220804/ourmid/pngtree-aesthetic-paper-notes-png-image_6098989.png"
          alt=""
          className="absolute -right-20 bottom-[200px] w-[500px] h-[500px] opacity-15 pointer-events-none object-contain mix-blend-multiply grayscale brightness-[1.05] contrast-[1.1] -rotate-12"
          referrerPolicy="no-referrer"
        />
      </div>
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden pt-20">
        <motion.div style={{ y }} className="absolute inset-0 h-[120%] -top-[10%] z-0">
          <img
            src="https://lh3.googleusercontent.com/d/1Hvtsko-o0HfNhzPReEteyJdTYsrWypNV"
            alt="Special Events"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-[#1a3c34]/70" />
        </motion.div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6"
          >
            Special Events
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Experience unforgettable moments at Hotel Ashoka. From cultural celebrations to private gatherings, we provide the perfect ambiance for your special occasions.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Videos Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-serif text-[#1a3c34] mb-8 border-b border-[#1a3c34]/10 pb-4">Event Highlights</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Video 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden shadow-lg bg-brand-dark/90 backdrop-blur-md border border-brand-yellow/20"
            >
              <video 
                className="w-full h-64 object-cover" 
                controls 
                playsInline
                preload="metadata"
              >
                <source src="https://69e79eec19995cfcc32b54d2.imgix.net/WhatsApp%20Video%202026-03-20%20at%203.00.07%20PM.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </motion.div>
            
            {/* Video 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl overflow-hidden shadow-lg bg-brand-dark/90 backdrop-blur-md border border-brand-yellow/20"
            >
              <video 
                className="w-full h-64 object-cover" 
                controls 
                playsInline
                preload="metadata"
              >
                <source src="https://69e79eec19995cfcc32b54d2.imgix.net/WhatsApp%20Video%202026-03-20%20at%202.59.42%20PM.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </motion.div>
            
            {/* Video 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl overflow-hidden shadow-lg bg-brand-dark/90 backdrop-blur-md border border-brand-yellow/20"
            >
              <video 
                className="w-full h-64 object-cover" 
                controls 
                playsInline
                preload="metadata"
              >
                <source src="https://69e79eec19995cfcc32b54d2.imgix.net/WhatsApp%20Video%202026-03-20%20at%202.59.39%20PM.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
