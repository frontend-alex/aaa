import Lenis from "@studio-freight/lenis";

let lenis: Lenis | null = null;

export function initLenis() {
  if (typeof window === "undefined") return null;

  if (!lenis) {
    lenis = new Lenis({
      // Lower lerp = more momentum, silkier feel (OH Architecture style)
      lerp: 0.07,

      // Scroll duration - higher = more luxurious, slower scroll
      duration: 1.2,

      // Custom easing for premium feel
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),

      // Multipliers
      wheelMultiplier: 0.8,
      touchMultiplier: 1.5,

      smoothWheel: true,
    });
  }

  return lenis;
}

export function getLenis() {
  return lenis;
}

export function destroyLenis() {
  if (lenis) {
    lenis.destroy();
    lenis = null;
  }
}

export function setScrollEnabled(enabled: boolean) {
  if (typeof document === "undefined") return;

  if (enabled) {
    document.body.classList.remove("scroll-disabled");
    if (lenis) lenis.start();
  } else {
    document.body.classList.add("scroll-disabled");
    if (lenis) lenis.stop();
  }
}
