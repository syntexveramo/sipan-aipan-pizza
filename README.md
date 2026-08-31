# Pizza Live

# PRD - Landing Page | A Verdadeira Pizza Napoletana ao Vivo




## 1. Visão geral




Criar uma landing page responsiva, acessível e orientada à conversão para captar inscrições no evento **A Verdadeira Pizza Napoletana ao Vivo**, promovido por **SIPAN AIPAN ABC**.




A página deve transformar a peça de divulgação em uma experiência digital mais clara, confiável e persuasiva, preservando sua energia gastronômica. O objetivo principal é fazer o visitante entender a proposta do evento em poucos segundos e concluir a inscrição com baixo atrito.




### Informações confirmadas na peça oficial




- **Evento:** A Verdadeira Pizza Napoletana ao Vivo

- **Formato:** aula-show presencial

- **Convidado:** chef Claudio Neves

- **Data:** 9 de setembro de 2026, quarta-feira

- **Horário:** 16h30

- **Local:** Sede SIPAN AIPAN

- **Endereço:** Rua Marechal Hermes, 187 - Bairro Jardim - Santo André/SP

- **Público divulgado:** associados e não associados

- **Disponibilidade:** vagas limitadas

- **Conteúdo:** técnicas da autêntica pizza napoletana, processo da massa ao forno e degustação




> Regra de conteúdo: o horário confirmado pela peça final é **16h30**. Ele substitui o horário de 16h registrado em um rascunho anterior.




## 2. Objetivo de negócio




### Objetivo primário




Converter visitantes qualificados em inscrições confirmadas para o evento.




### Objetivos secundários




- Fortalecer SIPAN AIPAN como entidade que gera valor prático para o setor.

- Organizar uma base confiável de participantes para confirmação e comunicações do evento.

- Reduzir dúvidas operacionais sobre data, horário, local e público.

- Permitir mensuração de origem, interesse e conversão da campanha.




### Métricas de sucesso




- Taxa de conversão da página em inscrição.

- Cliques no CTA principal.

- Início e conclusão do formulário.

- Taxa de abandono por campo.

- Inscrições por origem de campanha.

- Proporção entre associados e não associados.

- Confirmações de presença, caso exista etapa posterior por WhatsApp ou e-mail.




## 3. Público e proposta de valor




### Público primário




Associados do SIPAN AIPAN ABC e profissionais ligados à panificação, pizzarias, restaurantes, cozinhas profissionais e negócios de alimentação da região do ABC.




### Público secundário




Não associados interessados na experiência, desde que a organização confirme sua elegibilidade e disponibilidade de vagas.




### Necessidades do visitante




- Entender rapidamente o que vai aprender e vivenciar.

- Saber quem conduzirá a aula-show.

- Confirmar data, horário e endereço.

- Entender se pode participar.

- Garantir a vaga sem enfrentar um formulário longo.

- Receber confirmação clara da inscrição.




### Promessa central




Uma experiência presencial com técnicas, processos e degustação da autêntica pizza napoletana, conduzida ao vivo pelo chef Claudio Neves.




## 4. Princípios da experiência




1. **O evento antes da instituição:** o hero deve vender a experiência; a marca valida e organiza.

2. **Uma ação principal:** todos os CTAs devem levar ao formulário de inscrição.

3. **Informação sem caçar detalhes:** data, horário, local e vagas limitadas devem aparecer no primeiro bloco visível.

4. **Gastronomia com credibilidade:** usar apetite visual sem transformar a página em um cardápio ou em uma peça promocional genérica.

5. **Baixo atrito:** solicitar apenas os dados necessários para identificar, confirmar e comunicar o participante.

6. **Mobile first:** a maior parte do tráfego de campanhas e WhatsApp tende a chegar pelo celular.




## 5. Direção criativa




### Conceito




**Do fogo ao ofício.** A página deve combinar o calor artesanal do forno napoletano com a organização e a confiança institucional do SIPAN AIPAN.




### Assinatura visual




O elemento memorável será uma **faixa de evento inspirada em ticket de cozinha**, com data, horário e local. No desktop, ela atravessa a base do hero; no mobile, vira um bloco vertical compacto antes do CTA. Essa faixa deve organizar informação real, não atuar apenas como decoração.




### Composição do hero




- Layout editorial assimétrico, com texto e CTA em primeiro plano e fotografia do chef/pizza como foco visual.

- Título em caixa alta e fonte condensada, com forte contraste de escala.

- A expressão “ao vivo” pode receber um tratamento manuscrito apenas como detalhe visual; a informação essencial permanece em texto acessível.

