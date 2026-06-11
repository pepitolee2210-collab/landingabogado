import Shell from "@/components/Shell";
import Hero from "@/components/sections/Hero";
import Prologue from "@/components/sections/Prologue";
import Manifesto from "@/components/sections/Manifesto";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import Stats from "@/components/sections/Stats";
import Visas from "@/components/sections/Visas";
import Testimonials from "@/components/sections/Testimonials";
import CtaForm from "@/components/sections/CtaForm";
import Faq from "@/components/sections/Faq";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <Shell>
      <main>
        <Hero />
        <Prologue />
        <Manifesto />
        <Services />
        <Process />
        <Stats />
        <Visas />
        <Testimonials />
        <CtaForm />
        <Faq />
      </main>
      <Footer />
    </Shell>
  );
}
