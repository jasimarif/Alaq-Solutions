
import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const COLLABORATION_STYLE = {
  SLIDING_TEXT: "opacity-20 text-5xl md:text-7xl font-semibold whitespace-nowrap text-gray-300 font-poppins tracking-tighter",
  SECTION:
    "w-full relative select-none tall:py-36 py-36 section-container flex flex-col bg-[#132D25]",
  TITLE: "mt-6 md:mt-8 font-medium text-4xl md:text-5xl text-center text-white font-poppins tracking-tighter",
};

const isSmallScreen = () => {
  if (typeof document !== 'undefined') {
    return document.body.clientWidth < 767;
  }
  return false;
};

const NO_MOTION_PREFERENCE_QUERY = "(prefers-reduced-motion: no-preference)";

const CollaborationSection = () => {
  const quoteRef = useRef(null);
  const targetSection = useRef(null);

  const [willChange, setwillChange] = useState(false);

  const initTextGradientAnimation = (targetSection) => {
    if (!quoteRef.current || !quoteRef.current.querySelector(".text-strong")) {
      return null;
    }

    const timeline = gsap.timeline({
      defaults: { ease: "none" }
    });

    timeline
      .fromTo(quoteRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 2, immediateRender: false }
      )
      .to(quoteRef.current.querySelector(".text-strong"), {
        backgroundPositionX: "100%",
        duration: 1,
      });

    return ScrollTrigger.create({
      trigger: targetSection.current,
      start: "center bottom",
      end: "center center",
      scrub: 0,
      animation: timeline,
      onToggle: (self) => setwillChange(self.isActive),
    });
  };

  const initSlidingTextAnimation = (targetSection) => {
    const slidingTl = gsap.timeline({ defaults: { ease: "none" } });

    const uiLeft = targetSection.current.querySelector(".ui-left");
    const uiRight = targetSection.current.querySelector(".ui-right");

    if (!uiLeft || !uiRight) {
      return null;
    }

    slidingTl
      .to(uiLeft, {
        xPercent: isSmallScreen() ? -500 : -150,
      })
      .fromTo(
        uiRight,
        { xPercent: isSmallScreen() ? -500 : -150 },
        { xPercent: 0, immediateRender: false },
        "<"
      );

    return ScrollTrigger.create({
      trigger: targetSection.current,
      start: "top bottom",
      end: "bottom top",
      scrub: 0,
      animation: slidingTl,
    });
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (quoteRef.current) {
      gsap.set(quoteRef.current, { opacity: 1 });
    }

    const textBgAnimation = initTextGradientAnimation(targetSection);
    let slidingAnimation;

    const { matches } = window.matchMedia(NO_MOTION_PREFERENCE_QUERY);

    if (matches) {
      slidingAnimation = initSlidingTextAnimation(targetSection);
    } else {
      slidingAnimation = initSlidingTextAnimation(targetSection);
    }

    return () => {
      if (textBgAnimation) textBgAnimation.kill();
      if (slidingAnimation) slidingAnimation.kill();
    };
  }, []);

  const renderSlidingText = (text, layoutClasses) => (
    <p className={`${layoutClasses} ${COLLABORATION_STYLE.SLIDING_TEXT}`}>
      {Array(5)
        .fill(text)
        .reduce((str, el) => str.concat(el), "")}
    </p>
  );

  const renderTitle = () => (
    <h1
      ref={quoteRef}
      className={`${COLLABORATION_STYLE.TITLE} ${
        willChange ? "will-change-opacity" : ""
      }`}
    >
      Interested in <span className="text-strong font-bold">Collaboration</span>
      ?
    </h1>
  );

  return (
    <section className={COLLABORATION_STYLE.SECTION} ref={targetSection}>
      {renderSlidingText(
        "Netsuite  MCP Servers ",
        "ui-left"
      )}

      {renderTitle()}

      {renderSlidingText(
        " AI Integration  LLM SalesForce ",
        "mt-6 md:mt-8 ui-right"
      )}

    
    </section>
  );
};

export default CollaborationSection;
