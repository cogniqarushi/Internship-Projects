import { motion } from 'motion/react';
import { Leaf, Users, ShieldCheck, Star } from 'lucide-react';

export default function About() {
  const features = [
    {
      icon: <Leaf className="w-6 h-6 text-brand-orange" />,
      title: "Pure Vegetarian",
      description: "Authentic Indian cuisine prepared with the freshest ingredients, strictly vegetarian."
    },
    {
      icon: <Users className="w-6 h-6 text-brand-orange" />,
      title: "Family Friendly",
      description: "A serene and welcoming ambiance perfect for family gatherings and casual dining."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-brand-orange" />,
      title: "Hygienic & Clean",
      description: "We maintain the highest standards of hygiene, comparable to top urban restaurants."
    },
    {
      icon: <Star className="w-6 h-6 text-brand-orange" />,
      title: "Highly Rated",
      description: "Loved by locals and travelers alike, with a 4.0/5 rating from over 1,000 reviews."
    }
  ];

  return (
    <section id="about" className="py-24 bg-brand-cream relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-sm font-bold tracking-widest text-brand-orange uppercase mb-3">Our Story</h2>
            <h3 className="text-4xl md:text-5xl font-serif text-brand-dark mb-6 leading-tight">
              A Culinary Landmark Near Tulja Bhavani Temple
            </h3>
            <p className="text-lg text-brand-dark/70 mb-8 leading-relaxed font-light">
              Located conveniently on Osmanabad Road near the old bus stand, Hotel Ashoka Family Restaurant has become a trusted name for delicious, pure vegetarian food in Tuljapur. Whether you're a local resident or a pilgrim visiting the temple, our cooperative staff ensures a memorable dining experience.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-8">
              {features.map((feature, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-orange/10 flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-brand-dark mb-1">{feature.title}</h4>
                    <p className="text-sm text-brand-dark/60 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Image Grid */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-4 relative"
          >
            <div className="space-y-4 pt-12">
              <img
                src="https://69a5d041581800b707fb219f.imgix.net/hotel.jpeg"
                alt="Restaurant Interior"
                className="w-full h-64 object-cover rounded-2xl shadow-lg"
                referrerPolicy="no-referrer"
              />
              <img
                src="https://69a5d041581800b707fb219f.imgix.net/WhatsApp%20Image%202026-03-17%20at%207.59.14%20PM.jpeg"
                alt="Indian Spices"
                className="w-full h-48 object-cover rounded-2xl shadow-lg"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="space-y-4">
              <img
                src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=800&auto=format&fit=crop"
                alt="Indian Thali"
                className="w-full h-56 object-cover rounded-2xl shadow-lg"
                referrerPolicy="no-referrer"
              />
              <div className="bg-brand-olive p-8 rounded-2xl shadow-lg text-white flex flex-col justify-center h-56">
                <div className="flex items-center gap-2 mb-4 text-brand-yellow">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="font-serif text-xl italic mb-4">"Best veg food in Tuljapur. The thali is a must-try!"</p>
                <p className="text-sm font-medium opacity-80">- Google Review</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
