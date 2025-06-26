import React from "react";

type Props = {
  id?: string;
  className?: string;
  children: React.ReactNode;
};

export default function Section({ id, className, children }: Props) {
  return (
    <section id={id} className={`px-4 sm:px-6 md:px-8 py-20 ${className ?? ""}`}>
      {children}
    </section>
  );
}
