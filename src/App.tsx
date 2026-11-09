import { useEffect } from "react";
import { BrowserRouter, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { business } from "@/lib/data";
import { Home } from "@/pages/Home";
import { Information } from "@/pages/Information";
import { NotFound } from "@/pages/NotFound";
import { AboutUs, Chalets, Contact } from "@/pages/Pages";

const titles: Record<string, string> = {
  "/": `${business.name} · Hospedaje y bar en ${business.town}`,
  "/about": `Sobre nosotros · ${business.name}`,
  "/chalets": `Cabañas y precios · ${business.name}`,
  "/contact": `Contacto y reservas · ${business.name}`,
};

function Layout() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
    if (titles[pathname]) document.title = titles[pathname];
  }, [pathname, hash]);
  return (
    <>
      <a href="#contenido" className="sr-only z-50 rounded bg-lime px-4 py-2 font-bold focus:not-sr-only focus:fixed focus:top-2 focus:left-2">
        Saltar al contenido
      </a>
      <Header />
      <div id="contenido" className="pt-[76px]">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

/** Same routes as the 2023 site, plus /contact, which its menu linked to but never existed. */
export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="chalets" element={<Chalets />} />
          <Route path="information/:id" element={<Information />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