- Usar um único gesto gráfico de pincel ou sublinhado vermelho para reforçar ação e calor.

- Evitar gradientes, excesso de cards, sombras pesadas e animações decorativas.




## 6. Design system




### 6.1 Arquitetura de tokens




Implementar tokens em três camadas:




1. **Primitivos:** valores brutos de cor, espaçamento, tipografia e raio.

2. **Semânticos:** papéis como `background`, `foreground`, `primary`, `accent`, `muted`, `border` e `error`.

3. **Componentes:** variáveis específicas de botão, formulário, faixa do evento, badge e cards de conteúdo.




Nunca usar cores soltas nos componentes. Todos os componentes devem consumir tokens semânticos ou de componente.




### 6.2 Paleta recomendada




| Token primitivo | Valor | Uso |

|---|---:|---|

| `oven-950` | `#0B0B0A` | fundo escuro, hero e rodapé |

| `flour-50` | `#F6EBDD` | fundo claro e superfícies quentes |

| `tomato-600` | `#C9251C` | CTA, destaques e estado ativo |

| `basil-700` | `#17623A` | acento secundário e referências italianas |

| `flame-400` | `#F2B632` | detalhes de energia, ícones e informação |

| `sipan-900` | `#081D57` | marca institucional e elementos de confiança |

| `neutral-600` | `#62605B` | texto secundário |




#### Aplicação semântica




- `background`: `flour-50`

- `foreground`: `oven-950`

- `primary`: `tomato-600`

- `primary-foreground`: branco

- `secondary`: `sipan-900`

- `accent`: `flame-400`

- `success`: `basil-700`

- `muted`: creme mais fechado derivado de `flour-50`

- `border`: preto/12% sobre fundo claro

- `focus-ring`: `sipan-900`




### 6.3 Tipografia




- **Display e títulos:** `Barlow Condensed`, pesos 700 e 800.

- **Texto, formulário e UI:** `Archivo`, pesos 400, 500, 600 e 700.

- **Detalhe manuscrito opcional:** `Yellowtail`, somente para “ao vivo” e nunca para informação essencial.

- Fontes servidas com `font-display: swap` e subconjunto latino.




#### Escala responsiva




- `display-xl`: `clamp(3.5rem, 9vw, 7.5rem)`, line-height 0.88

- `h1`: `clamp(2.75rem, 7vw, 5.5rem)`, line-height 0.92

- `h2`: `clamp(2rem, 4vw, 3.5rem)`, line-height 1

- `h3`: `clamp(1.35rem, 2vw, 1.75rem)`, line-height 1.15

- `body-lg`: `clamp(1.05rem, 1.5vw, 1.25rem)`, line-height 1.55

- `body`: `1rem`, line-height 1.6

- `caption`: `0.8125rem`, line-height 1.4, letras com espaçamento moderado




Regras:




- Títulos podem usar caixa alta; corpo e controles usam sentence case.

- Evitar linhas de texto acima de 70 caracteres.

- Não usar fonte manuscrita em botões, campos, data, horário ou endereço.




### 6.4 Espaçamento e layout




- Base de espaçamento: 4px.

- Container máximo: 1200px.

- Margens laterais: 20px no mobile, 32px no tablet e 48px no desktop.

- Seções: 72px a 96px no desktop; 48px a 64px no mobile.

- Grid desktop: 12 colunas, gap de 24px.

- Grid tablet: 8 colunas, gap de 20px.

- Mobile: 4 colunas, gap de 16px.

- Raio padrão: 12px; CTA e chips podem usar 999px. Evitar arredondar todos os blocos.




### 6.5 Componentes essenciais




#### Botão primário




- Rótulo: **Garanta sua vaga**.

- Altura: 52px no desktop e 50px no mobile.

- Fundo tomato, texto branco, peso 700.

- Hover: escurecer 8%; active: escurecer 14%.

- Focus visível com anel de 2px e offset de 2px.

- Loading: spinner e texto “Enviando inscrição...”.

- Disabled: opacidade de 50%, mantendo contraste e sem depender apenas de cor.




#### Botão secundário




- Uso: **Ver local do evento**.

- Fundo transparente, borda estrutural, texto de alto contraste.

- Não competir com o CTA de inscrição.




#### Faixa do evento




- Três itens: data, horário e local.

- Ícones simples acompanhados de texto.

- No mobile, empilhar os itens e manter o CTA imediatamente abaixo.




#### Cards “O que você vai vivenciar”




- Três itens: Técnicas, Processo e Degustação.

- Composição aberta ou com divisores; evitar três caixas idênticas com sombras.

