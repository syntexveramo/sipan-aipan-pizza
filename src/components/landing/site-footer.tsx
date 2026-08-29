import logoAsset from "@/assets/sipan-aipan-abc.png.asset.json";
import { EVENT } from "@/config/event";

export function SiteFooter() {
  return (
    <footer className="border-t border-border py-10">
      <div className="container-page flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <img
            src={logoAsset.url}
            alt={EVENT.organizer}
            width={246}
            height={114}
            loading="lazy"
            className="h-10 w-auto"
          />
          <p className="text-muted-foreground text-sm">{EVENT.organizer}</p>
        </div>
        <div className="text-muted-foreground text-sm">
          <p>{EVENT.address.full}</p>
          <p className="mt-1">Contato: {EVENT.supportContact}</p>
        </div>
      </div>
    </footer>
  );
}
