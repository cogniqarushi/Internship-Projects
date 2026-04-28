import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, Users, MessageSquare } from 'lucide-react';

export default function Reservation() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    requests: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="pt-24 pb-24 min-h-screen bg-brand-cream flex items-center justify-center relative overflow-hidden">
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
      <div className="max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20, rotateX: -10, rotateY: 5 }}
          animate={{ opacity: 1, y: 0, rotateX: 0, rotateY: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-brand-cream backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-brand-yellow/30"
        >
          <div className="p-8 md:p-12">
            <div className="text-center mb-10">
              <h1 className="text-4xl font-serif text-brand-dark mb-4 drop-shadow-sm">Reserve a Table</h1>
              <p className="text-brand-dark font-medium">Ensure your spot for a delightful family dining experience.</p>
            </div>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h2 className="text-2xl font-serif text-brand-dark mb-4">Reservation Confirmed!</h2>
                <div className="bg-brand-cream/60 backdrop-blur-sm p-6 rounded-2xl inline-block text-left mb-8 border border-brand-cream/50 shadow-sm">
                  <p className="text-brand-dark font-medium mb-2">
                    "Your table is reserved at {formData.time} on {formData.date} for {formData.guests} guests."
                  </p>
                  <p className="text-sm text-brand-yellow italic">
                    * Please arrive within 15 minutes of your reserved time. Auto-cancellation applies thereafter.
                  </p>
                </div>
                <p className="text-brand-dark">We've sent an SMS confirmation and a WhatsApp reminder to {formData.phone}.</p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-8 text-brand-yellow font-medium hover:underline"
                >
                  Make another reservation
                </button>
              </motion.div>
            ) : (
              <motion.form 
                onSubmit={handleSubmit} 
                className="space-y-6"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1
                    }
                  }
                }}
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                    <label className="block text-sm font-bold text-brand-dark mb-2 uppercase tracking-wide">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-brand-dark/20 focus:ring-2 focus:ring-brand-yellow focus:border-transparent outline-none transition-all bg-brand-cream/50"
                      placeholder="John Doe"
                    />
                  </motion.div>
                  <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                    <label className="block text-sm font-bold text-brand-dark mb-2 uppercase tracking-wide">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-brand-dark/20 focus:ring-2 focus:ring-brand-yellow focus:border-transparent outline-none transition-all bg-brand-cream/50"
                      placeholder="+91 99227 72200"
                    />
                  </motion.div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                    <label className="block text-sm font-bold text-brand-dark mb-2 flex items-center gap-2 uppercase tracking-wide">
                      <Calendar size={16} className="text-brand-yellow" /> Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      required
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-brand-dark/20 focus:ring-2 focus:ring-brand-yellow focus:border-transparent outline-none transition-all bg-brand-cream/50"
                    />
                  </motion.div>
                  <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                    <label className="block text-sm font-bold text-brand-dark mb-2 flex items-center gap-2 uppercase tracking-wide">
                      <Clock size={16} className="text-brand-yellow" /> Time
                    </label>
                    <input
                      type="time"
                      name="time"
                      required
                      value={formData.time}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-brand-dark/20 focus:ring-2 focus:ring-brand-yellow focus:border-transparent outline-none transition-all bg-brand-cream/50"
                    />
                  </motion.div>
                  <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                    <label className="block text-sm font-bold text-brand-dark mb-2 flex items-center gap-2 uppercase tracking-wide">
                      <Users size={16} className="text-brand-yellow" /> Guests
                    </label>
                    <select
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-brand-dark/20 focus:ring-2 focus:ring-brand-yellow focus:border-transparent outline-none transition-all bg-brand-cream/50"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, '9+'].map(num => (
                        <option key={num} value={num}>{num} {num === 1 ? 'Person' : 'People'}</option>
                      ))}
                    </select>
                  </motion.div>
                </div>

                <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                  <label className="block text-sm font-bold text-brand-dark mb-2 flex items-center gap-2 uppercase tracking-wide">
                    <MessageSquare size={16} className="text-brand-yellow" /> Special Requests (Optional)
                  </label>
                  <textarea
                    name="requests"
                    value={formData.requests}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-brand-dark/20 focus:ring-2 focus:ring-brand-yellow focus:border-transparent outline-none transition-all resize-none bg-brand-cream/50"
                    placeholder="E.g., High chair needed, anniversary dinner..."
                  ></textarea>
                </motion.div>

                <motion.button
                  variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full gold-gradient-bg text-brand-dark py-4 rounded-xl font-bold text-lg hover:shadow-[0_0_15px_rgba(193,155,108,0.5)] transition-all shadow-lg uppercase tracking-wider"
                >
                  <span className="drop-shadow-md">Confirm Reservation</span>
                </motion.button>
              </motion.form>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