- Cada item deve ter título, uma frase curta e ícone linear.




#### Formulário




- Campos com 48px a 52px de altura.

- Labels sempre visíveis; placeholder apenas como exemplo.

- Erro abaixo do campo e associado com `aria-describedby`.

- Estados: padrão, hover, focus, preenchido, erro, disabled e loading.

- Mensagens em linguagem direta: “Informe um e-mail válido”.




## 7. Arquitetura da página e copy estrutural




### Seção 1 - Hero




**Eyebrow:** SIPAN AIPAN apresenta




**H1:** A verdadeira Pizza Napoletana ao vivo




**Subtítulo:** Uma aula-show com o chef Claudio Neves para acompanhar técnicas, processos e o preparo da autêntica pizza napoletana - da massa ao forno, com degustação.




**Faixa:** 09 de setembro | 16h30 | Sede SIPAN AIPAN, Santo André




**CTA primário:** Garanta sua vaga




**Apoio do CTA:** Vagas limitadas. Inscrição sujeita a disponibilidade.




### Seção 2 - O que você vai vivenciar




**Título:** Da massa ao forno, uma experiência completa




- **Técnicas:** conheça fundamentos e cuidados da autêntica pizza napoletana.

- **Processo:** acompanhe as etapas de preparo da massa até o forno.

- **Degustação:** prove o resultado e viva o sabor da tradição napolitana.




### Seção 3 - Chef




**Título:** Aula-show com chef Claudio Neves




**Texto-base:** Uma apresentação prática, ao vivo e próxima do público, criada para transformar técnica em experiência.




> Pendente antes da publicação: solicitar mini-biografia, foto autorizada e credenciais que possam ser comprovadas. Não inventar prêmios, títulos ou experiência profissional.




### Seção 4 - Informações do evento




**Data:** Quarta-feira, 9 de setembro de 2026




**Horário:** 16h30




**Local:** Sede SIPAN AIPAN




**Endereço:** Rua Marechal Hermes, 187 - Bairro Jardim - Santo André/SP




**CTA secundário:** Ver rota no mapa




O link do mapa deve abrir em nova aba e possuir nome acessível. Não incorporar mapa pesado acima da dobra.




### Seção 5 - Para quem é o encontro




**Título:** Associados e não associados são nossos convidados




**Texto:** Profissionais e negócios do setor podem solicitar participação. As vagas são limitadas e a confirmação será enviada pelos canais informados no cadastro.




> Pendente antes da publicação: confirmar se não associados entram automaticamente ou dependem de aprovação.




### Seção 6 - Formulário de inscrição




**Título:** Reserve sua participação




**Texto de apoio:** Preencha seus dados para receber a confirmação do evento.




Campos recomendados:




1. Nome completo - obrigatório.

2. WhatsApp com DDD - obrigatório.

3. E-mail - obrigatório.

4. Empresa ou estabelecimento - obrigatório.

5. Situação - obrigatório: Associado SIPAN AIPAN / Não associado / Não sei informar.

6. Cargo ou função - opcional.

7. Consentimento LGPD - obrigatório: “Autorizo o uso dos dados para processar minha inscrição e receber comunicações relacionadas a este evento.”

8. Consentimento de marketing - opcional e desmarcado por padrão, caso a entidade queira comunicações futuras.




**CTA do formulário:** Confirmar inscrição




Não solicitar CPF ou CNPJ sem necessidade operacional comprovada. Se for necessário validar associação, explicar por que o dado é usado e aplicar máscara, validação e política de retenção.




### Seção 7 - Perguntas frequentes




- Quem pode participar?

- A participação possui custo?

- Como saberei se minha vaga foi confirmada?

- Posso transferir minha inscrição?

- Há estacionamento ou orientação de acesso?

- O local possui acessibilidade?




Respostas devem ser aprovadas pela organização antes da publicação.




### Seção 8 - CTA final e rodapé




**Título:** O forno acende em 9 de setembro. Sua vaga pode comecar agora.




**CTA:** Garanta sua vaga




Rodapé com marca SIPAN AIPAN, endereço institucional, contato oficial, política de privacidade e direitos autorais.




## 8. Jornada e estados




### Fluxo principal




1. Visitante acessa a página pela campanha.

2. Entende proposta e informações essenciais no hero.

3. Clica em “Garanta sua vaga”.

4. A página rola suavemente até o formulário, respeitando `prefers-reduced-motion`.

5. Visitante preenche e envia.

6. Sistema valida os campos no cliente e no servidor.

7. Inscrição é registrada uma única vez.

