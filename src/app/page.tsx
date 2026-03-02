import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import FleetSection from "@/components/FleetSection";
import PartnersSection from "@/components/PartnersSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505]">
      <Header />
      <HeroSection />
      <ServicesSection />
      <FleetSection />
      <PartnersSection />
      <CTASection />
      <Footer />
    </main>
  );
}
