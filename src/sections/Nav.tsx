import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { NAV_LINKS } from "../data";
import { lenis, scrollToId } from "../ui";

export default function Nav() {
  const barRef = useRef<HTMLDivElement>(null);
  const progRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const bar = barRef.current;
    const prog = progRef.current;
    if (!bar || !prog) return;
    const st = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        prog.style.transform = `scaleX(${self.progress})`;
        setScrolled(self.scroll() > 40);
      },
    });
    return () => st.kill();
  }, []);

  const go = (id: string) => {
    setOpen(false);
    setTimeout(() => {
      if (id === "top") lenis?.scrollTo(0, { duration: 1.4 });
      else scrollToId(id);
    }, 30);
  };

  return (
    <>
      {" "}
      <div className="fixed top-0 left-0 right-0 z-[70] h-[2px] bg-line/60">
        <div
          ref={progRef}
          className="h-full w-full origin-left bg-gold"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
      <header
        className={`fixed top-0 left-0 right-0 z-[60] transition-colors duration-500 border-b ${
          scrolled
            ? "bg-bg/85 backdrop-blur-md border-line"
            : "bg-gradient-to-b from-black/70 to-transparent border-transparent"
        }`}
      >
        <div className="flex items-center justify-between h-[52px] px-4 md:px-8">
          <button
            onClick={() => go("top")}
            className="text-left leading-none group"
          >
            <span className="font-disp font-semibold tracking-[0.14em] text-[15px] text-ink group-hover:text-gold transition-colors">
              SMASH
            </span>
            <span className="block font-mono text-[8px] tracking-[0.4em] text-mut mt-[3px]">
              VISUALLY SEARED
            </span>
          </button>

          <nav className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className="font-mono text-[9px] tracking-[0.22em] uppercase text-mut hover:text-gold transition-colors"
              >
                {l.label}
              </button>
            ))}
          </nav>

          <button
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-3 font-mono text-[10px] tracking-[0.3em] uppercase text-ink hover:text-gold transition-colors"
          >
            MENU
            <span className="flex flex-col gap-[3px]">
              <span
                className={`block h-px bg-current transition-transform ${open ? "translate-y-[2px] rotate-45" : ""} w-4`}
              />
              <span
                className={`block h-px bg-current transition-transform ${open ? "-translate-y-[2px] -rotate-45" : ""} w-4`}
              />
            </span>
          </button>
        </div>
      </header>{" "}
      <div
        ref={barRef}
        className={`fixed inset-0 z-[55] bg-bg/95 backdrop-blur-xl transition-all duration-500 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="hud-corners absolute inset-4 md:inset-8 border-0">
          <span className="hc" />
        </div>
        <div className="h-full flex flex-col items-center justify-center gap-1 px-6">
          <p className="font-mono text-[9px] tracking-[0.4em] text-mut mb-6">
            SMASH // INDEX
          </p>
          {NAV_LINKS.map((l, i) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              style={{ transitionDelay: `${i * 40}ms` }}
              className={`font-disp uppercase font-medium text-3xl md:text-5xl text-ink hover:text-gold hover:tracking-[0.08em] tracking-[0.04em] transition-all duration-500 ${
                open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
            >
              <span className="font-mono text-[10px] text-gold align-top mr-3">
                {l.label.split(".")[0]}
              </span>
              {l.label.split(". ")[1]}
            </button>
          ))}
          <button
            onClick={() => go("reserve")}
            className={`mt-6 border border-gold/50 text-gold font-mono text-[10px] tracking-[0.3em] uppercase px-6 py-3 hover:bg-gold hover:text-bg transition-all ${
              open ? "opacity-100" : "opacity-0"
            }`}
          >
            RESERVE YOUR SMASH
          </button>
        </div>
      </div>
    </>
  );
}
