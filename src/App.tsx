import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const BURGERS = [
  { name: 'THE CHEESE', price: 13, desc: 'Double melted cheddar, caramelized onion, house pickles, sesame bun', img: 'images/card-cheese.jpg' },
  { name: 'THE BEEF', price: 18, desc: 'Thick smashed patty, crispy onion strings, black pepper mayo, brioche', img: 'images/card-beef.jpg' },
  { name: 'THE ZINGER', price: 16, desc: 'Crispy zinger fillet, chili flakes, jalapeños, sriracha mayo, sesame bun', img: 'images/card-zinger.jpg' },
];

const PATTIES = [
  { name: 'SINGLE', extra: 0, label: 'Included', size: 'S' },
  { name: 'DOUBLE', extra: 6, label: '+$6', size: 'M' },
  { name: 'TRIPLE', extra: 10, label: '+$10', size: 'L' },
];

const TOPPINGS = [
  { name: 'EXTRA CHEESE', extra: 2, icon: 'images/icon-cheese.png' },
  { name: 'BACON', extra: 3, icon: 'images/icon-bacon.png' },
  { name: 'JALAPEÑO', extra: 1, icon: 'images/icon-jalapeno.png' },
  { name: 'ONION RINGS', extra: 2, icon: 'images/icon-onionring.png' },
  { name: 'AVOCADO', extra: 2, icon: 'images/icon-avocado.png' },
  { name: 'FRIED EGG', extra: 1, icon: 'images/icon-egg.png' },
];

/* Container inline style */
const CS: React.CSSProperties = { maxWidth: 1100, marginLeft: 'auto', marginRight: 'auto', paddingLeft: 50, paddingRight: 50 };

/* ═══ SCROLL PROGRESS BAR ═══ */
function ScrollBar() {
  const barRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const st = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => { bar.style.transform = `scaleX(${self.progress})`; },
    });
    return () => st.kill();
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-border">
      <div ref={barRef} className="h-full bg-amber origin-left" style={{ transform: 'scaleX(0)' }} />
    </div>
  );
}

/* ═══ HERO ═══ */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const tl = gsap.timeline();
    tl.fromTo(el.querySelector('.h-img'), { scale: 1.4, opacity: 0 }, { scale: 1, opacity: 1, duration: 2, ease: 'power3.out' })
      .fromTo(el.querySelector('.h-t'), { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }, '-=1')
      .fromTo(el.querySelector('.h-s'), { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, '-=0.5')
      .fromTo(el.querySelector('.h-l'), { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: 'power3.out' }, '-=0.3');
  }, []);
  return (
    <section ref={ref} className="relative h-screen overflow-hidden bg-bg flex items-center justify-center">
      <img src="images/card-smash.jpg" alt="" className="h-img absolute inset-0 w-full h-full object-cover opacity-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/50 to-bg/30" />
      <div className="absolute inset-0 bg-gradient-to-b from-bg/60 via-transparent to-bg" />
      <div className="relative z-10 text-center flex flex-col items-center">
        <h1 className="h-t text-5xl md:text-7xl lg:text-[8rem] font-black uppercase tracking-[0.08em] text-ink opacity-0" style={{ lineHeight: 1 }}>SMASH</h1>
        <div className="h-l w-24 h-px bg-amber mt-6 mb-4 origin-left scale-x-0" />
        <p className="h-s font-mono text-[10px] md:text-xs tracking-[0.35em] uppercase text-ink3 opacity-0">Press. Sear. Serve.</p>
      </div>
    </section>
  );
}

