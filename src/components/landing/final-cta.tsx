import { EVENT } from "@/config/event";
import { FORM_ANCHOR_ID, PrimaryCta } from "./cta-button";
import { Reveal } from "./reveal";

export function FinalCta() {
  return (
    <section
      id={FORM_ANCHOR_ID}
      className="bg-surface-dark text-surface-dark-foreground section-y relative overflow-hidden scroll-mt-4"
      aria-labelledby="cta-final-titulo"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 size-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl"
        style={{
          background: "radial-gradient(circle, oklch(0.5409 0.1997 29 / 40%), transparent 70%)",
        }}
      />
      <div className="container-page relative text-center">
        <Reveal>
          <h2 id="cta-final-titulo" className="text-h2 uppercase">
            As vagas são limitadas
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="text-body-lg mx-auto mt-4 max-w-2xl opacity-90">
            {EVENT.dateLabelLong}, às {EVENT.timeLabel}, na {EVENT.venue}. Garanta seu lugar na
            aula-show de pizza napoletana.
          </p>
        </Reveal>
        <Reveal delay={0.16}>
          <div className="mt-8">
            <PrimaryCta position="final" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
