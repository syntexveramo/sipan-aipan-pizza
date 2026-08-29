import { Flame, ScrollText, UtensilsCrossed } from "lucide-react";
import { motion } from "motion/react";

import { EXPERIENCE_ITEMS } from "@/config/event";
import { Reveal, staggerChild, StaggerGroup } from "./reveal";

const icons = {
  tecnicas: ScrollText,
  processo: Flame,
  degustacao: UtensilsCrossed,
} as const;

export function Experience() {
  return (
    <section id="experiencia" className="section-y" aria-labelledby="experiencia-titulo">
      <div className="container-page">
        <Reveal>
          <h2 id="experiencia-titulo" className="text-h2 uppercase">
            Da massa ao forno, uma experiência completa
          </h2>
        </Reveal>

        <StaggerGroup as="ul" className="mt-8 grid gap-5 md:mt-12 md:grid-cols-3">
          {EXPERIENCE_ITEMS.map((item, index) => {
            const Icon = icons[item.key];
            return (
              <motion.li
                key={item.key}
                variants={staggerChild}
                className="card-soft hover-lift p-6 md:p-7"
              >
                <div className="flex items-center gap-3">
                  <Icon aria-hidden="true" strokeWidth={1.5} className="size-7 text-primary" />
                  <span className="text-caption font-semibold text-muted-foreground uppercase">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="text-h3 mt-4 uppercase">{item.title}</h3>
                <p className="text-muted-foreground mt-2">{item.text}</p>
              </motion.li>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
