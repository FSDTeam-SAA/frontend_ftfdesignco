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
    <section className="py-24">
      <div className="container mx-auto">
        <div className="mb-12 space-y-2 text-center">
          <h2 className="text-5xl font-bold text-center">
            Frequently Asked Questions
          </h2>
          <p className="max-w-2xl mx-auto">
            Your guide to using Wellness Made Clear
          </p>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
