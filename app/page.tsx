import { MainHeader } from "@/components/landing/MainHeader";
import { HeroSection } from "@/components/landing/HeroSection";
import { TrustLogosSection } from "@/components/landing/TrustLogosSection";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { FinalCTASection } from "@/components/landing/FinalCTASection";
import { MainFooter } from "@/components/landing/MainFooter";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-jakarta selection:bg-brand-emerald selection:text-white">
      <MainHeader />
      <main>
        <HeroSection />
        <TrustLogosSection />
        <ProblemSection />
        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <PricingSection />
        <FinalCTASection />
      </main>
      <MainFooter />
    </div>
  );
}
