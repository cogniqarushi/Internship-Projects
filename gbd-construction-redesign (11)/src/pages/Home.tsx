import Hero from '../components/Hero';
import FeaturedProjects from '../components/FeaturedProjects';
import AboutUs from '../components/AboutUs';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <AboutUs />
      <Testimonials />
      <Contact />
    </>
  );
}
