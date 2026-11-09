import { useId, useMemo, useState, type FormEvent } from "react";
import { addDays, bookingMessage, estimate, nights, today, validate, whatsappUrl, type BookingRequest } from "@/lib/booking";
import { chalets, findChalet, money, type Chalet } from "@/lib/data";
import { WhatsAppIcon } from "./ui";

/**
 * The "Reserva Ahora" button of 2023 pointed nowhere. Now it opens WhatsApp with the whole
 * request written: cabin, dates, nights, people and the price the page shows. Nothing is stored.
 */
export function BookingForm({ chalet: fixed }: { chalet?: Chalet }) {
  const id = useId();
  const [chaletId, setChaletId] = useState(fixed?.id ?? "");
  const [arrival, setArrival] = useState("");
  const [departure, setDeparture] = useState("");
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [tried, setTried] = useState(false);

  const chalet = fixed ?? findChalet(chaletId);
  const request: Partial<BookingRequest> = { chalet, arrival, departure, guests, name, note };
  const errors = useMemo(() => validate(request), [chalet, arrival, departure, guests, name]); // eslint-disable-line react-hooks/exhaustive-deps
  const n = nights(arrival, departure);
  const price = chalet && n > 0 ? estimate(chalet, n) : null;

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setTried(true);
    if (Object.keys(errors).length) {
      document.getElementById(`${id}-${Object.keys(errors)[0]}`)?.focus();
      return;
    }
    window.open(whatsappUrl(bookingMessage(request as BookingRequest)), "_blank", "noopener,noreferrer");
  };

  const err = (key: keyof BookingRequest) =>
    tried && errors[key] ? (
      <p id={`${id}-${key}-error`} className="mt-1 text-[14px] font-medium text-rose" role="alert">
        {errors[key]}
      </p>
    ) : null;
  const invalid = (key: keyof BookingRequest) => ({
    "aria-invalid": tried && !!errors[key],
    "aria-describedby": tried && errors[key] ? `${id}-${key}-error` : undefined,
  });

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-4">
      {!fixed ? (
        <div>
          <label htmlFor={`${id}-chalet`} className="mb-1 block font-bold">Cabaña</label>
          <select id={`${id}-chalet`} className="field" value={chaletId} onChange={(e) => setChaletId(e.target.value)} {...invalid("chalet")}>
            <option value="">Elige una cabaña</option>
            {chalets.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} · hasta {c.guests} personas
              </option>
            ))}
          </select>
          {err("chalet")}
        </div>
      ) : null}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-arrival`} className="mb-1 block font-bold">Llegada</label>
          <input
            id={`${id}-arrival`}
            type="date"
            className="field"
            min={today()}
            value={arrival}
            onChange={(e) => {
              setArrival(e.target.value);
              if (e.target.value && (!departure || departure <= e.target.value)) setDeparture(addDays(e.target.value, 1));
            }}
            {...invalid("arrival")}
          />
          {err("arrival")}
        </div>
        <div>
          <label htmlFor={`${id}-departure`} className="mb-1 block font-bold">Salida</label>
          <input id={`${id}-departure`} type="date" className="field" min={arrival ? addDays(arrival, 1) : addDays(today(), 1)} value={departure} onChange={(e) => setDeparture(e.target.value)} {...invalid("departure")} />
          {err("departure")}
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-guests`} className="mb-1 block font-bold">Personas</label>
          <input id={`${id}-guests`} type="number" inputMode="numeric" min={1} max={chalet?.guests ?? 8} className="field" value={guests} onChange={(e) => setGuests(Number(e.target.value))} {...invalid("guests")} />
          {err("guests")}
        </div>
        <div>
          <label htmlFor={`${id}-name`} className="mb-1 block font-bold">Tu nombre</label>
          <input id={`${id}-name`} className="field" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} maxLength={60} {...invalid("name")} />
          {err("name")}
        </div>
      </div>
      <div>
        <label htmlFor={`${id}-note`} className="mb-1 block font-bold">
          Algo más <span className="font-light">(opcional)</span>
        </label>
        <textarea id={`${id}-note`} rows={2} className="field resize-y" value={note} onChange={(e) => setNote(e.target.value)} maxLength={300} placeholder="Llegamos con mascota, hora de llegada…" />
      </div>
      <p className="min-h-6 text-[15px]" aria-live="polite">
        {price ? (
          <>
            {n} {n === 1 ? "noche" : "noches"}:{" "}
            <strong>{price.to ? `${money(price.from)} – ${money(price.to)}` : money(price.from)}</strong>
            <span className="font-light"> · desayuno incluido</span>
          </>
        ) : (
          <span className="font-light">Elige las fechas para ver el valor de la estadía.</span>
        )}
      </p>
      <button type="submit" className="btn py-3 text-[17px]">
        <WhatsAppIcon /> Reservar por WhatsApp
      </button>
      <p className="text-center text-[13px] font-light text-black/60">Se abre WhatsApp con tu solicitud escrita. Te confirmamos la disponibilidad por ahí.</p>
    </form>
  );
}
