import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Intro } from "@/components/sections/Intro";
import { WorkSection } from "@/components/sections/WorkSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { Experiments } from "@/components/sections/Experiments";
import { SpotlightSection } from "@/components/sections/SpotlightSection";
import { Manifesto } from "@/components/sections/Manifesto";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <Marquee />
      <Intro />
      <WorkSection />
      <ServicesSection />
      <Experiments />
      <SpotlightSection />
      <Manifesto />
      <Contact />
    </main>
  );
}
