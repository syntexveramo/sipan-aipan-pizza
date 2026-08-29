import { z } from "zod";

export const MEMBERSHIP_OPTIONS = [
  { value: "associado", label: "Associado SIPAN AIPAN" },
  { value: "nao_associado", label: "Não associado" },
  { value: "nao_sei", label: "Não sei informar" },
] as const;

/** Mantém apenas dígitos e valida telefone brasileiro com DDD (10 ou 11 dígitos). */
export function normalizeWhatsapp(value: string): string {
  return value.replace(/\D/g, "").replace(/^0+/, "").replace(/^55(?=\d{10,11}$)/, "");
}

export function maskWhatsapp(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits.length ? `(${digits}` : "";
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10)
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export const registrationSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, { message: "Informe seu nome completo" })
    .max(120, { message: "O nome deve ter até 120 caracteres" }),
  whatsapp: z
    .string()
    .trim()
    .min(1, { message: "Informe seu WhatsApp com DDD" })
    .refine((v) => /^\d{10,11}$/.test(normalizeWhatsapp(v)), {
      message: "Informe um WhatsApp válido com DDD",
    }),
  email: z
    .string()
    .trim()
    .min(1, { message: "Informe seu e-mail" })
    .email({ message: "Informe um e-mail válido" })
    .max(255, { message: "O e-mail deve ter até 255 caracteres" }),
  company: z
    .string()
    .trim()
    .min(2, { message: "Informe sua empresa ou estabelecimento" })
    .max(120, { message: "Use até 120 caracteres" }),
  membership: z.enum(["associado", "nao_associado", "nao_sei"], {
    errorMap: () => ({ message: "Selecione sua situação" }),
  }),
  roleTitle: z.string().trim().max(80, { message: "Use até 80 caracteres" }).optional(),
  consentEvent: z.literal(true, {
    errorMap: () => ({ message: "É necessário autorizar o uso dos dados para se inscrever" }),
  }),
  consentMarketing: z.boolean().optional(),
  /** Honeypot anti-spam: precisa ficar vazio. */
  website: z.string().max(0).optional(),
  utm: z
    .object({
      source: z.string().max(120).optional(),
      medium: z.string().max(120).optional(),
      campaign: z.string().max(120).optional(),
      content: z.string().max(120).optional(),
      term: z.string().max(120).optional(),
    })
    .optional(),
});

export type RegistrationInput = z.infer<typeof registrationSchema>;

export type RegistrationResult =
  | { status: "received" }
  | { status: "waitlisted" }
  | { status: "duplicate" }
  | { status: "error"; message: string };
