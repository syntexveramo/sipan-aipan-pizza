import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { track } from "@/lib/analytics";

export const FORM_ANCHOR_ID = "inscricao";

export function scrollToForm() {
  const el = document.getElementById(FORM_ANCHOR_ID);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  const firstField = el.querySelector<HTMLElement>("input, select, textarea");
  window.setTimeout(() => firstField?.focus({ preventScroll: true }), reduce ? 0 : 500);
}

type Position = "hero" | "sticky" | "final";

export function PrimaryCta({
  position,
  className,
  children = "Garanta sua vaga",
}: {
  position: Position;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={() => {
        track("event_cta_click", { position });
        scrollToForm();
      }}
      className={cn(
        "inline-flex h-[50px] items-center justify-center rounded-full px-8 text-base font-bold tracking-wide",
        "bg-primary text-primary-foreground transition-colors hover:bg-primary-hover active:bg-primary-active",
        "md:h-[52px]",
        className,
      )}
    >
      {children}
    </button>
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
        "inline-flex h-[50px] items-center justify-center gap-2 rounded-full border border-border-strong px-7",
        "text-base font-semibold text-foreground transition-colors hover:bg-muted md:h-[52px]",
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
        "inline-flex h-[50px] w-full items-center justify-center gap-2 rounded-full px-8 text-base font-bold",
        "bg-primary text-primary-foreground transition-colors hover:bg-primary-hover active:bg-primary-active",
        "disabled:opacity-50 md:h-[52px] sm:w-auto",
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
