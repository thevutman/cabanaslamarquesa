/**
 * Everything the site says about the place. The cabins, prices, check-in times and phone come
 * from the 2022 and 2023 versions of the site; the Lorem ipsum and the stock photos are gone.
 */

export const business = {
  name: "Cabañas La Marquesa",
  tagline: "Hospedaje & Bar",
  town: "Coconuco, Cauca",
  /** International format, digits only, for wa.me and tel: links. */
  phone: "573208454553",
  phoneLabel: "320 845 4553",
  checkIn: "2:00 p. m.",
  checkOut: "11:00 a. m.",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Caba%C3%B1as%20La%20Marquesa%20Hospedaje%20bar%20Coconuco",
  mapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2370.3760087200662!2d-76.49627727586727!3d2.3435043048723183!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e2fff1b45e040e1%3A0x2ce3bd0db2209e27!2sCaba%C3%B1as%20La%20Marquesa%20Hospedaje%20bar!5e0!3m2!1ses!2sco!4v1669306598383!5m2!1ses!2sco",
};

export type Photo = { name: string; alt: string };

/** `name` is the file in public/fotos without the width suffix. */
export const photos = {
  fachada: { name: "fachada", alt: "Entrada de Cabañas La Marquesa con el techo rojo y la montaña detrás" },
  balcon: { name: "cabana-balcon", alt: "Cabaña de ladrillo con balcón de madera y cortinas naranja" },
  jardin: { name: "jardin", alt: "Sendero entre el jardín y las cabañas de techo rojo" },
  hilera: { name: "hilera", alt: "Hilera de cabañas con techos rojos a dos aguas frente a las montañas" },
  duquesa1: { name: "duquesa-1", alt: "Frente de las cabañas tipo A con flores en la entrada" },
  duquesa2: { name: "duquesa-2", alt: "Interior de madera de la Cabaña Duquesa con mesa, televisor y escalera" },
  duquesa3: { name: "duquesa-3", alt: "Cama de la Cabaña Duquesa junto a la ventana" },
  duquesa4: { name: "duquesa-4", alt: "Altillo de la Cabaña Duquesa bajo el techo en A" },
  duquesa5: { name: "duquesa-5", alt: "Baño privado de la Cabaña Duquesa" },
} satisfies Record<string, Photo>;

export type Amenity = "minibar" | "tv" | "ducha" | "bano" | "wifi";

export const amenityLabel: Record<Amenity, string> = {
  minibar: "Minibar",
  tv: "Televisión",
  ducha: "Agua caliente",
  bano: "Baño privado",
  wifi: "Wifi",
};

export type Chalet = {
  id: string;
  name: string;
  guests: number;
  floors?: number;
  beds?: number;
  baths?: number;
  /** Price per night in pesos. With `priceTo` it is a range that depends on the season. */
  price: number;
  priceTo?: number;
  description: string;
  amenities: Amenity[];
  photos: Photo[];
};

export const chalets: Chalet[] = [
  {
    id: "duquesa",
    name: "Cabaña Duquesa",
    guests: 6,
    beds: 3,
    baths: 1,
    price: 360000,
    description:
      "Cabaña de madera con techo en A y altillo, baño privado con agua caliente, televisión, minibar y wifi. Ideal para grupos y familias de hasta 6 personas.",
    amenities: ["minibar", "tv", "ducha", "bano", "wifi"],
    photos: [photos.duquesa1, photos.duquesa2, photos.duquesa3, photos.duquesa4, photos.duquesa5],
  },
  {
    id: "familiar",
    name: "Cabaña Familiar",
    guests: 5,
    floors: 2,
    beds: 3,
    baths: 1,
    price: 300000,
    description:
      "Cabaña de dos niveles con baño privado y agua caliente por ducha eléctrica, televisión, minibar y acceso a internet.",
    amenities: ["minibar", "tv", "ducha", "bano", "wifi"],
    photos: [photos.balcon, photos.hilera, photos.jardin, photos.fachada],
  },
  {
    id: "marquesa",
    name: "Cabaña La Marquesa",
    guests: 8,
    floors: 2,
    beds: 4,
    baths: 1,
    price: 480000,
    description:
      "Nuestra cabaña más grande: dos niveles para 8 huéspedes en acomodación múltiple, con baño privado y agua caliente por ducha eléctrica, televisión y minibar.",
    amenities: ["minibar", "tv", "ducha", "bano"],
    photos: [photos.hilera, photos.fachada, photos.balcon, photos.jardin],
  },
  {
    id: "couple-deluxe",
    name: "Cabaña para Pareja Deluxe",
    guests: 3,
    floors: 2,
    beds: 3,
    price: 150000,
    priceTo: 200000,
    description: "Cabaña de dos niveles pensada para parejas, con espacio para una persona más.",
    amenities: [],
    photos: [photos.jardin, photos.balcon, photos.hilera, photos.fachada],
  },
  {
    id: "couple",
    name: "Cabaña para Pareja",
    guests: 2,
    floors: 2,
    price: 130000,
    priceTo: 170000,
    description: "La más pedida: una cabaña de dos niveles para dos personas, para descansar entre montañas.",
    amenities: [],
    photos: [photos.fachada, photos.jardin, photos.hilera, photos.balcon],
  },
];

export const popularChalet = chalets.find((c) => c.id === "couple")!;

export const findChalet = (id: string | undefined) => chalets.find((c) => c.id === id);

const cop = new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 });

export const money = (value: number) => cop.format(value).replace(/\s/g, "");

export const priceLabel = (c: Chalet) => (c.priceTo ? `${money(c.price)} – ${money(c.priceTo)}` : money(c.price));
