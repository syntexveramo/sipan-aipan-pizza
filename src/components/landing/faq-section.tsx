import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ_ITEMS } from "@/config/event";

export function FaqSection() {
  return (
    <section id="faq" className="section-y" aria-labelledby="faq-titulo">
      <div className="container-page">
        <h2 id="faq-titulo" className="text-h2 uppercase">
          Perguntas frequentes
        </h2>
        <Accordion type="single" collapsible className="mt-8 max-w-3xl">
          {FAQ_ITEMS.map((item, index) => (
            <AccordionItem key={item.q} value={`faq-${index}`}>
              <AccordionTrigger className="text-left text-base font-semibold">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
