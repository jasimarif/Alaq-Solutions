import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';
import {
  Car,
  RotateCcw,
  Search,
  ShieldCheck,
  Tag,
  FileText,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, CustomEase);

try {
  CustomEase.create('unfoldEase', '0.22, 1, 0.36, 1');
} catch {
  // If already registered
}

// ============================================================================
// BACK FACE CONTENT (Placeholder)
// NOTE: Confirm these details with the business owner before publishing.
// ============================================================================
const CAR_TRADING_STEPS = [
  {
    step: '01',
    title: 'Sourcing',
    description: 'We source vehicles through trusted dealers, auctions and direct sellers.',
    icon: Search,
  },
  {
    step: '02',
    title: 'Inspection',
    description: 'Every vehicle is checked and its condition and history verified before purchase.',
    icon: ShieldCheck,
  },
  {
    step: '03',
    title: 'Pricing and sale',
    description: 'Transparent pricing based on market value, with no hidden costs.',
    icon: Tag,
  },
  {
    step: '04',
    title: 'Paperwork and handover',
    description: 'Ownership, registration and documentation handled end to end.',
    icon: FileText,
  },
];

/**
 * BeyondAutomation Component
 * Features an "unfolding" entrance animation on scroll, and a 3D flip interaction
 * revealing automotive trading details on the back face.
 */
