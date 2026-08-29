import { EVENT } from "@/config/event";

export function Audience() {
  return (
    <section
      id="publico"
      className="bg-surface-dark text-surface-dark-foreground section-y"
      aria-labelledby="publico-titulo"
    >
      <div className="container-page">
        <p className="text-caption font-semibold uppercase opacity-80">{EVENT.audience}</p>
        <h2 id="publico-titulo" className="text-h2 mt-3 uppercase">
          Associados e não associados são nossos convidados
        </h2>
        <p className="text-body-lg measure mt-5 opacity-90">{EVENT.membershipRule}</p>
        <p className="measure mt-4 text-sm opacity-75">{EVENT.priceStatement}</p>
      </div>
    </section>
  );
}
