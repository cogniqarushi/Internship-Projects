import React from 'react';
import { PROGRAMS } from '../constants';
import TiltCard from '../components/TiltCard';
import { Clock, Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Programs: React.FC = () => {
  return (
    <div className="pt-24 min-h-screen bg-brand-black px-4 pb-20 relative overflow-hidden">
      
      {/* Background Decor - Brighter */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-brand-blue/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-brand-gold/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-heading text-5xl md:text-7xl font-bold mb-4 text-white tracking-tight drop-shadow-lg">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-white to-brand-blue animate-gradient-x">Programs</span>
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              Precision engineered plans. Choose your path to transformation.
            </p>
          </motion.div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-24 perspective-1000">
          {PROGRAMS.map((program, index) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 50, rotateX: 10 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 50 }}
              className="h-full"
            >
              <motion.div
                 animate={{ y: [0, -10, 0] }}
                 transition={{ duration: 4 + index, repeat: Infinity, ease: "easeInOut" }}
                 className="h-full"
              >
                <TiltCard className="h-full">
                  <div className="h-full bg-brand-dark/90 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden flex flex-col group hover:shadow-[0_0_50px_rgba(0,242,234,0.15)] hover:border-brand-blue/40 transition-all duration-500 relative">
                    
                    {/* Glowing Accent */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-gold via-transparent to-brand-blue opacity-50 group-hover:opacity-100 transition-opacity" />

                    {/* Image Area */}
                    <div className="relative h-72 overflow-hidden">
                      <div className="absolute inset-0 bg-brand-blue/10 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <img 
                        src={program.image} 
                        alt={program.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/60 to-transparent opacity-90" />
                      
                      <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                        <div>
                          <h3 className="text-3xl font-bold text-white font-heading tracking-wide group-hover:text-brand-blue transition-colors drop-shadow-md">{program.title}</h3>
                          <div className="flex items-center gap-2 text-brand-gold text-sm font-medium mt-2 bg-black/60 w-fit px-3 py-1 rounded-full border border-brand-gold/30 shadow-lg">
                            <Clock size={14} />
                            <span>{program.duration}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content Area */}
                    <div className="p-8 flex flex-col flex-grow relative z-10 bg-gradient-to-b from-transparent to-black/30">
                      <div className="absolute top-0 right-0 p-8 transform -translate-y-[140%]">
                         <span className="block text-2xl font-black text-white drop-shadow-lg text-right">{program.price}</span>
                      </div>

                      <p className="text-gray-300 mb-8 text-sm leading-relaxed border-l-2 border-brand-gold/50 pl-4">
                        {program.description}
                      </p>
                      
                      <div className="space-y-4 mb-8 flex-grow">
                        {program.features.map((feature, i) => (
                          <div key={i} className="flex items-center gap-3 group/item">
                            <div className="min-w-[24px] h-[24px] rounded-full bg-white/10 flex items-center justify-center border border-white/20 group-hover/item:border-brand-blue/50 group-hover/item:bg-brand-blue/10 transition-colors">
                               <Check size={14} className="text-brand-gold group-hover/item:text-brand-blue" />
                            </div>
                            <span className="text-gray-300 text-sm group-hover/item:text-white transition-colors">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <Link 
                        to="/contact" 
                        className="relative w-full block text-center bg-white text-black font-bold py-4 rounded-xl overflow-hidden group/btn hover:text-white transition-colors duration-300 shadow-lg"
                      >
                        <div className="absolute inset-0 bg-brand-blue translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out" />
                        <span className="relative z-10">Choose Plan</span>
                      </Link>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Comparison Table with Neon Effects */}
        <div className="mt-32 relative">
           <div className="absolute inset-0 bg-gradient-to-b from-brand-blue/10 to-transparent blur-3xl -z-10" />
           <h2 className="text-4xl font-heading font-bold text-center mb-12 text-white">Compare <span className="text-brand-blue drop-shadow-[0_0_10px_rgba(0,242,234,0.5)]">Tiers</span></h2>
           
           <div className="overflow-hidden rounded-3xl border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)] bg-brand-dark/60 backdrop-blur-md">
             <div className="overflow-x-auto">
               <table className="w-full border-collapse">
                 <thead>
                   <tr>
                     <th className="p-6 text-left bg-black/40 border-b border-white/10 text-gray-400 font-normal uppercase tracking-wider text-xs">Features</th>
                     <th className="p-6 text-center bg-black/40 border-b border-white/10 text-white font-bold tracking-wide">Home Workout</th>
                     <th className="p-6 text-center bg-black/40 border-b border-white/10 text-white font-bold tracking-wide">Weight Loss</th>
                     <th className="p-6 text-center bg-black/40 border-b border-white/10 text-white font-bold tracking-wide">Muscle Gain</th>
                     <th className="p-6 text-center bg-brand-blue/20 border-b border-brand-blue/40 text-brand-blue font-bold tracking-wide relative overflow-hidden">
                       <span className="relative z-10">VIP 1:1</span>
                       <div className="absolute top-0 left-0 w-full h-1 bg-brand-blue shadow-[0_0_10px_#00f2ea]" />
                     </th>
                   </tr>
                 </thead>
                 <tbody>
                   {[
                     { feature: "Custom Diet Plan", home: true, weight: true, muscle: true, vip: true },
                     { feature: "Workout Schedule", home: true, weight: true, muscle: true, vip: true },
                     { feature: "Weekly Check-ins", home: false, weight: true, muscle: true, vip: true },
                     { feature: "Daily WhatsApp Support", home: false, weight: false, muscle: false, vip: true },
                     { feature: "Video Form Review", home: false, weight: true, muscle: true, vip: true },
                     { feature: "Supplement Guide", home: true, weight: true, muscle: true, vip: true },
                     { feature: "Call Support", home: false, weight: false, muscle: false, vip: "Weekly" },
                   ].map((row, i) => (
                     <tr key={i} className="group hover:bg-white/5 transition-colors border-b border-white/5 last:border-0">
                       <td className="p-5 text-gray-300 font-medium group-hover:text-white transition-colors">{row.feature}</td>
                       <td className="p-5 text-center">
                         {row.home ? <Check size={20} className="mx-auto text-brand-gold" /> : <X size={20} className="mx-auto text-gray-600 opacity-50" />}
                       </td>
                       <td className="p-5 text-center">
                         {row.weight ? <Check size={20} className="mx-auto text-brand-gold" /> : <X size={20} className="mx-auto text-gray-600 opacity-50" />}
                       </td>
                       <td className="p-5 text-center">
                         {row.muscle ? <Check size={20} className="mx-auto text-brand-gold" /> : <X size={20} className="mx-auto text-gray-600 opacity-50" />}
                       </td>
                       <td className="p-5 text-center bg-brand-blue/5 border-l border-brand-blue/10 font-bold text-white relative">
                         {row.vip === true ? <Check size={22} className="mx-auto text-brand-blue drop-shadow-[0_0_5px_rgba(0,242,234,0.8)]" /> : (row.vip === false ? <X size={20} className="mx-auto text-gray-600" /> : <span className="text-brand-blue">{row.vip}</span>)}
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Programs;