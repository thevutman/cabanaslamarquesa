import { Clock, Coffee, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { BookingForm } from "@/components/BookingForm";
import { ChaletCard } from "@/components/ChaletCard";
import { Img, Reveal, WhatsAppIcon } from "@/components/ui";
import { whatsappUrl } from "@/lib/booking";
import { business, chalets, photos } from "@/lib/data";
import { Services } from "./Home";

export function AboutUs() {
  return (
    <main className="pb-16">
      <section className="mx-auto max-w-[1000px] px-5 pt-10">
        <h1 className="title mb-8">Acerca de Nosotros</h1>
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <Img photo={photos.hilera} sizes="(min-width: 1024px) 480px, 90vw" loading="eager" className="photo aspect-[4/3] w-full" />
          <div className="flex flex-col gap-4 font-light leading-relaxed">
            <p>
              <strong className="font-bold">{business.name}</strong> es un hospedaje con bar en {business.town}. Son cabañas de madera y ladrillo,
              con techos rojos a dos aguas, en medio de las montañas del Cauca.
            </p>
            <p>
              Tenemos cabañas para parejas, para familias y para grupos de hasta 8 personas. Todas las estadías incluyen el desayuno, y puedes
              venir con tu mascota.
            </p>
            <p>
              Para reservar, escríbenos por WhatsApp con las fechas y cuántas personas vienen: te confirmamos la disponibilidad por ahí mismo.
            </p>
          </div>
        </div>
      </section>
      <section className="mt-12 bg-mist">
        <h2 className="sr-only">Servicios</h2>
        <Services />
      </section>
      <Reveal as="section" className="mx-auto mt-12 grid max-w-[1000px] gap-6 px-5 sm:grid-cols-3">
        {[
          { icon: Coffee, title: "Desayuno incluido", text: "En todas las cabañas y todas las noches." },
          { icon: Clock, title: "Entrada y salida", text: `Entrada desde las ${business.checkIn}, salida hasta las ${business.checkOut}.` },
          { icon: MapPin, title: "Ubicación", text: `${business.town}.` },
        ].map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex flex-col items-center gap-2 rounded-lg border-2 border-lime p-5 text-center">
            <Icon aria-hidden className="text-lime-deep" />
            <h3 className="font-bold">{title}</h3>
            <p className="font-light">{text}</p>
          </div>
        ))}
      </Reveal>
      <p className="mt-12 text-center">
        <Link to="/chalets" className="btn">Ver las cabañas</Link>
      </p>
    </main>
  );
}

export function Chalets() {
  return (
    <main className="pt-10 pb-16">
      <h1 className="title">Cabañas</h1>
      <p className="mx-auto mt-2 max-w-xl px-5 text-center font-light">Precios por noche, con desayuno incluido. Los de las cabañas para pareja cambian según la temporada.</p>
      <div className="mt-10 flex flex-col">
        {chalets.map((c, i) => (
          <Reveal key={c.id} as="section" className={`py-10 ${i % 2 ? "bg-mist" : ""}`}>
            <ChaletCard chalet={c} />
          </Reveal>
        ))}
      </div>
    </main>
  );
}

export function Contact() {
  return (
    <main className="mx-auto grid max-w-[1000px] gap-10 px-5 pt-10 pb-16 lg:grid-cols-[1fr_1.3fr]">
      <section className="flex flex-col gap-5">
        <h1 className="title lg:text-left">Contacto</h1>
        <p className="font-light leading-relaxed">
          La forma más rápida de reservar es por WhatsApp. Llena el formulario y se abre el chat con tu solicitud lista para enviar.
        </p>
        <ul className="flex flex-col gap-3">
          <li>
            <a href={whatsappUrl("Hola, quiero información sobre las cabañas.")} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 font-medium hover:text-lime-deep">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[#25d366] text-white"><WhatsAppIcon /></span>
              WhatsApp {business.phoneLabel}
            </a>
          </li>
          <li>
            <a href={`tel:+${business.phone}`} className="flex items-center gap-3 font-medium hover:text-lime-deep">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-lime"><Phone size={18} aria-hidden /></span>
              Llamar
            </a>
          </li>
          <li>
            <a href={business.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 font-medium hover:text-lime-deep">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-lime"><MapPin size={18} aria-hidden /></span>
              {business.town} · Ver en el mapa
            </a>
          </li>
        </ul>
        <Img photo={photos.jardin} sizes="(min-width: 1024px) 400px, 90vw" className="photo mt-2 hidden aspect-[4/3] w-full lg:block" />
      </section>
      <section className="rounded-lg bg-mist p-5 sm:p-8" aria-labelledby="form-title">
        <h2 id="form-title" className="title mb-6">Reserva tu cabaña</h2>
        <BookingForm />
      </section>
    </main>
  );
}
