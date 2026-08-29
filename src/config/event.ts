/**
 * Fonte única de verdade dos dados do evento.
 * Toda seção, o JSON-LD e o resumo de sucesso consomem este objeto.
 *
 * PENDENTE (confirmar com a SIPAN AIPAN antes da publicação):
 * - capacity: capacidade real do evento
 * - priceStatement: gratuidade ou valor
 * - membershipRule: se não associados dependem de aprovação
 * - supportContact / privacyPolicyUrl: canais oficiais
 * - chefBio: mini-biografia aprovada
 * - venueAccessNote: estacionamento e acessibilidade
 */

export const EVENT = {
  id: "pizza-napoletana-09-09",
  organizer: "SIPAN AIPAN ABC",
  organizerShort: "SIPAN AIPAN",
  eyebrow: "SIPAN AIPAN apresenta",
  name: "A verdadeira Pizza Napoletana ao vivo",
  format: "Aula-show presencial",
  chef: "chef Claudio Neves",
  subtitle:
    "Uma aula-show com o chef Claudio Neves para acompanhar técnicas, processos e o preparo da autêntica pizza napoletana — da massa ao forno, com degustação.",
  dateLabel: "09 de setembro",
  dateLabelLong: "Quarta-feira, 9 de setembro de 2026",
  weekdayLabel: "Quarta-feira",
  timeLabel: "16h30",
  startsAtISO: "2026-09-09T16:30:00-03:00",
  endsAtISO: "2026-09-09T19:00:00-03:00",
  venue: "Sede SIPAN AIPAN",
  venueShort: "Sede SIPAN AIPAN, Santo André",
  address: {
    street: "Rua Marechal Hermes, 187",
    district: "Bairro Jardim",
    city: "Santo André",
    state: "SP",
    country: "BR",
    full: "Rua Marechal Hermes, 187 — Bairro Jardim — Santo André/SP",
  },
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Rua+Marechal+Hermes%2C+187+-+Bairro+Jardim+-+Santo+Andr%C3%A9%2FSP",
  audience: "Associados e não associados",
  scarcityNote: "Vagas limitadas. Inscrição sujeita a disponibilidade.",

  /** PENDENTE: capacidade real. Ao ser atingida, novas inscrições entram na lista de espera. */
  capacity: 60,

  /** PENDENTE: confirmar valor ou gratuidade. Não afirmar gratuidade sem aprovação. */
  priceStatement: "A organização informará as condições de participação na confirmação da inscrição.",

  /** PENDENTE: regra de elegibilidade de não associados. */
  membershipRule:
    "Profissionais e negócios do setor podem solicitar participação. As vagas são limitadas e a confirmação será enviada pelos canais informados no cadastro.",

  /** PENDENTE: mini-biografia aprovada do chef. Não inventar prêmios ou credenciais. */
  chefBio:
    "Uma apresentação prática, ao vivo e próxima do público, criada para transformar técnica em experiência.",
  chefBioPending: true,

  /** PENDENTE: contato oficial e política de privacidade da entidade. */
  supportContact: "contato@sipanaipan.com.br",
  privacyPolicyUrl: null as string | null,

  /** PENDENTE: estacionamento e acessibilidade confirmados pelo local. */
  venueAccessNote: null as string | null,
} as const;

export const EXPERIENCE_ITEMS = [
  {
    key: "tecnicas",
    title: "Técnicas",
    text: "Conheça fundamentos e cuidados da autêntica pizza napoletana.",
  },
  {
    key: "processo",
    title: "Processo",
    text: "Acompanhe as etapas de preparo da massa até o forno.",
  },
  {
    key: "degustacao",
    title: "Degustação",
    text: "Prove o resultado e viva o sabor da tradição napolitana.",
  },
] as const;

export const FAQ_ITEMS = [
  {
    q: "Quem pode participar?",
    a: "Associados SIPAN AIPAN e profissionais ligados à panificação, pizzarias, restaurantes e negócios de alimentação da região do ABC. Não associados também podem solicitar participação.",
  },
  {
    q: "A participação possui custo?",
    a: "As condições de participação são definidas pela organização e informadas na confirmação da inscrição. Em caso de dúvida, fale com a SIPAN AIPAN pelos canais oficiais.",
  },
  {
    q: "Como saberei se minha vaga foi confirmada?",
    a: "Após o envio do formulário sua inscrição fica registrada como recebida. A confirmação da vaga é enviada pela organização para o e-mail ou WhatsApp informado no cadastro.",
  },
  {
    q: "Posso transferir minha inscrição?",
    a: "Transferências dependem de autorização da organização e da disponibilidade de vagas. Entre em contato pelos canais oficiais antes do evento.",
  },
  {
    q: "Há estacionamento ou orientação de acesso?",
    a: "As orientações de acesso ao local serão enviadas junto da confirmação da inscrição.",
  },
  {
    q: "O local possui acessibilidade?",
    a: "Para necessidades específicas de acessibilidade, informe a organização ao se inscrever para que possamos orientar o acesso no dia do evento.",
  },
] as const;
