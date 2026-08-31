import { CalendarDays, Clock, MapPin, Navigation } from "lucide-react";
import { motion } from "motion/react";

import { EVENT } from "@/config/event";
import { SecondaryCta } from "./cta-button";
import { track } from "@/lib/analytics";
import { Reveal, staggerChild, StaggerGroup } from "./reveal";

const details = [
  { icon: CalendarDays, label: "Data", value: EVENT.dateLabelLong },
  { icon: Clock, label: "Horário", value: EVENT.timeLabel },
  { icon: MapPin, label: "Local", value: EVENT.venue },
  { icon: Navigation, label: "Endereço", value: EVENT.address.full },
];

export function EventInfo() {
  return (
    <section id="local" className="section-y" aria-labelledby="local-titulo">
      <div className="container-page">
        <Reveal>
          <h2 id="local-titulo" className="text-h2 uppercase">
            Informações do evento
          </h2>
        </Reveal>

        <StaggerGroup className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {details.map(({ icon: Icon, label, value }) => (
            <motion.dl key={label} variants={staggerChild} className="card-soft hover-lift p-5">
              <dt className="text-caption text-muted-foreground flex items-center gap-2 font-semibold uppercase">
                <Icon aria-hidden="true" className="size-4" /> {label}
              </dt>
              <dd className="mt-2 font-semibold">{value}</dd>
            </motion.dl>
          ))}
        </StaggerGroup>

        <Reveal delay={0.1}>
          <div className="mt-8">
            <SecondaryCta
              href={EVENT.mapUrl}
              onClick={() => track("event_map_click")}
              className="w-full sm:w-auto"
            >
              <Navigation aria-hidden="true" className="size-4" />
              Ver rota no mapa
              <span className="sr-only"> (abre em nova aba)</span>
            </SecondaryCta>
          </div>

          {EVENT.venueAccessNote ? (
            <p className="text-muted-foreground mt-4 text-sm">{EVENT.venueAccessNote}</p>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}
