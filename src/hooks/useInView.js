import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook to detect when an element scrolls into the viewport.
 * Uses IntersectionObserver with a trigger-once behavior by default.
 * Respects prefers-reduced-motion by immediately marking element as visible.
 *
 * @param {Object} options
 * @param {number} [options.threshold=0.25] - Intersection ratio to trigger (default: 0.25)
 * @param {boolean} [options.once=true] - Disconnect once triggered (default: true)
 * @param {string} [options.rootMargin='0px'] - Root margin for viewport detection
 * @returns {[React.RefObject, boolean]} [ref, isInView]
 */
export function useInView({ threshold = 0.25, once = true, rootMargin = '0px' } = {}) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect user's motion preference: instantly trigger if reduced motion is requested
    if (
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setIsInView(true);
      return;
    }

    // Fallback if IntersectionObserver is unsupported
    if (typeof IntersectionObserver === 'undefined') {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) {
            observer.unobserve(el);
            observer.disconnect();
          }
        } else if (!once) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [threshold, once, rootMargin]);

  return [ref, isInView];
}

export default useInView;
