import React, { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "motion/react";
import { Link } from "react-router-dom";
import TiltCard from "../components/TiltCard";
import Magnetic from "../components/Magnetic";
import TextReveal from "../components/TextReveal";
import SectionDivider from "../components/SectionDivider";
import {
  Utensils,
  Leaf,
  Flame,
  ChefHat,
  ShieldCheck,
  Users,
  MapPin,
  Star,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  Phone,
  Map,
  Clock,
  X,
} from "lucide-react";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    guests: "2 People",
  });
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [reviewSuccess, setReviewSuccess] = useState(false);

  // 3D Mouse tracking for Hero text
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const smoothMouseY = useSpring(mouseY, { damping: 50, stiffness: 400 });
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const xPct = e.clientX / window.innerWidth - 0.5;
    const yPct = e.clientY / window.innerHeight - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };
  const [showReservationSuccess, setShowReservationSuccess] = useState(false);

  const handleReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowReservationSuccess(true);
    setTimeout(() => {
      setShowReservationSuccess(false);
      setFormData({ name: "", phone: "", guests: "2 People" });
    }, 3000);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReviewSuccess(true);
    setTimeout(() => {
      setShowReviewModal(false);
      setReviewSuccess(false);
      setReviewText("");
    }, 2000);
  };

  return (
    <div className="w-full font-sans bg-brand-cream overflow-x-hidden relative">
      {/* Decorative Background Leaves */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <img 
          src="https://png.pngtree.com/png-clipart/20220804/ourmid/pngtree-aesthetic-paper-notes-png-image_6098989.png"
          alt=""
          className="absolute -left-20 top-[800px] w-[600px] h-[600px] opacity-15 pointer-events-none object-contain mix-blend-multiply grayscale -scale-x-100 rotate-12"
          referrerPolicy="no-referrer"
        />
        <img 
          src="https://png.pngtree.com/png-clipart/20220804/ourmid/pngtree-aesthetic-paper-notes-png-image_6098989.png"
          alt=""
          className="absolute -right-20 top-[1500px] w-[600px] h-[600px] opacity-15 pointer-events-none object-contain mix-blend-multiply grayscale -rotate-12"
          referrerPolicy="no-referrer"
        />
        <img 
          src="https://png.pngtree.com/png-clipart/20220804/ourmid/pngtree-aesthetic-paper-notes-png-image_6098989.png"
          alt=""
          className="absolute -left-20 bottom-[1000px] w-[600px] h-[600px] opacity-15 pointer-events-none object-contain mix-blend-multiply grayscale -scale-x-100 rotate-45"
          referrerPolicy="no-referrer"
        />
      </div>
      {/* Hero Section */}
      <section 
        className="relative min-h-[90vh] flex items-center bg-brand-dark"
      >
        {/* Background Elements Wrapper to contain background leaves while allowing hero content to overflow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Subtle Texture Overlay */}
          <div className="absolute inset-0 opacity-[0.06] bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-left"
            >
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="block text-2xl md:text-3xl font-serif italic text-white mb-2"
              >
                Experience
              </motion.span>
              <h1 className="text-4xl md:text-7xl font-serif font-extrabold text-[#c9a34e] leading-[1.1] mb-6 drop-shadow-sm glowing-text">
                Pure Vegetarian <br />
                Luxury
              </h1>
              <div className="h-[2px] w-32 bg-gradient-to-r from-[#c9a34e] to-transparent mb-8"></div>
              <p className="text-xl md:text-2xl font-serif italic text-white mb-10 max-w-lg leading-relaxed">
                Delight in Exquisite Flavors & <br className="hidden md:block" /> Healthy Delicacies
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/menu"
                  className="inline-block bg-gradient-to-b from-[#d4af37] via-[#c9a34e] to-[#b8860b] text-[#1f3d2b] px-12 py-4 rounded-full text-lg font-bold tracking-widest shadow-[0_10px_20px_rgba(201,163,78,0.3)] hover:shadow-[0_15px_30px_rgba(201,163,78,0.5)] transition-all duration-300 border border-[#f8f6f1]/20"
                >
                  View Menu
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Food Composition */}
            <div className="relative lg:h-[600px] flex items-center justify-center">
              <div className="relative w-full h-full flex items-center justify-center">
                
                {/* Main Platter (Biryani) */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="relative z-20 w-[70%] md:w-[55%] lg:w-[65%] drop-shadow-[0_40px_80px_rgba(0,0,0,0.8)]"
                >
                  <img
                    src="https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=1200&auto=format&fit=crop"
                    alt="Vegetarian Biryani"
                    className="w-full h-auto rounded-full border-[12px] border-[#1f3d2b]/10"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>

                {/* Floating Paneer Curry (Top Right) */}
                <motion.div
                  initial={{ opacity: 0, x: 120, y: -60 }}
                  animate={{ 
                    opacity: 1, 
                    x: 0, 
                    y: [0, -20, 0] 
                  }}
                  transition={{ 
                    duration: 1.5, 
                    ease: "easeOut",
                    y: { duration: 5, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="absolute top-2 md:top-6 lg:top-10 right-2 md:right-16 lg:right-20 z-30 w-[35%] md:w-[32%] drop-shadow-[0_25px_50px_rgba(0,0,0,0.7)]"
                >
                  <img
                    src="https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=600&auto=format&fit=crop"
                    alt="Paneer Curry"
                    className="w-full h-auto rounded-full border-4 border-[#1f3d2b]/20"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>

                {/* Floating Dum Aloo (Bottom Right) */}
                <motion.div
                  initial={{ opacity: 0, x: 120, y: 60 }}
                  animate={{ 
                    opacity: 1, 
                    x: 0, 
                    y: [0, 20, 0] 
                  }}
                  transition={{ 
                    duration: 1.5, 
                    delay: 0.2,
                    ease: "easeOut",
                    y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
                  }}
                  className="absolute bottom-0 md:-bottom-2 right-0 md:right-8 z-30 w-[28%] md:w-[24%] drop-shadow-[0_25px_50px_rgba(0,0,0,0.7)]"
                >
                  <img
                    src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=600&auto=format&fit=crop"
                    alt="Dum Aloo"
                    className="w-full h-auto rounded-full border-4 border-[#1f3d2b]/20"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>

                {/* Floating Chutney (Bottom Left) */}
                <motion.div
                  initial={{ opacity: 0, x: -120, y: 60 }}
                  animate={{ 
                    opacity: 1, 
                    x: 0, 
                    y: [0, -15, 0] 
                  }}
                  transition={{ 
                    duration: 1.5, 
                    delay: 0.4,
                    ease: "easeOut",
                    y: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }
                  }}
                  className="absolute bottom-10 -left-10 md:left-0 z-30 w-[26%] md:w-[22%] drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
                >
                  <img
                    src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=400&auto=format&fit=crop"
                    alt="Green Chutney"
                    className="w-full h-auto rounded-full border-2 border-[#1f3d2b]/30"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>

                {/* Small Spice Bowl (Floating) */}
                <motion.div
                  animate={{ 
                    y: [0, 10, 0],
                    rotate: [0, 5, 0]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-20 left-0 md:left-4 lg:left-8 z-30 w-[20%] drop-shadow-lg"
                >
                  <img
                    src="https://images.unsplash.com/photo-1506368249639-73a05d6f6488?q=80&w=400&auto=format&fit=crop"
                    alt="Spices"
                    className="w-full h-auto rounded-full border-2 border-[#c9a34e]/30"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>

                {/* Floating Leaves */}
                <motion.div 
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 pointer-events-none z-40"
                >
                </motion.div>

              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Left Rectangular Image */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute -bottom-6 -left-4 md:-bottom-10 md:-left-6 z-30 block"
        >
          <div className="relative group">
            <img 
              src="https://lh3.googleusercontent.com/d/1K5Qc-VRrLWDkc_dylozEc3GVur9fHVdy"
              alt="Fresh Ingredients"
              className="w-40 md:w-64 xl:w-72 h-auto object-contain mix-blend-multiply opacity-90 group-hover:opacity-100 transition-all duration-700 origin-bottom-left"
              referrerPolicy="no-referrer"
            />
          </div>
        </motion.div>

        {/* Bottom Gold Border */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#c9a34e]" />
      </section>

      {/* Features Section (Outside Hero) */}
      <section className="relative z-20 mt-8 mb-16">
        {/* Background Leaves Container Removed */}

        {/* Overlapping Decorative Leaves Removed */}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Darker, more prominent divider like in the image */}
          <div className="flex justify-center mb-12">
            <div className="flex items-center gap-4 w-full max-w-4xl">
              <div className="h-[2px] flex-1 bg-[#bd9b5f]" />
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rotate-45 bg-[#bd9b5f]" />
                <div className="w-3 h-3 rotate-45 border-2 border-[#bd9b5f] flex items-center justify-center">
                   <div className="w-1 h-1 bg-[#bd9b5f]" />
                </div>
                <div className="w-2 h-2 rotate-45 bg-[#bd9b5f]" />
              </div>
              <div className="h-[2px] flex-1 bg-[#bd9b5f]" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Leaf,
                title: "Farm Fresh Ingredients",
                desc: "Sourced from Nature",
              },
              {
                icon: Utensils,
                title: "Delicious Cuisine",
                desc: "Authentic Veg Delights",
              },
              {
                icon: Flame,
                title: "Elegant Ambiance",
                desc: "Relax in Luxury",
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6, ease: "easeOut" }}
                className="bg-brand-cream border border-[#c9a34e]/40 rounded-xl p-10 shadow-xl text-center flex flex-col items-center hover:shadow-2xl transition-all duration-300 group relative overflow-hidden"
              >
                {/* Inner border effect like in the image */}
                <div className="absolute inset-2 border border-[#c9a34e]/10 rounded-lg pointer-events-none"></div>
                
                {/* Side Leaf Watermarks for Cards */}
                <img 
                  src="https://png.pngtree.com/png-clipart/20220804/ourmid/pngtree-aesthetic-paper-notes-png-image_6098989.png"
                  alt=""
                  className="absolute -left-16 top-1/2 -translate-y-1/2 w-40 h-40 opacity-10 pointer-events-none object-contain mix-blend-multiply grayscale -scale-x-100 rotate-12 group-hover:opacity-20 transition-opacity duration-500"
                  referrerPolicy="no-referrer"
                />
                <img 
                  src="https://png.pngtree.com/png-clipart/20220804/ourmid/pngtree-aesthetic-paper-notes-png-image_6098989.png"
                  alt=""
                  className="absolute -right-16 top-1/2 -translate-y-1/2 w-40 h-40 opacity-10 pointer-events-none object-contain mix-blend-multiply grayscale -rotate-12 group-hover:opacity-20 transition-opacity duration-500"
                  referrerPolicy="no-referrer"
                />
                
                <feature.icon className="w-14 h-14 text-brand-dark mb-6 group-hover:scale-110 group-hover:text-brand-yellow transition-transform" />
                
                <h3 className="text-2xl font-serif font-bold text-brand-dark mb-4">
                  {feature.title}
                </h3>
                
                {/* Thin divider line like in the image */}
                <div className="w-24 h-[2px] bg-[#bd9b5f] mb-4" />
                
                <p className="text-base text-brand-dark font-serif italic">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Our Legacy Section */}
      <section className="py-24 relative bg-brand-cream">
        {/* Subtle Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-[2px] w-12 bg-brand-dark"></div>
                <div className="flex items-center gap-3">
                  <Leaf size={18} className="text-[#869d8d] fill-[#869d8d] -rotate-12" />
                  <h2 className="text-sm font-bold tracking-[0.3em] text-brand-dark uppercase">
                    About Us
                  </h2>
                  <Leaf size={18} className="text-[#869d8d] fill-[#869d8d] rotate-12 scale-x-[-1]" />
                </div>
              </div>
              
              <TextReveal 
                text="Welcome to Hotel Ashoka" 
                className="text-4xl md:text-6xl font-serif font-extrabold text-[#1a3324] mb-6 leading-tight" 
              />
              
              <p className="text-2xl font-serif italic text-brand-dark mb-8">Savor the Essence of Vegetarian Perfection</p>
              
              <div className="space-y-6 text-brand-dark text-lg leading-relaxed font-sans mb-10">
                <p>
                  Hotel Ashoka is more than just a restaurant; it's a culinary
                  landmark in Tuljapur. Located strategically near the old bus
                  stand and minutes away from the Tulja Bhavani Temple, we provide
                  a serene dining environment for families and pilgrims.
                </p>
                <p>
                  Our commitment to purity and taste has made us the preferred
                  choice for those seeking authentic vegetarian delicacies prepared
                  with the freshest ingredients and traditional recipes.
                </p>
              </div>
              
              <Link
                to="/about"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-[#1a3324] to-[#2a4d3a] text-brand-cream px-10 py-4 rounded-full text-base font-bold tracking-widest hover:shadow-[0_10px_30px_rgba(31,61,43,0.3)] transition-all hover:scale-105 active:scale-95 group"
              >
                Learn More
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative"
            >
              {/* Decorative Frame */}
              <div className="absolute -inset-4 border border-[#c9a34e]/20 rounded-[2.5rem] -rotate-2 pointer-events-none"></div>
              
              <TiltCard>
                <div className="rounded-[2rem] overflow-hidden shadow-2xl group border-4 border-[#c9a34e]/10 relative">
                  <img
                    src="https://lh3.googleusercontent.com/d/1VZMm1Q7gTImpB1t7DYHFKGvMOoD-sHph"
                    alt="Restaurant Interior"
                    className="w-full h-[600px] object-cover group-hover:scale-105 transition-transform duration-1000"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1f3d2b]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </TiltCard>

              {/* Small integrated image in bottom left corner - Moved outside to overlap edges */}
              <motion.div
                initial={{ opacity: 0, x: -20, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="absolute -bottom-12 -left-24 z-30 w-64 h-auto pointer-events-none"
              >
                <img 
                  src="https://lh3.googleusercontent.com/d/1naw7ay8rjsBmV2s_L6n_3c0oqSXeoCqm"
                  alt="Fresh Food"
                  className="w-full h-auto object-contain mix-blend-multiply opacity-95"
                  referrerPolicy="no-referrer"
                />
              </motion.div>

              {/* Leaf Decoration at bottom-left Removed */}
              

            </motion.div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Explore Our Menu Section */}
      <section className="py-24 relative bg-brand-cream overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-[2px] w-full max-w-[200px] bg-[#bd9b5f] hidden md:block"></div>
              <div className="flex items-center gap-4">
                <Leaf className="w-8 h-8 md:w-12 md:h-12 text-[#869d8d] fill-[#869d8d] -rotate-12" />
                <h2 className="text-4xl md:text-6xl font-serif font-extrabold text-brand-dark">
                  Chef's Specials
                </h2>
                <Leaf className="w-8 h-8 md:w-12 md:h-12 text-[#869d8d] fill-[#869d8d] rotate-12 scale-x-[-1]" />
              </div>
              <div className="h-[2px] w-full max-w-[200px] bg-[#bd9b5f] hidden md:block"></div>
            </div>
            <div className="flex items-center justify-center gap-4">
              <div className="h-[2px] w-12 bg-[#bd9b5f]"></div>
              <p className="text-xl font-serif italic text-brand-dark/70">Today's Exclusive Dishes</p>
              <div className="h-[2px] w-12 bg-[#bd9b5f]"></div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="bg-brand-cream border border-[#c9a34e]/30 rounded-[2.5rem] overflow-hidden shadow-xl flex flex-col group h-full hover:shadow-2xl transition-all duration-500"
            >
              <div className="p-6 pb-0">
                <div className="overflow-hidden rounded-[2rem] h-80 relative">
                  <img
                    src="https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?q=80&w=600&auto=format&fit=crop"
                    alt="Maharashtra Veg Thali"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500"></div>
                </div>
              </div>
              <div className="p-10 flex-1 flex flex-col items-center text-center">
                <h4 className="text-3xl font-serif font-bold text-brand-dark mb-6">
                  Maharashtra Veg Thali
                </h4>
                <div className="w-3/4 h-[2px] bg-[#bd9b5f] mb-8"></div>
                <Link
                  to="/menu"
                  className="bg-brand-dark text-brand-cream px-14 py-4 rounded-full text-sm font-bold tracking-widest hover:bg-brand-yellow hover:text-brand-dark transition-all duration-300 shadow-lg hover:shadow-brand-yellow/30 active:scale-95"
                >
                  View Dish
                </Link>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="bg-brand-cream border border-[#c9a34e]/30 rounded-[2.5rem] overflow-hidden shadow-xl flex flex-col group h-full hover:shadow-2xl transition-all duration-500"
            >
              <div className="p-6 pb-0">
                <div className="overflow-hidden rounded-[2rem] h-80 relative">
                  <img
                    src="https://lh3.googleusercontent.com/d/1blB0ndAVxK1r3n1cZb57OW4rx4_kNcpz"
                    alt="Paneer Tikka"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500"></div>
                </div>
              </div>
              <div className="p-10 flex-1 flex flex-col items-center text-center">
                <h4 className="text-3xl font-serif font-bold text-brand-dark mb-6">
                  Paneer Tikka
                </h4>
                <div className="w-3/4 h-[2px] bg-[#bd9b5f] mb-8"></div>
                <Link
                  to="/menu"
                  className="bg-brand-dark text-brand-cream px-14 py-4 rounded-full text-sm font-bold tracking-widest hover:bg-brand-yellow hover:text-brand-dark transition-all duration-300 shadow-lg hover:shadow-brand-yellow/30 active:scale-95"
                >
                  View Dish
                </Link>
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="bg-brand-cream border border-[#c9a34e]/30 rounded-[2.5rem] overflow-hidden shadow-xl flex flex-col group h-full hover:shadow-2xl transition-all duration-500"
            >
              <div className="p-6 pb-0">
                <div className="overflow-hidden rounded-[2rem] h-80 relative">
                  <img
                    src="https://lh3.googleusercontent.com/d/1VgJ-zQTl15d39A5Iz9CZGHAQADyKGHJN"
                    alt="Masala Papad"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500"></div>
                </div>
              </div>
              <div className="p-10 flex-1 flex flex-col items-center text-center">
                <h4 className="text-3xl font-serif font-bold text-[#1a3324] mb-6">
                  Masala Papad
                </h4>
                <div className="w-3/4 h-[2px] bg-[#bd9b5f] mb-8"></div>
                <Link
                  to="/menu"
                  className="bg-[#1a3324] text-brand-cream px-14 py-4 rounded-full text-sm font-bold tracking-widest hover:bg-[#c9a34e] hover:text-[#1a3324] transition-all duration-300 shadow-lg hover:shadow-[#c9a34e]/30 active:scale-95"
                >
                  View Dish
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Gallery Section */}
      <section className="py-20 bg-brand-cream" style={{ perspective: "1500px" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-xs font-bold tracking-[0.2em] text-brand-dark/60 uppercase mb-4">
                Visual Journey
              </h2>
              <TextReveal 
                text="Glimpses of Ashoka Ambiance & Cuisine" 
                className="text-4xl md:text-5xl font-serif font-extrabold text-brand-dark" 
              />
            </div>
            <Link
              to="/gallery"
              className="hidden md:flex items-center gap-2 text-sm font-bold text-brand-dark hover:text-brand-yellow transition-colors"
            >
              View Full Gallery <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-auto md:h-[600px]" style={{ transformStyle: "preserve-3d" }}>
            <motion.div
              initial={{ opacity: 0, rotateY: -15, z: -100 }}
              whileInView={{ opacity: 1, rotateY: 0, z: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="md:col-span-5 h-[400px] md:h-full transform-gpu"
            >
              <TiltCard className="w-full h-full">
                <div className="w-full h-full rounded-3xl overflow-hidden group">
                  <img
                    src="https://lh3.googleusercontent.com/d/1wre0p_ofW4EFEUdEiTQSue4yC6rWEUjo"
                    alt="Ambiance"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </TiltCard>
            </motion.div>

            <div className="md:col-span-7 grid grid-cols-2 grid-rows-2 gap-4 h-[500px] md:h-full" style={{ transformStyle: "preserve-3d" }}>
              <motion.div
                initial={{ opacity: 0, rotateX: 15, z: -100 }}
                whileInView={{ opacity: 1, rotateX: 0, z: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
                className="h-full transform-gpu"
              >
                <TiltCard className="w-full h-full">
                  <div className="w-full h-full rounded-3xl overflow-hidden group">
                    <img
                      src="https://lh3.googleusercontent.com/d/11yQDN2CuxSVH7iSgdsQpv2gkleWHXNst"
                      alt="Soup"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </TiltCard>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, rotateY: 15, z: -100 }}
                whileInView={{ opacity: 1, rotateY: 0, z: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                className="h-full transform-gpu"
              >
                <TiltCard className="w-full h-full">
                  <div className="w-full h-full rounded-3xl overflow-hidden group">
                    <img
                      src="https://lh3.googleusercontent.com/d/1x5pDN9_9b_f4PI3iBpdLQYlEnXTcLU2L"
                      alt="Naan"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </TiltCard>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, rotateX: -15, z: -100 }}
                whileInView={{ opacity: 1, rotateX: 0, z: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                className="col-span-2 h-full transform-gpu"
              >
                <TiltCard className="w-full h-full">
                  <div className="w-full h-full rounded-3xl overflow-hidden group">
                    <img
                      src="https://lh3.googleusercontent.com/d/1blB0ndAVxK1r3n1cZb57OW4rx4_kNcpz"
                      alt="Biryani"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </TiltCard>
              </motion.div>
            </div>
          </div>

          <Link
            to="/gallery"
            className="mt-8 flex md:hidden items-center justify-center gap-2 text-sm font-bold text-brand-dark hover:text-brand-yellow transition-colors"
          >
            View Full Gallery <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-brand-dark relative overflow-hidden">
        {/* Decorative Background Elements Removed */}
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-4">
              <div className="flex items-center gap-2 text-[#c9a34e] mb-4">
                <Star className="fill-current w-8 h-8" />
                <span className="text-4xl font-bold">4.0 / 5</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-extrabold mb-6 text-brand-cream">
                Loved by Families & Pilgrims
              </h2>
              <p className="text-brand-cream/70 mb-8">
                Join thousands of satisfied guests who make Hotel Ashoka their
                regular stop in Tuljapur.
              </p>

              <div className="flex items-center gap-6 mb-8">
                <div className="flex -space-x-4">
                  <img
                    className="w-12 h-12 rounded-full border-2 border-[#1a3324]"
                    src="https://i.pravatar.cc/100?img=1"
                    alt="User"
                    referrerPolicy="no-referrer"
                  />
                  <img
                    className="w-12 h-12 rounded-full border-2 border-[#1a3324]"
                    src="https://i.pravatar.cc/100?img=2"
                    alt="User"
                    referrerPolicy="no-referrer"
                  />
                  <img
                    className="w-12 h-12 rounded-full border-2 border-[#1a3324]"
                    src="https://i.pravatar.cc/100?img=3"
                    alt="User"
                    referrerPolicy="no-referrer"
                  />
                  <div className="w-12 h-12 rounded-full border-2 border-[#c9a34e] bg-brand-cream flex items-center justify-center text-xs font-bold text-[#1a3324]">
                    +1k
                  </div>
                </div>
                <button
                  onClick={() => setShowReviewModal(true)}
                  className="bg-brand-cream/10 hover:bg-brand-cream/20 text-brand-cream px-6 py-3 rounded-full text-sm font-bold transition-colors border border-brand-cream/20"
                >
                  Add Review
                </button>
              </div>
            </div>

            <div className="lg:col-span-8 grid md:grid-cols-2 gap-6">
              <TiltCard>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-[#1f3d2b] border border-[#c9a34e]/20 p-8 rounded-3xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 h-full relative overflow-hidden group"
                >
                  <div className="flex text-[#c9a34e] mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="fill-current" />
                    ))}
                  </div>
                  <p className="text-lg font-serif italic mb-8 text-brand-cream">
                    "Best Thali in Tuljapur. The hygiene is excellent and the food
                    tastes just like home. Highly recommended for families."
                  </p>
                  <div>
                    <h4 className="font-bold text-sm text-brand-cream">Rahul Deshmukh</h4>
                    <p className="text-xs text-brand-cream/50">Verified Diner</p>
                  </div>
                </motion.div>
              </TiltCard>

              <TiltCard>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="bg-[#1f3d2b] border border-[#c9a34e]/20 p-8 rounded-3xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 h-full relative overflow-hidden group"
                >
                  <div className="flex text-[#c9a34e] mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="fill-current" />
                    ))}
                  </div>
                  <p className="text-lg font-serif italic mb-8 text-brand-cream">
                    "Stopped here after temple visit. The Puran Poli was divine.
                    The service was very quick despite being crowded."
                  </p>
                  <div>
                    <h4 className="font-bold text-sm text-brand-cream">Sunita Patil</h4>
                    <p className="text-xs text-brand-cream/50">Verified Diner</p>
                  </div>
                </motion.div>
              </TiltCard>
            </div>
          </div>
        </div>
      </section>

      {/* Reservation & Contact Section */}
      <section className="py-24" id="reservation-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Book a Table Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-brand-cream p-8 md:p-12 rounded-3xl shadow-xl border border-brand-dark/5"
            >
              <h3 className="text-3xl font-serif font-extrabold text-brand-dark mb-2">
                Book a Table
              </h3>
              <p className="text-brand-dark/60 text-sm mb-8">
                Secure your family meal time. For immediate assistance or large
                group bookings, please call us directly.
              </p>

              <form onSubmit={handleReservationSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-brand-dark mb-2 uppercase tracking-wide">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      className="w-full px-4 py-3 rounded-xl border border-brand-dark/10 focus:ring-2 focus:ring-brand-dark focus:border-transparent outline-none bg-brand-cream/50"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-brand-dark mb-2 uppercase tracking-wide">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Mobile Number"
                      className="w-full px-4 py-3 rounded-xl border border-brand-dark/10 focus:ring-2 focus:ring-brand-dark focus:border-transparent outline-none bg-brand-cream/50"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-dark mb-2 uppercase tracking-wide">
                    Number of Guests
                  </label>
                  <select
                    className="w-full px-4 py-3 rounded-xl border border-brand-dark/10 focus:ring-2 focus:ring-brand-dark focus:border-transparent outline-none bg-brand-cream/50 appearance-none"
                    value={formData.guests}
                    onChange={(e) =>
                      setFormData({ ...formData, guests: e.target.value })
                    }
                  >
                    <option>2 People</option>
                    <option>3 People</option>
                    <option>4 People</option>
                    <option>5+ People</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full gold-gradient-bg text-brand-dark py-4 rounded-xl font-bold tracking-wider hover:shadow-[0_0_15px_rgba(193,155,108,0.5)] transition-all uppercase mt-4 relative overflow-hidden"
                >
                  <span className={showReservationSuccess ? "opacity-0" : "opacity-100"}>
                    Confirm Reservation
                  </span>
                  {showReservationSuccess && (
                    <span className="absolute inset-0 flex items-center justify-center bg-green-600 text-white">
                      Reservation Confirmed!
                    </span>
                  )}
                </button>
                <p className="text-center text-[10px] text-brand-dark/40 mt-4">
                  Note: We also accept walk-ins based on availability.
                </p>
              </form>
            </motion.div>

            {/* Visit Us Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col justify-center"
            >
              <h3 className="text-3xl font-serif font-extrabold text-brand-dark mb-10">
                Visit Us
              </h3>

              <div className="space-y-8 mb-12">
                <a
                  href="https://maps.google.com/?q=Hotel+Ashoka+Family+Restaurant+Tuljapur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 group cursor-pointer"
                >
                  <div className="w-12 h-12 bg-brand-cream border border-brand-yellow/30 rounded-full flex items-center justify-center shrink-0 group-hover:bg-brand-yellow/20 transition-colors">
                    <MapPin className="w-5 h-5 text-brand-dark group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-dark mb-1 group-hover:text-brand-yellow transition-colors">Address</h4>
                    <p className="text-sm text-brand-dark/70">
                      Near Old Bus Stand, Main Road,
                      <br />
                      Tuljapur, Maharashtra 413601
                    </p>
                  </div>
                </a>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#c8e6c9] rounded-full flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-brand-dark" />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-dark mb-1">Phone</h4>
                    <p className="text-sm text-brand-dark/70">
                      +91 99227 72200
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#c8e6c9] rounded-full flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-brand-dark" />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-dark mb-1">Hours</h4>
                    <p className="text-sm text-brand-dark/70">
                      Monday - Sunday 11:00 AM – 11:30 PM
                    </p>
                  </div>
                </div>
              </div>

              <TiltCard className="w-full h-48">
                <a
                  href="https://maps.google.com/?q=Hotel+Ashoka+Family+Restaurant+Tuljapur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-full bg-gray-200 rounded-3xl overflow-hidden relative block group"
                >
                  {/* Simulated Map Image */}
                  <img
                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop"
                    alt="Map Location"
                    className="w-full h-full object-cover grayscale opacity-60 group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-brand-cream border border-brand-yellow/50 text-brand-dark px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 shadow-lg group-hover:bg-brand-yellow/10 transition-colors">
                      <MapPin size={14} /> Hotel Ashoka
                    </div>
                  </div>
                </a>
              </TiltCard>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Review Modal */}
      <AnimatePresence>
        {showReviewModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-dark"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-brand-cream rounded-3xl p-8 max-w-md w-full relative shadow-2xl"
            >
              <button
                onClick={() => setShowReviewModal(false)}
                className="absolute top-4 right-4 text-brand-dark/50 hover:text-brand-dark transition-colors"
              >
                <X size={24} />
              </button>
              
              {!reviewSuccess ? (
                <>
                  <h3 className="text-2xl font-serif font-bold text-brand-dark mb-2">
                    Share Your Experience
                  </h3>
                  <p className="text-sm text-brand-dark/60 mb-6">
                    We'd love to hear about your visit to Hotel Ashoka.
                  </p>
                  
                  <form onSubmit={handleReviewSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-brand-dark mb-2 uppercase tracking-wide">
                        Rating
                      </label>
                      <div className="flex gap-2 text-brand-yellow">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} size={24} className="fill-current cursor-pointer hover:scale-110 transition-transform" />
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-xs font-bold text-brand-dark mb-2 uppercase tracking-wide">
                        Your Review
                      </label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Tell us what you loved..."
                        className="w-full px-4 py-3 rounded-xl border border-brand-dark/10 focus:ring-2 focus:ring-brand-dark focus:border-transparent outline-none bg-brand-cream/50 resize-none"
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                      />
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full gold-gradient-bg text-brand-dark py-4 rounded-xl font-bold tracking-wider hover:shadow-[0_0_15px_rgba(193,155,108,0.5)] transition-all uppercase mt-2"
                    >
                      Submit Review
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={32} className="text-green-600" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-brand-dark mb-2">
                    Thank You!
                  </h3>
                  <p className="text-brand-dark/60">
                    Your review has been submitted successfully.
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
