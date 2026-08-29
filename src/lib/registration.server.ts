import {
  normalizeWhatsapp,
  type RegistrationInput,
  type RegistrationResult,
} from "./registration-schema";
import { EVENT } from "@/config/event";

/** Rate limit simples em memória por instância (best-effort, complementa o honeypot). */
const attempts = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

export function rateLimit(key: string): boolean {
  const now = Date.now();
  const entry = attempts.get(key);
  if (!entry || entry.resetAt < now) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  entry.count += 1;
  return entry.count <= MAX_PER_WINDOW;
}

export async function persistRegistration(
  data: RegistrationInput,
): Promise<RegistrationResult> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

  const emailNormalized = data.email.trim().toLowerCase();
  const whatsappNormalized = normalizeWhatsapp(data.whatsapp);

  const { count, error: countError } = await supabaseAdmin
    .from("event_registrations")
    .select("id", { count: "exact", head: true })
    .eq("event_id", EVENT.id)
    .in("registration_status", ["received", "confirmed"]);

  if (countError) {
    console.error("count registrations failed", countError);
    return { status: "error", message: "Não foi possível registrar sua inscrição agora." };
  }

  const isFull = (count ?? 0) >= EVENT.capacity;
  const now = new Date().toISOString();

  const { error } = await supabaseAdmin.from("event_registrations").insert({
    event_id: EVENT.id,
    full_name: data.fullName.trim(),
    email_normalized: emailNormalized,
    whatsapp_normalized: whatsappNormalized,
    company_name: data.company.trim(),
    membership_status: data.membership,
    role_title: data.roleTitle?.trim() || null,
    registration_status: isFull ? "waitlisted" : "received",
    consent_event_at: now,
    consent_marketing_at: data.consentMarketing ? now : null,
    utm_source: data.utm?.source ?? null,
    utm_medium: data.utm?.medium ?? null,
    utm_campaign: data.utm?.campaign ?? null,
    utm_content: data.utm?.content ?? null,
    utm_term: data.utm?.term ?? null,
  });

  if (error) {
    // 23505 = unique_violation (e-mail ou WhatsApp já inscritos neste evento)
    if (error.code === "23505") {
      return { status: "duplicate" };
    }
    console.error("insert registration failed", error);
    return { status: "error", message: "Não foi possível registrar sua inscrição agora." };
  }

  return isFull ? { status: "waitlisted" } : { status: "received" };
}
