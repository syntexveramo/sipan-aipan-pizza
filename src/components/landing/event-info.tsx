import { CalendarDays, Clock, MapPin, Navigation } from "lucide-react";
import { EVENT } from "@/config/event";
import { SecondaryCta } from "./cta-button";
import { track } from "@/lib/analytics";

export function EventInfo() {
  return (
    <section id="local" className="section-y" aria-labelledby="local-titulo">
      <div className="container-page">
        <h2 id="local-titulo" className="text-h2 uppercase">
          Informações do evento
        </h2>

        <dl className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <dt className="text-caption text-muted-foreground flex items-center gap-2 font-semibold uppercase">
              <CalendarDays aria-hidden="true" className="size-4" /> Data
            </dt>
            <dd className="mt-2 font-semibold">{EVENT.dateLabelLong}</dd>
          </div>
          <div>
            <dt className="text-caption text-muted-foreground flex items-center gap-2 font-semibold uppercase">
              <Clock aria-hidden="true" className="size-4" /> Horário
            </dt>
            <dd className="mt-2 font-semibold">{EVENT.timeLabel}</dd>
          </div>
          <div>
            <dt className="text-caption text-muted-foreground flex items-center gap-2 font-semibold uppercase">
              <MapPin aria-hidden="true" className="size-4" /> Local
            </dt>
            <dd className="mt-2 font-semibold">{EVENT.venue}</dd>
          </div>
          <div>
            <dt className="text-caption text-muted-foreground flex items-center gap-2 font-semibold uppercase">
              <Navigation aria-hidden="true" className="size-4" /> Endereço
            </dt>
            <dd className="mt-2 font-semibold">{EVENT.address.full}</dd>
          </div>
        </dl>

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
      </div>
    </section>
  );
}
