import { useState } from "react";
import { BURGERS, PATTIES, TOPPINGS } from "../data";
import {
  Reveal,
  SectionHead,
  scrollToId,
  useTweenNumber,
  flyToElement,
} from "../ui";

export interface BuildState {
  burger: string;
  patty: number;
  tops: number[];
}

export default function Build({
  state,
  onChange,
}: {
  state: BuildState;
  onChange: (s: BuildState) => void;
}) {
  const burger = BURGERS.find((b) => b.id === state.burger) ?? BURGERS[0];
  const total =
    burger.price +
    PATTIES[state.patty].extra +
    state.tops.reduce((a, i) => a + TOPPINGS[i].extra, 0);
  const totalRef = useTweenNumber(total);
  const [flash, setFlash] = useState<{ l: string; k: number } | null>(null);
  const [lastAdded, setLastAdded] = useState<number | null>(null);

  const toggleTop = (i: number) => {
    const has = state.tops.includes(i);
    onChange({
      ...state,
      tops: has ? state.tops.filter((t) => t !== i) : [...state.tops, i],
    });
  };

  return (
    <section
      id="build"
      className="relative py-24 md:py-32 border-t border-line bg-bg2"
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-10">
        <Reveal>
          <SectionHead
            index="02"
            title="BUILD YOUR SMASH"
            meta="STEP-BY-STEP · LIVE PRICING"
          />
        </Reveal>

        <div className="grid lg:grid-cols-12 gap-8">
          {" "}
          <div className="lg:col-span-5 space-y-10 order-2 lg:order-1">
            <Reveal>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[10px] tracking-[0.3em] text-mut">
                  STEP 1 · BUILD SELECTED
                </span>
                <button
                  onClick={() =>
                    onChange({ burger: state.burger, patty: 0, tops: [] })
                  }
                  className="font-mono text-[9px] tracking-[0.25em] text-dim hover:text-gold transition-colors"
                >
                  + CLEAR BUILD
                </button>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {PATTIES.map((p, i) => (
                  <button
                    key={p.name}
                    onClick={() => {
                      onChange({ ...state, patty: i });
                      setFlash({ l: p.size, k: Date.now() });
                    }}
                    className={`relative p-3 text-left border transition-all duration-300 ${
                      state.patty === i
                        ? "border-gold bg-panel2 shadow-[0_0_24px_rgba(232,182,76,0.15)]"
                        : "border-line bg-panel hover:border-line2"
                    }`}
                  >
                    <span className="font-mono text-[9px] text-mut">
                      {p.size}
                    </span>
                    <span className="block mt-6 font-mono text-[9px] tracking-[0.15em] text-ink">
                      {p.name}
                    </span>
                    <span className="block mt-1 font-mono text-[9px] tracking-[0.15em] text-gold">
                      {p.extra === 0 ? "INCLUDED" : `+$${p.extra}`}
                    </span>
                  </button>
                ))}
              </div>
            </Reveal>

            <Reveal>
              <p className="font-mono text-[10px] tracking-[0.3em] text-mut mb-4">
                STEP 2 · ADD TOPPINGS
              </p>
              <div className="grid grid-cols-2 gap-3">
                {TOPPINGS.map((t, i) => {
                  const on = state.tops.includes(i);
                  return (
                    <button
                      key={t.name}
                      onClick={(e) => {
                        if (!on) {
                          const thumb = e.currentTarget.querySelector("img");
                          if (thumb) {
                            flyToElement(
                              thumb.src,
                              thumb.getBoundingClientRect(),
                              () =>
                                document.querySelector(
                                  `[data-receipt-row="${i}"]`,
                                ),
                            );
                          }
                          setLastAdded(i);
                        }
                        toggleTop(i);
                      }}
                      className={`flex items-center gap-3 p-2.5 border transition-all duration-300 ${
                        on
                          ? "border-gold bg-panel2 shadow-[0_0_24px_rgba(232,182,76,0.18)]"
                          : "border-line bg-panel hover:border-line2"
                      }`}
                    >
                      <span className="w-14 h-10 shrink-0 bg-black/70 border border-line overflow-hidden">
                        <img
                          src={t.icon}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </span>
                      <span className="text-left">
                        <span className="block font-mono text-[9px] tracking-[0.15em] text-ink">
                          {t.name}
                        </span>
                        <span className="block font-mono text-[9px] tracking-[0.15em] text-gold mt-0.5">
                          {t.extra === 0 ? "FREE" : `+$${t.extra}`}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </Reveal>
          </div>{" "}
          <Reveal className="lg:col-span-7 order-1 lg:order-2" delay={0.1}>
            <div className="border border-line bg-panel h-full flex flex-col">
              <div
                data-preview-box
                className="relative h-[300px] md:h-[380px] overflow-hidden bg-black"
              >
                {flash && (
                  <span
                    key={flash.k}
                    className="letter-flash font-disp glow-gold"
                  >
                    {flash.l}
                  </span>
                )}
                {BURGERS.map((b) => (
                  <img
                    key={b.id}
                    src={b.img}
                    alt={b.name}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                      b.id === burger.id ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-panel via-transparent to-transparent" />
                <div className="absolute left-5 bottom-4">
                  <span className="font-mono text-[9px] tracking-[0.3em] text-mut">
                    SELECTED BUILD
                  </span>
                  <h3 className="font-disp font-semibold text-2xl tracking-[0.05em] text-ink glow-soft">
                    {burger.name}
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {burger.tags.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[8px] tracking-[0.18em] text-gold/90 border border-gold/30 bg-black/50 px-2 py-0.5"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 md:p-6 font-mono text-[10px] tracking-[0.18em]">
                <div className="flex justify-between py-2 border-b border-line/70 text-mut">
                  <span>{burger.name}</span>
                  <span className="text-ink">${burger.price}</span>
                </div>
                {state.patty > 0 && (
                  <div className="flex justify-between py-2 border-b border-line/70 text-mut">
                    <span>{PATTIES[state.patty].name} — PATTY UPGRADE</span>
                    <span className="text-ink">
                      +${PATTIES[state.patty].extra}
                    </span>
                  </div>
                )}
                {state.tops.map((i) => (
                  <div
                    key={i}
                    data-receipt-row={i}
                    className={`flex justify-between py-2 border-b border-line/70 text-mut ${lastAdded === i ? "write-in" : ""}`}
                  >
                    <span>{TOPPINGS[i].name}</span>
                    <span className="text-ink">
                      {TOPPINGS[i].extra === 0
                        ? "FREE"
                        : `+$${TOPPINGS[i].extra}`}
                    </span>
                  </div>
                ))}
                <div className="flex items-center justify-between pt-4">
                  <span className="text-mut">TOTAL BUILD</span>
                  <span ref={totalRef} className="font-digi text-3xl glow-gold">
                    $0
                  </span>
                </div>
                <button
                  onClick={() => scrollToId("reserve")}
                  className="mt-5 w-full h-12 bg-gold text-bg font-mono text-[11px] tracking-[0.3em] uppercase hover:bg-gold2 hover:shadow-[0_0_36px_rgba(232,182,76,0.45)] transition-all duration-300"
                >
                  ORDER YOUR SMASH →
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
