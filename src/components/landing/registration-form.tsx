import { useEffect, useId, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useServerFn } from "@tanstack/react-start";
import { CalendarDays, CheckCircle2, Clock, MapPin } from "lucide-react";

import { EVENT } from "@/config/event";
import { submitRegistration } from "@/lib/registration.functions";
import {
  MEMBERSHIP_OPTIONS,
  maskWhatsapp,
  registrationSchema,
  type RegistrationInput,
  type RegistrationResult,
} from "@/lib/registration-schema";
import { readUtm, track, type Utm } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { FORM_ANCHOR_ID, SubmitButton } from "./cta-button";

const fieldClass =
  "h-[50px] w-full rounded-xl border bg-[var(--field-bg)] px-4 text-base text-[var(--field-fg)] " +
  "placeholder:text-[var(--field-placeholder)] md:h-[52px]";

function FieldError({ id, message }: { id: string; message?: string | undefined }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 text-sm font-medium text-destructive">
      {message}
    </p>
  );
}

export function RegistrationForm() {
  const uid = useId();
  const [result, setResult] = useState<RegistrationResult | null>(null);
  const [utm, setUtm] = useState<Utm>({});
  const startedRef = useRef(false);
  const submittingRef = useRef(false);

  useEffect(() => {
    setUtm(readUtm());
  }, []);

  const submit = useServerFn(submitRegistration);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationInput>({
    resolver: zodResolver(registrationSchema),
    mode: "onBlur",
    defaultValues: {
      fullName: "",
      whatsapp: "",
      email: "",
      company: "",
      roleTitle: "",
      consentMarketing: false,
      website: "",
    },
  });

  const onFirstInteraction = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    track("event_form_start");
  };

  const onSubmit = handleSubmit(
    async (values) => {
      if (submittingRef.current) return;
      submittingRef.current = true;
      track("event_registration_submit");
      try {
        const response = await submit({ data: { ...values, utm } });
        setResult(response);
        if (response.status === "received") track("event_registration_success");
        if (response.status === "waitlisted") track("event_registration_waitlist");
        if (response.status === "duplicate") track("event_registration_duplicate");
      } catch (error) {
        console.error(error);
        setResult({
          status: "error",
          message: "Não conseguimos enviar sua inscrição. Tente novamente em instantes.",
        });
      } finally {
        submittingRef.current = false;
      }
    },
    (formErrors) => {
      Object.keys(formErrors).forEach((field) => track("event_form_field_error", { field }));
    },
  );

  const isSuccess = result?.status === "received" || result?.status === "waitlisted";

  return (
    <section
      id={FORM_ANCHOR_ID}
      className="bg-muted section-y scroll-mt-4"
      aria-labelledby="inscricao-titulo"
    >
      <div className="container-page max-w-3xl">
        <h2 id="inscricao-titulo" className="text-h2 uppercase">
          {isSuccess ? "Inscrição recebida" : "Reserve sua participação"}
        </h2>

        {isSuccess ? (
          <div className="mt-6 rounded-xl border border-[var(--content-card-border)] bg-card p-6">
            <p className="flex items-start gap-3 text-body-lg">
              <CheckCircle2 aria-hidden="true" className="mt-1 size-5 shrink-0 text-success" />
              <span>
                {result?.status === "waitlisted"
                  ? "As vagas disponíveis foram preenchidas e seus dados entraram na lista de espera. A organização entrará em contato pelo e-mail ou WhatsApp informado."
                  : "Seus dados foram enviados. A confirmação da vaga será encaminhada para o e-mail ou WhatsApp informado."}
              </span>
            </p>
            <dl className="mt-6 grid gap-4 border-t border-border pt-6 sm:grid-cols-3">
              <div>
                <dt className="text-caption text-muted-foreground flex items-center gap-2 uppercase">
                  <CalendarDays aria-hidden="true" className="size-4" /> Data
                </dt>
                <dd className="mt-1 font-semibold">{EVENT.dateLabelLong}</dd>
              </div>
              <div>
                <dt className="text-caption text-muted-foreground flex items-center gap-2 uppercase">
                  <Clock aria-hidden="true" className="size-4" /> Horário
                </dt>
                <dd className="mt-1 font-semibold">{EVENT.timeLabel}</dd>
              </div>
              <div>
                <dt className="text-caption text-muted-foreground flex items-center gap-2 uppercase">
                  <MapPin aria-hidden="true" className="size-4" /> Local
                </dt>
                <dd className="mt-1 font-semibold">{EVENT.venueShort}</dd>
              </div>
            </dl>
          </div>
        ) : (
          <>
            <p className="text-body-lg measure mt-4">
              Preencha seus dados para receber a confirmação do evento.
            </p>

            {result?.status === "duplicate" ? (
              <p
                role="alert"
                className="mt-6 rounded-xl border border-border-strong bg-card p-4 text-sm font-medium"
              >
                Já existe uma inscrição com este e-mail ou WhatsApp. Confira sua caixa de entrada
                ou fale com a organização.
              </p>
            ) : null}

            {result?.status === "error" ? (
              <p
                role="alert"
                className="mt-6 rounded-xl border border-destructive bg-card p-4 text-sm font-medium text-destructive"
              >
                {result.message} Se preferir, fale com a organização em {EVENT.supportContact}.
              </p>
            ) : null}

            <form noValidate onSubmit={onSubmit} onChange={onFirstInteraction} className="mt-8 grid gap-5">
              <div>
                <label htmlFor={`${uid}-name`} className="block text-sm font-semibold">
                  Nome completo
                </label>
                <input
                  id={`${uid}-name`}
                  type="text"
                  autoComplete="name"
                  placeholder="Ex.: Maria Oliveira"
                  aria-invalid={Boolean(errors.fullName)}
                  aria-describedby={errors.fullName ? `${uid}-name-error` : undefined}
                  className={cn(fieldClass, "mt-1.5", errors.fullName && "border-destructive")}
                  style={{ borderColor: errors.fullName ? undefined : "var(--field-border)" }}
                  {...register("fullName")}
                />
                <FieldError id={`${uid}-name-error`} message={errors.fullName?.message} />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor={`${uid}-whatsapp`} className="block text-sm font-semibold">
                    WhatsApp com DDD
                  </label>
                  <input
                    id={`${uid}-whatsapp`}
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel-national"
                    placeholder="(11) 90000-0000"
                    aria-invalid={Boolean(errors.whatsapp)}
                    aria-describedby={errors.whatsapp ? `${uid}-whatsapp-error` : undefined}
                    className={cn(fieldClass, "mt-1.5", errors.whatsapp && "border-destructive")}
                    style={{ borderColor: errors.whatsapp ? undefined : "var(--field-border)" }}
                    {...register("whatsapp", {
                      onChange: (event) => {
                        setValue("whatsapp", maskWhatsapp(event.target.value), {
                          shouldValidate: false,
                        });
                      },
                    })}
                  />
                  <FieldError id={`${uid}-whatsapp-error`} message={errors.whatsapp?.message} />
                </div>

                <div>
                  <label htmlFor={`${uid}-email`} className="block text-sm font-semibold">
                    E-mail
                  </label>
                  <input
                    id={`${uid}-email`}
                    type="email"
                    autoComplete="email"
                    placeholder="voce@empresa.com.br"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? `${uid}-email-error` : undefined}
                    className={cn(fieldClass, "mt-1.5", errors.email && "border-destructive")}
                    style={{ borderColor: errors.email ? undefined : "var(--field-border)" }}
                    {...register("email")}
                  />
                  <FieldError id={`${uid}-email-error`} message={errors.email?.message} />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor={`${uid}-company`} className="block text-sm font-semibold">
                    Empresa ou estabelecimento
                  </label>
                  <input
                    id={`${uid}-company`}
                    type="text"
                    autoComplete="organization"
                    placeholder="Ex.: Padaria Central"
                    aria-invalid={Boolean(errors.company)}
                    aria-describedby={errors.company ? `${uid}-company-error` : undefined}
                    className={cn(fieldClass, "mt-1.5", errors.company && "border-destructive")}
                    style={{ borderColor: errors.company ? undefined : "var(--field-border)" }}
                    {...register("company")}
                  />
                  <FieldError id={`${uid}-company-error`} message={errors.company?.message} />
                </div>

                <div>
                  <label htmlFor={`${uid}-role`} className="block text-sm font-semibold">
                    Cargo ou função <span className="text-muted-foreground">(opcional)</span>
                  </label>
                  <input
                    id={`${uid}-role`}
                    type="text"
                    placeholder="Ex.: pizzaiolo"
                    aria-invalid={Boolean(errors.roleTitle)}
                    aria-describedby={errors.roleTitle ? `${uid}-role-error` : undefined}
                    className={cn(fieldClass, "mt-1.5", errors.roleTitle && "border-destructive")}
                    style={{ borderColor: errors.roleTitle ? undefined : "var(--field-border)" }}
                    {...register("roleTitle")}
                  />
                  <FieldError id={`${uid}-role-error`} message={errors.roleTitle?.message} />
                </div>
              </div>

              <div>
                <label htmlFor={`${uid}-membership`} className="block text-sm font-semibold">
                  Situação
                </label>
                <select
                  id={`${uid}-membership`}
                  defaultValue=""
                  aria-invalid={Boolean(errors.membership)}
                  aria-describedby={errors.membership ? `${uid}-membership-error` : undefined}
                  className={cn(fieldClass, "mt-1.5", errors.membership && "border-destructive")}
                  style={{ borderColor: errors.membership ? undefined : "var(--field-border)" }}
                  {...register("membership")}
                >
                  <option value="" disabled>
                    Selecione uma opção
                  </option>
                  {MEMBERSHIP_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <FieldError id={`${uid}-membership-error`} message={errors.membership?.message} />
              </div>

              <div className="grid gap-3 border-t border-border pt-5">
                <div>
                  <div className="flex items-start gap-3">
                    <input
                      id={`${uid}-consent`}
                      type="checkbox"
                      className="mt-1 size-5 accent-[var(--primary)]"
                      aria-invalid={Boolean(errors.consentEvent)}
                      aria-describedby={errors.consentEvent ? `${uid}-consent-error` : undefined}
                      {...register("consentEvent")}
                    />
                    <label htmlFor={`${uid}-consent`} className="text-sm">
                      Autorizo o uso dos dados para processar minha inscrição e receber
                      comunicações relacionadas a este evento.
                    </label>
                  </div>
                  <FieldError id={`${uid}-consent-error`} message={errors.consentEvent?.message} />
                </div>

                <div className="flex items-start gap-3">
                  <input
                    id={`${uid}-marketing`}
                    type="checkbox"
                    className="mt-1 size-5 accent-[var(--primary)]"
                    {...register("consentMarketing")}
                  />
                  <label htmlFor={`${uid}-marketing`} className="text-sm">
                    Quero receber comunicações futuras da {EVENT.organizerShort} sobre cursos e
                    eventos. <span className="text-muted-foreground">(opcional)</span>
                  </label>
                </div>
              </div>

              {/* Honeypot anti-spam: invisível para pessoas, ignorado por leitores de tela */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor={`${uid}-website`}>Site</label>
                <input id={`${uid}-website`} type="text" tabIndex={-1} {...register("website")} />
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <SubmitButton isSubmitting={isSubmitting} />
                <p className="text-muted-foreground text-sm">{EVENT.scarcityNote}</p>
              </div>
            </form>
          </>
        )}
      </div>
    </section>
  );
}
