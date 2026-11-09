import { ChevronLeft, ChevronRight, Coffee, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import { BookingForm } from "@/components/BookingForm";
import { Amenities, Facts } from "@/components/ChaletCard";
import { Img, Reveal } from "@/components/ui";
import { business, findChalet, priceLabel, type Photo } from "@/lib/data";
import { NotFound } from "./NotFound";

/** The 2023 mosaic: one big photo on the left and the rest beside it. A click opens it full size. */
function Mosaic({ photos, title }: { photos: Photo[]; title: string }) {
  const [open, setOpen] = useState<number | null>(null);
  const shown = photos.slice(0, 5);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((i) => (i === null ? i : (i + 1) % photos.length));
      if (e.key === "ArrowLeft") setOpen((i) => (i === null ? i : (i - 1 + photos.length) % photos.length));
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, photos.length]);

  // Five columns, two rows: the first photo takes 2×2 and the rest fill the remaining 3×2.
  const area =
    shown.length === 5
      ? ["lg:col-span-2 lg:row-span-2", "lg:col-span-2", "", "", "lg:col-span-2"]
      : ["lg:col-span-2 lg:row-span-2", "lg:col-span-2", "", "col-span-2 lg:col-span-3"];

  return (
    <>
      <div className="grid grid-cols-2 gap-3 lg:h-[600px] lg:grid-cols-5 lg:grid-rows-2">
        {shown.map((p, i) => (
          <button
            key={p.name + i}
            type="button"
            onClick={() => setOpen(i)}
            className={`overflow-hidden rounded-lg shadow-[var(--shadow-card)] ${i === 0 ? "col-span-2 aspect-[4/3] lg:aspect-auto" : "aspect-square lg:aspect-auto"} ${area[i] ?? ""}`}
            aria-label={`Ver foto ${i + 1} de ${title} en grande`}
          >
            <Img photo={p} loading={i === 0 ? "eager" : "lazy"} sizes={i === 0 ? "(min-width: 1024px) 400px, 100vw" : "(min-width: 1024px) 300px, 50vw"} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
          </button>
        ))}
      </div>
      {open !== null ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4" role="dialog" aria-modal="true" aria-label={`Fotos de ${title}`} onClick={() => setOpen(null)}>
          <Img photo={photos[open]} loading="eager" sizes="100vw" className="max-h-[88vh] max-w-full rounded-lg object-contain" onClick={(e) => e.stopPropagation()} />
          <button type="button" autoFocus onClick={() => setOpen(null)} aria-label="Cerrar" className="absolute top-4 right-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20">
            <X />
          </button>
          {photos.length > 1 ? (
            <>
              <button type="button" aria-label="Foto anterior" onClick={(e) => { e.stopPropagation(); setOpen((open - 1 + photos.length) % photos.length); }} className="absolute left-3 grid h-12 w-12 place-items-center text-white">
                <ChevronLeft size={36} />
              </button>
              <button type="button" aria-label="Foto siguiente" onClick={(e) => { e.stopPropagation(); setOpen((open + 1) % photos.length); }} className="absolute right-3 grid h-12 w-12 place-items-center text-white">
                <ChevronRight size={36} />
              </button>
            </>
          ) : null}
          <p className="absolute bottom-4 text-[14px] text-white/80">{photos[open].alt}</p>
        </div>
      ) : null}
    </>
  );
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2 border-b-2 border-lime-dark py-4 sm:flex-row sm:items-center sm:gap-6">
      <h3 className="shrink-0 text-[19px] font-bold sm:w-48">{label}</h3>
      <div className="font-light">{children}</div>
    </div>
  );
}

export function Information() {
  const { id } = useParams();
  const chalet = findChalet(id);
  useEffect(() => {
    if (chalet) document.title = `${chalet.name} · ${business.name}`;
  }, [chalet]);
  if (!chalet) return <NotFound />;

  return (
    <main className="mx-auto max-w-[1000px] px-5 pt-8 pb-16">
      <p className="mb-4 text-[14px] font-light">
        <Link to="/chalets" className="hover:text-lime-deep hover:underline">Cabañas</Link> / {chalet.name}
      </p>
      <h1 className="title mb-6">{chalet.name}</h1>
      <Mosaic photos={chalet.photos} title={chalet.name} />
      {chalet.id !== "duquesa" ? (
        <p className="mt-3 text-[13px] font-light text-black/60">Fotos de las cabañas y los alrededores de La Marquesa.</p>
      ) : null}

      <Reveal className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-start">
        <div className="flex-1">
          <Row label="Descripción"><Facts chalet={chalet} /></Row>
          <Row label="Información"><p className="leading-relaxed">{chalet.description}</p></Row>
          {chalet.amenities.length ? <Row label="Servicios"><Amenities chalet={chalet} /></Row> : null}
          <Row label="Entrada y salida">
            <p>Entrada desde las {business.checkIn} · Salida hasta las {business.checkOut}</p>
          </Row>
        </div>
        <aside className="flex flex-col gap-4 rounded border-2 border-lime-dark p-5 lg:sticky lg:top-24 lg:w-64">
          <div className="border-l-2 border-lime-dark pl-3">
            <p className="text-[24px] font-bold leading-tight">{priceLabel(chalet)}</p>
            <p className="font-light">por noche</p>
          </div>
          <p className="flex items-center gap-2"><Coffee size={18} aria-hidden /> Desayuno incluido</p>
          <a href="#reservar" className="btn">Reserva ahora</a>
        </aside>
      </Reveal>

      <section id="reservar" className="mt-14 rounded-lg bg-mist p-5 sm:p-8" aria-labelledby="reservar-title">
        <h2 id="reservar-title" className="title mb-1">Reserva tu estadía</h2>
        <p className="mb-6 text-center font-light">{chalet.name} · hasta {chalet.guests} personas</p>
        <BookingForm chalet={chalet} />
      </section>
    </main>
  );
}
