import { EVENT } from "@/config/event";
import { PrimaryCta } from "./cta-button";

export function FinalCta() {
  return (
    <section
      className="bg-surface-dark text-surface-dark-foreground section-y"
      aria-labelledby="cta-final-titulo"
    >
      <div className="container-page text-center">
        <h2 id="cta-final-titulo" className="text-h2 uppercase">
          As vagas são limitadas
        </h2>
        <p className="text-body-lg mx-auto mt-4 max-w-2xl opacity-90">
          {EVENT.dateLabelLong}, às {EVENT.timeLabel}, na {EVENT.venue}. Garanta seu lugar na aula-show
          de pizza napoletana.
        </p>
        <div className="mt-8">
          <PrimaryCta position="final" />
        </div>
      </div>
    </section>
  );
}
