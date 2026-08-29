import { motion, useReducedMotion } from "motion/react";

import chefAsset from "@/assets/chef-pizza-napoletana.jpg.asset.json";
import logoAsset from "@/assets/sipan-aipan-abc.png.asset.json";
import { EVENT } from "@/config/event";
import { EventStrip } from "./event-strip";
import { PrimaryCta } from "./cta-button";
import { staggerChild, StaggerGroup } from "./reveal";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero({ ctaRef }: { ctaRef: React.Ref<HTMLDivElement> }) {
  const reduce = useReducedMotion();

  return (
    <header className="relative overflow-hidden bg-surface-dark text-surface-dark-foreground">
      {/* Brilho de forno: profundidade sem escurecer demais */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-32 size-[38rem] rounded-full opacity-45 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, oklch(0.8109 0.1533 82.06 / 40%), transparent 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-52 -left-24 size-[32rem] rounded-full opacity-35 blur-3xl"
        style={{
          background: "radial-gradient(circle, oklch(0.5409 0.1997 29 / 45%), transparent 70%)",
        }}
      />

      <div className="container-page relative pt-8 pb-12 md:pt-10 md:pb-16 lg:pb-20">
        <motion.div
          className="flex items-center gap-3"
          initial={reduce ? {} : { opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <img
            src={logoAsset.url}
            alt="SIPAN AIPAN ABC"
            width={246}
            height={114}
            className="h-11 w-auto"
          />
          <span className="text-caption font-semibold uppercase opacity-80">{EVENT.eyebrow}</span>
        </motion.div>

        <div className="mt-8 grid items-center gap-8 lg:mt-12 lg:grid-cols-12 lg:gap-10">
          <StaggerGroup className="lg:col-span-6">
            <motion.h1 variants={staggerChild} className="text-h1 uppercase">
              A verdadeira
              <span className="text-gradient-heat mt-1 block">Pizza Napoletana</span>
              <span className="relative inline-block">
                <span className="font-script text-[0.62em] normal-case text-surface-dark-foreground">
                  ao vivo
                </span>
                <motion.span
                  aria-hidden="true"
                  className="absolute -bottom-1 left-0 h-[6px] w-full origin-left rounded-full bg-primary"
                  initial={reduce ? {} : { scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
                />
              </span>
            </motion.h1>

            <motion.p variants={staggerChild} className="text-body-lg measure mt-6 opacity-90">
              {EVENT.subtitle}
            </motion.p>

            <motion.div
              variants={staggerChild}
              ref={ctaRef}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <PrimaryCta position="hero" />
              <p className="text-sm opacity-80 sm:max-w-56">{EVENT.scarcityNote}</p>
            </motion.div>
          </StaggerGroup>

          <motion.div
            className="lg:col-span-6"
            initial={reduce ? {} : { opacity: 0, scale: 1.06, filter: "blur(14px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.1, ease: EASE }}
          >
            <img
              src={chefAsset.url}
              alt="Pizzaiolo retirando uma pizza napoletana do forno a lenha, com tomates, mussarela e manjericão sobre a bancada"
              width={1024}
              height={1536}
              fetchPriority="high"
              decoding="async"
              className="aspect-4/5 w-full rounded-[calc(var(--radius)+10px)] object-cover object-top shadow-[0_40px_90px_-40px_oklch(0_0_0/70%)] lg:aspect-3/4"
            />
          </motion.div>
        </div>

        <EventStrip className="mt-8 lg:mt-12" />
      </div>
    </header>
  );
}
