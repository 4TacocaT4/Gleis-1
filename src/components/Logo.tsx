interface LogoProps {
  /** Blendet die kleine Zeile unter dem Namen ein. */
  withTagline?: boolean;
  className?: string;
}

/**
 * Wortmarke im Stil einer Bahnsteigtafel: Gleisnummer im Kasten, daneben der
 * Name. Rein per CSS gesetzt und dadurch gestochen scharf in jeder Grösse —
 * später problemlos gegen ein echtes Logo (SVG) austauschbar.
 */
export function Logo({ withTagline = false, className = "" }: LogoProps) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <span
        aria-hidden="true"
        className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary font-display text-xl font-bold leading-none text-on-primary"
      >
        1
      </span>

      <span className="flex flex-col leading-none">
        <span className="font-display text-xl font-bold tracking-tight text-foreground">
          Gleis&nbsp;1
        </span>
        {withTagline && (
          <span className="mt-1.5 text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-accent-text">
            Kebab &amp; Take Away
          </span>
        )}
      </span>
    </span>
  );
}
