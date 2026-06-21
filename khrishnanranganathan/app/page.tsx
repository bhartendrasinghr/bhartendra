import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Teaching } from "@/components/Teaching";
import { WritingPreview } from "@/components/WritingPreview";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Teaching />
        <WritingPreview />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
