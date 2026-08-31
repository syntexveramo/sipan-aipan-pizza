import { motion, useReducedMotion } from "motion/react";

import chefAsset from "@/assets/chef-pizza-napoletana.jpg.asset.json";
import { EVENT } from "@/config/event";
import { Reveal } from "./reveal";

export function ChefSection() {
  const reduce = useReducedMotion();

  return (
    <section id="chef" className="bg-muted section-y" aria-labelledby="chef-titulo">
      <div className="container-page grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
        <motion.div
          className="lg:col-span-5"
          initial={reduce ? {} : { opacity: 0, y: 32, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src={chefAsset.url}
            alt="Chef preparando pizza napoletana ao lado do forno a lenha"
            width={1024}
            height={1536}
            loading="lazy"
            decoding="async"
            className="aspect-4/5 w-full rounded-[calc(var(--radius)+10px)] object-cover object-top shadow-[var(--shadow-lift)]"
          />
        </motion.div>
        <div className="lg:col-span-7">
          <Reveal>
            <p className="text-caption font-semibold text-muted-foreground uppercase">
              {EVENT.format}
            </p>
            <h2 id="chef-titulo" className="text-h2 mt-3 uppercase">
              Aula-show com chef Claudio Neves
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-body-lg measure mt-5">{EVENT.chefBio}</p>
            <p className="text-muted-foreground measure mt-4 text-sm">
              A apresentação acontece ao vivo, com acompanhamento das etapas de preparo e degustação
              ao final.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
