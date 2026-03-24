import { Instagram, Facebook, MapPin, Phone, Clock, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export default function Footer() {
  return (
    <footer id="contact" className="bg-brand-dark text-white pt-24 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          className="grid lg:grid-cols-4 gap-12 mb-16"
        >
          
          {/* Brand Info */}
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="lg:col-span-1">
            <h2 className="font-serif text-3xl font-bold text-brand-orange mb-6">Hotel Ashoka</h2>
            <p className="text-white/70 leading-relaxed mb-8 font-light">
              A family-oriented pure vegetarian restaurant near Tulja Bhavani Temple, offering flavorful, hygienic meals.
            </p>
            <div className="flex gap-4">
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="https://www.instagram.com/hotel_ashoka_tuljapur"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-orange transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="https://www.facebook.com/p/HOTEL-AshokA-Family-Restaurant-100063635904665"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-orange transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </motion.a>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-6 text-brand-yellow">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-white/70">
                <a href="https://maps.google.com/?q=Hotel+Ashoka+Family+Restaurant+Tuljapur" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 hover:text-brand-orange transition-colors group">
                  <MapPin className="w-5 h-5 text-brand-orange shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                  <span>Osmanabad Rd, near old bus stand, Tuljapur, Maharashtra 413601, India</span>
                </a>
              </li>
              <li className="flex items-center gap-3 text-white/70">
                <Phone className="w-5 h-5 text-brand-orange shrink-0" />
                <a href="tel:+919922772200" className="hover:text-brand-orange transition-colors">+91 99227 72200</a>
              </li>
              <li className="flex items-center gap-3 text-white/70">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" className="w-5 h-5 text-[#25D366] shrink-0">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <a href="https://wa.me/919922772200?text=Hello!%20I%20would%20like%20to%20know%20more%20about%20Hotel%20Ashoka." target="_blank" rel="noopener noreferrer" className="hover:text-[#25D366] transition-colors">WhatsApp Us</a>
              </li>
              <li className="flex items-center gap-3 text-white/70">
                <Mail className="w-5 h-5 text-brand-orange shrink-0" />
                <Link to="/faq" className="hover:text-brand-orange transition-colors">FAQ & Chat</Link>
              </li>
            </ul>
          </motion.div>

          {/* Hours */}
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-6 text-brand-yellow">Opening Hours</h3>
            <ul className="space-y-4 text-white/70">
              <li className="flex justify-between border-b border-white/10 pb-2">
                <span>Monday - Sunday</span>
                <span className="font-medium text-white">11:00 AM - 11:30 PM</span>
              </li>
              <li className="pt-2 text-sm italic text-brand-orange">
                * Open daily for your convenience, including late dinners.
              </li>
            </ul>
          </motion.div>

          {/* Map / Location */}
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="lg:col-span-1 h-48 lg:h-auto rounded-2xl overflow-hidden bg-white/5 relative border border-white/10 group">
            {/* Placeholder for actual Google Map iframe */}
            <a 
              href="https://maps.google.com/?q=Hotel+Ashoka+Family+Restaurant+Tuljapur" 
              target="_blank" 
              rel="noopener noreferrer"
              className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 cursor-pointer"
            >
              <MapPin className="w-8 h-8 text-brand-orange mb-3 opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
              <p className="text-sm text-white/50 font-medium group-hover:text-white/80 transition-colors">Map View</p>
              <span className="mt-4 px-4 py-2 bg-brand-orange/20 text-brand-orange text-xs font-semibold rounded-full group-hover:bg-brand-orange group-hover:text-white transition-colors">
                Get Directions
              </span>
            </a>
          </motion.div>

        </motion.div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/50">
          <p>&copy; {new Date().getFullYear()} Hotel Ashoka Family Restaurant. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/reservation" className="hover:text-brand-orange transition-colors font-medium text-white/80">Book a Table</Link>
            <Link to="/faq" className="hover:text-white transition-colors">FAQ & Chat</Link>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
