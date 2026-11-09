import { business, money, type Chalet } from "./data";

export type BookingRequest = {
  chalet: Chalet;
  arrival: string;
  departure: string;
  guests: number;
  name: string;
  note: string;
};

const DAY = 86_400_000;

/** yyyy-mm-dd in the visitor's own time zone (toISOString would shift it to UTC). */
export function isoDate(date: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export const today = () => isoDate(new Date());

export function addDays(iso: string, days: number) {
  const [y, m, d] = iso.split("-").map(Number);
  return isoDate(new Date(y, m - 1, d + days));
}

export function nights(arrival: string, departure: string) {
  if (!arrival || !departure) return 0;
  const a = Date.parse(`${arrival}T12:00:00`);
  const b = Date.parse(`${departure}T12:00:00`);
  return Math.round((b - a) / DAY);
}

export function validate(r: Partial<BookingRequest>) {
  const errors: Partial<Record<keyof BookingRequest, string>> = {};
  if (!r.chalet) errors.chalet = "Elige una cabaña.";
  if (!r.arrival) errors.arrival = "Elige el día de llegada.";
  else if (r.arrival < today()) errors.arrival = "La llegada no puede ser en el pasado.";
  if (!r.departure) errors.departure = "Elige el día de salida.";
  else if (r.arrival && nights(r.arrival, r.departure) < 1) errors.departure = "La salida debe ser después de la llegada.";
  if (!r.guests || r.guests < 1) errors.guests = "¿Cuántas personas vienen?";
  else if (r.chalet && r.guests > r.chalet.guests) errors.guests = `Esta cabaña es para máximo ${r.chalet.guests} personas.`;
  if (!r.name?.trim()) errors.name = "Escribe tu nombre.";
  return errors;
}

/** What the stay would cost at the base price. Range prices are confirmed by the hosts. */
export function estimate(chalet: Chalet, n: number) {
  return { from: chalet.price * n, to: chalet.priceTo ? chalet.priceTo * n : undefined };
}

const longDate = (iso: string) =>
  new Intl.DateTimeFormat("es-CO", { weekday: "long", day: "numeric", month: "long" }).format(new Date(`${iso}T12:00:00`));

export function bookingMessage(r: BookingRequest) {
  const n = nights(r.arrival, r.departure);
  const { from, to } = estimate(r.chalet, n);
  const total = to ? `entre ${money(from)} y ${money(to)}` : money(from);
  return [
    `Hola, soy ${r.name.trim()}. Quiero reservar en ${business.name}:`,
    ``,
    `• Cabaña: ${r.chalet.name}`,
    `• Llegada: ${longDate(r.arrival)}`,
    `• Salida: ${longDate(r.departure)} (${n} ${n === 1 ? "noche" : "noches"})`,
    `• Personas: ${r.guests}`,
    `• Valor según la página: ${total}`,
    r.note.trim() ? `\n${r.note.trim()}` : "",
    ``,
    `¿Tienen disponibilidad?`,
  ]
    .filter((line, i, all) => !(line === "" && all[i - 1] === ""))
    .join("\n")
    .trim();
}

export const whatsappUrl = (text?: string) =>
  `https://wa.me/${business.phone}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
