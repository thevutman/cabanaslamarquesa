import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";
import { photos } from "@/lib/data";
import { Img } from "./ui";

const slides = [photos.fachada, photos.balcon, photos.jardin, photos.hilera];
const DELAY = 3500;

/**
 * The 2023 home slider (it used Swiper from a CDN): four real photos at 84vh with white arrows,
 * dots and autoplay every 3.5 s. Now without the library, with swipe and pause on hover.
 */
export function Slider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [drag, setDrag] = useState(0);
  const start = useRef<number | null>(null);

  const go = useCallback((to: number) => setIndex((to + slides.length) % slides.length), []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (paused || reduce) return;
    const id = window.setTimeout(() => go(index + 1), DELAY);
    return () => window.clearTimeout(id);
  }, [index, paused, go]);

  const onDown = (e: PointerEvent) => {
    start.current = e.clientX;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onMove = (e: PointerEvent) => {
    if (start.current !== null) setDrag(e.clientX - start.current);
  };
  const onUp = () => {
    if (start.current === null) return;
    if (drag < -60) go(index + 1);
    else if (drag > 60) go(index - 1);
    start.current = null;
    setDrag(0);
  };

  return (
    <section
      className="relative overflow-hidden rounded-b-lg"
      aria-roledescription="carrusel"
      aria-label="Fotos de las cabañas"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        className={`flex h-[60vh] cursor-grab touch-pan-y select-none active:cursor-grabbing sm:h-[84vh] ${drag ? "" : "transition-transform duration-700 ease-out"}`}
        style={{ transform: `translateX(calc(${-index * 100}% + ${drag}px))` }}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
      >
        {slides.map((photo, i) => (
          <div key={photo.name} className="h-full w-full shrink-0" aria-roledescription="diapositiva" aria-label={`${i + 1} de ${slides.length}`} aria-hidden={i !== index}>
            <Img photo={photo} loading={i === 0 ? "eager" : "lazy"} fetchPriority={i === 0 ? "high" : "auto"} draggable={false} className="h-full w-full object-cover" />
          </div>
        ))}
      </div>
      <button type="button" onClick={() => go(index - 1)} aria-label="Foto anterior" className="absolute top-1/2 left-2 grid h-12 w-12 -translate-y-1/2 place-items-center text-white drop-shadow-[0_1px_3px_rgb(0_0_0/0.6)]">
        <ChevronLeft size={40} strokeWidth={1.5} />
      </button>
      <button type="button" onClick={() => go(index + 1)} aria-label="Foto siguiente" className="absolute top-1/2 right-2 grid h-12 w-12 -translate-y-1/2 place-items-center text-white drop-shadow-[0_1px_3px_rgb(0_0_0/0.6)]">
        <ChevronRight size={40} strokeWidth={1.5} />
      </button>
      <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1">
        {slides.map((photo, i) => (
          <button key={photo.name} type="button" onClick={() => go(i)} aria-label={`Ver foto ${i + 1}`} aria-current={i === index} className="grid h-6 w-6 place-items-center">
            <span className={`block h-2 rounded-full bg-white shadow transition-all ${i === index ? "w-6 opacity-100" : "w-2 opacity-60"}`} />
          </button>
        ))}
      </div>
    </section>
  );
}
