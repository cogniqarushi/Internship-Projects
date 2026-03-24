import { motion, useScroll, useTransform } from 'motion/react';
import TiltCard from '../components/TiltCard';

export default function Menu() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  const menuCategories = [
    {
      title: "Appetizers",
      items: [
        { name: "Masala Papad", spice: "Mild", veg: true, desc: "Crispy papad topped with onion, tomato, masala.", image: "https://69a5d041581800b707fb219f.imgix.net/Screenshot%202026-03-17%20204029.jpg" },
        { name: "Onion Salad", spice: "None", veg: true, desc: "Freshly sliced onions with lemon and green chilies.", image: "https://69a5d041581800b707fb219f.imgix.net/Screenshot%202026-03-17%20210204.jpg" },
      ]
    },
    {
      title: "Soups",
      items: [
        { name: "Veg Manchow Soup", spice: "Spicy", veg: true, desc: "Spicy and tangy dark brown soup with crispy noodles.", image: "https://69a5d041581800b707fb219f.imgix.net/Screenshot%202026-03-17%20204301.jpg" },
      ]
    },
    {
      title: "Main Course",
      items: [
        { name: "Maharashtra Veg Thali", spice: "Medium", veg: true, desc: "Complete meal with roti, 2 sabzis, dal, rice, sweet, and papad.", image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=400&auto=format&fit=crop" },
        { name: "Lasuni Methi", spice: "Medium", veg: true, desc: "Fresh fenugreek leaves cooked with prominent garlic flavor.", image: "https://69a5d041581800b707fb219f.imgix.net/Screenshot%202026-03-17%20205450.jpg" },
        { name: "Paneer Tikka", spice: "Medium", veg: true, desc: "Marinated cottage cheese cubes grilled to perfection with Indian spices.", image: "https://69a5d041581800b707fb219f.imgix.net/WhatsApp%20Image%202026-03-17%20at%207.59.14%20PM%20(1).jpeg" },
      ]
    },
    {
      title: "Breads",
      items: [
        { name: "Tandoori Roti", spice: "None", veg: true, desc: "Traditional whole wheat bread baked in clay oven.", image: "https://69a5d041581800b707fb219f.imgix.net/Screenshot%202026-03-17%20204606.jpg" },
        { name: "Butter Naan", spice: "None", veg: true, desc: "Soft flatbread topped with butter.", image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?q=80&w=400&auto=format&fit=crop" },
      ]
    },
    {
      title: "Rice",
      items: [
        { name: "Veg Biryani", spice: "Spicy", veg: true, desc: "Aromatic basmati rice cooked with mixed vegetables and spices.", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=400&auto=format&fit=crop" },
        { name: "Jeera Rice", spice: "Mild", veg: true, desc: "Basmati rice tempered with cumin seeds.", image: "https://images.unsplash.com/photo-1516684732162-798a0062be99?q=80&w=400&auto=format&fit=crop" },
      ]
    },
    {
      title: "Desserts",
      items: [
        { name: "Ice Cream", spice: "None", veg: true, desc: "Choice of vanilla, chocolate, or strawberry.", image: "https://images.unsplash.com/photo-1559703248-dcaaec9fab78?q=80&w=400&auto=format&fit=crop" },
      ]
    }
  ];

  return (
    <div className="bg-brand-cream min-h-screen">
      {/* Hero Section */}
      <div className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1920&auto=format&fit=crop"
            alt="Menu Background"
            className="w-full h-[120%] object-cover -mt-[10%]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-brand-dark/70"></div>
        </motion.div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-serif text-white mb-4">Our Menu</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">Authentic flavors, prepared fresh daily.</p>
        </div>
      </div>

      <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-16">
          {menuCategories.map((category, idx) => (
            <motion.div 
              key={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={{
                visible: { transition: { staggerChildren: 0.1 } },
                hidden: {}
              }}
            >
              <h2 className="text-3xl font-serif text-brand-dark mb-8 border-b border-brand-dark/10 pb-4">{category.title}</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.items.map((item, i) => (
                  <motion.div
                    key={i}
                    variants={{
                      hidden: { opacity: 0, scale: 0.9, y: 20 },
                      visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
                    }}
                  >
                    <TiltCard className="h-full">
                      <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-brand-dark/5 hover:shadow-xl transition-all duration-300 group h-full flex flex-col">
                        <div className="h-48 overflow-hidden shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" referrerPolicy="no-referrer" />
                        </div>
                        <div className="p-6 flex-grow">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-semibold text-brand-dark flex items-center gap-2">
                              {item.name}
                              {item.veg && <span className="w-3 h-3 rounded-full bg-green-500 inline-block border border-green-700" title="Pure Veg" />}
                            </h3>
                          </div>
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-xs font-medium px-2 py-1 bg-brand-light-olive text-brand-dark rounded-md">
                              Spice: {item.spice} {item.spice === 'Spicy' ? '🌶️🌶️' : item.spice === 'Medium' ? '🌶️' : ''}
                            </span>
                          </div>
                          <p className="text-brand-dark/70 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    </TiltCard>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
