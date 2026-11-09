import { Car, PawPrint, Sparkles, Wifi } from "lucide-react";
import { useRef, type PointerEvent } from "react";
import { Link } from "react-router-dom";
import { ChaletCard } from "@/components/ChaletCard";
import { Slider } from "@/components/Slider";
import { Img, Reveal } from "@/components/ui";
import { business, photos, popularChalet } from "@/lib/data";

const services = [
  { icon: Wifi, label: "Wi-fi" },
  { icon: Car, label: "Parqueadero" },
  { icon: Sparkles, label: "Limpieza" },
  { icon: PawPrint, label: "Pet-Friendly" },
];

export function Services() {
  return (
    <ul className="mx-auto grid max-w-5xl grid-cols-2 gap-6 px-5 py-6 sm:grid-cols-4">
      {services.map(({ icon: Icon, label }) => (
        <li key={label} className="flex flex-col items-center gap-1.5 font-light">
          <Icon size={22} aria-hidden /> {label}
        </li>
      ))}
    </ul>
  );
}

const gallery = [photos.jardin, photos.duquesa2, photos.hilera, photos.duquesa1, photos.balcon, photos.duquesa3];

/** The 2023 strip you could drag sideways with the mouse, now only with real photos. */
function Gallery() {
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; left: number } | null>(null);
  const down = (e: PointerEvent) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    drag.current = { x: e.clientX, left: ref.current.scrollLeft };
  };
  const move = (e: PointerEvent) => {
    if (!drag.current || !ref.current) return;
    ref.current.scrollLeft = drag.current.left - (e.clientX - drag.current.x) * 2;
  };
  const up = () => (drag.current = null);
  return (
    <div
      ref={ref}
      className="flex cursor-grab snap-x snap-mandatory gap-5 overflow-x-auto px-5 py-8 [scrollbar-width:thin] active:cursor-grabbing lg:px-[5%]"
      onPointerDown={down}
      onPointerMove={move}
      onPointerUp={up}
      onPointerLeave={up}
      role="region"
      aria-label="Galería de fotos"
      tabIndex={0}
    >
      {gallery.map((p) => (
        <Img key={p.name} photo={p} sizes="(min-width: 640px) 320px, 75vw" draggable={false} className="photo aspect-square w-[75vw] max-w-[320px] shrink-0 snap-start select-none sm:w-[320px]" />
      ))}
    </div>
  );
}

export function Home() {
  return (
    <main>
      <h1 className="sr-only">
        {business.name}, {business.tagline.toLowerCase()} en {business.town}
      </h1>
      <Slider />
      <Services />

      <section className="bg-mist py-12" aria-labelledby="about-title">
        <Reveal className="mx-auto grid max-w-[1000px] items-center gap-6 px-5 text-center lg:grid-cols-[1fr_340px] lg:gap-x-12 lg:text-left">
          <div className="flex flex-col gap-5">
            <h2 id="about-title" className="title lg:text-left">Acerca de Nosotros</h2>
            <p className="font-light leading-relaxed">
              {business.name} es un hospedaje con bar en {business.town}. Cabañas de madera y ladrillo con techos rojos, rodeadas de montañas,
              para descansar en familia, en pareja o con amigos. Todas las estadías incluyen el desayuno.
            </p>
          </div>
          <Img photo={photos.duquesa1} sizes="(min-width: 1024px) 340px, 90vw" className="photo mx-auto aspect-[4/3] w-full max-w-[420px]" />
          <Link to="/about" className="btn w-full max-w-[500px] justify-self-center lg:col-span-2 lg:max-w-none">
            Conoce más
          </Link>
        </Reveal>
      </section>

      <section className="py-12">
        <Reveal>
          <ChaletCard chalet={popularChalet} heading="Cabaña más popular" />
        </Reveal>
        <p className="mt-8 text-center">
          <Link to="/chalets" className="font-bold underline decoration-lime decoration-2 underline-offset-4 hover:text-lime-deep">
            Ver todas las cabañas
          </Link>
        </p>
      </section>

      <Gallery />

      <section className="bg-mist py-12" aria-labelledby="location-title">
        <Reveal className="mx-auto flex max-w-[1000px] flex-col gap-6 px-5 lg:flex-row lg:items-center">
          <div className="flex flex-col gap-4 text-center lg:w-[38%] lg:text-left">
            <h2 id="location-title" className="title lg:text-left">Ubicación</h2>
            <p className="font-light leading-relaxed">
              Estamos en {business.town}. Escríbenos por WhatsApp y te contamos cómo llegar.
            </p>
            <a href={business.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn self-center lg:self-start">
              Abrir en Google Maps
            </a>
          </div>
          <iframe
            title="Mapa de Cabañas La Marquesa en Coconuco"
            src={business.mapsEmbed}
            className="h-[320px] w-full rounded-lg border-0 shadow-[var(--shadow-card)] lg:h-[380px] lg:w-[62%]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </Reveal>
      </section>
    </main>
  );
}
