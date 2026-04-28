import { motion, useScroll, useTransform } from 'motion/react';
import TiltCard from '../components/TiltCard';

export default function Gallery() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  const images = [
    {
      src: "https://lh3.googleusercontent.com/d/1FIfNv9uXrY2ey1a39NOCeKeLOvMG2_MF",
      alt: "Authentic Maharashtra Thali"
    },
    {
      src: "https://lh3.googleusercontent.com/d/1eAtxzu8n_lsok6ViCzbMaCOwGnmTO9wF",
      alt: "Delicious Indian Curry"
    },
    {
      src: "https://lh3.googleusercontent.com/d/1wre0p_ofW4EFEUdEiTQSue4yC6rWEUjo",
      alt: "Traditional Spices and Dishes"
    },
    {
      src: "https://lh3.googleusercontent.com/d/15QyDukYxuL4pUWW9vt8-JUiRbMuKKkHG",
      alt: "Restaurant Interior"
    },
    {
      src: "https://lh3.googleusercontent.com/d/1VZMm1Q7gTImpB1t7DYHFKGvMOoD-sHph",
      alt: "Freshly Baked Tandoori Roti"
    },
    {
      src: "https://lh3.googleusercontent.com/d/11yQDN2CuxSVH7iSgdsQpv2gkleWHXNst",
      alt: "Elegant Dining Experience"
    }
  ];

  return (
    <div className="min-h-screen bg-brand-cream relative overflow-hidden">
      {/* Decorative Background Leaves */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <img 
          src="https://png.pngtree.com/png-clipart/20220804/ourmid/pngtree-aesthetic-paper-notes-png-image_6098989.png"
          alt=""
          className="absolute -left-20 top-[400px] w-[500px] h-[500px] opacity-20 pointer-events-none object-contain mix-blend-multiply grayscale brightness-[1.05] contrast-[1.1] -scale-x-100 rotate-12"
          referrerPolicy="no-referrer"
        />
        <img 
          src="https://png.pngtree.com/png-clipart/20220804/ourmid/pngtree-aesthetic-paper-notes-png-image_6098989.png"
          alt=""
          className="absolute -right-20 bottom-[200px] w-[500px] h-[500px] opacity-20 pointer-events-none object-contain mix-blend-multiply grayscale brightness-[1.05] contrast-[1.1] -rotate-12"
          referrerPolicy="no-referrer"
        />
      </div>
      {/* Header */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden pt-20">
        <motion.div style={{ y }} className="absolute inset-0 h-[120%] -top-[10%] z-0">
          <img
            src="https://lh3.googleusercontent.com/d/1eAtxzu8n_lsok6ViCzbMaCOwGnmTO9wF"
            alt="Gallery Header"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-brand-dark/40"></div>
        </motion.div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif font-bold text-white mb-4"
          >
            Our Gallery
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-white/80 max-w-2xl mx-auto font-light"
          >
            A glimpse into the Hotel Ashoka experience.
          </motion.p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {images.map((img, index) => (
              <TiltCard key={index} className="aspect-square">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative rounded-2xl overflow-hidden shadow-lg w-full h-full border border-brand-dark/10"
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
