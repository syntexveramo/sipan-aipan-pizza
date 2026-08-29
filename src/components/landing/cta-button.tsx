import { Loader2 } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { track } from "@/lib/analytics";
import { openRegistration } from "@/lib/registration-modal";

export const FORM_ANCHOR_ID = "inscricao";

type Position = "hero" | "sticky" | "final" | "info";

export function PrimaryCta({
  position,
  className,
  children = "Garanta sua vaga",
}: {
  position: Position;
  className?: string;
  children?: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.button
      type="button"
      onClick={() => {
        track("event_cta_click", { position });
        openRegistration(position);
      }}
      whileHover={reduce ? {} : { y: -2, scale: 1.015 }}
      whileTap={reduce ? {} : { scale: 0.98 }}
      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "transition-soft relative inline-flex h-[52px] items-center justify-center overflow-hidden rounded-full px-8 text-base font-bold tracking-wide",
        "bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active",
        "shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-glow)] md:h-[56px]",
        className,
      )}
    >
      <span className="relative z-10">{children}</span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(100deg,transparent,oklch(1_0_0/35%),transparent)] transition-transform duration-700 ease-[var(--ease-out-soft)] hover:translate-x-full"
      />
    </motion.button>
  );
}

export function SecondaryCta({
  href,
  children,
  onClick,
  className,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className={cn(
        "transition-soft inline-flex h-[52px] items-center justify-center gap-2 rounded-full border border-border-strong px-7",
        "text-base font-semibold text-foreground hover:-translate-y-0.5 hover:bg-muted md:h-[56px]",
        className,
      )}
    >
      {children}
    </a>
  );
}

export function SubmitButton({
  isSubmitting,
  className,
}: {
  isSubmitting: boolean;
  className?: string;
}) {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className={cn(
        "transition-soft inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-full px-8 text-base font-bold",
        "bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active",
        "disabled:opacity-50 sm:w-auto md:h-[56px]",
        className,
      )}
    >
      {isSubmitting ? (
        <>
          <Loader2 aria-hidden="true" className="size-4 animate-spin" />
          Enviando inscrição...
        </>
      ) : (
        "Confirmar inscrição"
      )}
    </button>
  );
}
