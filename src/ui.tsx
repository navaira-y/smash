import { useEffect, useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

/* ── smooth scroll singleton ─────────────────────────── */
export let lenis: Lenis | null = null;
export function setLenis(l: Lenis | null) {
  lenis = l;
}
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el && lenis) lenis.scrollTo(el, { offset: -52, duration: 1.4 });
}

/* ── fade/slide reveal on scroll ─────────────────────── */
export function Reveal({
  children,
  className = '',
  y = 44,
  delay = 0,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  delay?: number;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const tw = gsap.fromTo(
      el,
      { y, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.1,
        delay,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once },
      },
    );
    return () => {
      tw.scrollTrigger?.kill();
      tw.kill();
    };
  }, [y, delay, once]);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/* ── section header: "// 01. THE LINE-UP"  + right meta ── */
export function SectionHead({
  index,
  title,
  meta,
}: {
  index: string;
  title: string;
  meta?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const tw = gsap.fromTo(
      el.querySelector('.sh-title'),
      { clipPath: 'inset(0 100% 0 0)' },
      {
        clipPath: 'inset(0 0% 0 0)',
        duration: 1,
        ease: 'power3.inOut',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      },
    );
    const tw2 = gsap.fromTo(
      el.querySelector('.sh-meta'),
      { opacity: 0, x: 20 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        delay: 0.4,
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      },
    );
    return () => {
      tw.scrollTrigger?.kill();
      tw.kill();
      tw2.scrollTrigger?.kill();
      tw2.kill();
    };
  }, []);
  return (
    <div ref={ref} className="flex items-end justify-between gap-6 mb-10 md:mb-14">
      <h2 className="sh-title font-disp font-semibold uppercase tracking-[0.04em] text-[clamp(1.6rem,4vw,2.6rem)] leading-none text-ink">
        <span className="text-gold">//</span> {index}. {title}
      </h2>
      {meta ? (
        <span className="sh-meta font-mono text-[10px] tracking-[0.25em] uppercase text-mut whitespace-nowrap pb-1">
          {meta}
        </span>
      ) : null}
    </div>
  );
}

/* ── glowing digital counter ─────────────────────────── */
export function Digi({
  to,
  className = '',
  start = 'top 85%',
}: {
  to: number;
  className?: string;
  start?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.textContent = '0';
    const obj = { v: 0 };
    const tw = gsap.to(obj, {
      v: to,
      duration: 1.8,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start, once: true },
      onUpdate: () => {
        el.textContent = String(Math.round(obj.v));
      },
    });
    return () => {
      tw.scrollTrigger?.kill();
      tw.kill();
    };
  }, [to, start]);
  return <span ref={ref} className={className} />;
}

/* ── animated price (tweens to target on change) ─────── */
export function useTweenNumber(target: number) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const cur = { v: parseFloat(el.dataset.v || '0') };
    const tw = gsap.to(cur, {
      v: target,
      duration: 0.6,
      ease: 'power2.out',
      onUpdate: () => {
        el.textContent = `$${Math.round(cur.v)}`;
      },
    });
    el.dataset.v = String(target);
    return () => {
      tw.kill();
    };
  }, [target]);
  return ref;
}

/* ── tiny mono label ─────────────────────────────────── */
export function Mono({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span className={`font-mono text-[10px] tracking-[0.25em] uppercase ${className}`}>{children}</span>
  );
}
