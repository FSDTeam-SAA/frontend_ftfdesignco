
import FAQSection from "@/components/FAQSection";
import { SubScriptionPlan } from "@/components/SubScriptionPlan";
import { TestimonialsSection } from "@/components/testimonials-section";
import { Banner } from "@/components/web_components/Banner";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Banner />
      <SubScriptionPlan />
      <TestimonialsSection/> 
      <FAQSection/> 
    </div>
  );
} 
