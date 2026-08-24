import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { flyWithScrollTo, lenis, setLenis } from "./ui";
import Nav from "./sections/Nav";
import Hero from "./sections/Hero";
import LineUp from "./sections/LineUp";
import Build, { type BuildState } from "./sections/Build";
import Overview from "./sections/Overview";
import Sear from "./sections/Sear";
import Craft from "./sections/Craft";
import Cut from "./sections/Cut";
import Story from "./sections/Story";
import Reserve from "./sections/Reserve";
import Footer from "./sections/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [build, setBuild] = useState<BuildState>({
    burger: "smoke",
    patty: 0,
    tops: [],
  });

  const handleOrder = (id: string, img: HTMLImageElement) => {
    setBuild((b) => ({ ...b, burger: id }));
    const buildEl = document.getElementById("build");
    flyWithScrollTo(
      img.src,
      img.getBoundingClientRect(),
      "[data-preview-box]",
      () => {
        if (buildEl && lenis) {
          lenis.scrollTo(buildEl, {
            offset: -52,
            duration: 1.1,
            easing: (t: number) => 1 - Math.pow(1 - t, 3),
          });
        }
      },
    );
  };

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1 });
    setLenis(lenis);
    lenis.on("scroll", () => ScrollTrigger.update());
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    return () => {
      window.removeEventListener("load", onLoad);
      gsap.ticker.remove(raf);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <div className="bg-bg text-ink">
      <Nav />
      <main>
        <Hero />
        <LineUp onOrder={handleOrder} />
        <Build state={build} onChange={setBuild} />
        <Overview />
        <Sear />
        <Craft />
        <Cut />
        <Story />
        <Reserve />
      </main>
      <Footer />
    </div>
  );
}
