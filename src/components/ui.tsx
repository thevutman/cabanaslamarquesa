import { createElement, useEffect, useRef, type ComponentProps, type ReactNode } from "react";
import type { Photo } from "@/lib/data";

/** A real photo of the place, served as WebP in two widths. */
export function Img({ photo, sizes = "100vw", className = "", ...rest }: { photo: Photo; sizes?: string } & Omit<ComponentProps<"img">, "src" | "alt">) {
  return (
    <img
      src={`/fotos/${photo.name}-800.webp`}
      srcSet={`/fotos/${photo.name}-800.webp 800w, /fotos/${photo.name}-1600.webp 1600w`}
      sizes={sizes}
      alt={photo.alt}
      loading="lazy"
      decoding="async"
      className={className}
      {...rest}
    />
  );
}

/** Fades its content in the first time it scrolls into view, like the 2023 site did. */
export function Reveal({ children, className = "", as: Tag = "div" }: { children: ReactNode; className?: string; as?: "div" | "section" | "article" }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return createElement(Tag, { ref, className: `reveal ${className}` }, children);
}

export function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.27.49 1.7.63.71.23 1.36.2 1.88.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.57.94.95-3.48-.22-.36a9.38 9.38 0 0 1-1.44-5.01c0-5.19 4.23-9.42 9.43-9.42a9.37 9.37 0 0 1 6.66 2.77 9.36 9.36 0 0 1 2.76 6.66c0 5.2-4.23 9.42-9.42 9.42m8.03-17.45A11.27 11.27 0 0 0 12.05.72C5.79.72.7 5.8.7 12.07c0 2 .52 3.95 1.52 5.67L.6 23.64l6.03-1.58a11.33 11.33 0 0 0 5.42 1.38h.01c6.25 0 11.34-5.09 11.35-11.35a11.28 11.28 0 0 0-3.33-8.04" />
    </svg>
  );
}
