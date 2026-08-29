import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useServerFn } from "@tanstack/react-start";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, CalendarDays, CheckCircle2, Clock, Loader2, MapPin } from "lucide-react";

import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
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
import { useRegistrationModal } from "@/lib/registration-modal";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

const fieldClass =
  "h-[54px] w-full rounded-xl border bg-[var(--field-bg)] px-4 text-lg text-[var(--field-fg)] " +
  "placeholder:text-[var(--field-placeholder)] transition-soft focus:border-[var(--field-border-focus)]";

type StepKey = "nome" | "contato" | "trabalho" | "situacao" | "consentimento";

const STEPS: { key: StepKey; title: string; hint: string; fields: (keyof RegistrationInput)[] }[] = [
  { key: "nome", title: "Como podemos te chamar?", hint: "Seu nome completo para o credenciamento.", fields: ["fullName"] },
  { key: "contato", title: "Onde enviamos a confirmação?", hint: "Usamos apenas para confirmar sua vaga.", fields: ["whatsapp", "email"] },
  { key: "trabalho", title: "Onde você atua?", hint: "Ajuda a organização a preparar a turma.", fields: ["company", "roleTitle"] },
  { key: "situacao", title: "Qual a sua situação?", hint: EVENT.membershipRule, fields: ["membership"] },
  { key: "consentimento", title: "Falta só confirmar", hint: EVENT.scarcityNote, fields: ["consentEvent"] },
];

function FieldError({ id, message }: { id: string; message?: string | undefined }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-2 text-sm font-medium text-destructive">
      {message}
    </p>
  );
}

