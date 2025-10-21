import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainPage, BlogsPage, BlogDetailPage } from "./Pages";
import Cursor from "./Components/Cursor/Cursor";

const DEBOUNCE_TIME = 100;

function App() {
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    let timer;

    const debouncedDimensionCalculator = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const isDesktopResult =
          typeof window.orientation === "undefined" &&
          navigator.userAgent.indexOf("IEMobile") === -1;

        window.history.scrollRestoration = "manual";

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
      <Cursor isDesktop={isDesktop} />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/blogs/:id" element={<BlogDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
