import { MapPin, Phone, Clock, Mail } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';

export default function Contact() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <div className="bg-brand-cream min-h-screen">
      {/* Hero Section */}
      <div className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1920&auto=format&fit=crop"
            alt="Contact Background"
            className="w-full h-[120%] object-cover -mt-[10%]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-brand-dark/70"></div>
        </motion.div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-serif text-white mb-4">Contact Us</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">We'd love to hear from you.</p>
        </div>
      </div>

      <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Details */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 }
              }
            }}
            className="space-y-8"
          >
            <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }} className="bg-white p-8 rounded-3xl shadow-sm border border-brand-dark/5 flex items-start gap-6 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-brand-orange/10 rounded-2xl flex items-center justify-center shrink-0">
                <MapPin className="w-7 h-7 text-brand-orange" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-brand-dark mb-2">Location</h3>
                <p className="text-brand-dark/70 leading-relaxed">
                  Osmanabad Rd, near old bus stand,<br />
                  Tuljapur, Maharashtra 413601,<br />
                  India
                </p>
              </div>
            </motion.div>

            <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }} className="bg-white p-8 rounded-3xl shadow-sm border border-brand-dark/5 flex items-start gap-6 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-brand-orange/10 rounded-2xl flex items-center justify-center shrink-0">
                <Clock className="w-7 h-7 text-brand-orange" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-brand-dark mb-2">Open Hours</h3>
                <p className="text-brand-dark/70 leading-relaxed">
                  Monday - Sunday<br />
                  11:00 AM – 11:30 PM
                </p>
              </div>
            </motion.div>

            <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }} className="bg-white p-8 rounded-3xl shadow-sm border border-brand-dark/5 flex items-start gap-6 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-brand-orange/10 rounded-2xl flex items-center justify-center shrink-0">
                <Phone className="w-7 h-7 text-brand-orange" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-brand-dark mb-2">Contact</h3>
                <p className="text-brand-dark/70 leading-relaxed">
                  +91 99227 72200
                </p>
              </div>
            </motion.div>

            <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }} className="bg-white p-8 rounded-3xl shadow-sm border border-brand-dark/5 flex items-start gap-6 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-[#25D366]/10 rounded-2xl flex items-center justify-center shrink-0">
                <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" className="w-7 h-7 text-[#25D366]">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-brand-dark mb-2">WhatsApp</h3>
                <p className="text-brand-dark/70 leading-relaxed mb-2">
                  Chat with us directly.
                </p>
                <a href="https://wa.me/919922772200?text=Hello!%20I%20would%20like%20to%20know%20more%20about%20Hotel%20Ashoka." target="_blank" rel="noopener noreferrer" className="text-[#25D366] font-medium hover:underline">
                  Message +91 99227 72200
                </a>
              </div>
            </motion.div>
            
            <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }} className="bg-white p-8 rounded-3xl shadow-sm border border-brand-dark/5 flex items-start gap-6 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-brand-orange/10 rounded-2xl flex items-center justify-center shrink-0">
                <svg className="w-7 h-7 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-brand-dark mb-2">Parking Info</h3>
                <p className="text-brand-dark/70 leading-relaxed">
                  Dedicated parking is available near the restaurant premises. Our staff is happy to assist you during peak hours.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Map */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-brand-light-olive rounded-3xl overflow-hidden border border-brand-dark/10 min-h-[400px] flex items-center justify-center relative group"
          >
            <a 
              href="https://maps.google.com/?q=Hotel+Ashoka+Family+Restaurant+Tuljapur"
              target="_blank"
              rel="noopener noreferrer"
              className="text-center p-8 cursor-pointer block w-full h-full flex flex-col items-center justify-center"
            >
              <MapPin size={64} className="mx-auto text-brand-orange mb-6 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
              <h3 className="text-2xl font-serif text-brand-dark mb-4 group-hover:text-brand-orange transition-colors">Interactive Map</h3>
              <p className="text-brand-dark/70 mb-8">Click to open in Google Maps.</p>
              <span className="inline-flex items-center justify-center px-8 py-3 bg-brand-orange text-white rounded-full font-medium group-hover:bg-brand-orange/90 transition-colors">
                Open in Google Maps
              </span>
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