export function RegistrationDialog() {
  const { open, setOpen } = useRegistrationModal();
  const uid = useId();
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
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
    trigger,
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

  const current = STEPS[step]!;
  const isSuccess = result?.status === "received" || result?.status === "waitlisted";
  const progress = useMemo(
    () => (isSuccess ? 100 : Math.round(((step + 1) / STEPS.length) * 100)),
    [step, isSuccess],
  );

  useEffect(() => {
    if (!open) return;
    if (startedRef.current) return;
    startedRef.current = true;
    track("event_form_start");
  }, [open]);

  const goNext = async () => {
    const valid = await trigger(current.fields, { shouldFocus: true });
    if (!valid) return;
    setDir(1);
    setStep((value) => Math.min(value + 1, STEPS.length - 1));
  };

  const goBack = () => {
    setDir(-1);
    setStep((value) => Math.max(value - 1, 0));
  };

  const onSubmit = handleSubmit(async (values) => {
    if (submittingRef.current) return;
    submittingRef.current = true;
    track("event_registration_submit");
    try {
      const response = await submit({ data: { ...values, utm } });
      setResult(response);
      if (response.status === "received") track("event_registration_success");
      if (response.status === "waitlisted") track("event_registration_waitlist");
    } catch {
      setResult({ status: "error", message: "Não foi possível enviar sua inscrição agora." });
    } finally {
      submittingRef.current = false;
    }
  });

  const slide = {
    initial: reduce ? { opacity: 0 } : { opacity: 0, x: dir * 42, filter: "blur(6px)" },
    animate: { opacity: 1, x: 0, filter: "blur(0px)" },
    exit: reduce ? { opacity: 0 } : { opacity: 0, x: dir * -42, filter: "blur(6px)" },
    transition: { duration: reduce ? 0 : 0.42, ease: EASE },
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        showCloseButton
        className="max-w-[560px] gap-0 overflow-hidden rounded-3xl border-[var(--content-card-border)] bg-card p-0 sm:max-w-[560px]"
      >
        <div className="h-1.5 w-full bg-muted">
          <motion.div
            className="h-full rounded-r-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: reduce ? 0 : 0.5, ease: EASE }}
          />
        </div>

        <div className="p-6 sm:p-8">
          {isSuccess ? (
            <motion.div
              initial={reduce ? {} : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <DialogTitle className="text-h2 uppercase">Inscrição recebida</DialogTitle>
              <DialogDescription className="mt-3 flex items-start gap-3 text-base text-foreground">
                <CheckCircle2 aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-success" />
                <span>
                  {result?.status === "waitlisted"
                    ? "As vagas foram preenchidas e seus dados entraram na lista de espera. A organização entrará em contato."
                    : "Seus dados foram enviados. A confirmação da vaga chega pelo e-mail ou WhatsApp informado."}
                </span>
              </DialogDescription>
              <dl className="mt-6 grid gap-4 border-t border-border pt-6 sm:grid-cols-3">
                {[
                  { icon: CalendarDays, label: "Data", value: EVENT.dateLabelLong },
                  { icon: Clock, label: "Horário", value: EVENT.timeLabel },
                  { icon: MapPin, label: "Local", value: EVENT.venueShort },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label}>
                    <dt className="text-caption text-muted-foreground flex items-center gap-2 uppercase">
                      <Icon aria-hidden="true" className="size-4" /> {label}
                    </dt>
                    <dd className="mt-1 font-semibold">{value}</dd>
                  </div>
                ))}
              </dl>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="transition-soft mt-7 inline-flex h-[52px] w-full items-center justify-center rounded-full bg-primary px-8 font-bold text-primary-foreground hover:bg-primary-hover"
              >
                Fechar
              </button>
            </motion.div>
          ) : (
            <form noValidate onSubmit={onSubmit}>
              <p className="text-caption text-muted-foreground font-semibold uppercase">
                Etapa {step + 1} de {STEPS.length} · {EVENT.eyebrow}
              </p>

              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={current.key} {...slide}>
                  <DialogTitle className="text-h3 mt-3 uppercase">{current.title}</DialogTitle>
                  <DialogDescription className="text-muted-foreground mt-2 text-sm">
                    {current.hint}
                  </DialogDescription>

                  <div className="mt-6 grid gap-5">
                    {current.key === "nome" ? (
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
                          className={cn(fieldClass, "mt-2", errors.fullName && "border-destructive")}
                          style={{ borderColor: errors.fullName ? undefined : "var(--field-border)" }}
                          {...register("fullName")}
                        />
                        <FieldError id={`${uid}-name-error`} message={errors.fullName?.message} />
                      </div>
                    ) : null}

                    {current.key === "contato" ? (
                      <>
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
                            className={cn(fieldClass, "mt-2", errors.whatsapp && "border-destructive")}
                            style={{ borderColor: errors.whatsapp ? undefined : "var(--field-border)" }}
                            {...register("whatsapp", {
                              onChange: (event) =>
                                setValue("whatsapp", maskWhatsapp(event.target.value), {
                                  shouldValidate: false,
                                }),
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
                            className={cn(fieldClass, "mt-2", errors.email && "border-destructive")}
                            style={{ borderColor: errors.email ? undefined : "var(--field-border)" }}
                            {...register("email")}
                          />
                          <FieldError id={`${uid}-email-error`} message={errors.email?.message} />
                        </div>
                      </>
                    ) : null}

                    {current.key === "trabalho" ? (
                      <>
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
                            className={cn(fieldClass, "mt-2", errors.company && "border-destructive")}
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
                            className={cn(fieldClass, "mt-2", errors.roleTitle && "border-destructive")}
                            style={{ borderColor: errors.roleTitle ? undefined : "var(--field-border)" }}
                            {...register("roleTitle")}
                          />
                          <FieldError id={`${uid}-role-error`} message={errors.roleTitle?.message} />
                        </div>
                      </>
                    ) : null}

                    {current.key === "situacao" ? (
                      <div>
                        <label htmlFor={`${uid}-membership`} className="block text-sm font-semibold">
                          Situação
                        </label>
                        <select
                          id={`${uid}-membership`}
                          defaultValue=""
                          aria-invalid={Boolean(errors.membership)}
                          className={cn(fieldClass, "mt-2", errors.membership && "border-destructive")}
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
                    ) : null}

                    {current.key === "consentimento" ? (
                      <div className="grid gap-4">
                        <div>
                          <div className="flex items-start gap-3">
                            <input
                              id={`${uid}-consent`}
                              type="checkbox"
                              className="mt-1 size-5 accent-[var(--primary)]"
                              aria-invalid={Boolean(errors.consentEvent)}
                              {...register("consentEvent")}
                            />
                            <label htmlFor={`${uid}-consent`} className="text-sm">
                              Autorizo o uso dos dados para processar minha inscrição e receber
                              comunicações deste evento.
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
                            Quero receber novidades da {EVENT.organizerShort} sobre cursos e eventos.{" "}
                            <span className="text-muted-foreground">(opcional)</span>
                          </label>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </motion.div>
              </AnimatePresence>

              {result?.status === "duplicate" ? (
                <p role="alert" className="mt-5 rounded-xl border border-border-strong bg-muted p-4 text-sm font-medium">
                  Já existe uma inscrição com este e-mail ou WhatsApp. Confira sua caixa de entrada
                  ou fale com a organização.
                </p>
              ) : null}

              {result?.status === "error" ? (
                <p role="alert" className="mt-5 rounded-xl border border-destructive bg-muted p-4 text-sm font-medium text-destructive">
                  {result.message} Se preferir, fale com a organização em {EVENT.supportContact}.
                </p>
              ) : null}

              {/* Honeypot anti-spam */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor={`${uid}-website`}>Site</label>
                <input id={`${uid}-website`} type="text" tabIndex={-1} {...register("website")} />
              </div>

              <div className="mt-7 flex items-center gap-3">
                {step > 0 ? (
                  <button
                    type="button"
                    onClick={goBack}
                    className="transition-soft inline-flex h-[52px] items-center gap-2 rounded-full border border-border-strong px-5 text-sm font-semibold hover:bg-muted"
                  >
                    <ArrowLeft aria-hidden="true" className="size-4" /> Voltar
                  </button>
                ) : null}

                {step < STEPS.length - 1 ? (
                  <button
                    type="button"
                    onClick={goNext}
                    className="transition-soft inline-flex h-[52px] flex-1 items-center justify-center gap-2 rounded-full bg-primary px-8 font-bold text-primary-foreground hover:bg-primary-hover hover:shadow-[var(--shadow-glow)]"
                  >
                    Continuar <ArrowRight aria-hidden="true" className="size-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="transition-soft inline-flex h-[52px] flex-1 items-center justify-center gap-2 rounded-full bg-primary px-8 font-bold text-primary-foreground hover:bg-primary-hover hover:shadow-[var(--shadow-glow)] disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 aria-hidden="true" className="size-4 animate-spin" /> Enviando...
                      </>
                    ) : (
                      "Confirmar inscrição"
                    )}
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
