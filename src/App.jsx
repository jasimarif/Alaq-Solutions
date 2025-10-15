import { useEffect, useState } from "react";
import MainPage from "./Pages/MainPage";
import Cursor from "./Components/Cursor";

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
    <>
      <Cursor isDesktop={isDesktop} />
      <MainPage />
    </>
  );
}

export default App;
