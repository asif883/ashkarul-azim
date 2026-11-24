import Providers from "@/components/Providers";
import Cursor from "@/components/Cursor";
import BackToTop from "@/components/BackToTop";
import Navbar from "@/components/Navbar";
import Hero from "./_sections/Hero";
import Intro from "./_sections/Intro";
import About from "./_sections/About";
import Expertise from "./_sections/Expertise";
import Services from "./_sections/Services";
import Experience from "./_sections/Experience";
import Achievements from "./_sections/Achievements";
import Education from "./_sections/Education";
import Skills from "./_sections/Skills";
import Philosophy from "./_sections/Philosophy";
import Contact from "./_sections/Contact";
import Footer from "./_sections/Footer";

export default function Home() {
  return (
    <Providers>
      <Cursor />
      <a href="#home" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-lime focus:px-4 focus:py-2">
        Skip to content
      </a>
      <Navbar />
      <main>
        <Hero />
        <Intro />
        <About />
        <Expertise />
        <Services />
        <Experience />
        <Achievements />
        <Education />
        <Skills />
        <Philosophy />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </Providers>
  );
}
