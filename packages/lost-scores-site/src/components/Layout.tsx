import type { ReactNode } from "react";
import Art from "@/components/Art";

export function PageShell({ children }: { children: ReactNode }) {
  return <div className="page-enter mx-auto w-full max-w-page px-4 pb-6 pt-24 sm:px-6 lg:pt-28 xl:pt-32">{children}</div>;
}

export function Cover({ children, tall = false }: { children?: ReactNode; tall?: boolean }) {
  return (
    <div className={`relative isolate overflow-hidden rounded-t-2xl ${tall ? "h-44 sm:h-52" : "h-36 sm:h-44"}`}>
      <Art kind="cover" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-shade/55 via-shade/10 to-transparent" />
      {children}
    </div>
  );
}

export function CoverTitle({ title, subtitle }: { title: string; subtitle?: ReactNode }) {
  return (
    <div className="absolute inset-x-5 bottom-5 sm:inset-x-7">
      <h1 className="text-3xl leading-tight text-hero sm:text-4xl">{title}</h1>
      {subtitle && <p className="mt-1 text-hero-dim">{subtitle}</p>}
    </div>
  );
}

export function Sheet({ children }: { children: ReactNode }) {
  return <section className="rounded-b-2xl bg-card px-4 pb-6 pt-2 sm:px-6">{children}</section>;
}

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t border-divider pt-6 first:border-t-0 first:pt-4">
      <h2 className="mb-3 text-xl">{title}</h2>
      {children}
    </section>
  );
}

export function FullArt({ children }: { children: ReactNode }) {
  return (
    <section className="relative isolate flex flex-1 items-center justify-center px-4 pb-12 pt-24">
      <Art kind="hero" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-bg/0 via-bg/30 to-bg" />
      <div className="page-enter w-full">{children}</div>
    </section>
  );
}
