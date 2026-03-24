import { motion, useScroll, useTransform } from 'motion/react';
import TiltCard from '../components/TiltCard';

export default function About() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <div className="bg-brand-cream min-h-screen">
      {/* Hero Section */}
      <div className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1920&auto=format&fit=crop"
            alt="About Us Background"
            className="w-full h-[120%] object-cover -mt-[10%]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-brand-dark/70"></div>
        </motion.div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-serif text-white mb-4">About Us</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">Our story and commitment to quality.</p>
        </div>
      </div>

      <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-serif text-brand-dark mb-6 leading-tight">
              A Culinary Landmark Near Tulja Bhavani Temple
            </h2>
            <div className="space-y-6 text-lg text-brand-dark/70 font-light leading-relaxed">
              <p>
                Hotel Ashoka Family Restaurant is a pure vegetarian restaurant located near the revered Tulja Bhavani Temple in Tuljapur. 
              </p>
              <p>
                Known for its hygienic kitchen, authentic Maharashtrian flavors, and family-friendly environment, the restaurant has become a favorite among locals and travelers alike.
              </p>
              <p>
                Our commitment is simple: to provide flavorful, high-quality meals. Whether you're visiting for a quick bite after darshan or a relaxed family dinner, our cooperative staff is here to ensure a memorable dining experience.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-4"
          >
            <motion.div style={{ y: useTransform(scrollY, [0, 2000], [0, -80]) }} className="space-y-4 pt-12">
              <TiltCard>
                <div className="rounded-2xl shadow-lg overflow-hidden group h-64">
                  <img
                    src="https://69a5d041581800b707fb219f.imgix.net/hotel.jpeg"
                    alt="Restaurant Interior"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </TiltCard>
              <TiltCard>
                <div className="rounded-2xl shadow-lg overflow-hidden group h-48">
                  <img
                    src="https://69a5d041581800b707fb219f.imgix.net/WhatsApp%20Image%202026-03-17%20at%207.59.14%20PM.jpeg"
                    alt="Indian Spices"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </TiltCard>
            </motion.div>
            <motion.div style={{ y: useTransform(scrollY, [0, 2000], [0, 80]) }} className="space-y-4">
              <TiltCard>
                <div className="rounded-2xl shadow-lg overflow-hidden group h-56">
                  <img
                    src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=800&auto=format&fit=crop"
                    alt="Indian Thali"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </TiltCard>
              <TiltCard>
                <div className="bg-brand-olive p-8 rounded-2xl shadow-lg text-white flex flex-col justify-center h-56 transition-transform duration-500 hover:scale-[1.02]">
                  <p className="font-serif text-xl italic mb-4">"Serving tradition with every meal."</p>
                </div>
              </TiltCard>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