8. Visitante recebe confirmação na tela e, quando integrado, por e-mail ou WhatsApp.




### Estado de sucesso




**Título:** Inscrição recebida




**Mensagem:** Seus dados foram enviados. A confirmação da vaga será encaminhada para o e-mail ou WhatsApp informado.




Exibir resumo com evento, data, horário e local. Nunca afirmar “vaga confirmada” se existir aprovação ou limite controlado manualmente.




### Estados de erro




- Campo inválido: erro específico junto ao campo.

- Duplicidade: “Já existe uma inscrição com este e-mail ou WhatsApp. Confira sua caixa de entrada ou fale com a organização.”

- Lotação: “As vagas disponíveis foram preenchidas. Deixe seus dados para entrar na lista de espera.”

- Falha de envio: preservar os campos preenchidos e oferecer nova tentativa.

- Integração indisponível: registrar erro, informar canal alternativo e não perder os dados silenciosamente.




## 9. Requisitos funcionais




- Página responsiva para mobile, tablet e desktop.

- CTA do hero, CTA final e eventual CTA fixo no mobile apontam para o mesmo formulário.

- Formulário com validação, proteção contra duplo envio e feedback de estado.

- Persistencia da inscrição em backend definido pela equipe.

- Bloqueio de duplicidade por e-mail e/ou WhatsApp normalizados.

- Campo de status da inscrição: `received`, `confirmed`, `waitlisted`, `cancelled`.

- Registro de data/hora, origem, campanha e consentimentos.

- Parâmetros UTM capturados e associados à inscrição.

- Mensagem de sucesso sem expor dados pessoais na URL.

- Opção de lista de espera quando a capacidade for atingida.

- Link de mapa configurável.

- Conteúdo e dados do evento centralizados em um objeto/configuração para evitar divergências.




### Modelo de dados sugerido




```text

event_registration

- id

- event_id

- full_name

- whatsapp_normalized

- email_normalized

- company_name

- membership_status

- role_title (nullable)

- registration_status

- consent_event_at

- consent_marketing_at (nullable)

- utm_source / utm_medium / utm_campaign / utm_content / utm_term

- created_at

- updated_at

```




## 10. Requisitos técnicos para Lovable




- React + TypeScript.

- Tailwind CSS com tokens em variáveis CSS HSL.

- Componentes acessiveis, preferencialmente alinhados a shadcn/ui apenas quando fizerem sentido.

- Formulário com React Hook Form e validação por schema.

- Backend via Supabase ou endpoint aprovado pelo projeto.

- Validação e deduplicação também no servidor.

- Proteção contra spam por honeypot, rate limiting e, se necessário, CAPTCHA não invasivo.

- Nenhuma chave privada no cliente.

- Variáveis de ambiente documentadas.

- Tipos compartilhados entre formulário e persistência quando possível.




## 11. Responsividade




### Mobile




- Hero com título, foto, faixa do evento e CTA em sequência curta.

- CTA pode ficar fixo na base apenas depois que o CTA do hero sair da viewport.

- Formulário em uma coluna.

- Alvos de toque com pelo menos 44px.

- Evitar texto sobre áreas complexas da fotografia.




### Tablet




- Hero em composição 5/7 ou 4/4, dependendo do recorte da foto.

- Informações do evento em linha quando houver largura.

- Formulário ainda prioritariamente em uma coluna.




### Desktop




- Hero em duas áreas assimétricas, com título ocupando de 5 a 6 colunas e fotografia de 6 a 7 colunas.

- Formulário pode usar duas colunas apenas para campos curtos relacionados.

- Manter leitura principal linear e CTA visível sem excesso de elementos laterais.




## 12. Acessibilidade




- Atender WCAG 2.2 AA.

- Contraste mínimo de 4,5:1 para texto normal e 3:1 para texto grande e componentes.

- Estrutura semântica com um único `h1` e hierarquia de títulos consistente.

- Labels programaticamente associados aos campos.

- Erros anunciados com `role="alert"` ou região ao vivo apropriada.

- Navegação completa por teclado e foco sempre visível.

- Texto alternativo objetivo nas imagens.

- Não depender de cor, ícone ou animacao para transmitir informação.

- Respeitar `prefers-reduced-motion`.

- Não usar texto essencial embutido na fotografia.




## 13. Performance, SEO e compartilhamento




- LCP abaixo de 2,5s em conexão móvel razoável.

- Imagem principal em AVIF/WebP, responsiva, com dimensões explícitas e preload apenas da versão necessária.

- Lazy loading nas imagens abaixo da dobra.

- Fontes limitadas aos pesos usados e com preload criterioso.

