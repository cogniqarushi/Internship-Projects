import { motion } from 'motion/react';
import { MapPin, Clock } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=2000&auto=format&fit=crop"
          alt="Indian Thali"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/90 via-brand-dark/70 to-brand-dark/30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-brand-orange/20 text-brand-yellow text-sm font-medium mb-6 border border-brand-orange/30 backdrop-blur-sm">
              Pure Vegetarian Family Dining
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-serif text-white leading-tight mb-6"
          >
            A Taste of Tradition in <span className="text-brand-orange">Tuljapur</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-white/80 mb-8 max-w-xl font-light leading-relaxed"
          >
            Experience serene, hygienic, and flavorful vegetarian cuisine near the Tulja Bhavani Temple. Perfect for families, locals, and travelers.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#menu"
              className="bg-brand-orange text-white px-8 py-3.5 rounded-full text-base font-medium hover:bg-brand-orange/90 transition-all hover:shadow-lg hover:-translate-y-0.5"
            >
              Explore Menu
            </a>
            <a
              href="#contact"
              className="bg-white/10 text-white backdrop-blur-md border border-white/20 px-8 py-3.5 rounded-full text-base font-medium hover:bg-white/20 transition-all"
            >
              Find Us
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 flex flex-col sm:flex-row gap-6 text-white/70 text-sm"
          >
            <div className="flex items-center gap-2">
              <MapPin size={18} className="text-brand-orange" />
              <span>Near Old Bus Stand, Osmanabad Rd</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={18} className="text-brand-orange" />
              <span>Open Daily till 11:30 PM</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
