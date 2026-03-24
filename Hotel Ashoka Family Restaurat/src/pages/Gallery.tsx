import { motion, useScroll, useTransform } from 'motion/react';
import TiltCard from '../components/TiltCard';

export default function Gallery() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  const images = [
    {
      src: "https://69a5d041581800b707fb219f.imgix.net/WhatsApp%20Image%202026-03-18%20at%203.14.51%20PM.jpeg",
      alt: "Authentic Maharashtra Thali"
    },
    {
      src: "https://69a5d041581800b707fb219f.imgix.net/hotel.jpeg",
      alt: "Delicious Indian Curry"
    },
    {
      src: "https://69a5d041581800b707fb219f.imgix.net/WhatsApp%20Image%202026-03-18%20at%203.14.51%20PM%20(1).jpeg",
      alt: "Traditional Spices and Dishes"
    },
    {
      src: "https://69a5d041581800b707fb219f.imgix.net/WhatsApp%20Image%202026-03-18%20at%203.14.52%20PM.jpeg",
      alt: "Restaurant Interior"
    },
    {
      src: "https://69a5d041581800b707fb219f.imgix.net/WhatsApp%20Image%202026-03-18%20at%203.14.52%20PM%20(1).jpeg",
      alt: "Freshly Baked Tandoori Roti"
    },
    {
      src: "https://69a5d041581800b707fb219f.imgix.net/WhatsApp%20Image%202026-03-18%20at%203.15.13%20PM.jpeg",
      alt: "Elegant Dining Experience"
    }
  ];

  return (
    <div className="bg-brand-cream min-h-screen">
      {/* Header */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2000&auto=format&fit=crop"
            alt="Gallery Header"
            className="w-full h-[120%] object-cover -mt-[10%]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-brand-dark/70"></div>
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
                  className="group relative rounded-2xl overflow-hidden shadow-lg w-full h-full bg-brand-light-olive"
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
