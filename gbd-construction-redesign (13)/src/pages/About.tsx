import { CheckCircle2, Users, Building, ShieldCheck, Target, Heart } from 'lucide-react';
import { motion } from 'motion/react';

export default function About() {
  const team = [
    {
      name: "Benoit Dumoulin",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400"
    },
    {
      name: "Jean-Philippe Tremblay",
      role: "Lead Architect",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400"
    },
    {
      name: "Sophie Labelle",
      role: "Project Director",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400"
    }
  ];

  return (
    <div className="pt-24 bg-[#fafafa] min-h-screen">
      {/* Page Header */}
      <div className="py-32 px-6 relative overflow-hidden flex flex-col items-center justify-center">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-40" />
        <div className="absolute inset-0 bg-primary/90 mix-blend-multiply" />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto text-center relative z-10"
        >
          <span className="text-accent font-semibold text-sm tracking-widest uppercase mb-4 block">Our Story</span>
          <h1 className="text-5xl md:text-6xl font-display font-medium text-white mb-6">About GBD Construction</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto font-light leading-relaxed">
            Building reliable, high-quality homes and shaping beautiful communities across Montreal's North Shore for over 20 years.
          </p>
        </motion.div>
      </div>

      {/* Story Section */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-display text-primary mb-6 leading-tight">Our Legacy of Quality</h2>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              GBD Construction was founded with a single mission: to create residential properties that families are proud to call home. Over the decades, we have refined our processes, partnered with the best tradespeople, and embraced modern architectural trends to stay at the forefront of the industry.
            </p>
            <p className="text-gray-600 text-lg mb-10 leading-relaxed">
              We manage everything from land acquisition and urban planning to construction and final delivery. This turnkey approach guarantees our signature quality at every step of the journey.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all"
              >
                <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center mb-6">
                  <Building className="w-6 h-6 text-accent" />
                </div>
                <h4 className="text-3xl font-display font-medium text-primary mb-2">5,000+</h4>
                <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">Homes Built</p>
              </motion.div>
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all"
              >
                <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center mb-6">
                  <Users className="w-6 h-6 text-accent" />
                </div>
                <h4 className="text-3xl font-display font-medium text-primary mb-2">10k+</h4>
                <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">Happy Residents</p>
              </motion.div>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-[2.5rem] overflow-hidden group">
              <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors duration-700 z-10" />
              <img 
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800" 
                alt="Construction Planning" 
                className="w-full h-[600px] object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
            </div>
            
            {/* Floating badge 1 */}
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="absolute -bottom-8 -left-8 bg-white p-8 rounded-3xl shadow-2xl border border-gray-100 hidden sm:block z-20 w-64"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-accent" />
                </div>
                <h5 className="font-bold text-primary">Certified</h5>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed text-left">Licensed & Insured with GCR Accreditation</p>
            </motion.div>
            
            {/* Floating badge 2 */}
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="absolute top-12 -right-12 bg-primary p-6 rounded-3xl shadow-xl hidden lg:block z-20"
            >
              <Target className="w-8 h-8 text-white mb-2" />
              <p className="font-semibold text-white">20+ Years</p>
              <p className="text-xs text-white/80">Experience</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Philosophy Section */}
      <div className="bg-primary py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at center, #ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Heart className="w-12 h-12 text-accent mx-auto mb-6" />
            <h2 className="text-3xl md:text-5xl font-display font-medium mb-6">Built with Passion, Lived with Joy</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto font-light leading-relaxed">
              We don't just build houses; we curate living experiences. Our architectural philosophy centers around the people who will call our structures home—prioritizing natural light, spatial flow, and enduring materials.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-white py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-accent font-semibold text-sm tracking-widest uppercase mb-4 block">The Experts</span>
            <h2 className="text-4xl font-display text-primary mb-4">Meet Leadership</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">The dedicated professionals driving our vision forward, combining decades of experience with innovative thinking.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {team.map((member, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="text-center group"
              >
                <div className="relative w-56 h-56 mx-auto mb-8 mx-auto">
                  <div className="absolute inset-0 bg-accent rounded-full scale-95 group-hover:scale-105 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover rounded-full relative z-10 border-[6px] border-white shadow-xl group-hover:-translate-y-2 transition-transform duration-500" 
                  />
                </div>
                <h3 className="text-2xl font-display font-medium text-primary mb-2 group-hover:text-accent transition-colors">{member.name}</h3>
                <p className="text-gray-500 font-medium tracking-wide uppercase text-sm">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
