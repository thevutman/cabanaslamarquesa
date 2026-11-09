import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "@/assets/logo.svg";

const links = [
  { to: "/", label: "Inicio" },
  { to: "/about", label: "Sobre Nosotros" },
  { to: "/chalets", label: "Cabañas" },
  { to: "/contact", label: "Contacto" },
];

/** The 2023 header: white bar, logo on the left, black links with a lime line under the current one. */
export function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `relative font-medium transition-colors hover:text-lime-dark after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:rounded after:bg-lime after:transition-transform ${
      isActive ? "after:scale-x-100" : "after:scale-x-0"
    }`;

  return (
    <header className="fixed inset-x-0 top-0 z-30 bg-white shadow-[0_1px_0_rgb(0_0_0/0.06)]">
      <nav className="mx-auto flex h-[76px] items-center justify-between px-[3%]" aria-label="Principal">
        <Link to="/" aria-label="Cabañas La Marquesa, inicio">
          <img src={logo} alt="" width={180} height={60} className="h-[60px] w-auto" />
        </Link>
        <ul className="hidden gap-6 text-[17px] lg:flex">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink to={l.to} end={l.to === "/"} className={linkClass}>
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="grid h-11 w-11 place-items-center lg:hidden"
          aria-expanded={open}
          aria-controls="menu-movil"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>
      <div
        id="menu-movil"
        className={`fixed inset-x-0 top-[76px] rounded-b-[60px] bg-white shadow-lg transition-transform duration-700 lg:hidden ${
          open ? "translate-x-0" : "pointer-events-none translate-x-full"
        }`}
        aria-hidden={!open}
        inert={!open}
      >
        <ul className="flex flex-col items-center gap-6 px-[3%] py-7 text-[25px]">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink to={l.to} end={l.to === "/"} className={({ isActive }) => `font-medium hover:text-lime-dark ${isActive ? "text-lime-deep" : ""}`}>
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
