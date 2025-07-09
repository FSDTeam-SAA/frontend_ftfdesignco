import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is your minimum order quantity?",
    answer:
      "Our minimum order quantity varies by product, but typically starts at 25 pieces for most items.",
  },
  {
    question: "How long does production take?",
    answer:
      "Standard production time is 7-10 business days after artwork approval. Rush orders are available for an additional fee.",
  },
  {
    question: "Do you offer custom designs?",
    answer:
      "Yes! We have an in-house design team that can help create custom designs for your brand.",
  },
  {
    question: "What are your payment terms?",
    answer:
      "We accept major credit cards, ACH transfers, and offer net-30 terms for qualified businesses.",
  },
  {
    question: "What are your payment terms?",
    answer:
      "We accept major credit cards, ACH transfers, and offer net-30 terms for qualified businesses.",
  },
  {
    question: "What are your payment terms?",
    answer:
      "We accept major credit cards, ACH transfers, and offer net-30 terms for qualified businesses.",
  },
  {
    question: "What are your payment terms?",
    answer:
      "We accept major credit cards, ACH transfers, and offer net-30 terms for qualified businesses.",
  },
];

export default function Page() {
  return (
    <section className="py-8 md:py-12 lg:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 md:mb-10 lg:mb-12 space-y-4 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#131313] font-bold">
            Frequently Asked Questions
          </h2>
          <p className="mx-auto max-w-[90%] sm:max-w-[700px] md:max-w-[800px] lg:max-w-2xl text-[#3F3F3F] text-sm sm:text-base md:text-lg font-normal leading-[150%]">
            Your guide to using Wellness Made Clear
          </p>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-[#0F0F0F] text-base sm:text-lg md:text-xl font-medium text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-[#424242] text-sm sm:text-base md:text-base font-normal leading-[150%]">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}