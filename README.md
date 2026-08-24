# SMASH

A scroll-driven video concept site for a fictional smash burger brand. The entire experience is a single video that plays as you scroll — no separate sections, no traditional page layout. Just the burger, frame by frame, controlled by your scroll.

**Live Demo → [navaira-y.github.io/smash](https://navaira-y.github.io/smash/)**

## What it does

Scroll through the page and the video plays forward. Scroll back and it reverses. The whole site is one cinematic scroll-through — the burger, the griddle, the press, the stack. Every frame tied to your scroll position.

## Stack

- React 18 with TypeScript
- Vite
- Tailwind CSS
- GSAP ScrollTrigger for scroll-to-video mapping
- Lenis for smooth scrolling
- HTML5 Canvas for frame rendering

## Running it locally

```bash
npm install
npm run dev
```

That starts the dev server on `http://localhost:5173`.

```bash
npm run build
npm run preview
```

## Notes

This is a portfolio project, not a real business. All branding and content are fictional.
