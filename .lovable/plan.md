# Landing page: A Verdadeira Pizza Napoletana ao Vivo

Uma landing page única, mobile-first e orientada à inscrição, com backend real para registrar as vagas.

## Conteúdo e imagens

- Todos os dados do evento (título, chef, 09/09/2026, 16h30, sede, endereço, link do mapa, capacidade) ficam em um único arquivo de configuração, usado por todas as seções, pelo JSON-LD e pelo e-mail/resumo de sucesso.
- A foto do chef/pizza e o logo SIPAN AIPAN são extraídos do PDF enviado e publicados como assets otimizados. A foto será usada recortada, sem os textos do cartaz.
- Textos pendentes (mini-bio do chef, gratuidade, regra para não associados, estacionamento/acessibilidade, contato oficial) entram como placeholders explícitos marcados para revisão, sem inventar credenciais, preços ou confirmações.

## Estrutura da página (rota `/`, com `/eventos/pizza-napoletana-09-09` redirecionando para ela)

1. Hero editorial assimétrico: eyebrow "SIPAN AIPAN apresenta", H1 em Barlow Condensed caixa alta, subtítulo, foto do chef, gesto vermelho único.
2. Faixa de evento estilo ticket de cozinha (data | horário | local) — horizontal na base do hero no desktop, empilhada no mobile, com o CTA logo abaixo.
3. "Da massa ao forno": Técnicas, Processo, Degustação em composição aberta com divisores e ícones lineares.
4. Chef Claudio Neves (texto-base + placeholder de bio).
5. Informações do evento + CTA secundário "Ver rota no mapa" (nova aba, nome acessível).
6. Para quem é o encontro (associados e não associados).
7. Formulário "Reserve sua participação".
8. FAQ em accordion acessível.
9. CTA final + rodapé institucional.

CTA fixo no mobile aparece só depois que o CTA do hero sai da viewport; todos os CTAs rolam suavemente até o formulário respeitando `prefers-reduced-motion`.

## Formulário e inscrição

Campos: nome completo, WhatsApp com DDD (máscara), e-mail, empresa, situação (associado / não associado / não sei informar), cargo (opcional), consentimento LGPD obrigatório, consentimento de marketing opcional desmarcado. Sem CPF/CNPJ.

Comportamento: labels visíveis, erros abaixo do campo com `aria-describedby` e `role="alert"`, proteção contra duplo envio, estado de loading, e estados de sucesso, duplicidade, lotação (com lista de espera) e falha de envio preservando os dados digitados. A tela de sucesso diz "Inscrição recebida" com resumo do evento — nunca "vaga confirmada".

## Backend

Ativar Lovable Cloud e criar a tabela `event_registrations` conforme o modelo do PRD (nome, whatsapp/e-mail normalizados, empresa, situação, cargo, status `received|confirmed|waitlisted|cancelled`, consentimentos com timestamp, UTMs, timestamps), com índices únicos nos campos normalizados. RLS: nenhuma leitura pública; a gravação passa por uma server function que valida com Zod, normaliza, aplica honeypot + rate limit, decide `received` vs `waitlisted` pela capacidade configurada e trata duplicidade.

## Design system

Tokens em três camadas em `src/styles.css`: primitivos (oven-950, flour-50, tomato-600, basil-700, flame-400, sipan-900, neutral-600), semânticos (background, foreground, primary, secondary, accent, success, muted, border, focus-ring) e de componente (botão, campo, faixa, badge, card). Nenhuma cor solta nos componentes. Tipografia Barlow Condensed + Archivo (Yellowtail apenas no detalhe "ao vivo"), com a escala responsiva em `clamp()` do PRD. Container 1200px, base de espaçamento 4px, raio 12px (999px em CTA/chips).

## Analytics, SEO e acessibilidade

- Camada de analytics própria disparando `event_page_view`, `event_cta_click` (hero/sticky/final), `event_form_start`, `event_form_field_error`, `event_registration_submit/success/duplicate/waitlist`, `event_map_click` — sem nenhum dado pessoal.
- UTMs capturados da URL e enviados junto da inscrição.
- Meta title/description do PRD, Open Graph, JSON-LD `Event` só com dados confirmados, imagem principal responsiva com dimensões explícitas e lazy loading abaixo da dobra.
- WCAG 2.2 AA: um único `h1`, foco visível, navegação por teclado, alvos de toque ≥44px, contraste verificado.

## Verificação

Revisão visual em 320, 768, 1024 e 1440px, teste do fluxo de inscrição (sucesso, duplicidade e duplo clique) no preview.

## Pendências que não bloqueiam o build

Capacidade real, gratuidade, aprovação de não associados, canal de confirmação, contato oficial, política de privacidade, estacionamento/acessibilidade e bio do chef ficam em configuração/placeholder para troca em um passo rápido depois da resposta da SIPAN AIPAN.
