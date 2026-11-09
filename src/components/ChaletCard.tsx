import { Bath, BedDouble, Layers, ShowerHead, Tv, User, Wifi, Wine, type LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { amenityLabel, priceLabel, type Amenity, type Chalet } from "@/lib/data";
import { Img } from "./ui";

const amenityIcon: Record<Amenity, LucideIcon> = {
  minibar: Wine,
  tv: Tv,
  ducha: ShowerHead,
  bano: Bath,
  wifi: Wifi,
};

export function Facts({ chalet, className = "" }: { chalet: Chalet; className?: string }) {
  const facts = [
    { icon: User, text: `${chalet.guests} ${chalet.guests === 1 ? "persona" : "personas"}` },
    chalet.beds && { icon: BedDouble, text: `${chalet.beds} camas` },
    chalet.floors && { icon: Layers, text: `${chalet.floors} pisos` },
    chalet.baths && { icon: Bath, text: `${chalet.baths} baño` },
  ].filter(Boolean) as { icon: LucideIcon; text: string }[];
  return (
    <ul className={`flex flex-wrap gap-x-6 gap-y-2 font-light ${className}`}>
      {facts.map(({ icon: Icon, text }) => (
        <li key={text} className="flex items-center gap-2">
          <Icon size={18} aria-hidden className="text-lime-deep" /> {text}
        </li>
      ))}
    </ul>
  );
}

export function Amenities({ chalet }: { chalet: Chalet }) {
  if (!chalet.amenities.length) return null;
  return (
    <ul className="flex flex-wrap gap-5" aria-label="Servicios de la cabaña">
      {chalet.amenities.map((a) => {
        const Icon = amenityIcon[a];
        return (
          <li key={a} title={amenityLabel[a]} className="flex items-center gap-1.5 text-[14px] font-light">
            <Icon size={20} aria-hidden /> <span className="sr-only sm:not-sr-only">{amenityLabel[a]}</span>
          </li>
        );
      })}
    </ul>
  );
}

/** The 2023 card: photo with shadow on the left, name, people and beds, a lime line, price and the button. */
export function ChaletCard({ chalet, heading }: { chalet: Chalet; heading?: string }) {
  return (
    <article className="mx-auto flex max-w-[1000px] flex-col items-center gap-5 px-5 lg:flex-row lg:flex-wrap lg:items-start lg:justify-between">
      {heading ? <h2 className="title w-full">{heading}</h2> : null}
      <Link to={`/information/${chalet.id}`} className="block w-full max-w-[420px] lg:w-[36%]" tabIndex={-1} aria-hidden>
        <Img photo={chalet.photos[0]} sizes="(min-width: 1024px) 360px, 90vw" className="photo aspect-square w-full" />
      </Link>
      <div className="flex w-full flex-col gap-4 text-center lg:w-[58%] lg:pt-8 lg:text-left">
        <h3 className="text-[22px] font-bold">{chalet.name}</h3>
        <p className="font-light">{chalet.description}</p>
        <Facts chalet={chalet} className="justify-center lg:justify-start" />
        {chalet.amenities.length ? (
          <div className="relative flex justify-center pt-4 before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-lime lg:justify-start">
            <Amenities chalet={chalet} />
          </div>
        ) : null}
        <p className="text-[20px]">
          <strong className="font-bold">{priceLabel(chalet)}</strong> <span className="font-light text-[15px]">por noche</span>
        </p>
      </div>
      <Link to={`/information/${chalet.id}`} className="btn w-full max-w-[500px] lg:max-w-none">
        Más información
      </Link>
    </article>
  );
}
