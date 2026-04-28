import { motion, useScroll, useTransform } from 'motion/react';
import TiltCard from '../components/TiltCard';
import { 
  Accessibility, 
  ShoppingBag, 
  Star, 
  Users, 
  UtensilsCrossed, 
  Coffee, 
  Wifi, 
  Car, 
  CreditCard, 
  Baby, 
  CalendarCheck, 
  Smile, 
  Clock
} from 'lucide-react';

const features = [
  {
    title: "Accessibility",
    icon: <Accessibility className="w-6 h-6" />,
    items: ["Wheelchair-accessible toilet"]
  },
  {
    title: "Service Options",
    icon: <ShoppingBag className="w-6 h-6" />,
    items: ["Takeaway", "Dine-in", "Delivery"]
  },
  {
    title: "Highlights",
    icon: <Star className="w-6 h-6" />,
    items: ["Great coffee", "Great dessert", "Great tea selection"]
  },
  {
    title: "Popular For",
    icon: <Users className="w-6 h-6" />,
    items: ["Breakfast", "Lunch", "Dinner", "Solo dining"]
  },
  {
    title: "Offerings",
    icon: <UtensilsCrossed className="w-6 h-6" />,
    items: ["All you can eat", "Coffee", "Late-night food", "Quick bite", "Small plates", "Vegan options", "Vegetarian options", "Vegetarian options only"]
  },
  {
    title: "Dining Options",
    icon: <Clock className="w-6 h-6" />,
    items: ["Breakfast", "Brunch", "Lunch", "Dinner", "Dessert", "Seating", "Table service"]
  },
  {
    title: "Amenities",
    icon: <Wifi className="w-6 h-6" />,
    items: ["Restroom"]
  },
  {
    title: "Atmosphere",
    icon: <Smile className="w-6 h-6" />,
    items: ["Casual", "Quiet", "Trendy"]
  },
  {
    title: "Crowd",
    icon: <Users className="w-6 h-6" />,
    items: ["Family friendly", "Groups", "Tourists"]
  },
  {
    title: "Planning",
    icon: <CalendarCheck className="w-6 h-6" />,
    items: ["Brunch reservations recommended", "Accepts reservations"]
  },
  {
    title: "Payments",
    icon: <CreditCard className="w-6 h-6" />,
    items: ["Credit cards", "Debit cards", "Google Pay", "NFC mobile payments"]
  },
  {
    title: "Children",
    icon: <Baby className="w-6 h-6" />,
    items: ["Good for kids", "Kids' menu"]
  },
  {
    title: "Parking",
    icon: <Car className="w-6 h-6" />,
    items: ["Free parking lot", "Free street parking", "Paid parking lot", "Plenty of parking"]
  }
];

export default function About() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <div className="min-h-screen bg-brand-cream relative overflow-hidden">
      {/* Decorative Background Leaves */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <img 
          src="https://png.pngtree.com/png-clipart/20220804/ourmid/pngtree-aesthetic-paper-notes-png-image_6098989.png"
          alt=""
          className="absolute -left-20 top-[400px] w-[500px] h-[500px] opacity-15 pointer-events-none object-contain mix-blend-multiply grayscale brightness-[1.05] contrast-[1.1] -scale-x-100 rotate-12"
          referrerPolicy="no-referrer"
        />
        <img 
          src="https://png.pngtree.com/png-clipart/20220804/ourmid/pngtree-aesthetic-paper-notes-png-image_6098989.png"
          alt=""
          className="absolute -right-20 bottom-[200px] w-[500px] h-[500px] opacity-15 pointer-events-none object-contain mix-blend-multiply grayscale brightness-[1.05] contrast-[1.1] -rotate-12"
          referrerPolicy="no-referrer"
        />
      </div>
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden pt-20">
        <motion.div style={{ y }} className="absolute inset-0 h-[120%] -top-[10%]">
          <img
            src="https://lh3.googleusercontent.com/d/1FIfNv9uXrY2ey1a39NOCeKeLOvMG2_MF"
            alt="About Us Background"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-[#1a3c34]/60"></div>
        </motion.div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-serif text-white mb-4">About Us</h1>
          <p className="text-lg md:text-xl text-white max-w-2xl mx-auto">Our story and commitment to quality.</p>
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
            <div className="space-y-6 text-lg text-brand-dark font-light leading-relaxed">
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
                    src="https://lh3.googleusercontent.com/d/1VZMm1Q7gTImpB1t7DYHFKGvMOoD-sHph"
                    alt="Restaurant Interior"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </TiltCard>
              <TiltCard>
                <div className="rounded-2xl shadow-lg overflow-hidden group h-48">
                  <img
                    src="https://lh3.googleusercontent.com/d/1qVPiuWZxxe5KwvjabNYccedqn9U9UdTy"
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
                <div className="bg-brand-dark p-8 rounded-2xl shadow-lg text-white flex flex-col justify-center h-56 transition-transform duration-500 hover:scale-[1.02] border border-white/10">
                  <p className="font-serif text-xl italic mb-4">"Serving tradition with every meal."</p>
                </div>
              </TiltCard>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-brand-cream relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif text-brand-dark mb-4">What We Offer</h2>
            <p className="text-brand-dark max-w-2xl mx-auto text-lg">Everything you need for a comfortable and memorable dining experience.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <TiltCard key={idx} className="h-full">
                <motion.div
                  initial={{ opacity: 0, y: 30, rotateX: -20, rotateY: 10 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0, rotateY: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: idx * 0.05, duration: 0.6, ease: "easeOut" }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="bg-brand-cream rounded-3xl p-8 h-full border border-[#d4af37]/30 shadow-lg hover:shadow-2xl transition-all duration-300 group flex flex-col"
                >
                  <div className="w-16 h-16 bg-brand-dark/10 text-brand-dark rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-brand-dark group-hover:text-white transition-all duration-300 shadow-inner">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-brand-dark mb-4 group-hover:text-brand-yellow transition-colors duration-300">{feature.title}</h3>
                  <ul className="space-y-3 flex-grow">
                    {feature.items.map((item, i) => (
                      <li key={i} className="text-sm text-brand-dark/80 font-medium flex items-start gap-3">
                        <span className="w-2 h-2 rounded-full bg-brand-yellow mt-1.5 flex-shrink-0 group-hover:scale-150 transition-transform" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
