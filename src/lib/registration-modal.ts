import { useEffect, useState } from "react";

const EVENT_NAME = "registration:open";

/** Abre o formulário de inscrição em modal (estilo typeform). */
export function openRegistration(position: string) {
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: { position } }));
}

export function useRegistrationModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener(EVENT_NAME, handler as EventListener);
    return () => window.removeEventListener(EVENT_NAME, handler as EventListener);
  }, []);

  return { open, setOpen };
}