/* ═══ LINE-UP ═══ */
function LineUp({ onSelect }: { onSelect: (i: number, imgRect: DOMRect) => void }) {
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  return (
    <section className="py-20 md:py-28 bg-bg border-t border-border">
      <div className="mb-10" style={CS}>
        <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-ink3">01 / LINE-UP</span>
        <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-[0.06em] mt-2 text-ink">SELECT YOUR SMASH</h2>
      </div>
      <div style={CS}>
        <div className="grid grid-cols-3 gap-[20px]">
          {BURGERS.map((b, i) => (
            <div key={b.name} ref={(el) => { refs.current[i] = el; }} className="bg-surface border border-border hover:border-amber/30 transition-colors duration-300 group">
              <div className="card-img aspect-square relative overflow-hidden bg-surface2">
                <img src={b.img} alt={b.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <span className="absolute top-3 right-3 font-mono text-amber text-sm md:text-base font-bold">${b.price}</span>
                <span className="absolute bottom-3 left-3 text-[10px] md:text-xs font-bold uppercase tracking-[0.1em] text-ink">{b.name}</span>
              </div>
              <div className="p-3 md:p-4 border-t border-border flex flex-col">
                <p className="text-[10px] md:text-[11px] text-ink3 leading-relaxed line-clamp-2 h-[28px] md:h-[32px]">{b.desc}</p>
                <button onClick={() => { const imgEl = refs.current[i]?.querySelector('.card-img'); if (imgEl) onSelect(i, imgEl.getBoundingClientRect()); }} className="mt-3 w-full h-10 md:h-12 border border-amber/40 text-amber text-[10px] md:text-xs font-bold uppercase tracking-[0.15em] hover:bg-amber hover:text-bg transition-all duration-200 flex items-center justify-center">ADD TO ORDER</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ BUILD ═══ */
function Build({
  selectedBurger, selectedPatty, selectedToppings, onPatty, onTopping, flySrc, flyRect,
}: {
  selectedBurger: number; selectedPatty: number; selectedToppings: Set<number>;
  onPatty: (i: number) => void; onTopping: (i: number) => void;
  flySrc: string | null; flyRect: DOMRect | null;
}) {
  const previewRef = useRef<HTMLDivElement>(null);
  const [overlaySrc, setOverlaySrc] = useState<string | null>(null);
  const [sizeLabel, setSizeLabel] = useState<string | null>(null);

  const burger = BURGERS[selectedBurger];
  const total = burger.price + PATTIES[selectedPatty].extra + [...selectedToppings].reduce((s, i) => s + TOPPINGS[i].extra, 0);

  /* Size zoom animation */
  const flashSize = useCallback((label: string) => {
    setSizeLabel(label);
    // Animate the label: zoom in then fade
    const el = document.getElementById('size-flash');
    if (el) {
      gsap.fromTo(el, { scale: 0.3, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(2)' });
      gsap.to(el, { opacity: 0, delay: 0.6, duration: 0.3, onComplete: () => setSizeLabel(null) });
    } else {
      setTimeout(() => setSizeLabel(null), 900);
    }
  }, []);

  /* Topping icon fly animation */
  const flyIcon = useCallback((iconSrc: string, fromEl: HTMLElement) => {
    const fromRect = fromEl.getBoundingClientRect();
    const target = previewRef.current;
    if (!target) return;

    const fly = document.getElementById('fly-icon-img') as HTMLImageElement;
    if (!fly) return;

    fly.src = iconSrc;
    gsap.set(fly, {
      position: 'fixed',
      left: fromRect.left,
      top: fromRect.top,
      width: fromRect.width,
      height: fromRect.height,
      opacity: 1,
      zIndex: 200,
      borderRadius: '50%',
    });

    const tr = target.getBoundingClientRect();
    // Target: center of preview box
    const targetX = tr.left + tr.width / 2 - fromRect.width / 2;
    const targetY = tr.top + tr.height / 2 - fromRect.height / 2;

    gsap.to(fly, {
      left: targetX,
      top: targetY,
      width: fromRect.width * 0.6,
      height: fromRect.height * 0.6,
      opacity: 0,
      duration: 0.7,
      ease: 'power2.in',
      onComplete: () => { gsap.set(fly, { opacity: 0, zIndex: -1 }); },
    });
  }, []);

  /* Card fly animation */
  useEffect(() => {
    if (!flySrc || !flyRect) return;
    const fly = document.getElementById('fly-img') as HTMLImageElement | null;
    const target = previewRef.current;
    if (!fly || !target) return;

    setOverlaySrc(null);
    fly.src = flySrc;

    const startX = flyRect.left, startY = flyRect.top, startW = flyRect.width, startH = flyRect.height;
    gsap.set(fly, { position: 'fixed', left: startX, top: startY, width: startW, height: startH, opacity: 1, zIndex: 200, objectFit: 'cover', borderRadius: 0 });

    const duration = 900, startTime = performance.now();
    let rafId: number;
    const ease = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const targetEl = target;

    function animate() {
      const elapsed = performance.now() - startTime;
      const rawProgress = Math.min(elapsed / duration, 1);
      const t = ease(rawProgress);
      const tr = targetEl.getBoundingClientRect();
      gsap.set(fly, { left: startX + (tr.left - startX) * t, top: startY + (tr.top - startY) * t, width: startW + (tr.width - startW) * t, height: startH + (tr.height - startH) * t });
      if (rawProgress < 1) { rafId = requestAnimationFrame(animate); }
      else {
        const fr = targetEl.getBoundingClientRect();
        gsap.set(fly, { left: fr.left, top: fr.top, width: fr.width, height: fr.height });
        requestAnimationFrame(() => { gsap.set(fly, { opacity: 0, zIndex: -1 }); setOverlaySrc(flySrc); flashSize(PATTIES[0].size); });
      }
    }
    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [flySrc, flyRect, flashSize]);

  return (
    <section className="py-20 md:py-28 bg-bg border-t border-border">
      <div className="mb-10" style={CS}>
        <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-ink3">02 / BUILD</span>
        <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-[0.06em] mt-2 text-ink">BUILD YOUR SMASH</h2>
      </div>
      <div style={CS}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="flex flex-col gap-6">
            <div>
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-amber block mb-3">STEP 1 / PATTY SELECT</span>
              <div className="grid grid-cols-3 gap-2">
                {PATTIES.map((p, i) => (
                  <button key={p.name} onClick={() => { onPatty(i); flashSize(p.size); }} className={`py-3 px-2 border text-center transition-all duration-200 ${selectedPatty === i ? 'border-amber bg-amber/10' : 'border-border hover:border-ink3'}`}>
                    <span className={`text-[10px] font-bold uppercase tracking-[0.08em] block ${selectedPatty === i ? 'text-amber' : 'text-ink2'}`}>{p.name}</span>
                    <span className={`font-mono text-[9px] mt-0.5 block ${selectedPatty === i ? 'text-amber/60' : 'text-ink3'}`}>{p.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-amber block mb-3">STEP 2 / ADD TOPPINGS</span>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {TOPPINGS.map((t, i) => {
                  const on = selectedToppings.has(i);
                  return (
                    <button key={t.name} onClick={(e) => { onTopping(i); if (!on) flyIcon(t.icon, e.currentTarget); }} className={`py-2 px-2 border text-left transition-all duration-200 flex items-center gap-2 ${on ? 'border-amber bg-amber/10' : 'border-border hover:border-ink3'}`}>
                      <img src={t.icon} alt="" className="w-5 h-5 object-contain flex-shrink-0" />
                      <div>
                        <span className={`text-[10px] font-bold uppercase tracking-[0.06em] block ${on ? 'text-amber' : 'text-ink2'}`}>{t.name}</span>
                        {t.extra > 0 && <span className={`font-mono text-[8px] mt-0.5 block ${on ? 'text-amber/50' : 'text-ink3'}`}>+${t.extra}</span>}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="border-t border-border pt-5 flex items-center justify-between">
              <div>
                <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-ink3 block">TOTAL</span>
                <span className="font-mono text-2xl font-bold text-amber tabular-nums">${total}</span>
              </div>
              <button className="px-7 py-2.5 bg-amber text-bg font-bold text-[11px] uppercase tracking-[0.14em] hover:bg-amber2 transition-colors">ORDER YOUR SMASH</button>
            </div>
          </div>
          <div>
            <div ref={previewRef} className="aspect-[4/3] bg-surface border border-border relative overflow-hidden">
              <img src={burger.img} alt={burger.name} className="w-full h-full object-cover" />
              {overlaySrc && <img src={overlaySrc} alt="" className="absolute inset-0 w-full h-full object-cover z-20 pointer-events-none" />}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-30" />
              {/* Size flash — big golden letter zoomed in the middle */}
              {sizeLabel && (
                <span id="size-flash" className="absolute inset-0 flex items-center justify-center font-mono text-[100px] md:text-[160px] font-black text-amber pointer-events-none z-40" style={{ opacity: 0 }}>{sizeLabel}</span>
              )}
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between z-30">
                <span className="text-sm font-bold uppercase tracking-[0.08em] text-ink">{burger.name}</span>
                <span className="font-mono text-amber font-bold">${total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══ THE SMASH ═══ */
function TheSmash() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.fromTo(el.querySelectorAll('.anim'), { y: 30, opacity: 0 }, {
      y: 0, opacity: 1, stagger: 0.1, duration: 1, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 75%', end: 'top 35%', scrub: 0.5 },
    });
  }, []);
  return (
    <section ref={ref} className="py-20 md:py-28 bg-surface border-t border-border">
      <div style={CS}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <span className="anim font-mono text-[10px] tracking-[0.25em] uppercase text-ink3">03 / THE SMASH</span>
            <h2 className="anim text-3xl md:text-5xl font-bold uppercase tracking-[0.06em] mt-2 text-ink">THE SMASH</h2>
            <p className="anim text-sm text-ink2 mt-4 max-w-md leading-relaxed">One press. Maximum crust. The Maillard reaction at its peak — surface area doubled, edges caramelized, juices sealed.</p>
            <p className="anim text-sm text-ink2 mt-4 max-w-md leading-relaxed">This is not a thin burger. This is a technique.</p>
            <div className="grid grid-cols-3 gap-5 mt-10">
              {[{ v: '2x', l: 'SURFACE AREA' }, { v: '114G', l: 'PATTY WT' }, { v: '218°', l: 'GRIDDLE TEMP' }].map(m => (
                <div key={m.l} className="anim border-t border-border pt-4">
                  <span className="font-mono text-2xl md:text-3xl font-bold text-amber">{m.v}</span>
                  <span className="font-mono text-[8px] tracking-[0.2em] uppercase text-ink3 block mt-1.5">{m.l}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="anim aspect-[4/3] bg-surface2 border border-border relative overflow-hidden">
            <img src="images/craft.jpg" alt="The Smash" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══ THE SEAR — full bg image with golden scroll bar ═══ */
function TheSear() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bar = barRef.current;
    if (!section || !bar) return;

    // Animate the amber bar height based on scroll position within this section
    gsap.fromTo(bar, { scaleY: 0 }, {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 0.5,
      },
    });

    // Fade in text
    gsap.fromTo(section.querySelectorAll('.anim'), { y: 30, opacity: 0 }, {
      y: 0, opacity: 1, stagger: 0.1, duration: 1, ease: 'power2.out',
      scrollTrigger: { trigger: section, start: 'top 75%', end: 'top 35%', scrub: 0.5 },
    });
  }, []);

  return (
    <section ref={sectionRef} className="relative border-t border-border" style={{ minHeight: '80vh' }}>
      {/* Full bleed background image */}
      <div className="absolute inset-0">
        <img src="images/sear-bg.jpg" alt="Sear" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 py-20 md:py-28 flex">
        <div className="flex-1" style={CS}>
          <span className="anim font-mono text-[10px] tracking-[0.25em] uppercase text-ink3">04 / THE SEAR</span>
          <h2 className="anim text-3xl md:text-5xl font-bold uppercase tracking-[0.06em] mt-2 text-ink">THE SEAR</h2>
          <p className="anim text-sm text-ink2 mt-4 max-w-md leading-relaxed">8 seconds of contact. 218 degrees of steel. The sear is not a step — it is the moment everything changes.</p>
          <div className="grid grid-cols-2 gap-5 mt-10">
            {[{ v: '8S', l: 'CONTACT TIME' }, { v: '218°', l: 'SEAR TEMP' }, { v: '1X', l: 'PRESS FORCE' }, { v: '100%', l: 'CRUST FORMATION' }].map(m => (
              <div key={m.l} className="anim border-t border-amber/20 pt-4">
                <span className="font-mono text-2xl md:text-3xl font-bold text-amber">{m.v}</span>
                <span className="font-mono text-[8px] tracking-[0.2em] uppercase text-ink3 block mt-1.5">{m.l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Golden scroll bar on the right */}
        <div className="w-2 md:w-3 mr-8 md:mr-16 self-stretch flex flex-col justify-end">
          <div ref={barRef} className="w-full bg-amber origin-bottom rounded-sm" style={{ height: '100%', transform: 'scaleY(0)' }} />
        </div>
      </div>
    </section>
  );
}

/* ═══ CRAFT ═══ */
function Craft() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.fromTo(el.querySelectorAll('.anim'), { y: 30, opacity: 0 }, {
      y: 0, opacity: 1, stagger: 0.1, duration: 1, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 75%', end: 'top 35%', scrub: 0.5 },
    });
  }, []);
  return (
    <section ref={ref} className="py-20 md:py-28 bg-bg border-t border-border">
      <div style={CS}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="anim aspect-[4/3] bg-surface2 border border-border relative overflow-hidden order-2 lg:order-1">
            <img src="images/craft.jpg" alt="Craft" className="w-full h-full object-cover" />
          </div>
          <div className="order-1 lg:order-2">
            <span className="anim font-mono text-[10px] tracking-[0.25em] uppercase text-ink3">05 / CRAFT</span>
            <h2 className="anim text-3xl md:text-5xl font-bold uppercase tracking-[0.06em] mt-2 text-ink">CRAFT BEEF</h2>
            <p className="anim text-sm text-ink2 mt-4 max-w-md leading-relaxed">Hand-selected cuts. Ground fresh every morning. No fillers, no binders, no shortcuts. Just beef and fire.</p>
            <div className="grid grid-cols-2 gap-5 mt-10">
              {[{ v: '100%', l: 'FRESH GROUND' }, { v: '0', l: 'FILLERS' }, { v: '6AM', l: 'GRIND TIME' }, { v: '24H', l: 'MAX SHELF LIFE' }].map(m => (
                <div key={m.l} className="anim border-t border-border pt-4">
                  <span className="font-mono text-2xl md:text-3xl font-bold text-amber">{m.v}</span>
                  <span className="font-mono text-[8px] tracking-[0.2em] uppercase text-ink3 block mt-1.5">{m.l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══ THE CUT ═══ */
function TheCut() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.fromTo(el.querySelectorAll('.anim'), { y: 30, opacity: 0 }, {
      y: 0, opacity: 1, stagger: 0.1, duration: 1, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 75%', end: 'top 35%', scrub: 0.5 },
    });
  }, []);
  return (
    <section ref={ref} className="py-20 md:py-28 bg-surface border-t border-border">
      <div style={CS}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <span className="anim font-mono text-[10px] tracking-[0.25em] uppercase text-ink3">06 / THE CUT</span>
            <h2 className="anim text-3xl md:text-5xl font-bold uppercase tracking-[0.06em] mt-2 text-ink">THE CUT</h2>
            <p className="anim text-sm text-ink2 mt-4 max-w-md leading-relaxed">Served open-faced. Cut it yourself or let the knife do the talking. Every bite hits different when the cheese is still pulling.</p>
            <div className="grid grid-cols-2 gap-5 mt-10">
              {[{ v: '2', l: 'CUT STYLE' }, { v: '45°', l: 'BLADE ANGLE' }, { v: '1.5"', l: 'PATTY THICK' }, { v: '∞', l: 'CHEESE PULL' }].map(m => (
                <div key={m.l} className="anim border-t border-border pt-4">
                  <span className="font-mono text-2xl md:text-3xl font-bold text-amber">{m.v}</span>
                  <span className="font-mono text-[8px] tracking-[0.2em] uppercase text-ink3 block mt-1.5">{m.l}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="anim aspect-[4/3] bg-surface2 border border-border relative overflow-hidden">
            <img src="images/cut.jpg" alt="The Cut" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══ STORY ═══ */
function Story() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.fromTo(el.querySelectorAll('.anim'), { y: 30, opacity: 0 }, {
      y: 0, opacity: 1, stagger: 0.1, duration: 1, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 75%', end: 'top 35%', scrub: 0.5 },
    });
  }, []);
  return (
    <section ref={ref} className="py-20 md:py-28 bg-bg border-t border-border">
      <div style={CS}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="anim aspect-[4/3] bg-surface2 border border-border relative overflow-hidden order-2 lg:order-1">
            <img src="images/story.jpg" alt="Story" className="w-full h-full object-cover" />
          </div>
          <div className="order-1 lg:order-2">
            <span className="anim font-mono text-[10px] tracking-[0.25em] uppercase text-ink3">07 / STORY</span>
            <h2 className="anim text-3xl md:text-5xl font-bold uppercase tracking-[0.06em] mt-2 text-ink">OUR STORY</h2>
            <p className="anim text-sm text-ink2 mt-4 max-w-md leading-relaxed">Started in a garage with a griddle and a dream. No investors, no franchise playbook. Just a press, a plancha, and the belief that a burger could be more.</p>
            <p className="anim text-sm text-ink2 mt-4 max-w-md leading-relaxed">Every patty is still smashed by hand. Every bun still toasted on contact. That will never change.</p>
            <div className="grid grid-cols-3 gap-5 mt-10">
              {[{ v: '2021', l: 'FOUNDED' }, { v: '1', l: 'LOCATION' }, { v: '∞', l: 'AMBITION' }].map(m => (
                <div key={m.l} className="anim border-t border-border pt-4">
                  <span className="font-mono text-2xl md:text-3xl font-bold text-amber">{m.v}</span>
                  <span className="font-mono text-[8px] tracking-[0.2em] uppercase text-ink3 block mt-1.5">{m.l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══ BOOKING ═══ */
function Booking() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.fromTo(el.querySelectorAll('.anim'), { y: 30, opacity: 0 }, {
      y: 0, opacity: 1, stagger: 0.1, duration: 1, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 75%', end: 'top 35%', scrub: 0.5 },
    });
  }, []);
  const [submitted, setSubmitted] = useState(false);
  return (
    <section ref={ref} className="py-20 md:py-28 bg-surface border-t border-border">
      <div style={CS}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <span className="anim font-mono text-[10px] tracking-[0.25em] uppercase text-ink3">08 / BOOKING</span>
            <h2 className="anim text-3xl md:text-5xl font-bold uppercase tracking-[0.06em] mt-2 text-ink">BOOK A TABLE</h2>
            <p className="anim text-sm text-ink2 mt-4 max-w-md leading-relaxed">Walk-ins welcome but reservations get the corner booth. Secure your spot.</p>
            {submitted ? (
              <div className="mt-8 border border-amber/30 bg-amber/5 p-6">
                <span className="font-mono text-sm text-amber font-bold uppercase tracking-[0.1em]">RESERVED</span>
                <p className="text-xs text-ink2 mt-2">We will confirm your booking shortly.</p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="mt-8 flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="NAME" required className="bg-bg border border-border px-4 py-3 text-ink text-xs uppercase tracking-[0.1em] placeholder:text-ink3 focus:border-amber/50 focus:outline-none transition-colors" />
                  <input type="email" placeholder="EMAIL" required className="bg-bg border border-border px-4 py-3 text-ink text-xs uppercase tracking-[0.1em] placeholder:text-ink3 focus:border-amber/50 focus:outline-none transition-colors" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input type="date" required className="bg-bg border border-border px-4 py-3 text-ink text-xs uppercase tracking-[0.1em] focus:border-amber/50 focus:outline-none transition-colors [color-scheme:dark]" />
                  <input type="time" required className="bg-bg border border-border px-4 py-3 text-ink text-xs uppercase tracking-[0.1em] focus:border-amber/50 focus:outline-none transition-colors [color-scheme:dark]" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <select required className="bg-bg border border-border px-4 py-3 text-ink text-xs uppercase tracking-[0.1em] focus:border-amber/50 focus:outline-none transition-colors [color-scheme:dark]">
                    <option value="">GUESTS</option>
                    {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n} {n === 1 ? 'GUEST' : 'GUESTS'}</option>)}
                  </select>
                  <input type="tel" placeholder="PHONE" className="bg-bg border border-border px-4 py-3 text-ink text-xs uppercase tracking-[0.1em] placeholder:text-ink3 focus:border-amber/50 focus:outline-none transition-colors" />
                </div>
                <button type="submit" className="mt-2 h-12 bg-amber text-bg font-bold text-xs uppercase tracking-[0.15em] hover:bg-amber2 transition-colors">RESERVE YOUR SPOT</button>
              </form>
            )}
          </div>
          <div className="anim aspect-[4/3] bg-surface2 border border-border relative overflow-hidden">
            <img src="images/booking.jpg" alt="Booking" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══ APP ═══ */
export default function App() {
  const [selBurger, setSelBurger] = useState(0);
  const [selPatty, setSelPatty] = useState(0);
  const [selToppings, setSelToppings] = useState<Set<number>>(new Set());
  const [flySrc, setFlySrc] = useState<string | null>(null);
  const [flyRect, setFlyRect] = useState<DOMRect | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.4, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    lenisRef.current = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    return () => { lenis.destroy(); };
  }, []);

  const selectBurger = (i: number, imgRect: DOMRect) => {
    setFlySrc(BURGERS[i].img);
    setFlyRect(imgRect);
    setSelBurger(i);
    setSelPatty(0);
    setSelToppings(new Set());
    setTimeout(() => {
      const target = document.getElementById('build-section');
      if (target && lenisRef.current) lenisRef.current.scrollTo(target, { offset: -60, duration: 1.2 });
    }, 150);
  };

  return (
    <div className="min-h-screen bg-bg text-ink">
      <ScrollBar />
      {/* Flying images */}
      <img id="fly-img" alt="" style={{ position: 'fixed', left: -9999, top: 0, width: 0, height: 0, opacity: 0, zIndex: -1, pointerEvents: 'none', objectFit: 'cover' }} />
      <img id="fly-icon-img" alt="" style={{ position: 'fixed', left: -9999, top: 0, width: 0, height: 0, opacity: 0, zIndex: -1, pointerEvents: 'none', objectFit: 'contain' }} />

      <header className="fixed top-0 left-0 right-0 z-50 bg-bg/90 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between py-3" style={CS}>
          <span className="font-bold text-sm uppercase tracking-[0.15em] text-amber">SMASH</span>
          <nav className="hidden md:flex items-center gap-5">
            {['LINE-UP', 'BUILD', 'THE SMASH', 'THE SEAR', 'CRAFT', 'STORY', 'BOOKING'].map((item, i) => (
              <span key={item} className="font-mono text-[9px] tracking-[0.18em] uppercase text-ink3">{String(i + 1).padStart(2, '0')}. {item}</span>
            ))}
          </nav>
          <span className="font-mono text-[9px] text-ink3 hidden md:block">{new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </header>

      <main>
        <Hero />
        <LineUp onSelect={selectBurger} />
        <div id="build-section">
          <Build selectedBurger={selBurger} selectedPatty={selPatty} selectedToppings={selToppings} onPatty={setSelPatty} onTopping={(i) => setSelToppings(prev => { const n = new Set(prev); if (n.has(i)) n.delete(i); else n.add(i); return n; })} flySrc={flySrc} flyRect={flyRect} />
        </div>
        <TheSmash />
        <TheSear />
        <Craft />
        <TheCut />
        <Story />
        <Booking />
      </main>

      <footer className="bg-bg border-t border-border py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3" style={CS}>
          <span className="font-bold text-[10px] uppercase tracking-[0.15em] text-amber">SMASH</span>
          <span className="font-mono text-[8px] tracking-[0.15em] uppercase text-ink3">OPEN DAILY 12:00 — 22:00</span>
          <span className="font-mono text-[8px] text-ink3">Concept site</span>
        </div>
      </footer>
    </div>
  );
}
