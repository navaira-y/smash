# SMASH — VISUALLY SEARED

A scroll-driven, cinematic one-pager for a fictional smash-burger brand. Dark HUD aesthetic, amber glow, mono type, GSAP-scrubbed sections — rebuilt to match the reference design video frame by frame.

## Sections (in scroll order)

| # | Section | Effect |
|---|---------|--------|
| 00 | **THE SEAR (hero)** | Burger photo + camera-HUD chrome (REC, fps, corner brackets, scrub ruler). Swap `images/hero-05.jpg` for the scroll video when delivered. |
| 01 | **THE LINE-UP** | 3 build cards, staggered reveal, `+ ADD TO ORDER` jumps into the builder with that burger preselected. |
| 02 | **BUILD YOUR SMASH** | Live configurator — patty upgrade, toppings, glowing live total, receipt lines. |
| 03 | **OVERVIEW** | Glowing digital counters (102G / 7S / 196° / 1) counting up on entry. |
| 04 | **THE SEAR** | Pinned 300vh scroll-scrub: "THE BEEF WAITS", heat counter 0→230°C, flames rise with scroll. |
| 05 | **THE CRAFT** | Mosaic ingredient grid with clip-path reveals. |
| 06 | **THE CUT** | Pinned horizontal-scroll ingredient cards with progress hairline. |
| 07 | **THE STORY** | "From Hamburg to the griddle" — archival-style story cards. |
| 08 | **RESERVE** | Booking panel: live calendar, lunch/dinner slots, party-size stepper, confirmation state. |

## Stack

- React 19 + TypeScript, Vite 8, Tailwind CSS 4
- GSAP + ScrollTrigger (pins, scrubs, counters, reveals)
- Lenis smooth scrolling
- Type: Oswald (display) · Inter (body) · IBM Plex Mono (HUD) · Iceland (digital digits)

## Running locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build
```

## GitHub Pages

A static build lives in `docs/` (built with `--base=/smash/`).
To publish at `https://navaira-y.github.io/smash/`:
**Settings → Pages → Deploy from a branch → branch `arena/01a03290-smash`, folder `/docs`.**
(Enabling Pages requires repo-admin rights this session's token doesn't have.)

## Notes

Portfolio project, not a real business. All branding fictional.
