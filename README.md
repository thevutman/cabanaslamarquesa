# Cabañas La Marquesa

Sitio de **Cabañas La Marquesa**, hospedaje y bar en Coconuco, Cauca. Lo hice en 2022 en HTML y en
2023 lo pasé a React con webpack, pero quedó en beta: con Lorem ipsum, precios cruzados, fotos de
villas sacadas de internet, un botón de "Reserva ahora" que no hacía nada y un link de Contacto a una
página que no existía.

En 2026 lo rehíce conservando su identidad: el logo, el blanco con bandas grises, el verde lima,
Raleway, las fotos redondeadas con sombra, el slider, el mosaico de fotos de cada cabaña y el
footer negro. Mismas rutas (`/`, `/about`, `/chalets`, `/information/:id`), más `/contact`.

## Qué hace

- **Cabañas** con capacidad, camas, pisos, servicios y precio por noche.
- **Reserva por WhatsApp**: eliges cabaña, fechas y personas; el sitio valida (sin fechas pasadas,
  sin pasarse de la capacidad), calcula las noches y el valor, y abre WhatsApp con la solicitud
  escrita. No guarda datos.
- **Solo fotos reales** del lugar, en WebP a dos tamaños (`npm run images`).
- Slider sin librerías, con swipe, autoplay y pausa; galería que se arrastra; visor de fotos con teclado.
- SEO local: título por página, Open Graph y datos estructurados `LodgingBusiness`.

## Stack

React 19 · TypeScript · Vite · Tailwind CSS 4 · React Router 7 · Vercel

## Correr en local

```bash
npm install
npm run dev
```
