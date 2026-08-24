import { STORY_CARDS } from '../data';
import { Reveal, SectionHead } from '../ui';

export default function Story() {
  return (
    <section id="story" className="relative py-24 md:py-32 border-t border-line bg-bg2">
      <div className="max-w-[1100px] mx-auto px-5 md:px-10">
        <Reveal>
          <SectionHead index="07" title="THE STORY" meta="TWO CENTURIES · ONE PATTY" />
        </Reveal>

        <Reveal className="text-center mb-14 md:mb-20">
          <h3 className="font-mono text-[clamp(0.9rem,2.4vw,1.4rem)] tracking-[0.5em] uppercase text-ink">
            FROM HAMBURG TO THE GRIDDLE
          </h3>
          <div className="mt-8 flex items-center justify-center gap-6 md:gap-10">
            <span className="text-center">
              <span className="block text-2xl">🇩🇪</span>
              <span className="block mt-2 font-mono text-[8px] tracking-[0.3em] text-mut">1880s · GERMANY</span>
            </span>
            <span className="text-gold text-xl">→</span>
            <span className="text-center">
              <span className="block text-2xl">🇺🇸</span>
              <span className="block mt-2 font-mono text-[8px] tracking-[0.3em] text-mut">TODAY · EST. 2023</span>
            </span>
          </div>
          <p className="mt-8 max-w-md mx-auto text-[12px] leading-relaxed text-mut">
            Born in Hamburg, 1880. A German steak met an American bun, then a modern craft — one patty, perfected across two centuries.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-5">
          {STORY_CARDS.map((c, i) => (
            <Reveal key={c.title} delay={(i % 2) * 0.12}>
              <article className="group border border-line bg-panel hover:border-gold/40 transition-colors duration-500">
                <div className="relative h-[220px] md:h-[260px] overflow-hidden">
                  <img
                    src={c.img}
                    alt={c.title}
                    className="w-full h-full object-cover grayscale sepia-[0.35] contrast-[1.05] brightness-[0.85] transition-all duration-[1.4s] group-hover:grayscale-0 group-hover:sepia-0 group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <span className="absolute top-3 left-3 font-mono text-[8px] tracking-[0.25em] text-ink/90 bg-black/60 border border-line px-2 py-1">
                    {c.era}
                  </span>
                </div>
                <div className="p-5">
                  <h4 className="font-disp font-medium tracking-[0.04em] text-lg text-ink">{c.title}</h4>
                  <p className="mt-2 text-[11px] leading-relaxed text-mut">{c.desc}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
