import { Hero } from "@/components/sections/Hero";
import { Intro } from "@/components/sections/Intro";
import { Experiments } from "@/components/sections/Experiments";
import { Manifesto } from "@/components/sections/Manifesto";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <Intro />
      <Experiments />
      <Manifesto />
      <Contact />
    </main>
  );
}
