
import FAQSection from "@/components/FAQSection";
import { SubScriptionPlan } from "@/components/SubScriptionPlan";
import { TestimonialsSection } from "@/components/testimonials-section";
import { Banner } from "@/components/web_components/Banner";
import Banner2 from "@/components/web_components/Banner2";
import Trusted_by from "@/components/web_components/Trusted_by";
import Why_We_Are_Different from "@/components/web_components/Why_We_Are_Different";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Banner  />
      <Trusted_by/>
      <SubScriptionPlan />
      <Banner2/>
      <Why_We_Are_Different/>
      <TestimonialsSection/> 
      <FAQSection/> 
    </div>
  );
} 
