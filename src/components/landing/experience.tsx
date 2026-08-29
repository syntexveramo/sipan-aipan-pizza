import { Flame, ScrollText, UtensilsCrossed } from "lucide-react";
import { EXPERIENCE_ITEMS } from "@/config/event";

const icons = {
  tecnicas: ScrollText,
  processo: Flame,
  degustacao: UtensilsCrossed,
} as const;

export function Experience() {
  return (
    <section id="experiencia" className="section-y" aria-labelledby="experiencia-titulo">
      <div className="container-page">
        <h2 id="experiencia-titulo" className="text-h2 uppercase">
          Da massa ao forno, uma experiência completa
        </h2>

        <ul className="mt-8 grid gap-8 md:mt-12 md:grid-cols-3 md:gap-6">
          {EXPERIENCE_ITEMS.map((item, index) => {
            const Icon = icons[item.key];
            return (
              <li
                key={item.key}
                className="border-t border-border-strong pt-5 md:border-t-0 md:border-l md:pt-0 md:pl-6 md:first:border-l-0 md:first:pl-0"
              >
                <div className="flex items-center gap-3">
                  <Icon aria-hidden="true" strokeWidth={1.5} className="size-7 text-primary" />
                  <span className="text-caption font-semibold text-muted-foreground uppercase">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="text-h3 mt-4 uppercase">{item.title}</h3>
                <p className="text-muted-foreground mt-2">{item.text}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
