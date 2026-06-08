import { CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export default function AboutUs() {
  const values = [
    "Uncompromising Quality Craftsmanship",
    "Trusted Residential Developer",
    "Turnkey Home Ownership Solutions",
    "Strong Community Presence"
  ];

  return (
    <section id="about" className="py-24 bg-[#fafafa] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Grid */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative grid grid-cols-2 gap-4"
          >
            <motion.img 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
              src="https://lh3.googleusercontent.com/d/1onccSi9-MNQhLPd-OLoRxIg0vnNTTV4B" 
              alt="Construction site" 
              className="mt-8 rounded-2xl w-full h-[300px] object-cover shadow-lg transform-gpu"
            />
            <motion.img 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
              src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&q=80&w=600" 
              alt="Modern home interior" 
              className="rounded-2xl w-full h-[400px] object-cover shadow-lg transform-gpu"
            />
            
            {/* Experience Badge */}
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 20 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-2xl shadow-2xl text-center border-b-4 border-accent"
            >
              <span className="block text-4xl md:text-5xl font-display font-medium text-primary mb-1">20+</span>
              <span className="text-sm font-semibold tracking-wider text-gray-500 uppercase block">Years of<br/>Trust</span>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="text-accent font-semibold tracking-wider uppercase text-sm block mb-4">Our Story</span>
            <h2 className="text-4xl md:text-5xl font-display font-medium text-primary mb-6">
              A Reliable Partner for Your Family's Future.
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6 font-light">
              At <strong className="text-primary font-medium">GBD Construction</strong>, we don't just build houses; we craft homes where memories are made. Serving the North Shore (Rive-Nord) of Montreal, we are a dedicated team of professionals passionate about residential construction and real estate development.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-8 font-light">
              We specialize in new home construction and new condo developments, providing turnkey solutions that make the purchasing or building process seamless and stress-free for families.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {values.map((value, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + idx * 0.1, duration: 0.5 }}
                  className="flex items-start gap-3 group"
                >
                  <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="text-primary font-medium">{value}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Link 
                to="/about"
                className="inline-flex px-8 py-4 bg-primary text-white font-medium rounded-full shadow-lg hover:shadow-xl hover:bg-primary/90 transition-all items-center gap-2"
              >
                Learn More About Us
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
