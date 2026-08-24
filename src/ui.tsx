import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export let lenis: Lenis | null = null;
export function setLenis(l: Lenis | null) {
  lenis = l;
}
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el && lenis) lenis.scrollTo(el, { offset: -52, duration: 1.4 });
}

export function Reveal({
  children,
  className = "",
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
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%", once },
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
      el.querySelector(".sh-title"),
      { clipPath: "inset(0 100% 0 0)" },
      {
        clipPath: "inset(0 0% 0 0)",
        duration: 1,
        ease: "power3.inOut",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      },
    );
    const tw2 = gsap.fromTo(
      el.querySelector(".sh-meta"),
      { opacity: 0, x: 20 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        delay: 0.4,
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
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
    <div
      ref={ref}
      className="flex items-end justify-between gap-6 mb-10 md:mb-14"
    >
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

export function Digi({
  to,
  className = "",
  start = "top 85%",
}: {
  to: number;
  className?: string;
  start?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.textContent = "0";
    const obj = { v: 0 };
    const tw = gsap.to(obj, {
      v: to,
      duration: 1.8,
      ease: "power2.out",
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

export function useTweenNumber(target: number) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const cur = { v: parseFloat(el.dataset.v || "0") };
    const tw = gsap.to(cur, {
      v: target,
      duration: 0.6,
      ease: "power2.out",
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

export function Mono({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`font-mono text-[10px] tracking-[0.25em] uppercase ${className}`}
    >
      {children}
    </span>
  );
}

function makeClone(src: string, from: DOMRect) {
  const img = document.createElement("img");
  img.src = src;
  img.alt = "";
  img.style.cssText =
    `position:fixed;left:${from.left}px;top:${from.top}px;width:${from.width}px;height:${from.height}px;` +
    "object-fit:cover;z-index:90;pointer-events:none;border-radius:3px;" +
    "box-shadow:0 12px 44px rgba(0,0,0,0.65), 0 0 24px rgba(232,182,76,0.25);";
  document.body.appendChild(img);
  return img;
}

const docTop = (el: Element) => el.getBoundingClientRect().top + window.scrollY;

export function flyWithScrollTo(
  src: string,
  from: DOMRect,
  targetSel: string,
  scroll: () => void,
) {
  const target = document.querySelector(targetSel);
  const buildEl = document.getElementById("build");
  if (!target || !buildEl) {
    scroll();
    return;
  }
  const img = makeClone(src, from);

  const finalScroll = docTop(buildEl) - 52;
  const tr = target.getBoundingClientRect();
  const toRect = {
    left: tr.left,
    top: docTop(target) - finalScroll,
    width: tr.width,
    height: tr.height,
  };
  scroll();
  gsap.to(img, {
    left: toRect.left,
    top: toRect.top,
    width: toRect.width,
    height: toRect.height,
    duration: 1.1,
    ease: "power2.out",
    onComplete: () => {
      const r = target.getBoundingClientRect();
      gsap.to(img, {
        left: r.left,
        top: r.top,
        width: r.width,
        height: r.height,
        duration: 0.18,
        ease: "power2.out",
        onComplete: () => {
          gsap.to(img, {
            opacity: 0,
            scale: 0.94,
            duration: 0.35,
            onComplete: () => img.remove(),
          });
        },
      });
    },
  });
}

export function flyToElement(
  src: string,
  from: DOMRect,
  getTarget: () => Element | null,
  delay = 0.09,
  duration = 0.7,
) {
  const img = makeClone(src, from);
  gsap.delayedCall(delay, () => {
    const t = getTarget();
    if (!t) {
      img.remove();
      return;
    }
    const r = t.getBoundingClientRect();
    gsap.to(img, {
      left: r.left + r.width / 2 - from.width / 2,
      top: r.top + r.height / 2 - from.height / 2,
      duration,
      ease: "power2.inOut",
      onComplete: () => {
        gsap.to(img, {
          opacity: 0,
          duration: 0.3,
          onComplete: () => img.remove(),
        });
      },
    });
  });
}
