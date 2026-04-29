import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Studies from "@/components/sections/Studies";
import Projects from "@/components/sections/Projects";
import FreelanceProjects from "@/components/sections/FreelanceProjects";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";
import MarqueeBar from "@/components/ui/MarqueeBar";
import StatsBar from "@/components/sections/StatsBar";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <MarqueeBar />
      <About />
      <StatsBar />
      <Services />
      <Studies />
      <Projects />
      <FreelanceProjects />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
