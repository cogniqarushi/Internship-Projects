import { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { ChevronDown } from 'lucide-react';

export default function FAQ() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  const faqs = [
    {
      question: "Do you serve non-veg food?",
      answer: "No, Hotel Ashoka is a 100% pure vegetarian family restaurant. We specialize in authentic Indian veg cuisine."
    },
    {
      question: "What are your operating hours?",
      answer: "We are open daily until 11:30 PM. Perfect for late dinners after visiting the Tulja Bhavani Temple."
    },
    {
      question: "Where exactly are you located?",
      answer: "We are located on Osmanabad Road, near the old bus stand in Tuljapur, Maharashtra 413601. It's a central spot easily accessible for both locals and visitors."
    },
    {
      question: "Do you take reservations?",
      answer: "We primarily operate on a walk-in basis. However, for larger groups or family gatherings, we highly recommend calling ahead to reserve a table to avoid waiting."
    },
    {
      question: "Is parking available?",
      answer: "Yes, there is parking available near the restaurant. Our staff can guide you if you need assistance during peak hours."
    },
    {
      question: "What is included in the Maharashtra Thali?",
      answer: "Our popular Veg Thali typically includes Tandoori Roti/Chapati, two types of seasonal vegetable curries, Dal, Rice, a sweet dish, Papad, and salad."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="bg-brand-cream min-h-screen">
      {/* Hero Section */}
      <div className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1578474846511-04ba529f0b88?q=80&w=1920&auto=format&fit=crop"
            alt="FAQ Background"
            className="w-full h-[120%] object-cover -mt-[10%]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-brand-dark/70"></div>
        </motion.div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-sm font-bold tracking-widest text-brand-orange uppercase mb-3">Common Queries</h2>
          <h1 className="text-5xl md:text-6xl font-serif text-white mb-4">Frequently Asked Questions</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">Everything you need to know before you visit us.</p>
        </div>
      </div>

      <div className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-brand-dark/5"
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
              >
                <span className="text-lg font-medium text-brand-dark pr-8">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-brand-orange transition-transform duration-300 shrink-0 ${
                    openIndex === idx ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-5 text-brand-dark/70 leading-relaxed border-t border-brand-dark/5 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
