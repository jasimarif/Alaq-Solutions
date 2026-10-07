import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Handshake } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const COLLABORATION_STYLE = {
  SLIDING_TEXT:
    "opacity-20 text-3xl sm:text-5xl md:text-7xl font-semibold whitespace-nowrap text-gray-500 font-poppins tracking-tighter",
  SECTION:
    "w-full overflow-hidden relative select-none py-12 sm:py-20 md:py-32 flex flex-col bg-bg-dark border-t border-gray-800/60",
  TITLE:
    "my-6 sm:my-8 font-medium text-3xl sm:text-4xl md:text-5xl text-center text-white font-poppins tracking-tight px-4",
};

const CollaborationSection = () => {
  const quoteRef = useRef(null);
  const targetSection = useRef(null);
  const [willChange, setWillChange] = useState(false);

  const handleOpenContact = () => {
    const contactBtn = document.querySelector("nav button:last-of-type");
    if (contactBtn) contactBtn.click();
  };

  useEffect(() => {
    const isDesktop = window.innerWidth >= 768;
    if (!isDesktop) return;

    let textBgAnimation;
    let slidingAnimation;

    // Text gradient reveal animation on desktop
    if (quoteRef.current && quoteRef.current.querySelector(".text-strong")) {
      const timeline = gsap.timeline({ defaults: { ease: "none" } });
      timeline.fromTo(
        quoteRef.current,
        { opacity: 0.6 },
        { opacity: 1, duration: 1 }
      );

      textBgAnimation = ScrollTrigger.create({
        trigger: targetSection.current,
        start: "center bottom",
        end: "center center",
        scrub: 0.5,
        animation: timeline,
        onToggle: (self) => setWillChange(self.isActive),
      });
    }

    // Sliding text moving left and right on desktop
    const uiLeft = targetSection.current?.querySelector(".ui-left");
    const uiRight = targetSection.current?.querySelector(".ui-right");

    if (uiLeft && uiRight) {
      const slidingTl = gsap.timeline({ defaults: { ease: "none" } });
      slidingTl
        .to(uiLeft, { xPercent: -120 })
        .fromTo(uiRight, { xPercent: -120 }, { xPercent: 0 }, "<");

      slidingAnimation = ScrollTrigger.create({
        trigger: targetSection.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.5,
        animation: slidingTl,
      });
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

  return (
    <section className={COLLABORATION_STYLE.SECTION} ref={targetSection}>
      {/* Top Sliding Line (Visible on Desktop / Tablets) */}
      <div className="hidden md:block overflow-hidden w-full">
        {renderSlidingText("Netsuite   MCP Servers   Enterprise ERP   ", "ui-left")}
      </div>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto text-center px-4 z-10 my-4 sm:my-6">
        {/* Mobile Decent Badge */}
        <div className="inline-flex md:hidden items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/25 text-accent-soft text-xs font-medium mb-3">
          <Handshake className="w-3.5 h-3.5" />
          Partner With Us
        </div>

        {/* Title */}
        <h2
          ref={quoteRef}
          className={`${COLLABORATION_STYLE.TITLE} ${
            willChange ? "will-change-opacity" : ""
          }`}
        >
          Interested in{" "}
          <span className="text-accent-soft font-bold text-strong">Collaboration</span>?
        </h2>

        {/* Subtitle */}
        <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-xl mx-auto -mt-2 mb-6 leading-relaxed">
          Whether you need NetSuite optimization, custom SuiteApp development, or AI financial automation, our team is ready to help.
        </p>

        {/* Clean CTA button */}
        <div className="flex justify-center">
          <button
            onClick={handleOpenContact}
            className="px-6 sm:px-8 py-3.5 rounded-full bg-accent hover:bg-accent-hover text-white font-semibold text-sm sm:text-base transition-all duration-300 shadow-lg shadow-accent/25 hover:shadow-accent/40 flex items-center gap-2 cursor-pointer"
          >
            <span>Start a Conversation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bottom Sliding Line (Visible on Desktop / Tablets) */}
      <div className="hidden md:block overflow-hidden w-full mt-4 sm:mt-6">
        {renderSlidingText(
          " AI Integration   LLM Finance   SalesForce Sync   ",
          "ui-right"
        )}
      </div>
    </section>
  );
};

export default CollaborationSection;
