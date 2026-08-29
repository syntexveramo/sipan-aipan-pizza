import { CalendarDays, Clock, MapPin } from "lucide-react";
import { EVENT } from "@/config/event";
import { cn } from "@/lib/utils";

const items = [
  { icon: CalendarDays, label: "Data", value: EVENT.dateLabel, sub: EVENT.weekdayLabel },
  { icon: Clock, label: "Horário", value: EVENT.timeLabel, sub: "Início pontual" },
  { icon: MapPin, label: "Local", value: EVENT.venue, sub: `${EVENT.address.city}/${EVENT.address.state}` },
];

/** Faixa do evento inspirada em ticket de cozinha: organiza informação real. */
export function EventStrip({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl bg-[var(--strip-bg)] text-[var(--strip-fg)]",
        className,
      )}
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-[var(--strip-accent)]" aria-hidden="true" />
      <dl className="grid grid-cols-1 divide-y divide-white/15 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {items.map(({ icon: Icon, label, value, sub }) => (
          <div key={label} className="flex items-start gap-3 px-5 py-4 md:px-6 md:py-5">
            <Icon
              aria-hidden="true"
              className="mt-1 size-5 shrink-0 text-[var(--strip-accent)]"
              strokeWidth={1.75}
            />
            <div>
              <dt className="text-caption font-semibold uppercase opacity-80">{label}</dt>
              <dd className="font-display text-xl leading-tight font-bold sm:text-2xl">
                {value}
                <span className="block font-sans text-sm font-normal opacity-75">{sub}</span>
              </dd>
            </div>
          </div>
        ))}
      </dl>
    </div>
  );
}
