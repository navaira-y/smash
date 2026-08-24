import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CUT_CARDS } from "../data";

export default function Cut() {
  const secRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sec = secRef.current;
    const track = trackRef.current;
    if (!sec || !track) return;
    const getDist = () =>
      Math.max(0, track.scrollWidth - window.innerWidth + 80);
    const st = ScrollTrigger.create({
      trigger: sec,
      start: "top top",
      end: () => `+=${getDist()}`,
      pin: true,
      scrub: 0.6,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        track.style.transform = `translateX(${-self.progress * getDist()}px)`;
        if (progRef.current)
          progRef.current.style.transform = `scaleX(${self.progress})`;
      },
    });
    return () => st.kill();
  }, []);

  return (
    <section
      id="cut"
      ref={secRef}
      className="relative h-screen overflow-hidden border-t border-line bg-bg"
    >
      <div className="h-full flex flex-col pt-20 md:pt-24">
        <div className="max-w-[1300px] w-full mx-auto px-5 md:px-10 flex items-end justify-between gap-6">
          <div>
            <p className="font-mono text-[9px] tracking-[0.35em] text-mut">
              SOURCING // THE SMASH INGREDIENTS
            </p>
            <h2 className="mt-2 font-disp font-semibold uppercase tracking-[0.04em] text-[clamp(1.6rem,4vw,2.6rem)] text-ink">
              <span className="text-gold">//</span> 06. THE CUT
            </h2>
          </div>
          <span className="hidden md:block font-mono text-[10px] tracking-[0.25em] text-mut pb-1">
            6 INGREDIENTS · NOTHING ELSE
          </span>
        </div>

        <div className="flex-1 flex items-center">
          <div
            ref={trackRef}
            className="flex gap-5 pl-5 md:pl-10 pr-10 w-max will-change-transform"
          >
            {CUT_CARDS.map((c) => (
              <article
                key={c.n}
                className="relative w-[300px] md:w-[420px] shrink-0 border border-line bg-panel group overflow-hidden"
              >
                <div className="h-[240px] md:h-[320px] overflow-hidden">
                  <img
                    src={c.img}
                    alt={c.name}
                    className="w-full h-full object-cover transition-transform duration-[1.4s] group-hover:scale-[1.06]"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
                <span className="absolute top-4 right-4 font-disp text-4xl md:text-5xl outline-gold opacity-80">
                  {c.n}
                </span>
                <div className="absolute left-4 right-4 bottom-4">
                  <h3 className="font-disp font-semibold tracking-[0.05em] text-lg md:text-xl text-ink">
                    {c.name}
                  </h3>
                  <p className="mt-2 text-[11px] leading-relaxed text-mut">
                    {c.desc}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="pb-6 px-5 md:px-10">
          <div className="h-px bg-line relative overflow-hidden">
            <div
              ref={progRef}
              className="absolute inset-0 bg-gold origin-left"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
          <p className="mt-3 text-center font-mono text-[9px] tracking-[0.35em] text-ink/60">
            SCROLL TO CONTINUE →
          </p>
        </div>
      </div>
    </section>
  );
}
