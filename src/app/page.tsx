import { SignupModalProvider } from "@/components/SignupModal";
import Nav from "@/components/site/Nav";
import Hero from "@/components/site/Hero";
import DishRail from "@/components/site/DishRail";
import HowItWorks from "@/components/site/HowItWorks";
import Week from "@/components/site/Week";
import NotTonight from "@/components/site/NotTonight";
import Family from "@/components/site/Family";
import Showcase from "@/components/site/Showcase";
import Trust from "@/components/site/Trust";
import FAQ from "@/components/site/FAQ";
import FinalCTA from "@/components/site/FinalCTA";
import Footer from "@/components/site/Footer";

export default function Home() {
  return (
    <SignupModalProvider>
      <Nav />
      <main>
        <Hero />
        <DishRail />
        <HowItWorks />
        <Week />
        <NotTonight />
        <Family />
        <Showcase />
        <Trust />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </SignupModalProvider>
  );
}
