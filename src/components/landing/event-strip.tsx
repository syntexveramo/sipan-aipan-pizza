import { CalendarDays, Clock, MapPin } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { EVENT } from "@/config/event";
import { cn } from "@/lib/utils";

const items = [
  { icon: CalendarDays, label: "Data", value: EVENT.dateLabel, sub: EVENT.weekdayLabel },
  { icon: Clock, label: "Horário", value: EVENT.timeLabel, sub: "Início pontual" },
  {
    icon: MapPin,
    label: "Local",
    value: EVENT.venue,
    sub: `${EVENT.address.city}/${EVENT.address.state}`,
  },
];

/** Faixa do evento inspirada em ticket de cozinha: organiza informação real. */
export function EventStrip({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? {} : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "relative overflow-hidden rounded-[calc(var(--radius)+6px)] border border-[var(--surface-dark-border)] bg-[var(--strip-bg)] text-[var(--strip-fg)] shadow-[0_24px_60px_-32px_oklch(0_0_0/70%)]",
        className,
      )}
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-[var(--strip-accent)]" aria-hidden="true" />
      <dl className="grid grid-cols-1 divide-y divide-white/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {items.map(({ icon: Icon, label, value, sub }) => (
          <div
            key={label}
            className="transition-soft flex items-start gap-3 px-5 py-4 hover:bg-white/5 md:px-6 md:py-5"
          >
            <Icon aria-hidden="true" className="mt-1 size-5 shrink-0 text-[var(--strip-accent)]" />
            <div>
              <dt className="text-caption font-semibold uppercase opacity-70">{label}</dt>
              <dd className="text-h3 mt-0.5 uppercase">{value}</dd>
              <dd className="text-sm opacity-70">{sub}</dd>
            </div>
          </div>
        ))}
      </dl>
    </motion.div>
  );
}
