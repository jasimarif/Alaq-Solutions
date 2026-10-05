import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import {
  MainPage,
  AboutPage,
  IndustriesPage,
  CaseStudiesPage,
  NotFoundPage,
} from "./Pages";
import Cursor from "./Components/Cursor/Cursor";
import ScrollToTop from "./Components/Common/ScrollToTop";
import { initLenis, destroyLenis } from "./utils/lenis";

const DEBOUNCE_TIME = 100;

function App() {
  const [isDesktop, setIsDesktop] = useState(true);

  // Initialize Lenis smooth scrolling
  useEffect(() => {
    initLenis();
    return () => {
      destroyLenis();
    };
  }, []);

  useEffect(() => {
    let timer;

    const debouncedDimensionCalculator = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const isDesktopResult =
          typeof window !== "undefined" &&
          window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 768px)").matches;

        setIsDesktop(isDesktopResult);
      }, DEBOUNCE_TIME);
    };

    debouncedDimensionCalculator();

    window.addEventListener("resize", debouncedDimensionCalculator);
    return () => {
      window.removeEventListener("resize", debouncedDimensionCalculator);
      clearTimeout(timer);
    };
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <Cursor isDesktop={isDesktop} />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/industries" element={<IndustriesPage />} />
        <Route path="/case-studies" element={<CaseStudiesPage />} />
        <Route path="/solutions" element={<Navigate to="/#solutions" replace />} />
        <Route path="/how-it-works" element={<Navigate to="/#how-it-works" replace />} />
        <Route path="/products" element={<Navigate to="/#solutions" replace />} />
        <Route path="/contact" element={<Navigate to="/#contact" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
