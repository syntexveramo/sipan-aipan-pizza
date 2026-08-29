/**
 * Camada de analytics do evento.
 * REGRA: nunca enviar nome, e-mail, telefone ou empresa — apenas eventos e metadados neutros.
 */

type AnalyticsPayload = Record<string, string | number | boolean | undefined>;

export type AnalyticsEvent =
  | "event_page_view"
  | "event_cta_click"
  | "event_form_start"
  | "event_form_field_error"
  | "event_registration_submit"
  | "event_registration_success"
  | "event_registration_duplicate"
  | "event_registration_waitlist"
  | "event_map_click";

declare global {
  interface Window {
    dataLayer?: AnalyticsPayload[];
  }
}

export function track(event: AnalyticsEvent, payload: AnalyticsPayload = {}) {
  if (typeof window === "undefined") return;
  const safePayload: AnalyticsPayload = { event, ...payload };
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(safePayload);
}

export type Utm = {
  source?: string | undefined;
  medium?: string | undefined;
  campaign?: string | undefined;
  content?: string | undefined;
  term?: string | undefined;
};

export function readUtm(): Utm {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const pick = (key: string) => params.get(key)?.slice(0, 120) || undefined;
  return {
    source: pick("utm_source"),
    medium: pick("utm_medium"),
    campaign: pick("utm_campaign"),
    content: pick("utm_content"),
    term: pick("utm_term"),
  };
}
