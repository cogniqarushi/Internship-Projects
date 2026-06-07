import { Phone, Mail, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000); // Reset after 3 seconds
  };

  return (
    <section id="contact" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <span className="text-accent font-semibold tracking-wider uppercase text-sm mb-2 block">Reach Out</span>
          <h2 className="text-4xl md:text-5xl font-display font-medium text-primary">Start Your Journey Home</h2>
          <p className="mt-4 text-gray-500 text-lg">
            Whether you are looking to purchase a new condo or build your dream home, our team is ready to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Details & Map */}
          <div>
            <div className="bg-primary text-white p-10 shadow-xl mb-8">
              <h3 className="text-2xl font-display mb-8">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <span className="block text-white/50 text-sm font-medium mb-1">Phone</span>
                    <a href="tel:+14504726303" className="text-lg hover:text-accent transition-colors">+1 450-472-6303</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <span className="block text-white/50 text-sm font-medium mb-1">Email</span>
                    <a href="mailto:info@gbdconstruction.ca" className="text-lg hover:text-accent transition-colors">info@gbdconstruction.ca</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <span className="block text-white/50 text-sm font-medium mb-1">Head Office</span>
                    <p className="text-lg">North Shore (Rive-Nord)<br/>Montreal, QC, Canada</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Simple Map Placeholder */}
            <a href="https://maps.google.com/?q=Montreal+North+Shore" target="_blank" rel="noopener noreferrer" className="h-[250px] w-full bg-gray-200 relative overflow-hidden group block cursor-pointer">
              <img 
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800" 
                alt="Map View" 
                className="w-full h-full object-cover mix-blend-multiply opacity-50 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white px-4 py-2 shadow-lg flex items-center gap-2 font-medium text-primary group-hover:bg-accent group-hover:text-white transition-colors">
                  <MapPin className="w-4 h-4 group-hover:text-white text-accent transition-colors" /> View on Google Maps
                </div>
              </div>
            </a>
          </div>

          {/* Contact Form */}
          <div className="bg-[#fafafa] p-10 border border-gray-100">
            <h3 className="text-2xl font-display text-primary mb-6">Send a Message</h3>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input required type="text" id="firstName" className="w-full border-b-2 border-gray-200 bg-transparent py-2 focus:outline-none focus:border-accent transition-colors" placeholder="John" />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input required type="text" id="lastName" className="w-full border-b-2 border-gray-200 bg-transparent py-2 focus:outline-none focus:border-accent transition-colors" placeholder="Doe" />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input required type="email" id="email" className="w-full border-b-2 border-gray-200 bg-transparent py-2 focus:outline-none focus:border-accent transition-colors" placeholder="john@example.com" />
              </div>

              <div>
                <label htmlFor="interest" className="block text-sm font-medium text-gray-700 mb-2">I am interested in</label>
                <select id="interest" className="w-full border-b-2 border-gray-200 bg-transparent py-2 focus:outline-none focus:border-accent transition-colors text-gray-600">
                  <option>New Home Construction</option>
                  <option>New Condo Development</option>
                  <option>Turnkey Solutions</option>
                  <option>Other Inquiry</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea required id="message" rows={4} className="w-full border-b-2 border-gray-200 bg-transparent py-2 focus:outline-none focus:border-accent transition-colors resize-none" placeholder="How can we help you?"></textarea>
              </div>

              <button type="submit" className="w-full py-4 bg-primary text-white font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                {isSubmitted ? (
                  <>Message Sent <CheckCircle2 className="w-4 h-4" /></>
                ) : (
                  <>Send Inquiry <Send className="w-4 h-4" /></>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
