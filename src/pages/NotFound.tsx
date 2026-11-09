import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center gap-5 px-5 py-16 text-center">
      <p className="text-[64px] font-bold text-lime-dark">404</p>
      <h1 className="title">Esta página no existe</h1>
      <p className="font-light">Puede que la cabaña haya cambiado de nombre.</p>
      <Link to="/chalets" className="btn">Ver las cabañas</Link>
    </main>
  );
}
