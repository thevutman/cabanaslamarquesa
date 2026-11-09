import { Clock, MapPin, Phone } from "lucide-react";
import { business } from "@/lib/data";
import { whatsappUrl } from "@/lib/booking";
import { WhatsAppIcon } from "./ui";

/** The black footer of 2023, now with the real phone, the town and the check-in times. */
export function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto grid max-w-5xl gap-10 px-5 py-10 text-center md:grid-cols-3">
        <section className="flex flex-col items-center gap-4">
          <h2 className="text-[22px] font-bold">Contacto</h2>
          <a href={`tel:+${business.phone}`} className="flex items-center gap-2 font-light hover:text-lime">
            <Phone size={16} aria-hidden /> {business.phoneLabel}
          </a>
          <a
            href={whatsappUrl("Hola, quiero información sobre las cabañas.")}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Escribir por WhatsApp"
            className="grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-[#25d366]"
          >
            <WhatsAppIcon />
          </a>
        </section>
        <section className="flex flex-col items-center gap-4">
          <h2 className="text-[22px] font-bold">Dirección</h2>
          <p className="font-light">{business.town}</p>
          <a href={business.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-light underline-offset-4 hover:text-lime hover:underline">
            <MapPin size={16} aria-hidden /> Ver en Google Maps
          </a>
        </section>
        <section className="flex flex-col items-center gap-4">
          <h2 className="text-[22px] font-bold">Horario</h2>
          <p className="flex items-center gap-2 font-light">
            <Clock size={16} aria-hidden /> Entrada {business.checkIn}
          </p>
          <p className="font-light">Salida {business.checkOut}</p>
        </section>
      </div>
      <p className="border-t border-white/15 px-5 py-4 text-center text-[13px] font-light text-white/70">
        © {new Date().getFullYear()} {business.name} · Sitio hecho por{" "}
        <a href="https://thevutman.github.io" className="underline-offset-4 hover:text-lime hover:underline">
          Santiago Velasco
        </a>
      </p>
    </footer>
  );
}
