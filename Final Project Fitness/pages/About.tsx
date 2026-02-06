import React from 'react';
import { motion } from 'framer-motion';
import TiltCard from '../components/TiltCard';

const About: React.FC = () => {
  return (
    <div className="pt-20 min-h-screen bg-brand-black">
      {/* Founder Story */}
      <section className="py-24 px-4 relative overflow-hidden">
        {/* Decorative Background - Brighter */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-gold/10 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-blue/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div 
             initial={{ x: -50, opacity: 0 }}
             animate={{ x: 0, opacity: 1 }}
             className="relative"
          >
             <TiltCard>
               <div className="relative rounded-2xl shadow-[0_0_60px_rgba(212,175,55,0.2)] border border-brand-gold/30 p-2 bg-brand-dark">
                 <img 
                   src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=2070&auto=format&fit=crop" 
                   alt="Mayur K - Founder" 
                   className="relative rounded-xl w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-500"
                 />
                 <div className="absolute bottom-6 left-6 bg-brand-black/90 backdrop-blur-md px-4 py-2 rounded-lg border-l-4 border-brand-gold shadow-lg">
                    <p className="text-white font-bold">Mayur K.</p>
                    <p className="text-brand-gold text-xs">Founder & Head Coach</p>
                 </div>
               </div>
             </TiltCard>
          </motion.div>
          
          <motion.div 
             initial={{ x: 50, opacity: 0 }}
             animate={{ x: 0, opacity: 1 }}
             transition={{ delay: 0.2 }}
          >
             <h4 className="text-brand-orange font-bold uppercase tracking-widest mb-2 drop-shadow-md">The Visionary</h4>
             <h2 className="font-heading text-5xl font-bold text-white mb-6">Mastering the <span className="text-brand-gold drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]">Art of Physique</span></h2>
             <p className="text-gray-300 mb-6 leading-relaxed text-lg">
               Project Fitness was founded by <strong>Mayur K.</strong>, a renowned fitness strategist with over a decade of experience in biomechanics and nutritional science.
             </p>
             <p className="text-gray-300 mb-8 leading-relaxed text-lg">
               Frustrated by generic "one-size-fits-all" plans, Mayur integrated his expertise in <strong>3D Motion Analysis</strong> and physiological profiling to create a coaching system that adapts to your unique anatomy.
             </p>
             
             <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-white/10 p-4 rounded-lg border border-white/10 hover:bg-white/15 transition-colors">
                   <h5 className="font-bold text-brand-gold mb-1">10+ Years</h5>
                   <p className="text-xs text-gray-400">Industry Experience</p>
                </div>
                <div className="bg-white/10 p-4 rounded-lg border border-white/10 hover:bg-white/15 transition-colors">
                   <h5 className="font-bold text-brand-gold mb-1">500+</h5>
                   <p className="text-xs text-gray-400">Transformations</p>
                </div>
             </div>

             <div className="border-l-4 border-brand-gold pl-6 py-2 bg-gradient-to-r from-brand-gold/20 to-transparent rounded-r-xl">
               <p className="text-xl italic text-white font-medium">"Your body is a sculpture. Training is the chisel. I provide the blueprint."</p>
             </div>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-brand-dark px-4 border-t border-white/10 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-800/20 to-transparent -z-10" />
        <div className="max-w-4xl mx-auto text-center">
           <h3 className="text-3xl font-heading font-bold mb-12 text-white">Who We Help</h3>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 bg-brand-black rounded-2xl border border-white/10 hover:border-brand-gold transition duration-300 transform hover:-translate-y-2 shadow-lg">
                <div className="text-4xl mb-4 bg-brand-gold/20 w-16 h-16 flex items-center justify-center rounded-full mx-auto shadow-[0_0_15px_rgba(212,175,55,0.2)]">🎓</div>
                <h4 className="font-bold text-lg mb-2 text-white">Students</h4>
                <p className="text-gray-400 text-sm">Budget-friendly plans designed for high energy and busy college schedules.</p>
              </div>
              <div className="p-8 bg-brand-black rounded-2xl border border-white/10 hover:border-brand-gold transition duration-300 transform hover:-translate-y-2 shadow-lg">
                 <div className="text-4xl mb-4 bg-brand-gold/20 w-16 h-16 flex items-center justify-center rounded-full mx-auto shadow-[0_0_15px_rgba(212,175,55,0.2)]">💼</div>
                 <h4 className="font-bold text-lg mb-2 text-white">Professionals</h4>
                 <p className="text-gray-400 text-sm">Efficient 45-min protocols for those who need to maximize time and focus.</p>
              </div>
              <div className="p-8 bg-brand-black rounded-2xl border border-white/10 hover:border-brand-gold transition duration-300 transform hover:-translate-y-2 shadow-lg">
                 <div className="text-4xl mb-4 bg-brand-gold/20 w-16 h-16 flex items-center justify-center rounded-full mx-auto shadow-[0_0_15px_rgba(212,175,55,0.2)]">🏆</div>
                 <h4 className="font-bold text-lg mb-2 text-white">Athletes</h4>
                 <p className="text-gray-400 text-sm">Advanced periodization for competition prep and sport-specific performance.</p>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
};

export default About;