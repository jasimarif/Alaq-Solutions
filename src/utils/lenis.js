import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenisInstance = null;
let rafId = null;

export const initLenis = () => {
  if (typeof window === 'undefined') return null;
  if (lenisInstance) return lenisInstance;

  // Respect prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    return null;
  }

  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1.0,
    touchMultiplier: 1.2,
  });

  lenisInstance = lenis;

  // Ensure initial mount/reload starts at hero section (top: 0)
  const isReload = (() => {
    try {
      const navEntries = performance.getEntriesByType('navigation');
      if (navEntries && navEntries.length > 0) {
        return navEntries[0].type === 'reload';
      }
      return performance.navigation && performance.navigation.type === 1;
    } catch {
      return false;
    }
  })();

  if (isReload || !window.location.hash) {
    lenis.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
  }

  // Integrate Lenis scroll events with GSAP ScrollTrigger
  lenis.on('scroll', () => {
    ScrollTrigger.update();
  });

  function raf(time) {
    lenis.raf(time);
    rafId = requestAnimationFrame(raf);
  }
  rafId = requestAnimationFrame(raf);

  return lenis;
};

export const getLenis = () => lenisInstance;

export const resetScrollToTop = () => {
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }
  if (lenisInstance) {
    lenisInstance.scrollTo(0, { immediate: true });
  }
};

export const destroyLenis = () => {
  if (rafId) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }
};

/**
 * Scroll to target element or selector with header offset
 */
export const scrollToTarget = (target, offset = -80) => {
  if (!target) return;

  const resolvedOffset = typeof offset === 'number' ? offset : -80;

  if (lenisInstance) {
    lenisInstance.scrollTo(target, {
      offset: resolvedOffset,
      duration: 1.2,
    });
  } else {
    const el = typeof target === 'string' ? document.querySelector(target) : target;
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset + resolvedOffset;
      window.scrollTo({
        top: Math.max(0, top),
        behavior: 'smooth',
      });
    }
  }
};
