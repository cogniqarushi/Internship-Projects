import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Link } from 'react-router-dom';
import { Leaf, ShieldCheck, Users, MapPin, Star, X, Quote } from 'lucide-react';
import TiltCard from '../components/TiltCard';

export default function Home() {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isReviewSubmitted, setIsReviewSubmitted] = useState(false);
  
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity1 = useTransform(scrollY, [0, 500], [1, 0]);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsReviewSubmitted(true);
    setTimeout(() => {
      setIsReviewModalOpen(false);
      setIsReviewSubmitted(false);
    }, 2000);
  };

  const reviews = [
    { name: "Rahul S.", rating: 5, text: "Best veg food in Tuljapur. The thali is a must-try! Cooperative staff and great ambiance." },
    { name: "Priya M.", rating: 4, text: "Very hygienic and family-friendly. The Lasuni Methi was delicious. Highly recommended for pilgrims." },
    { name: "Amit K.", rating: 5, text: "Affordable and tasty. We visited late night after temple darshan and the service was still excellent." }
  ];

  const popularDishes = [
    { name: "Maharashtra Thali", image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=800&auto=format&fit=crop" },
    { name: "Lasuni Methi", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop" },
    { name: "Manchow Soup Veg", image: "https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=800&auto=format&fit=crop" },
    { name: "Tandoori Roti", image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=800&auto=format&fit=crop" },
    { name: "Masala Papad", image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?q=80&w=800&auto=format&fit=crop" },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden group">
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y: y1, opacity: opacity1 }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-[120%] object-cover -mt-[10%] transition-transform duration-[2s] ease-out group-hover:scale-105"
          >
            <source src="https://69a5d041581800b707fb219f.imgix.net/VID_20260322_222641.mp4" type="video/mp4" />
          </video>
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl drop-shadow-2xl">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-5xl md:text-7xl font-serif text-white leading-tight mb-6 drop-shadow-lg"
            >
              Authentic Pure Vegetarian Family Dining in <span className="text-brand-orange drop-shadow-md">Tuljapur</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-lg md:text-xl text-white mb-8 max-w-xl font-medium leading-relaxed drop-shadow-md"
            >
              Experience serene, hygienic, and flavorful vegetarian cuisine near the Tulja Bhavani Temple. Perfect for families, locals, and travelers.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="flex flex-wrap gap-4"
            >
              <Link
                to="/menu"
                className="bg-brand-orange text-white px-8 py-3.5 rounded-full text-base font-medium hover:bg-brand-orange/90 transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                View Menu
              </Link>
              <Link
                to="/reservation"
                className="bg-white/10 text-white backdrop-blur-md border border-white/20 px-8 py-3.5 rounded-full text-base font-medium hover:bg-white/20 transition-all"
              >
                Book Table
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-12 right-12 z-20 hidden lg:flex items-center justify-center animate-subtle-pulse"
        >
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="w-24 h-24 border border-white/20 rounded-full flex items-center justify-center relative"
          >
            <div className="absolute w-2 h-2 bg-brand-orange rounded-full top-0 -mt-1" />
            <span className="text-white/60 text-[10px] uppercase tracking-[0.3em]" style={{ writingMode: 'vertical-rl' }}>Scroll to Explore</span>
          </motion.div>
        </motion.div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-brand-cream relative overflow-hidden">
        {/* Decorative background pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(var(--color-brand-dark) 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-sm font-bold tracking-widest text-brand-orange uppercase mb-3">Our Promise</h2>
            <h3 className="text-4xl md:text-5xl font-serif text-brand-dark mb-6">Why Choose Us</h3>
            <p className="text-lg text-brand-dark/70 font-light">
              Experience the perfect blend of tradition, taste, and hospitality. We take pride in serving you the best.
            </p>
          </div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
              hidden: {}
            }}
            className="flex flex-wrap justify-center gap-8"
          >
            {[
              { icon: Leaf, title: "Pure Vegetarian", desc: "100% authentic and pure vegetarian dishes prepared with fresh, locally-sourced ingredients." },
              { icon: ShieldCheck, title: "Hygienic Kitchen", desc: "Strict cleanliness and hygiene standards maintained for your health and absolute peace of mind." },
              { icon: Star, title: "Affordable Meals", desc: "Delicious, high-quality food that offers exceptional value for your money without compromising taste." },
              { icon: Users, title: "Family Friendly", desc: "A warm, welcoming, and comfortable ambiance perfect for dining with your loved ones." },
              { icon: MapPin, title: "Prime Location", desc: "Conveniently located near the old bus stand and just minutes away from the holy Tulja Bhavani Temple." },
            ].map((feature, idx) => (
              <motion.div 
                key={idx} 
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                }}
                className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)]"
              >
                <TiltCard className="h-full">
                  <div 
                    className="bg-white p-8 rounded-3xl shadow-sm border border-brand-dark/5 hover:shadow-xl transition-all duration-300 group flex flex-col items-start h-full relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/5 rounded-bl-[100px] -mr-8 -mt-8 transition-transform duration-500 group-hover:scale-150" />
                    <div className="w-16 h-16 rounded-2xl bg-brand-orange/10 flex items-center justify-center mb-6 text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-colors duration-300 transform group-hover:rotate-6 relative z-10">
                      <feature.icon size={32} />
                    </div>
                    <h4 className="text-xl font-semibold text-brand-dark mb-3 relative z-10">{feature.title}</h4>
                    <p className="text-brand-dark/60 leading-relaxed relative z-10">{feature.desc}</p>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Popular Dishes */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold tracking-widest text-brand-orange uppercase mb-3">Favorites</h2>
            <h3 className="text-4xl font-serif text-brand-dark">Popular Dishes</h3>
          </div>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
              hidden: {}
            }}
            className="grid grid-cols-2 md:grid-cols-5 gap-6 group/grid"
          >
            {popularDishes.map((dish, idx) => (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, scale: 0.8, y: 20 },
                  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
                }}
              >
                <Link to="/menu" className="group cursor-pointer block transition-opacity duration-300 hover:!opacity-100 group-hover/grid:opacity-40">
                  <div className="relative h-48 rounded-2xl overflow-hidden mb-4 shadow-md">
                    <img src={dish.image} alt={dish.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <h4 className="font-medium text-brand-dark text-center group-hover:text-brand-orange transition-colors">{dish.name}</h4>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-24 bg-brand-light-olive relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-brand-yellow/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold tracking-widest text-brand-orange uppercase mb-3">Testimonials</h2>
            <h3 className="text-4xl md:text-5xl font-serif text-brand-dark mb-6">What Our Guests Say</h3>
            
            <div className="flex flex-col items-center justify-center bg-white/60 backdrop-blur-sm inline-flex p-6 rounded-3xl border border-brand-dark/5 shadow-sm mb-8">
              <div className="flex text-brand-yellow mb-2">
                {[...Array(5)].map((_, i) => <Star key={i} size={28} className={i < 4 ? "fill-current" : "fill-current text-brand-yellow/30"} />)}
              </div>
              <p className="text-3xl font-serif font-medium text-brand-dark mb-1">4.0 <span className="text-lg text-brand-dark/50">/ 5</span></p>
              <p className="text-sm text-brand-dark/60 font-medium">Based on 1000+ Google reviews</p>
            </div>
            
            <div>
              <button
                onClick={() => setIsReviewModalOpen(true)}
                className="bg-brand-orange text-white px-8 py-3.5 rounded-full font-medium hover:bg-brand-orange/90 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                Write a Review
              </button>
            </div>
          </div>

          <div className="relative w-full overflow-hidden py-8 -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-brand-light-olive to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-brand-light-olive to-transparent z-10 pointer-events-none" />
            
            <motion.div 
              animate={{ x: [0, -1146] }} // 3 cards (350px) + 3 gaps (32px) = 1146px
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="flex gap-8 w-max"
            >
              {[...reviews, ...reviews, ...reviews].map((review, idx) => (
                <div 
                  key={idx} 
                  className="bg-white p-8 rounded-3xl shadow-sm border border-brand-dark/5 relative group hover:-translate-y-2 hover:shadow-xl transition-all duration-300 flex flex-col w-[350px] shrink-0"
                >
                  <Quote className="absolute top-6 right-6 w-12 h-12 text-brand-orange/10 group-hover:text-brand-orange/20 transition-colors duration-300" />
                  
                  <div className="flex text-brand-yellow mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} className={i < review.rating ? "fill-current" : "text-gray-300"} />
                    ))}
                  </div>
                  
                  <p className="text-brand-dark/80 italic mb-8 leading-relaxed text-lg relative z-10 flex-grow">"{review.text}"</p>
                  
                  <div className="flex items-center gap-4 border-t border-brand-dark/5 pt-6 mt-auto">
                    <div className="w-12 h-12 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange font-bold text-xl shrink-0">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-brand-dark">{review.name}</p>
                      <p className="text-xs text-brand-dark/50 font-medium uppercase tracking-wider">Verified Guest</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Heritage Section */}
      <section className="py-24 bg-brand-cream relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="text-sm font-bold tracking-widest text-brand-orange uppercase mb-3">Our Heritage</h2>
              <h3 className="text-4xl md:text-5xl font-serif text-brand-dark mb-6">A Legacy of Taste & Tradition</h3>
              <p className="text-lg text-brand-dark/70 font-light mb-6 leading-relaxed">
                For generations, Hotel Ashoka has been a cornerstone of culinary excellence in Tuljapur. We believe that food is not just sustenance, but an experience that brings families together.
              </p>
              <p className="text-lg text-brand-dark/70 font-light mb-8 leading-relaxed">
                Our recipes have been passed down through the years, preserving the authentic flavors of Maharashtra. Every dish is prepared with love, using hand-picked spices and the freshest local ingredients to ensure every bite is memorable.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center text-brand-orange font-medium hover:text-brand-orange/80 transition-colors animate-subtle-pulse"
              >
                Discover Our Story <span className="ml-2">→</span>
              </Link>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="grid grid-cols-2 gap-6"
            >
              <motion.div style={{ y: useTransform(scrollY, [0, 3000], [0, -100]) }}>
                <TiltCard className="mt-12">
                  <div className="rounded-3xl overflow-hidden shadow-2xl h-64 border-4 border-white">
                    <img 
                      src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=800&auto=format&fit=crop" 
                      alt="Traditional Spices" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </TiltCard>
              </motion.div>
              <motion.div style={{ y: useTransform(scrollY, [0, 3000], [0, 100]) }}>
                <TiltCard>
                  <div className="rounded-3xl overflow-hidden shadow-2xl h-64 border-4 border-white">
                    <img 
                      src="https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=800&auto=format&fit=crop" 
                      alt="Dining Experience" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </TiltCard>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold tracking-widest text-brand-orange uppercase mb-3">Gallery</h2>
            <h3 className="text-4xl md:text-5xl font-serif text-brand-dark mb-6">A Glimpse of Ashoka</h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="col-span-2 row-span-2 rounded-3xl overflow-hidden relative group h-64 md:h-[500px]"
            >
              <img src="https://69a5d041581800b707fb219f.imgix.net/hotel.jpeg" alt="Restaurant Interior" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="rounded-3xl overflow-hidden relative group h-32 md:h-[238px]"
            >
              <img src="https://69a5d041581800b707fb219f.imgix.net/WhatsApp%20Image%202026-03-18%20at%203.14.51%20PM.jpeg" alt="Delicious Food" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="rounded-3xl overflow-hidden relative group h-32 md:h-[238px]"
            >
              <img src="https://69a5d041581800b707fb219f.imgix.net/WhatsApp%20Image%202026-03-18%20at%203.14.52%20PM.jpeg" alt="Indian Thali" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="rounded-3xl overflow-hidden relative group h-32 md:h-[238px]"
            >
              <img src="https://69a5d041581800b707fb219f.imgix.net/WhatsApp%20Image%202026-03-18%20at%203.14.51%20PM%20(1).jpeg" alt="Event Setup" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="rounded-3xl overflow-hidden relative group h-32 md:h-[238px]"
            >
              <img src="https://69a5d041581800b707fb219f.imgix.net/WhatsApp%20Image%202026-03-18%20at%203.15.13%20PM.jpeg" alt="Special Dish" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Review Modal */}
      <AnimatePresence>
        {isReviewModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-dark/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
            >
              <div className="p-6 border-b border-brand-dark/10 flex justify-between items-center bg-brand-cream">
                <h3 className="text-xl font-serif font-bold text-brand-dark">Write a Review</h3>
                <button onClick={() => setIsReviewModalOpen(false)} className="text-brand-dark/50 hover:text-brand-dark transition-colors">
                  <X size={24} />
                </button>
              </div>
              <div className="p-6">
                {isReviewSubmitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <ShieldCheck size={32} />
                    </div>
                    <h4 className="text-xl font-medium text-brand-dark mb-2">Thank You!</h4>
                    <p className="text-brand-dark/70">Your review has been submitted successfully.</p>
                  </div>
                ) : (
                  <form onSubmit={handleReviewSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-brand-dark mb-1">Your Name</label>
                      <input type="text" required className="w-full px-4 py-2 rounded-xl border border-brand-dark/20 focus:ring-2 focus:ring-brand-orange outline-none" placeholder="John Doe" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-brand-dark mb-1">Rating</label>
                      <select className="w-full px-4 py-2 rounded-xl border border-brand-dark/20 focus:ring-2 focus:ring-brand-orange outline-none bg-white">
                        <option value="5">5 Stars - Excellent</option>
                        <option value="4">4 Stars - Very Good</option>
                        <option value="3">3 Stars - Average</option>
                        <option value="2">2 Stars - Poor</option>
                        <option value="1">1 Star - Terrible</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-brand-dark mb-1">Your Review</label>
                      <textarea required rows={4} className="w-full px-4 py-2 rounded-xl border border-brand-dark/20 focus:ring-2 focus:ring-brand-orange outline-none resize-none" placeholder="Tell us about your experience..."></textarea>
                    </div>
                    <button type="submit" className="w-full bg-brand-orange text-white py-3 rounded-xl font-medium hover:bg-brand-orange/90 transition-colors">
                      Submit Review
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
