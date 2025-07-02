
import { SubScriptionPlan } from "@/components/SubScriptionPlan";
import { TestimonialsSection } from "@/components/testimonials-section";
import { Banner } from "@/components/web_components/Banner";
import FAQSection from "./faq/page";

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
