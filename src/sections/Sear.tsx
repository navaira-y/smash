import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Sear() {
  const secRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);
  const fireRef = useRef<HTMLImageElement>(null);
  const warmRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const sec = secRef.current;
    if (!sec) return;
    const st = ScrollTrigger.create({
      trigger: sec,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.6,
      onUpdate: (self) => {
        const p = self.progress;
        if (countRef.current)
          countRef.current.textContent = String(Math.round(p * 230));
        if (fireRef.current)
          fireRef.current.style.opacity = String(Math.min(1, p * 1.5));
        if (warmRef.current) warmRef.current.style.opacity = String(p * 0.55);
        if (barRef.current) barRef.current.style.height = `${p * 100}%`;
        if (bgRef.current) {
          bgRef.current.style.filter = `grayscale(${0.8 - p * 0.8}) brightness(${0.6 + p * 0.3}) saturate(${0.7 + p * 0.6})`;
          bgRef.current.style.transform = `scale(${1.12 - p * 0.12})`;
        }
      },
    });
    return () => st.kill();
  }, []);

  return (
    <section id="sear" ref={secRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-black">
        <img
          ref={bgRef}
          src="images/sear-bg.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover will-change-transform"
          style={{ filter: "grayscale(0.8) brightness(0.6)" }}
        />
        <div
          ref={warmRef}
          className="absolute inset-0 bg-ember opacity-0 mix-blend-overlay"
        />
        <img
          ref={fireRef}
          src="images/hero-02.jpg"
          alt=""
          className="absolute inset-x-0 bottom-0 w-full h-[60%] object-cover opacity-0 mix-blend-screen"
          style={{
            maskImage: "linear-gradient(to top, black 25%, transparent 95%)",
            WebkitMaskImage:
              "linear-gradient(to top, black 25%, transparent 95%)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-black/40" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/80 to-transparent" />

        <div className="relative h-full max-w-[1300px] mx-auto px-5 md:px-10 flex flex-col">
          {" "}
          <div className="pt-24 md:pt-28">
            <p className="font-mono text-[9px] tracking-[0.35em] text-gold/80">
              PROCESS // FLAT-TOP STEEL SEAR
            </p>
            <h2 className="mt-2 font-disp font-semibold uppercase tracking-[0.04em] text-[clamp(1.6rem,4vw,2.6rem)] text-ink">
              <span className="text-gold">//</span> 04. THE SEAR
            </h2>
          </div>
          <div className="flex-1 flex flex-col md:flex-row items-start md:items-center justify-between gap-10 md:gap-8">
            {" "}
            <div className="max-w-xl">
              <p className="font-mono text-[9px] tracking-[0.35em] text-mut mb-4">
                HELD COLD
              </p>
              <h3 className="font-disp font-semibold uppercase leading-[0.95] text-[clamp(3rem,8.5vw,7rem)] text-ink">
                THE
                <br />
                BEEF
                <br />
                WAITS
              </h3>
              <p className="mt-6 max-w-sm text-[12px] leading-relaxed text-mut">
                Fresh-ground, hand-balled, ordered. No steam, no squeeze until
                it hits the steel. The beef waits.
              </p>
            </div>{" "}
            <div className="flex items-end gap-6 md:gap-10">
              <div className="text-right">
                <span
                  ref={countRef}
                  className="font-digi glow-gold text-[clamp(4.5rem,16vw,13rem)] leading-none"
                >
                  0
                </span>
                <span className="font-digi glow-gold text-[clamp(1.6rem,4vw,3rem)] align-top">
                  °C
                </span>
                <p className="mt-2 font-mono text-[9px] tracking-[0.3em] text-mut">
                  GRIDDLE TEMP · RISING
                </p>
              </div>
              <div className="hidden md:flex flex-col items-center gap-2 pb-2">
                <span className="font-mono text-[8px] text-mut">230</span>
                <div className="relative h-[38vh] w-[3px] bg-line overflow-hidden">
                  <div
                    ref={barRef}
                    className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-ember to-gold"
                    style={{ height: "0%" }}
                  />
                </div>
                <span className="font-mono text-[8px] text-mut">0</span>
              </div>
            </div>
          </div>
          <div className="pb-8 text-center">
            <span className="font-mono text-[9px] tracking-[0.35em] text-ink/70 flicker">
              SCROLL TO RISE HEAT
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
