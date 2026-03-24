import { motion } from 'motion/react';

export default function MenuHighlights() {
  const menuItems = [
    {
      category: "Starters & Soups",
      items: [
        { name: "Manchow Soup Veg", desc: "Spicy and tangy dark brown soup with crispy noodles." },
        { name: "Masala Papad", desc: "Roasted papad topped with spicy onion-tomato mix." },
        { name: "Paneer Chilli", desc: "Crispy paneer tossed in spicy soy-garlic sauce." },
      ]
    },
    {
      category: "Main Course",
      items: [
        { name: "Maharashtra Thali Veg", desc: "Complete meal with roti, 2 sabzis, dal, rice, sweet, and papad." },
        { name: "Lasuni Methi", desc: "Fresh fenugreek leaves cooked with prominent garlic flavor." },
        { name: "Paneer Butter Masala", desc: "Cottage cheese cubes in a rich tomato-butter gravy." },
      ]
    },
    {
      category: "Breads & Rice",
      items: [
        { name: "Tandoori Roti", desc: "Traditional whole wheat bread baked in clay oven." },
        { name: "Garlic Naan", desc: "Soft flatbread topped with minced garlic and butter." },
        { name: "Jeera Rice", desc: "Basmati rice tempered with cumin seeds." },
      ]
    }
  ];

  return (
    <section id="menu" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold tracking-widest text-brand-orange uppercase mb-3">Our Menu</h2>
          <h3 className="text-4xl md:text-5xl font-serif text-brand-dark mb-6">Flavorful & Authentic</h3>
          <p className="text-lg text-brand-dark/70 font-light">
            Enjoy a full meal with us. We focus on quality, taste, and generous portions.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {menuItems.map((section, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-brand-cream p-8 rounded-3xl border border-brand-dark/5"
            >
              <h4 className="text-2xl font-serif text-brand-dark mb-8 pb-4 border-b border-brand-dark/10">
                {section.category}
              </h4>
              <div className="space-y-8">
                {section.items.map((item, i) => (
                  <div key={i} className="group">
                    <div className="flex justify-between items-baseline mb-2">
                      <h5 className="text-lg font-semibold text-brand-dark group-hover:text-brand-orange transition-colors">
                        {item.name}
                      </h5>
                    </div>
                    <p className="text-sm text-brand-dark/60 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-brand-dark/60 italic mb-6">
            * Visit us for the full menu.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-8 py-3.5 border-2 border-brand-orange text-brand-orange rounded-full text-base font-medium hover:bg-brand-orange hover:text-white transition-colors"
          >
            Call for Takeaway
          </a>
        </div>
      </div>
    </section>
  );
}
