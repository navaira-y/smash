import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scrollToId } from '../ui';

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const img = el.querySelector('.hero-img');
    const content = el.querySelector('.hero-copy');

    const tl = gsap.timeline({ delay: 0.15 });
    tl.fromTo(img, { scale: 1.18, opacity: 0 }, { scale: 1.06, opacity: 1, duration: 2, ease: 'power3.out' })
      .fromTo('.hero-k1', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=1.2')
      .fromTo('.hero-k2', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.6')
      .fromTo('.hero-rule', { scaleX: 0 }, { scaleX: 1, duration: 0.7, ease: 'power3.out' }, '-=0.5')
      .fromTo('.hero-hud', { opacity: 0 }, { opacity: 1, duration: 1 }, '-=0.4');

    // parallax out on scroll
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        const p = self.progress;
        gsap.set(img, { yPercent: p * 14, scale: 1.06 + p * 0.08 });
        gsap.set(content, { yPercent: p * -18, opacity: 1 - p * 1.1 });
      },
    });

    return () => {
      tl.kill();
      st.kill();
    };
  }, []);

  return (
    <section id="top" ref={ref} className="relative h-[100svh] min-h-[560px] overflow-hidden bg-black">
      {/* burger photo (stands in for the scroll-scrubbed video) */}
      <img
        src="images/hero-05.jpg"
        alt="The Smash — double patty, melted american, served on a dark plate"
        className="hero-img absolute inset-0 w-full h-full object-cover opacity-0"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-black/60" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/40" />

      {/* HUD chrome */}
      <div className="hero-hud absolute inset-0 opacity-0 pointer-events-none">
        <div className="hud-corners absolute inset-3 md:inset-6">
          <span className="hc" />
        </div>

        {/* top readouts */}
        <div className="absolute top-6 left-6 md:top-8 md:left-10 flex items-center gap-2 font-mono text-[9px] tracking-[0.25em] text-ink/70">
          <span className="w-[7px] h-[7px] rounded-full bg-red-500 blink" />
          REC 00:00:00:00
        </div>
        <div className="absolute top-6 right-6 md:top-8 md:right-10 font-mono text-[9px] tracking-[0.25em] text-ink/70">
          60 FPS · F2.0 · ISO 400
        </div>

        {/* side rails */}
        <div className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-start gap-10">
          <span className="font-mono text-[9px] tracking-[0.3em] text-ink/50 [writing-mode:vertical-rl] rotate-180">
            GRIND // 80:20 CHUCK BLEND
          </span>
        </div>
        <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 hidden md:block">
          <span className="font-mono text-[9px] tracking-[0.3em] text-ink/50 [writing-mode:vertical-rl] rotate-180">
            FRESH GROUND · PRESS · SEAR
          </span>
        </div>

        {/* bottom scrub ruler */}
        <div className="absolute left-0 right-0 bottom-0">
          <div className="flex items-center justify-between px-6 md:px-10 pb-2 font-mono text-[9px] tracking-[0.25em] text-ink/60">
            <span># 00 · THE SEAR</span>
            <span className="hidden md:inline">SCRUB CLIP ▸ SCROLL</span>
          </div>
          <div className="ruler-lg h-6 mx-3 md:mx-6 mb-3 relative">
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[9px] h-[9px] rounded-full bg-gold shadow-[0_0_12px_rgba(232,182,76,0.9)]" />
          </div>
        </div>
      </div>

      {/* headline */}
      <div className="hero-copy absolute left-6 md:left-16 bottom-24 md:bottom-28 z-10">
        <p className="hero-k1 font-mono text-[10px] tracking-[0.35em] uppercase text-gold/90 mb-4 opacity-0">
          GRIDDLE TEMP 230°C · MAILLARD ACTIVE
        </p>
        <h1 className="font-sans leading-[0.95] tracking-[0.02em]">
          <span className="hero-k2 block font-medium text-[clamp(3rem,9vw,7.5rem)] text-ink opacity-0">SMASH</span>
          <span className="hero-k2 block font-light text-[clamp(3rem,9vw,7.5rem)] text-mut opacity-0">
            <span className="text-gold">//</span> THE SEAR
          </span>
        </h1>
        <div className="hero-rule origin-left scale-x-0 h-px w-40 bg-gold/70 mt-6" />
      </div>

      <button
        onClick={() => scrollToId('lineup')}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 font-mono text-[9px] tracking-[0.35em] text-ink/70 hover:text-gold transition-colors flicker"
      >
        SCROLL TO BEGIN THE SEAR ↓
      </button>
    </section>
  );
}
