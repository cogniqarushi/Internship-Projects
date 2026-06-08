import { useState } from 'react';
import { MapPin, ArrowRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const allProjects = [
  {
    id: 1,
    title: "Le Boisé de la Salette",
    location: "Saint-Jérôme, QC",
    type: "New Homes",
    status: "Selling Fast",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800",
    description: "A beautiful residential community nestled in nature, offering modern family homes with spacious lots.",
    units: "45 Lots",
    completion: "Fall 2026"
  },
  {
    id: 2,
    title: "Domaine des Patriotes",
    location: "Saint-Eustache, QC",
    type: "New Homes",
    status: "Phase 1",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
    description: "Premium single-family homes blending rustic charm with contemporary luxury in a historical setting.",
    units: "120 Homes",
    completion: "Spring 2025"
  },
  {
    id: 3,
    title: "Condos L'Aura",
    location: "Boisbriand, QC",
    type: "Condos",
    status: "Move-In Ready",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=800",
    description: "Urban living at its finest. High-end condos steps away from the finest dining and shopping.",
    units: "85 Units",
    completion: "Ready"
  },
  {
    id: 4,
    title: "Quartier Signature",
    location: "Blainville, QC",
    type: "Townhomes",
    status: "Upcoming",
    image: "https://images.unsplash.com/photo-1628624747186-a941c476b7ef?auto=format&fit=crop&q=80&w=800",
    description: "Exclusive townhomes designed for sophistication and minimal maintenance, with premium amenities.",
    units: "32 Townhomes",
    completion: "Winter 2027"
  },
  {
    id: 5,
    title: "Eco-Habitats Rosemère",
    location: "Rosemère, QC",
    type: "New Homes",
    status: "Pre-Sale",
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=800",
    description: "Eco-friendly modern homes built with sustainable materials and smart energy management.",
    units: "15 Homes",
    completion: "Summer 2027"
  },
  {
    id: 6,
    title: "Les Jardins de Terrebonne",
    location: "Terrebonne, QC",
    type: "Community",
    status: "Selling phase",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
    description: "A massive multi-phase development featuring parks, local shops, and beautiful homes.",
    units: "300+ Homes",
    completion: "Multi-Year Phase"
  }
];

const categories = ["All", "New Homes", "Condos", "Townhomes", "Community"];

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<typeof allProjects[0] | null>(null);

  const filteredProjects = filter === "All" 
    ? allProjects 
    : allProjects.filter(p => p.type === filter);

  return (
    <div className="pt-24 bg-[#fafafa] min-h-screen">
      {/* Page Header */}
      <div className="py-32 px-6 relative overflow-hidden bg-primary flex flex-col items-center justify-center">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-30" />
        <div className="absolute inset-0 bg-primary/80 mix-blend-multiply" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto text-center relative z-10"
        >
          <h1 className="text-5xl md:text-6xl font-display font-medium text-white mb-6">Our Developments</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto font-light leading-relaxed">
            Explore our extensive portfolio of completed and upcoming residential projects. We take pride in building communities that thrive.
          </p>
        </motion.div>
      </div>
      
      {/* Interactive Filters */}
      <div className="px-6 -mt-8 relative z-20 mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto bg-white p-4 rounded-3xl shadow-xl shadow-black/5"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === cat 
                  ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105' 
                  : 'bg-transparent text-gray-600 hover:bg-gray-100 hover:text-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>
      </div>

      {/* Projects Grid */}
      <div className="pb-24 max-w-7xl mx-auto px-6">
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div 
                layout
                layoutId={`card-${project.id}`}
                onClick={() => setSelectedProject(project)}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={project.id} 
                className="group relative overflow-hidden bg-white flex flex-col rounded-3xl shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
              >
                <div className="relative h-72 w-full overflow-hidden rounded-t-3xl border-b border-gray-100">
                  <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 ease-in-out"
                  />
                  <div className="absolute top-4 right-4 z-20">
                    <span className="bg-white text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                      {project.status}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 text-white bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full text-sm">
                    <MapPin className="w-4 h-4" />
                    {project.location}
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col relative z-20 bg-white">
                  <span className="text-accent font-semibold text-xs tracking-widest uppercase block mb-2">{project.type}</span>
                  <h3 className="text-2xl font-display text-primary mb-4 group-hover:text-accent transition-colors">{project.title}</h3>
                  <p className="text-gray-600 mb-8 text-sm flex-1 leading-relaxed">{project.description}</p>
                  
                  <div className="flex justify-between items-center text-sm font-medium text-gray-800">
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400 uppercase tracking-wider">Scale</span>
                      <span>{project.units}</span>
                    </div>
                    <div className="w-[1px] h-8 bg-gray-200"></div>
                    <div className="flex flex-col text-right">
                      <span className="text-xs text-gray-400 uppercase tracking-wider">Timeline</span>
                      <span>{project.completion}</span>
                    </div>
                  </div>
                  
                  <div className="pt-6 mt-6 border-t border-gray-100">
                    <div className="flex items-center text-primary font-medium text-sm group/btn hover:text-accent transition-colors">
                      View Details
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-hidden">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-primary/60 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
            />
            
            <motion.div 
              layoutId={`card-${selectedProject.id}`}
              className="bg-white rounded-[2rem] w-full max-w-5xl relative z-10 overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
            >
              <button 
                onClick={() => setSelectedProject(null)} 
                className="absolute top-4 right-4 z-30 bg-white/50 hover:bg-white text-primary p-3 rounded-full backdrop-blur-md transition-all hover:scale-110 shadow-lg"
              >
                <X className="w-5 h-5"/>
              </button>
              
              <div className="w-full md:w-1/2 h-64 md:h-auto relative overflow-hidden">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title}
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                <div className="absolute top-6 left-6 z-20">
                  <span className="bg-white text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                    {selectedProject.status}
                  </span>
                </div>
                <div className="absolute bottom-6 left-6 z-20 flex items-center gap-2 text-white">
                  <MapPin className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium">{selectedProject.location}</span>
                </div>
              </div>
              
              <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto flex flex-col">
                <span className="text-accent font-semibold text-xs tracking-widest uppercase block mb-3">{selectedProject.type}</span>
                <h3 className="text-4xl font-display text-primary mb-8">{selectedProject.title}</h3>
                
                <h4 className="font-semibold text-gray-900 mb-3 text-lg">Project Overview</h4>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  {selectedProject.description}
                  <br/><br/>
                  This development embodies our commitment to superior craftsmanship, utilizing advanced materials and intelligent layouts. It is carefully planned to enrich the lives of its residents by offering a blend of privacy and community living spaces.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-10">
                  <div className="bg-gray-50 border border-gray-100 p-5 rounded-2xl flex flex-col justify-center items-start">
                    <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider block mb-1">Scale</span>
                    <span className="font-display font-medium text-xl text-primary">{selectedProject.units}</span>
                  </div>
                  <div className="bg-gray-50 border border-gray-100 p-5 rounded-2xl flex flex-col justify-center items-start">
                    <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider block mb-1">Timeline</span>
                    <span className="font-display font-medium text-xl text-primary">{selectedProject.completion}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
