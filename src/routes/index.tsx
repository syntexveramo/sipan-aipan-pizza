import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { EVENT } from "@/config/event";
import { Hero } from "@/components/landing/hero";
import { Experience } from "@/components/landing/experience";
import { ChefSection } from "@/components/landing/chef-section";
import { EventInfo } from "@/components/landing/event-info";
import { Audience } from "@/components/landing/audience";
import { FaqSection } from "@/components/landing/faq-section";
import { FinalCta } from "@/components/landing/final-cta";
import { SiteFooter } from "@/components/landing/site-footer";
import { PrimaryCta } from "@/components/landing/cta-button";
import { RegistrationDialog } from "@/components/landing/registration-dialog";
import { openRegistration } from "@/lib/registration-modal";

const TITLE = "Pizza Napoletana ao Vivo | Aula-show SIPAN AIPAN ABC";
const DESCRIPTION =
  "Aula-show presencial com o chef Claudio Neves em 9 de setembro de 2026, às 16h30, na sede SIPAN AIPAN em Santo André. Vagas limitadas: inscreva-se.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { property: "og:locale", content: "pt_BR" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Event",
          name: EVENT.name,
          description: DESCRIPTION,
          eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
          eventStatus: "https://schema.org/EventScheduled",
          startDate: EVENT.startsAtISO,
          endDate: EVENT.endsAtISO,
          inLanguage: "pt-BR",
          performer: { "@type": "Person", name: "Claudio Neves" },
          organizer: { "@type": "Organization", name: EVENT.organizer },
          location: {
            "@type": "Place",
            name: EVENT.venue,
            address: {
              "@type": "PostalAddress",
              streetAddress: EVENT.address.street,
              addressLocality: EVENT.address.city,
              addressRegion: EVENT.address.state,
              addressCountry: EVENT.address.country,
            },
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Quem pode participar?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Associados SIPAN AIPAN e profissionais do setor de alimentação da região do ABC. Não associados também podem solicitar participação.",
              },
            },
            {
              "@type": "Question",
              name: "Como saberei se minha vaga foi confirmada?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "A confirmação da vaga é enviada pela organização para o e-mail ou WhatsApp informado no cadastro.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  const heroCtaRef = useRef<HTMLDivElement>(null);
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const target = heroCtaRef.current;
    if (!target) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowSticky(entry ? !entry.isIntersecting : false),
      { rootMargin: "-80px 0px 0px 0px" },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <button
        type="button"
        onClick={() => openRegistration("skip-link")}
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-primary focus:px-5 focus:py-3 focus:text-primary-foreground"
      >
        Ir para a inscrição
      </button>

      <Hero ctaRef={heroCtaRef} />

      <main>
        <Experience />
        <ChefSection />
        <EventInfo />
        <Audience />
        <FaqSection />
        <FinalCta />
      </main>

      <SiteFooter />

      <RegistrationDialog />

      <AnimatePresence>
        {showSticky ? (
          <motion.div
            initial={{ y: 96, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 96, opacity: 0 }}
            transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/90 p-3 backdrop-blur-md md:hidden"
          >
            <PrimaryCta position="sticky" className="w-full" />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
