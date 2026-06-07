import { ArrowRight, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

const projects = [
  {
    id: 1,
    title: "Le Boisé de la Salette",
    location: "Saint-Jérôme, QC",
    type: "New Home Construction",
    status: "Selling Fast",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    title: "Domaine des Patriotes",
    location: "Saint-Eustache, QC",
    type: "Residential Development",
    status: "Phase 1 Complete",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    title: "Condos L'Aura",
    location: "Boisbriand, QC",
    type: "New Condo Development",
    status: "Move-In Ready",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 4,
    title: "Quartier Signature",
    location: "Blainville, QC",
    type: "Luxury Townhomes",
    status: "Upcoming",
    image: "https://images.unsplash.com/photo-1628624747186-a941c476b7ef?auto=format&fit=crop&q=80&w=800",
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function FeaturedProjects() {
  return (
    <section id="projects" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div className="max-w-2xl">
            <span className="text-accent font-semibold tracking-wider uppercase text-sm inline-block mb-2">Discover Our Work</span>
            <h2 className="text-4xl md:text-6xl font-display font-medium text-primary">Featured Developments</h2>
            <p className="mt-6 text-gray-600 text-lg md:text-xl leading-relaxed font-light">
              Explore our portfolio of quality residential construction and modern condos across Montreal's North Shore. Designed for today's families.
            </p>
          </div>
          <Link to="/projects" className="group flex items-center gap-2 text-primary font-medium hover:text-accent transition-colors pb-2 border-b border-transparent hover:border-accent">
            View All Projects 
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </Link>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
        >
          {projects.map((project, idx) => (
            <motion.div 
              key={project.id} 
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group relative overflow-hidden bg-gray-50 cursor-pointer rounded-[2rem] shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              <div className="relative h-[450px] w-full overflow-hidden">
                <motion.img 
                  src={project.image} 
                  alt={project.title} 
                  className="object-cover w-full h-full transform-gpu"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>
                
                {/* Status Badge */}
                <div className="absolute top-6 right-6 z-20">
                  <span className="bg-white/95 backdrop-blur-md text-primary px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-full shadow-lg">
                    {project.status}
                  </span>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 p-8 md:p-10 w-full z-20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-accent font-medium text-sm tracking-wider uppercase block mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{project.type}</span>
                  <h3 className="text-3xl md:text-4xl font-display text-white mb-4 line-clamp-1 group-hover:text-accent transition-colors">{project.title}</h3>
                  <div className="flex items-center gap-2 text-white/90 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                    <MapPin className="w-4 h-4 text-accent" />
                    {project.location}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
