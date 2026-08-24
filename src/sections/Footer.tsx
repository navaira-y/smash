import { lenis } from "../ui";

export default function Footer() {
  return (
    <footer className="relative border-t border-line bg-bg2">
      <div className="overflow-hidden py-5 border-b border-line">
        <div className="marquee-track flex w-max gap-10 whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, k) => (
            <span key={k} className="flex gap-10">
              {Array.from({ length: 8 }).map((_, i) => (
                <span
                  key={i}
                  className="font-disp uppercase tracking-[0.1em] text-lg text-gold/80"
                >
                  PRESS. SEAR. SERVE. <span className="text-dim mx-2">//</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-5 md:px-10 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <span className="font-disp font-semibold tracking-[0.14em] text-ink">
            SMASH
          </span>
          <span className="block font-mono text-[8px] tracking-[0.4em] text-mut mt-1">
            VISUALLY SEARED
          </span>
        </div>
        <p className="font-mono text-[9px] tracking-[0.25em] text-dim text-center">
          © 2026 SMASH · A FICTIONAL BRAND · PRESS. SEAR. SERVE.
        </p>
        <button
          onClick={() => lenis?.scrollTo(0, { duration: 1.6 })}
          className="font-mono text-[9px] tracking-[0.3em] text-mut hover:text-gold transition-colors"
        >
          BACK TO TOP ↑
        </button>
      </div>
    </footer>
  );
}
