import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FRAME_COUNT, getFrames, scrollToId } from '../ui';

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = ref.current;
    const canvas = canvasRef.current;
    if (!el || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = 1280;
    canvas.height = 720;

    const imgs = getFrames();

    let ready = false;
    imgs[0].addEventListener('load', () => {
      ready = true;
      ctx.drawImage(imgs[0], 0, 0);
      gsap.to(canvas, { opacity: 1, duration: 0.7 });
    });

    let target = 0;
    let cur = 0;
    let lastIdx = -1;
    let raf = 0;
    const tick = () => {
      cur += (target - cur) * 0.16;
      const idx = Math.min(FRAME_COUNT - 1, Math.max(0, Math.round(cur * (FRAME_COUNT - 1))));
      if (ready && idx !== lastIdx && imgs[idx].complete && imgs[idx].naturalWidth > 0) {
        ctx.drawImage(imgs[idx], 0, 0);
        lastIdx = idx;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const copy = el.querySelector('.hero-copy');
    const dot = el.querySelector('.hero-dot');
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        const p = self.progress;
        target = p;
        if (copy) {
          (copy as HTMLElement).style.opacity = String(Math.max(0, 1 - p * 3.2));
          (copy as HTMLElement).style.transform = `translateY(${p * -120}px)`;
        }
        if (dot) (dot as HTMLElement).style.left = `${p * 100}%`;
      },
    });

    const tl = gsap.timeline({ delay: 0.15 });
    tl.fromTo('.hero-k1', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' })
      .fromTo('.hero-k2', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.6')
      .fromTo('.hero-rule', { scaleX: 0 }, { scaleX: 1, duration: 0.7, ease: 'power3.out' }, '-=0.5')
      .fromTo('.hero-hud', { opacity: 0 }, { opacity: 1, duration: 1 }, '-=0.4');

    return () => {
      cancelAnimationFrame(raf);
      st.kill();
      tl.kill();
    };
  }, []);

  return (
    <section id="top" ref={ref} className="relative h-[320vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-black">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover opacity-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-black/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/30" />

        <div className="hero-hud absolute inset-0 opacity-0 pointer-events-none">
          <div className="hud-corners absolute inset-3 md:inset-6">
            <span className="hc" />
          </div>

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

          <div className="absolute left-0 right-0 bottom-0">
            <div className="flex items-center justify-between px-6 md:px-10 pb-2 font-mono text-[9px] tracking-[0.25em] text-ink/60">
              <span># 00 · THE SEAR</span>
              <span className="hidden md:inline">SCRUB CLIP ▸ SCROLL</span>
            </div>
            <div className="ruler-lg h-6 mx-3 md:mx-6 mb-3 relative">
              <span
                className="hero-dot absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-[9px] h-[9px] rounded-full bg-gold shadow-[0_0_12px_rgba(232,182,76,0.9)]"
                style={{ left: '0%' }}
              />
            </div>
          </div>
        </div>

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
      </div>
    </section>
  );
}