const BeyondAutomation = () => {
  const containerRef = useRef(null);
  const unfoldRef = useRef(null);

  // Flip interaction state
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Entrance Unfolding Animation (GSAP + ScrollTrigger)
  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      if (unfoldRef.current) gsap.set(unfoldRef.current, { opacity: 1, clearProps: 'all' });
      return;
    }

    const ease = CustomEase.get && CustomEase.get('unfoldEase') ? 'unfoldEase' : 'power3.out';

    const ctx = gsap.context(() => {
      // Initial state: folded up sheet
      gsap.set(unfoldRef.current, {
        opacity: 0,
        transformOrigin: 'top center',
        transformPerspective: 1200,
        rotationX: -80,
        scaleY: 0.7,
        force3D: true,
      });

      // ScrollTrigger: play once when card enters viewport
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: unfoldRef.current,
          start: 'top 85%',
          once: true,
          toggleActions: 'play none none none',
        },
      });

      // Unfold card like a sheet opening over 900ms
      tl.to(unfoldRef.current, {
        opacity: 1,
        rotationX: 0,
        scaleY: 1,
        duration: 0.9,
        ease: ease,
      });
    }, containerRef);

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, []);

  // Handlers for Desktop hover, Touch tap, and Keyboard navigation
  const handleToggleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  const handleMouseEnter = () => {
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      setIsHovered(false);
      setIsFlipped(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggleFlip();
    }
  };

  const showBack = isFlipped || isHovered;

  return (
    <section
      ref={containerRef}
      aria-label="Beyond automation"
      className="bg-bg-light py-16 md:py-20 px-4 sm:px-6 lg:px-8 font-sans overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Unfold entrance wrapper */}
        <div ref={unfoldRef} className="w-full will-change-transform">
          {/* 3D Flip perspective container */}
          <div className="w-full [perspective:1400px]">
            {/* Focusable Interactive Flip Card */}
            <div
              role="button"
              tabIndex={0}
              aria-expanded={showBack}
              aria-label={`Beyond automation - Automotive trading. ${
                showBack
                  ? 'Showing car trading details. Click or press Enter to return to overview.'
                  : 'Click, hover or press Enter to view how our car trading works.'
              }`}
              onClick={handleToggleFlip}
              onKeyDown={handleKeyDown}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className={`group relative grid grid-cols-1 grid-rows-1 w-full [transform-style:preserve-3d] will-change-transform transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] rounded-[28px] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-bg-light shadow-2xs [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-1 [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-md motion-reduce:transition-none motion-reduce:transform-none ${
                showBack ? '[transform:rotateY(180deg)]' : '[transform:rotateY(0deg)]'
              }`}
            >
              {/* =============================================================
                  FRONT FACE: Peach overview card
                  ============================================================= */}
              <div
                aria-hidden={showBack}
                className={`col-start-1 row-start-1 w-full h-full bg-[#fdf0e6] border border-orange-200/50 rounded-[28px] px-6 py-8 md:px-14 md:py-10 [backface-visibility:hidden] will-change-transform flex flex-col justify-between motion-reduce:transition-opacity motion-reduce:duration-300 ${
                  showBack ? 'motion-reduce:opacity-0 motion-reduce:pointer-events-none' : 'motion-reduce:opacity-100'
                }`}
              >
                {/* Top content row */}
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                  {/* Icon Tile: on mobile stacked above and left-aligned, on desktop on the right */}
                  <div className="order-1 md:order-2 flex-shrink-0 self-start md:self-auto">
                    <div
                      className="w-16 h-16 md:w-[72px] md:h-[72px] rounded-2xl bg-white border border-orange-200/50 shadow-xs flex items-center justify-center"
                      aria-hidden="true"
                    >
                      <Car className="w-8 h-8 md:w-9 md:h-9 text-slate-700" strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Text block: heading + balanced 2-line paragraph */}
                  <div className="order-2 md:order-1 text-left max-w-3xl">
                    <h3 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-extrabold text-text-dark tracking-tight leading-snug text-balance">
                      Beyond automation
                    </h3>
                    <p className="mt-3 text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed max-w-3xl text-balance">
                      ALAQ also operates in automotive trading, including car trading. It is a separate line of work from our automation services, and it extends what we do as a business.
                    </p>
                  </div>
                </div>

                {/* Bottom hint pill matching Social Media style */}
                <div className="pt-4 mt-6 border-t border-orange-200/50 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-text-dark group-hover:text-accent transition-colors">
                    <RotateCcw className="w-3.5 h-3.5 text-accent transition-transform duration-300 group-hover:-rotate-45" />
                    <span className="hidden sm:inline">Hover to see more</span>
                    <span className="sm:hidden">Tap to see more</span>
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 bg-white/80 group-hover:bg-accent group-hover:text-white px-3 py-1 rounded-full transition-colors shadow-2xs border border-orange-200/60">
                    <span>Flip to details</span>
                    <span className="text-xs">↻</span>
                  </span>
                </div>
              </div>

              {/* =============================================================
                  BACK FACE: Dark trading steps card
                  ============================================================= */}
              <div
                aria-hidden={!showBack}
                className={`col-start-1 row-start-1 w-full h-full bg-surface-dark border border-border-dark/90 rounded-[28px] px-6 py-8 md:px-14 md:py-10 [backface-visibility:hidden] [transform:rotateY(180deg)] will-change-transform flex flex-col justify-between motion-reduce:transition-opacity motion-reduce:duration-300 ${
                  showBack ? 'motion-reduce:opacity-100' : 'motion-reduce:opacity-0 motion-reduce:pointer-events-none'
                }`}
              >
                {/* Back Face Header */}
                <div className="space-y-1.5 text-left">
                  <span className="text-xs font-bold text-accent uppercase tracking-wider block">
                    Automotive trading
                  </span>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight">
                    How our car trading works
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed max-w-3xl text-balance">
                    A separate line of business, run with the same discipline we bring to the shop floor.
                  </p>
                </div>

                {/* 4 Compact Steps: 4 cols on desktop, 2x2 on tablet, 1 col on mobile */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 my-5 text-left">
                  {CAR_TRADING_STEPS.map((step) => {
                    const StepIcon = step.icon;
                    return (
                      <div
                        key={step.step}
                        className="bg-white/5 border border-white/10 rounded-2xl p-3.5 sm:p-4 flex flex-col justify-between shadow-2xs"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="w-8 h-8 rounded-xl bg-accent/15 border border-accent/25 flex items-center justify-center text-accent shadow-2xs">
                              <StepIcon className="w-4 h-4 text-accent" strokeWidth={1.75} />
                            </div>
                            <span className="text-[10px] font-mono font-bold text-accent-soft">
                              Step {step.step}
                            </span>
                          </div>
                          <h4 className="text-sm font-bold text-white tracking-tight">
                            {step.title}
                          </h4>
                          <p className="text-xs text-slate-300 leading-relaxed font-normal">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Back Face Footer: Flip back pill */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 group-hover:text-accent transition-colors">
                    <RotateCcw className="w-3.5 h-3.5 text-accent" />
                    <span className="hidden sm:inline">Overview</span>
                    <span className="sm:hidden">Back</span>
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-300 bg-white/10 group-hover:bg-accent group-hover:text-white px-3 py-1 rounded-full transition-colors shadow-2xs border border-white/15">
                    <span>Flip back</span>
                    <span className="text-xs">↻</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeyondAutomation;