- Meta title sugerido: `Pizza Napoletana ao Vivo | SIPAN AIPAN ABC`.

- Meta description sugerida: `Participe da aula-show com o chef Claudio Neves em 9 de setembro, na sede SIPAN AIPAN, em Santo André. Vagas limitadas.`

- Open Graph com imagem 1200x630 sem excesso de texto.

- URL curta e legível, por exemplo `/eventos/pizza-napoletana-09-09`.

- `Event` structured data somente com informações confirmadas.




## 14. Analytics




Eventos recomendados:




- `event_page_view`

- `event_cta_click` com posição: hero, sticky ou final

- `event_form_start`

- `event_form_field_error` sem enviar dados pessoais

- `event_registration_submit`

- `event_registration_success`

- `event_registration_duplicate`

- `event_registration_waitlist`

- `event_map_click`




Nunca enviar nome, e-mail, telefone ou empresa para ferramentas de analytics.




## 15. Conteúdo e ativos necessários




### Disponíveis




- Peça final do evento em PDF.

- Logo SIPAN AIPAN presente na peça.

- Foto composta do chef e da pizza presente na peça.

- Data, horário, local, endereço e proposta do encontro.




### Solicitar antes da publicação




- Logo SIPAN AIPAN em SVG ou PNG transparente e alta resolução.

- Foto original do chef, sem textos e com autorização de uso.

- Mini-biografia aprovada do chef Claudio Neves.

- Capacidade máxima do evento.

- Regra para associados e não associados.

- Confirmação sobre custo ou gratuidade.

- Canal oficial de suporte.

- Política de privacidade ou texto LGPD da entidade.

- Destino da inscrição e responsável pela lista.

- Regra de confirmação e lista de espera.

- Informações de estacionamento e acessibilidade do local.




## 16. Critérios de aceite




1. Data, horário, local e endereço aparecem corretamente em todas as seções.

2. O horário publicado é 16h30.

3. Todos os CTAs principais levam ao formulário.

4. Formulário funciona em mobile e desktop, com validação acessível.

5. Duplo clique não gera inscrições duplicadas.

6. Sucesso, duplicidade, lotação e falha possuem mensagens claras.

7. A página não afirma gratuidade, confirmação imediata ou elegibilidade sem aprovação.

8. Não ha CPF/CNPJ no formulário sem justificativa aprovada.

9. UTM e consentimentos são armazenados corretamente.

10. Nenhum dado pessoal é enviado a analytics.

11. Imagem principal não contém texto essencial para compreender o evento.

12. Contraste, foco, teclado e leitura por tecnologias assistivas atendem aos requisitos.

13. Página passa por revisão em larguras de 320px, 768px, 1024px e 1440px.

14. Conteúdo final é revisado pela SIPAN AIPAN antes da publicação.




## 17. Fora de escopo inicial




- Area autenticada para participantes.

- Emissao de ingresso pago.

- Marketplace ou venda de produtos.

- Streaming da aula-show.

- Automação complexa de CRM sem ferramenta definida.

- Check-in por QR Code, salvo se solicitado em fase posterior.




## 18. Prompt de implementação para o Lovable




Use este PRD como fonte de verdade e implemente uma landing page mobile-first para o evento **A Verdadeira Pizza Napoletana ao Vivo**, do SIPAN AIPAN ABC. Priorize conversão, acessibilidade e desempenho. Siga o design system e a hierarquia definidos neste documento. Use componentes React com TypeScript, Tailwind baseado em tokens CSS e um formulário acessível com validação no cliente e no servidor. Não invente informações ausentes: mantenha as pendências sinalizadas e use configuração centralizada para os dados do evento. A página deve ter hero editorial, faixa funcional com data/horário/local, seções de experiência, chef, local, público, FAQ, formulário e CTA final. Preserve a identidade gastronômica da peça sem reproduzir um cartaz vertical na web.




## 19. Decisões pendentes para fechar a versão de produção




1. Qual será o limite real de vagas?

2. A inscrição confirma a vaga imediatamente ou depende de aprovação?

3. Não associados podem se inscrever nas mesmas condições?

4. O evento é gratuito? A peça sugere convite, mas não declara preço.

5. Qual canal receberá e administrará as inscrições?

6. Haverá confirmação por e-mail, WhatsApp ou ambos?

7. Qual contato oficial deve aparecer na página?

8. O local possui estacionamento e acessibilidade confirmados?

___

Pdf de referencia visual com imagem real do pizzaiolo

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://pizza-live-signup.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/330f2b30-47f8-4a43-9a9d-679968ae8956).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
