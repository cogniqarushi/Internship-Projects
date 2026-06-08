import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const defaultTestimonials = [
  {
    id: 1,
    name: "Sarah Tremblay",
    role: "Homeowner, Le Boisé",
    content: "GBD Construction exceeded our expectations. The attention to detail in our new home is phenomenal, and the process was smooth from start to finish.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=sarah"
  },
  {
    id: 2,
    name: "Marc-Antoine Leblanc",
    role: "Condo Resident",
    content: "We bought a condo in L'Aura, and it's perfect. The modern finishings and the after-sales service really highlight their commitment to quality.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=marc"
  },
  {
    id: 3,
    name: "Émilie Gagnon",
    role: "Real Estate Investor",
    content: "I have worked with many developers on the North Shore, and GBD is by far the most reliable. Their turnkey solutions are great for investors.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=emilie"
  }
];

export default function Testimonials() {
  const [testimonials] = useState(defaultTestimonials);
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 bg-[#fafafa] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <span className="text-accent font-semibold text-sm tracking-widest uppercase mb-4 block">Testimonials</span>
            <h2 className="text-4xl md:text-5xl font-display font-medium text-primary mb-4">What Our Clients Say</h2>
            <p className="text-gray-600 max-w-lg text-lg">
              Don't just take our word for it. Read the experiences of homeowners and investors who chose GBD Construction.
            </p>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative flex items-center justify-center min-h-[500px]">
          <div className="w-full relative z-10 overflow-hidden px-4 md:px-0">
            <div className="flex justify-center flex-wrap gap-8">
              <AnimatePresence mode="popLayout">
                {testimonials.slice(activeIndex, activeIndex + 1).map((testimonial) => (
                  <motion.div
                    key={testimonial.id}
                    initial={{ opacity: 0, rotateY: -90, scale: 0.8 }}
                    animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                    exit={{ opacity: 0, rotateY: 90, scale: 0.8 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20, duration: 0.6 }}
                    className="bg-white rounded-[3rem] p-10 md:p-16 shadow-2xl shadow-primary/5 border border-gray-100 max-w-4xl w-full relative group transform-gpu"
                    style={{ perspective: 1000 }}
                  >
                    <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none transition-transform duration-1000 group-hover:scale-110" />
                    <Quote className="absolute top-12 left-12 text-primary/[0.04] w-32 h-32 rotate-180 pointer-events-none transition-transform duration-700 group-hover:rotate-0" />
                    
                    <div className="relative z-10 text-center flex flex-col items-center">
                      <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="flex justify-center gap-1.5 mb-8"
                      >
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-6 h-6 fill-accent text-accent animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />
                        ))}
                      </motion.div>
                      
                      <motion.p 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-2xl md:text-4xl font-display text-primary leading-tight mb-10 italic"
                      >
                        "{testimonial.content}"
                      </motion.p>
                      
                      <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-col items-center"
                      >
                        {testimonial.avatar ? (
                          <img 
                            src={testimonial.avatar} 
                            alt={testimonial.name} 
                            className="w-24 h-24 rounded-full object-cover mb-4 shadow-xl border-4 border-white transform transition-transform duration-500 group-hover:scale-110" 
                          />
                        ) : (
                          <div className="w-24 h-24 rounded-full bg-primary text-white flex items-center justify-center text-4xl font-display font-medium mb-4 shadow-xl border-4 border-white transform transition-transform duration-500 group-hover:scale-110">
                            {testimonial.name.charAt(0)}
                          </div>
                        )}
                        <h4 className="font-semibold text-xl text-primary mb-1">{testimonial.name}</h4>
                        <span className="text-accent uppercase tracking-widest text-xs font-bold">{testimonial.role}</span>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-2 md:px-8 pointer-events-none z-20">
            <button 
              onClick={prevTestimonial}
              className="pointer-events-auto w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-xl border border-gray-100 text-gray-400 hover:text-primary hover:scale-110 hover:border-primary/20 transition-all hover:-translate-x-2"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={nextTestimonial}
              className="pointer-events-auto w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-xl border border-gray-100 text-gray-400 hover:text-primary hover:scale-110 hover:border-primary/20 transition-all hover:translate-x-2"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
          
          {/* Indicators */}
          <div className="absolute -bottom-8 left-0 right-0 flex justify-center gap-3 z-20">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-2.5 rounded-full transition-all duration-500 ${
                  activeIndex === idx ? 'bg-primary w-12 shadow-md shadow-primary/20' : 'bg-gray-300 hover:bg-gray-400 w-2.5 hover:scale-125'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
