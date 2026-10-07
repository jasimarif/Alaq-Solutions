import React, { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { scrollToTarget } from '../../utils/lenis';
import HeroAutomationScene from './HeroAutomationScene';

// One headline statement. Uses natural balance typography without forcing unnatural word breaks.
const Statement = ({ text, className = '', delay }) => {
  return (
    <span
      className={`hero-statement hero-enter block [text-wrap:balance] ${className}`}
      style={{ '--d': delay }}
    >
      {text}
    </span>
  );
};

// Compact trust chips: flex-wrap row, 8px gaps, 14px text, 6px 12px padding, consistent dot color
const TrustChips = ({ points, className = '', delay }) => (
  <ul
    className={`flex flex-wrap items-center justify-start gap-2 ${className}`}
    style={{ '--d': delay }}
  >
    {points.map((point) => (
      <li
        key={point}
        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[14px] leading-tight text-slate-300 font-sans"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-accent-soft flex-shrink-0" aria-hidden="true" />
        <span>{point}</span>
      </li>
    ))}
  </ul>
);

const Hero = ({
  headlineLine1,
  headlineLine2,
  subheadline,
  primaryCta = { label: 'Send us one messy order', url: '#contact' },
  secondaryCta = null,
  trustPoints,
  className = '',
}) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const points =
    trustPoints && trustPoints.length > 0
      ? trustPoints
      : [
          'AI reads and validates inputs',
          'Deterministic code writes to NetSuite',
          'AI never touches your general ledger',
        ];

  // Check for prefers-reduced-motion
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);

      const handleChange = (e) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  return (
    <section
      aria-label="Hero Section"
      className={`hero-section relative flex flex-col min-h-[100svh] pt-[104px] sm:pt-[112px] lg:pt-[88px] pb-14 lg:pb-8 bg-bg-darker overflow-hidden [overflow-x:clip] justify-center ${className}`}
    >
      {/* Background Layer: deep charcoal with a quiet grid */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-bg-darker to-transparent" />
      </div>

      {/* Hero Foreground Content: equal 20px side padding on mobile, natural vertical rhythm */}
      <div className="relative z-30 flex-1 flex flex-col justify-center px-5 sm:px-6 lg:px-8 py-2 sm:py-6">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-12 items-center">
          {/* Left Column: Heading, Subheading, CTAs, trust chips with exact spacing scale */}
          <div className="flex flex-col items-start text-left w-full">
            <h1 className="hero-headline font-extrabold text-white text-[clamp(2.15rem,9.5vw,2.85rem)] lg:text-6xl tracking-tight leading-[1.1] lg:leading-[1.12]">
              <Statement text={headlineLine1} delay="0.1s" />
              {headlineLine2 && (
                <Statement text={headlineLine2} className="text-accent-soft" delay="0.18s" />
              )}
            </h1>

            {/* Headline to subheadline: 20px (mt-5) */}
            <p
              className="hero-subheadline hero-enter text-[1.0625rem] lg:text-lg text-white/72 leading-[1.6] max-w-[36ch] lg:max-w-xl mt-5"
              style={{ '--d': '0.3s' }}
            >
              {subheadline}
            </p>

            {/* Subheadline to button: 32px (mt-8). Full width within padding on mobile, 56px tall, subtle shadow */}
            <div
              className="hero-enter mt-8 w-full sm:w-auto"
              style={{ '--d': '0.42s' }}
            >
              <a
                href={primaryCta.url || '#contact'}
                onClick={(e) => {
                  const targetUrl = primaryCta.url || '#contact';
                  if (targetUrl === '#contact' || targetUrl === '/#contact') {
                    const el = document.querySelector('#contact');
                    if (el) {
                      e.preventDefault();
                      scrollToTarget('#contact', -80);
                    }
                  }
                }}
                target={primaryCta.isExternal ? '_blank' : '_self'}
                rel={primaryCta.isExternal ? 'noopener noreferrer' : undefined}
                className="flex items-center justify-between w-full sm:w-auto sm:inline-flex h-[56px] min-h-[56px] px-6 rounded-full bg-accent hover:bg-accent-hover text-on-accent font-semibold text-[15px] sm:text-base shadow-glow transition-all duration-200 link group cursor-pointer"
              >
                <span className="whitespace-nowrap text-left">{primaryCta.label}</span>
                <span className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0 ml-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowUpRight className="hero-arrow-icon w-4 h-4 text-white" />
                </span>
              </a>

              {secondaryCta && secondaryCta.label !== primaryCta.label && (
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToTarget('#contact', -80);
                  }}
                  className="text-xs sm:text-[15px] whitespace-nowrap text-slate-200 hover:text-white font-medium transition-colors link inline-flex items-center gap-1.5 underline-offset-4 hover:underline py-1.5 mt-2 sm:mt-0 sm:ml-4"
                >
                  <span>{secondaryCta.label}</span>
                  <span className="text-accent-soft" aria-hidden="true">→</span>
                </a>
              )}
            </div>

            {/* Button to chips: 24px (mt-6) */}
            <div className="hero-enter mt-6 w-full" style={{ '--d': '0.5s' }}>
              <TrustChips points={points} delay="0.5s" />
            </div>
          </div>

          {/* Right Column: the automation scene in its rounded container.
              Chips to scene: 40px (mt-10), lg:mt-0 on desktop.
              Full width within padding on mobile, aspect ratio 4:3, centered with balanced padding. */}
          <div className="hero-enter w-full mt-10 lg:mt-0 flex justify-start lg:justify-end" style={{ '--d': '0.35s' }}>
            <div className="w-full lg:max-w-[620px] aspect-[4/3] sm:aspect-[4/3] lg:aspect-[5/4] rounded-2xl sm:rounded-3xl bg-gradient-to-b from-surface-dark/90 via-bg-darker/95 to-bg-darker border border-border-dark/60 p-3 sm:p-4 shadow-xl relative overflow-hidden flex items-center justify-center">
              <HeroAutomationScene
                reducedMotion={prefersReducedMotion}
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
