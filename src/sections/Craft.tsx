import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { CRAFT_TILES } from '../data';
import { Reveal, SectionHead } from '../ui';

export default function Craft() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const tiles = grid.querySelectorAll('.craft-tile');
    const tw = gsap.fromTo(
      tiles,
      { clipPath: 'inset(100% 0 0 0)', y: 30 },
      {
        clipPath: 'inset(0% 0 0 0)',
        y: 0,
        duration: 1.1,
        stagger: 0.12,
        ease: 'power3.inOut',
        scrollTrigger: { trigger: grid, start: 'top 78%', once: true },
      },
    );
    return () => {
      tw.scrollTrigger?.kill();
      tw.kill();
    };
  }, []);

  return (
    <section id="craft" className="relative py-24 md:py-32 border-t border-line bg-bg2">
      <div className="max-w-[1200px] mx-auto px-5 md:px-10">
        <Reveal>
          <SectionHead index="05" title="THE CRAFT" meta="FIVE ELEMENTS · ONE BUILD" />
        </Reveal>

        <div ref={gridRef} className="grid md:grid-cols-12 gap-4">
          {CRAFT_TILES.map((t) => (
            <figure key={t.n} className={`craft-tile relative overflow-hidden border border-line bg-panel group ${t.span}`}>
              <div className="h-[240px] md:h-[300px] overflow-hidden">
                <img
                  src={t.img}
                  alt={t.name}
                  className="w-full h-full object-cover transition-transform duration-[1.4s] group-hover:scale-[1.06]"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
              <figcaption className="absolute left-4 bottom-3 right-4 flex items-end justify-between gap-3">
                <span>
                  <span className="block font-mono text-[8px] tracking-[0.3em] text-gold">{t.n} / {t.tag}</span>
                  <span className="block mt-1 font-disp font-medium tracking-[0.05em] text-sm text-ink">{t.name}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
            {['SMASH', 'FRESH GROUND', 'SMASH SAUCE', 'HOUSE PICKLES', 'NEVER FROZEN'].map((t) => (
              <span key={t} className="font-mono text-[9px] tracking-[0.3em] text-dim">
                {t}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
