import ContactForm from '../components/Contact';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function Contact() {
  return (
    <div className="pt-24 min-h-screen bg-[#fafafa]">
      {/* Page Header */}
      <div className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/[0.02] pointer-events-none" />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-5xl font-display font-medium text-primary mb-6">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
            We are here to answer your questions and guide you through the process of acquiring your new property.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-24">
        {/* Additional Contact Info Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          <div className="bg-gray-50 p-8 text-center border border-gray-100 hover:border-accent transition-colors">
            <Phone className="w-8 h-8 text-accent mx-auto mb-4" />
            <h3 className="font-display font-medium text-primary text-lg mb-2">Call Us</h3>
            <p className="text-gray-600">+1 450-472-6303</p>
          </div>
          <div className="bg-gray-50 p-8 text-center border border-gray-100 hover:border-accent transition-colors">
            <Mail className="w-8 h-8 text-accent mx-auto mb-4" />
            <h3 className="font-display font-medium text-primary text-lg mb-2">Email Us</h3>
            <p className="text-gray-600">info@gbdconstruction.ca</p>
          </div>
          <div className="bg-gray-50 p-8 text-center border border-gray-100 hover:border-accent transition-colors">
            <MapPin className="w-8 h-8 text-accent mx-auto mb-4" />
            <h3 className="font-display font-medium text-primary text-lg mb-2">Visit Office</h3>
            <p className="text-gray-600">North Shore, QC</p>
          </div>
          <div className="bg-gray-50 p-8 text-center border border-gray-100 hover:border-accent transition-colors">
            <Clock className="w-8 h-8 text-accent mx-auto mb-4" />
            <h3 className="font-display font-medium text-primary text-lg mb-2">Opening Hours</h3>
            <p className="text-gray-600">Mon - Fri: 9am - 5pm</p>
          </div>
        </div>

        {/* Use the existing Contact form component */}
        {/* We wrap it in a slightly different layout to match the page vibe, but we can just render the component */}
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
             <h2 className="text-3xl md:text-4xl font-display text-primary mb-4">Send us a direct message</h2>
             <p className="text-gray-600">Fill out the form below and one of our representatives will contact you shortly.</p>
          </div>
          
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
