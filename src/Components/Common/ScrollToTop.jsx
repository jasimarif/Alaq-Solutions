import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { scrollToTarget, resetScrollToTop } from '../../utils/lenis';

const isPageReload = () => {
  if (typeof window === 'undefined') return false;
  try {
    const navEntries = performance.getEntriesByType('navigation');
    if (navEntries && navEntries.length > 0) {
      return navEntries[0].type === 'reload';
    }
    return performance.navigation && performance.navigation.type === 1;
  } catch {
    return false;
  }
};

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  const isInitialMount = useRef(true);

  useEffect(() => {
    // On page reload or fresh load, always ensure the hero section is at the top
    if (isInitialMount.current) {
      isInitialMount.current = false;
      if (isPageReload()) {
        if (window.location.hash) {
          window.history.replaceState(null, '', window.location.pathname);
        }
        resetScrollToTop();
        return;
      }
    }

    if (hash) {
      const timer = setTimeout(() => {
        scrollToTarget(hash, -80);
      }, 120);
      return () => clearTimeout(timer);
    } else {
      resetScrollToTop();
    }
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;

