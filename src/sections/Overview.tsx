import { STATS } from "../data";
import { Digi, Reveal, SectionHead } from "../ui";

export default function Overview() {
  return (
    <section
      id="overview"
      className="relative py-24 md:py-28 border-t border-line bg-bg"
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-10">
        <Reveal>
          <SectionHead
            index="03"
            title="OVERVIEW"
            meta="SPECIFICATIONS // BY THE NUMBERS"
          />
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 border border-line divide-y sm:divide-y lg:divide-y-0 divide-line lg:divide-x">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="h-full">
              <div className="p-6 md:p-8 h-full flex flex-col bg-panel/40">
                <span className="font-mono text-[9px] tracking-[0.3em] text-dim">
                  0{i + 1}
                </span>
                <div className="mt-4 font-digi text-[clamp(3rem,5vw,4.6rem)] leading-none glow-gold flicker">
                  <Digi to={s.value} />
                  {s.suffix}
                </div>
                <p className="mt-5 font-mono text-[10px] tracking-[0.22em] uppercase text-ink">
                  {s.label}
                </p>
                <p className="mt-3 text-[11px] leading-relaxed text-mut">
                  {s.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
