import { useMemo, useState } from "react";
import { Reveal } from "../ui";

const LUNCH = ["12:00", "12:30", "13:00", "13:30"];
const DINNER = [
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
];
const MONTHS = [
  "JANUARY",
  "FEBRUARY",
  "MARCH",
  "APRIL",
  "MAY",
  "JUNE",
  "JULY",
  "AUGUST",
  "SEPTEMBER",
  "OCTOBER",
  "NOVEMBER",
  "DECEMBER",
];

export default function Reserve() {
  const today = useMemo(() => new Date(), []);
  const [off, setOff] = useState(0);
  const [day, setDay] = useState<number | null>(today.getDate());
  const [time, setTime] = useState<string | null>(null);
  const [party, setParty] = useState(2);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [done, setDone] = useState(false);

  const view = new Date(today.getFullYear(), today.getMonth() + off, 1);
  const daysInMonth = new Date(
    view.getFullYear(),
    view.getMonth() + 1,
    0,
  ).getDate();
  const lead = (view.getDay() + 6) % 7;

  const ready = day !== null && time !== null;

  return (
    <section
      id="reserve"
      className="relative py-28 md:py-36 border-t border-line bg-bg overflow-hidden"
    >
      <img
        src="images/booking.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-[0.14]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg/70 to-bg" />

      <div className="relative max-w-[1000px] mx-auto px-5 md:px-10">
        <Reveal className="text-center">
          <h2 className="font-disp font-semibold uppercase leading-[0.95] text-[clamp(2.6rem,7vw,5.5rem)]">
            <span className="outline-text block">RESERVE</span>
            <span className="glow-gold block">YOUR SMASH</span>
          </h2>
          <p className="mt-5 font-mono text-[10px] tracking-[0.25em] text-mut">
            OPEN DAILY 12:00 – 23:00 · WALK-INS WELCOME, RESERVATION PREFERRED
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-14">
          <div className="border border-line bg-panel/90 backdrop-blur p-6 md:p-10 grid md:grid-cols-2 gap-10">
            {done ? (
              <div className="md:col-span-2 py-16 text-center">
                <p className="font-mono text-[10px] tracking-[0.35em] text-gold">
                  // RESERVATION LOGGED
                </p>
                <h3 className="mt-4 font-disp font-semibold uppercase text-3xl md:text-4xl text-ink glow-soft">
                  SEE YOU AT THE PASS
                </h3>
                <p className="mt-4 font-mono text-[11px] tracking-[0.2em] text-mut">
                  {MONTHS[view.getMonth()]} {day} · {time} · {party} GUEST
                  {party > 1 ? "S" : ""}
                  {name ? ` · ${name.toUpperCase()}` : ""}
                </p>
                <button
                  onClick={() => setDone(false)}
                  className="mt-8 font-mono text-[9px] tracking-[0.3em] text-dim hover:text-gold transition-colors"
                >
                  + AMEND RESERVATION
                </button>
              </div>
            ) : (
              <>
                {" "}
                <div>
                  <p className="font-mono text-[10px] tracking-[0.3em] text-mut mb-4">
                    01 · SELECT DATE
                  </p>
                  <div className="border border-line bg-bg2 p-4">
                    <div className="flex items-center justify-between mb-3">
                      <button
                        onClick={() => {
                          setOff((o) => o - 1);
                          setDay(null);
                        }}
                        className="text-mut hover:text-gold px-2 transition-colors"
                      >
                        ‹
                      </button>
                      <span className="font-mono text-[10px] tracking-[0.3em] text-ink">
                        {MONTHS[view.getMonth()]} {view.getFullYear()}
                      </span>
                      <button
                        onClick={() => {
                          setOff((o) => o + 1);
                          setDay(null);
                        }}
                        className="text-mut hover:text-gold px-2 transition-colors"
                      >
                        ›
                      </button>
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-center">
                      {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                        <span
                          key={i}
                          className="font-mono text-[8px] text-dim py-1"
                        >
                          {d}
                        </span>
                      ))}
                      {Array.from({ length: lead }).map((_, i) => (
                        <span key={`b${i}`} />
                      ))}
                      {Array.from({ length: daysInMonth }).map((_, i) => {
                        const d = i + 1;
                        const sel = day === d;
                        return (
                          <button
                            key={d}
                            onClick={() => setDay(d)}
                            className={`h-8 font-mono text-[10px] transition-all ${
                              sel
                                ? "text-gold border border-gold shadow-[0_0_14px_rgba(232,182,76,0.35)]"
                                : "text-mut hover:text-ink border border-transparent hover:border-line2"
                            }`}
                          >
                            {d}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <p className="font-mono text-[10px] tracking-[0.3em] text-mut mt-6 mb-3">
                    03 · PARTY SIZE
                  </p>
                  <div className="flex items-center justify-between border border-line bg-bg2 px-4 py-3">
                    <button
                      onClick={() => setParty((p) => Math.max(1, p - 1))}
                      className="text-mut hover:text-gold text-lg px-2 transition-colors"
                    >
                      −
                    </button>
                    <span className="font-mono text-[11px] tracking-[0.25em] text-ink">
                      {party} GUEST{party > 1 ? "S" : ""}
                    </span>
                    <button
                      onClick={() => setParty((p) => Math.min(8, p + 1))}
                      className="text-mut hover:text-gold text-lg px-2 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>{" "}
                <div>
                  <p className="font-mono text-[10px] tracking-[0.3em] text-mut mb-4">
                    02 · SELECT TIME
                  </p>
                  <p className="font-mono text-[8px] tracking-[0.3em] text-dim mb-2">
                    LUNCH SERVICE
                  </p>
                  <div className="grid grid-cols-4 gap-2">
                    {LUNCH.map((t) => (
                      <button
                        key={t}
                        onClick={() => setTime(t)}
                        className={`h-9 font-mono text-[10px] border transition-all ${
                          time === t
                            ? "border-gold bg-gold text-bg"
                            : "border-line bg-bg2 text-mut hover:border-gold/50 hover:text-ink"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                  <p className="font-mono text-[8px] tracking-[0.3em] text-dim mt-4 mb-2">
                    DINNER SERVICE
                  </p>
                  <div className="grid grid-cols-4 gap-2">
                    {DINNER.map((t) => (
                      <button
                        key={t}
                        onClick={() => setTime(t)}
                        className={`h-9 font-mono text-[10px] border transition-all ${
                          time === t
                            ? "border-gold bg-gold text-bg"
                            : "border-line bg-bg2 text-mut hover:border-gold/50 hover:text-ink"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>

                  <p className="font-mono text-[10px] tracking-[0.3em] text-mut mt-6 mb-3">
                    04 · YOUR DETAILS
                  </p>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="FULL NAME"
                    className="w-full bg-bg2 border border-line px-3 py-3 font-mono text-[10px] tracking-[0.2em] text-ink placeholder:text-dim mb-2"
                  />
                  <input
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="EMAIL / PHONE"
                    className="w-full bg-bg2 border border-line px-3 py-3 font-mono text-[10px] tracking-[0.2em] text-ink placeholder:text-dim"
                  />
                </div>
                <div className="md:col-span-2">
                  <button
                    disabled={!ready}
                    onClick={() => setDone(true)}
                    className={`w-full h-12 font-mono text-[11px] tracking-[0.3em] uppercase transition-all duration-300 ${
                      ready
                        ? "bg-gold text-bg hover:bg-gold2 hover:shadow-[0_0_36px_rgba(232,182,76,0.45)]"
                        : "bg-line/40 text-dim cursor-not-allowed"
                    }`}
                  >
                    {ready ? "CONFIRM RESERVATION →" : "SELECT DATE + TIME"}
                  </button>
                </div>
              </>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
