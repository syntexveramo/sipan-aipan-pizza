import chefAsset from "@/assets/chef-pizza-napoletana.jpg.asset.json";
import logoAsset from "@/assets/sipan-aipan-abc.png.asset.json";
import { EVENT } from "@/config/event";
import { EventStrip } from "./event-strip";
import { PrimaryCta } from "./cta-button";

export function Hero({ ctaRef }: { ctaRef: React.Ref<HTMLDivElement> }) {
  return (
    <header className="relative overflow-hidden bg-surface-dark text-surface-dark-foreground">
      <div className="container-page pt-8 pb-12 md:pt-10 md:pb-16 lg:pb-20">
        <div className="flex items-center gap-3">
          <img
            src={logoAsset.url}
            alt="SIPAN AIPAN ABC"
            width={246}
            height={114}
            className="h-11 w-auto"
          />
          <span className="text-caption font-semibold uppercase opacity-80">{EVENT.eyebrow}</span>
        </div>

        <div className="mt-8 grid items-center gap-8 lg:mt-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <h1 className="text-h1 uppercase">
              A verdadeira
              <span className="mt-1 block text-[var(--accent)]">Pizza Napoletana</span>
              <span className="relative inline-block">
                <span className="font-script text-[0.62em] normal-case text-surface-dark-foreground">
                  ao vivo
                </span>
                <span
                  aria-hidden="true"
                  className="absolute -bottom-1 left-0 h-[6px] w-full rounded-full bg-primary"
                />
              </span>
            </h1>

            <p className="text-body-lg measure mt-6 opacity-90">{EVENT.subtitle}</p>

            <div ref={ctaRef} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <PrimaryCta position="hero" />
              <p className="text-sm opacity-80 sm:max-w-56">{EVENT.scarcityNote}</p>
            </div>
          </div>

          <div className="lg:col-span-6">
            <img
              src={chefAsset.url}
              alt="Pizzaiolo retirando uma pizza napoletana do forno a lenha, com tomates, mussarela e manjericão sobre a bancada"
              width={1024}
              height={1536}
              fetchPriority="high"
              decoding="async"
              className="aspect-4/5 w-full rounded-xl object-cover object-top lg:aspect-3/4"
            />
          </div>
        </div>

        <EventStrip className="mt-8 lg:mt-12" />
      </div>
    </header>
  );
}
