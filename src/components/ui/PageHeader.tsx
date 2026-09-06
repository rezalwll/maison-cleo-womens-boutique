import type { ReactNode } from "react";
import { Reveal } from "@/components/animation/Reveal";

export function PageHeader({
  eyebrow,
  title,
  sub,
  children,
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  children?: ReactNode;
}) {
  return (
    <header className="pad-x mx-auto max-w-[1500px] pb-10 pt-32 md:pb-14 md:pt-44">
      <Reveal>
        {eyebrow && <p className="label-xs text-terracotta">{eyebrow}</p>}
        <h1 className="section-type mt-4 uppercase">{title}</h1>
        {sub && (
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground">
            {sub}
          </p>
        )}
        {children}
      </Reveal>
    </header>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  sub,
  action,
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-10 flex items-end justify-between gap-6">
      <div>
        {eyebrow && <p className="label-xs text-terracotta">{eyebrow}</p>}
        <h2 className="section-type mt-3 uppercase">{title}</h2>
        {sub && <p className="mt-4 max-w-md text-sm text-muted-foreground">{sub}</p>}
      </div>
      {action}
    </div>
  );
}
