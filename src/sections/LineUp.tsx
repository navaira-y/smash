import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import { BURGERS } from '../data';
import { Reveal, SectionHead, scrollToId } from '../ui';

export default function LineUp({ onOrder }: { onOrder: (id: string) => void }) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const cards = grid.querySelectorAll('.lu-card');
    const tw = gsap.fromTo(
      cards,
      { y: 70, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.14,
        ease: 'power3.out',
        scrollTrigger: { trigger: grid, start: 'top 80%', once: true },
      },
    );
    return () => {
      tw.scrollTrigger?.kill();
      tw.kill();
    };
  }, []);

  return (
    <section id="lineup" className="relative py-24 md:py-32 border-t border-line bg-bg">
      <div className="max-w-[1200px] mx-auto px-5 md:px-10">
        <Reveal>
          <SectionHead index="01" title="THE LINE-UP" meta="3 BUILDS · MADE TO ORDER" />
        </Reveal>

        <div ref={gridRef} className="grid md:grid-cols-3 gap-5">
          {BURGERS.map((b) => (
            <article key={b.id} className="lu-card group bg-panel border border-line hover:border-gold/40 transition-colors duration-500 flex flex-col">
              <div className="relative aspect-[4/3] overflow-hidden bg-black">
                <img
                  src={b.img}
                  alt={b.name}
                  className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.07]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
                <span className="absolute top-3 left-3 font-mono text-[8px] tracking-[0.25em] text-ink/90 bg-black/60 border border-line px-2 py-1">
                  {b.tag}
                </span>
              </div>

              <div className="p-5 flex flex-col grow">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-disp font-semibold tracking-[0.05em] text-lg text-ink">{b.name}</h3>
                  <span className="font-mono text-gold text-base glow-soft">${b.price}</span>
                </div>
                <p className="mt-3 text-[12px] leading-relaxed text-mut grow">{b.desc}</p>

                <div className="mt-4 pt-3 border-t border-line flex flex-wrap gap-x-3 gap-y-1">
                  {b.tags.map((t) => (
                    <span key={t} className="font-mono text-[8px] tracking-[0.2em] text-dim">
                      {t}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => {
                    onOrder(b.id);
                    scrollToId('build');
                  }}
                  className="mt-5 w-full h-11 border border-gold/40 text-gold font-mono text-[10px] tracking-[0.25em] uppercase hover:bg-gold hover:text-bg hover:shadow-[0_0_24px_rgba(232,182,76,0.35)] transition-all duration-300"
                >
                  + ADD TO ORDER
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
