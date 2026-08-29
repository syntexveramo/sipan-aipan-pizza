import chefAsset from "@/assets/chef-pizza-napoletana.jpg.asset.json";
import { EVENT } from "@/config/event";

export function ChefSection() {
  return (
    <section id="chef" className="bg-muted section-y" aria-labelledby="chef-titulo">
      <div className="container-page grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <img
            src={chefAsset.url}
            alt="Chef preparando pizza napoletana ao lado do forno a lenha"
            width={1024}
            height={1536}
            loading="lazy"
            decoding="async"
            className="aspect-4/5 w-full rounded-xl object-cover object-top"
          />
        </div>
        <div className="lg:col-span-7">
          <p className="text-caption font-semibold text-muted-foreground uppercase">
            {EVENT.format}
          </p>
          <h2 id="chef-titulo" className="text-h2 mt-3 uppercase">
            Aula-show com chef Claudio Neves
          </h2>
          <p className="text-body-lg measure mt-5">{EVENT.chefBio}</p>
          <p className="text-muted-foreground measure mt-4 text-sm">
            A apresentação acontece ao vivo, com acompanhamento das etapas de preparo e degustação
            ao final.
          </p>
        </div>
      </div>
    </section>
  );
}
