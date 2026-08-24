export default function Loader({ progress, hiding }: { progress: number; hiding: boolean }) {
  const pct = Math.round(progress * 100);
  return (
    <div
      className={`fixed inset-0 z-[100] bg-bg flex flex-col items-center justify-center gap-14 transition-opacity duration-700 ${
        hiding ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="fire">
        <img src="videos/fire.svg" alt="" className="fire-img fb" />
        <img src="videos/fire.svg" alt="" className="fire-img fa" />
        <span className="ember e1" />
        <span className="ember e2" />
        <span className="ember e3" />
      </div>

      <div className="w-[240px] md:w-[300px]">
        <div className="h-[3px] bg-line relative overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-ember to-gold shadow-[0_0_16px_rgba(232,182,76,0.8)] transition-[width] duration-200"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="mt-3 flex justify-between font-mono text-[9px] tracking-[0.3em] text-mut">
          <span>IGNITING THE GRIDDLE</span>
          <span className="text-gold">{pct}%</span>
        </div>
      </div>
    </div>
  );
}
