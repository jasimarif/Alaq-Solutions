import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Bot,
  FileSpreadsheet,
  Database,
  Share2,
  Car,
  ArrowRight,
  ArrowUpRight,
} from 'lucide-react';
import PageWrapper from '../Components/Common/PageWrapper';
import { ABOUT_CONTENT } from '../data/about';
import { PAGE_SEO } from '../data/seo';
import { BOOKING_CTA_URL, BOOKING_CTA_LABEL } from '../data/config';

gsap.registerPlugin(ScrollTrigger);

// Icon mapping for "What we do" cards
const SERVICE_ICONS = {
  'ai-workflow-automation': Bot,
  'excel-spreadsheet-automation': FileSpreadsheet,
  'erp-accounting-automation': Database,
  'social-media-marketing': Share2,
};

const AboutPage = () => {
  const pageRef = useRef(null);
  const { header, whoWeAre, whatWeDo, howWeWork, beyondAutomation, closingCta } = ABOUT_CONTENT;

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || !pageRef.current) return;

    const ctx = gsap.context(() => {
      // Subtle fade & 24px slide-up on scroll for main sections
      const sections = pageRef.current.querySelectorAll('.about-reveal-section');
      sections.forEach((section) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // Staggered reveal for "What we do" cards
      const cards = pageRef.current.querySelectorAll('.about-stagger-card');
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cards[0],
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Staggered reveal for "How we work" columns
      const workItems = pageRef.current.querySelectorAll('.about-stagger-item');
      if (workItems.length > 0) {
        gsap.fromTo(
          workItems,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: workItems[0],
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, pageRef);

    // Refresh ScrollTrigger after mount and layout calculation
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  return (
    <PageWrapper seo={PAGE_SEO.about} showCta={false}>
      <div ref={pageRef} className="font-sans text-[#0F172A]">
        {/* =========================================================================
            1. PAGE HEADER (Dark only at the top, consistent with site)
            ========================================================================= */}
        <section
          aria-label="About Header"
          className="relative bg-[#0B0F17] text-white pt-32 sm:pt-36 lg:pt-40 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
        >
          {/* Neutral Background Photo with Quiet Gradient Overlay */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
            <picture>
              <source media="(max-width: 640px)" srcSet={header.imageMobile} type="image/webp" />
              <img
                src={header.image}
                alt=""
                className="w-full h-full object-cover object-center opacity-25 filter grayscale contrast-125"
              />
            </picture>
            <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F17]/80 via-[#0B0F17]/90 to-[#0B0F17]" />
          </div>

          {/* Centered H1 and Intro */}
          <div className="relative z-10 max-w-4xl mx-auto text-center space-y-5">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
              {header.title}
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto text-balance">
              {header.intro}
            </p>
          </div>
        </section>

        {/* =========================================================================
            2. SECTION: WHO WE ARE (Two columns on desktop, stacked on mobile)
            ========================================================================= */}
        <section
          aria-label="Who we are"
          className="about-reveal-section bg-white py-16 lg:py-24 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80"
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
              {/* Left Column: Heading */}
              <div className="lg:col-span-5 text-left">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
                  {whoWeAre.title}
                </h2>
              </div>

              {/* Right Column: Two Paragraphs */}
              <div className="lg:col-span-7 space-y-5 text-base sm:text-lg text-slate-600 leading-relaxed text-left">
                {whoWeAre.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            3. SECTION: WHAT WE DO (2x2 grid on desktop, 1 column on mobile)
            ========================================================================= */}
        <section
          aria-label="What we do"
          className="about-reveal-section bg-[#F6F7F9] py-16 lg:py-24 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80"
        >
          <div className="max-w-7xl mx-auto">
            <div className="mb-12 sm:mb-16 text-left">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
                {whatWeDo.title}
              </h2>
            </div>

            {/* 2x2 Grid: 2 coming in a row on mobile */}
            <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:gap-8 items-stretch">
              {whatWeDo.cards.map((card) => {
                const IconComponent = SERVICE_ICONS[card.id] || Bot;
                return (
                  <div
                    key={card.id}
                    className="about-stagger-card bg-[#EEF0F3] border border-[#E2E5EA] rounded-[18px] sm:rounded-[28px] p-3.5 sm:p-7 lg:p-9 shadow-2xs flex flex-col justify-between h-full transition-all duration-300 [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-1.5 [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-md"
                  >
                    <div>
                      {/* Lucide Icon with Blue Accent */}
                      <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white border border-[#E2E5EA] flex items-center justify-center mb-3 sm:mb-6 shadow-2xs">
                        <IconComponent className="w-4 h-4 sm:w-6 sm:h-6 text-[#2F6BFF]" strokeWidth={1.75} />
                      </div>

                      {/* Bold Title */}
                      <h3 className="text-xs sm:text-xl lg:text-2xl font-bold text-[#0F172A] tracking-tight mb-1.5 sm:mb-3 text-left leading-snug">
                        {card.title}
                      </h3>

                      {/* Text Description */}
                      <p className="text-[11px] sm:text-sm lg:text-base text-slate-600 leading-relaxed text-left">
                        {card.description}
                      </p>
                    </div>

                    {/* Optional quiet "Learn more" link on Card 4 */}
                    {card.learnMoreLink && (
                      <div className="pt-3 sm:pt-6 mt-3 sm:mt-6 border-t border-slate-200/80 text-left">
                        <a
                          href={card.learnMoreLink}
                          className="inline-flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm font-semibold text-[#2F6BFF] hover:text-[#1D55E6] transition-colors link focus-visible:ring-2 focus-visible:ring-[#2F6BFF] rounded-md"
                        >
                          <span>{card.learnMoreLabel || 'Learn more'}</span>
                          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#2F6BFF]" />
                        </a>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================================
            4. SECTION: HOW WE WORK (Three columns in a row)
            ========================================================================= */}
        <section
          aria-label="How we work"
          className="about-reveal-section bg-white py-16 lg:py-24 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80"
        >
          <div className="max-w-7xl mx-auto">
            <div className="mb-8 sm:mb-16 text-left">
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
                {howWeWork.title}
              </h2>
            </div>

            {/* Three Columns on desktop, single column vertical stack on mobile */}
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200/80 items-stretch">
              {howWeWork.items.map((item, idx) => (
                <div
                  key={idx}
                  className="about-stagger-item py-6 md:py-0 space-y-3 text-left md:px-6 lg:px-8 first:md:pl-0 last:md:pr-0"
                >
                  <span className="text-xs font-semibold text-[#2F6BFF] bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100/80 inline-block font-sans">
                    {item.number}
                  </span>
                  <h3 className="text-[18px] sm:text-[20px] md:text-2xl font-bold text-[#0F172A] tracking-tight leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-[15px] sm:text-base text-slate-600 leading-[1.6]">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. SECTION: BEYOND AUTOMATION (Visually separate wide soft-tinted panel)
            ========================================================================= */}
        <section
          aria-label="Beyond automation"
          className="about-reveal-section bg-[#F6F7F9] py-12 sm:py-16 px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-7xl mx-auto">
            <div className="bg-[#E8EDF5] border border-[#D5DEE8] rounded-[24px] sm:rounded-[28px] p-5 sm:p-10 lg:p-12 shadow-2xs flex flex-row items-start sm:items-center justify-between gap-4 sm:gap-8">
              <div className="space-y-2 max-w-3xl text-left flex-1 min-w-0">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-8 h-8 rounded-xl bg-white border border-[#D5DEE8] flex sm:hidden items-center justify-center flex-shrink-0 text-slate-700 shadow-2xs"
                    aria-hidden="true"
                  >
                    <Car className="w-4 h-4 text-slate-700" strokeWidth={1.5} />
                  </div>
                  <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-[#0F172A] tracking-tight">
                    {beyondAutomation.title}
                  </h2>
                </div>
                <p className="text-xs sm:text-sm md:text-base text-slate-700 leading-relaxed">
                  {beyondAutomation.text}
                </p>
              </div>

              {/* Small simple car icon on tablet/desktop */}
              <div
                className="hidden sm:flex w-14 h-14 rounded-2xl bg-white border border-[#D5DEE8] items-center justify-center flex-shrink-0 text-slate-700 shadow-2xs"
                aria-hidden="true"
              >
                <Car className="w-7 h-7 text-slate-700" strokeWidth={1.5} />
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            6. CLOSING CTA (Only CTA on the page, dark background band matching site)
            ========================================================================= */}
        <section
          aria-label="Call to Action"
          className="bg-[#0D131C] border-t border-slate-800/80 py-16 sm:py-24 px-4 sm:px-6 lg:px-8 text-center"
        >
          <div className="max-w-4xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight text-balance">
              {closingCta.heading}
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed text-balance max-w-2xl mx-auto">
              {closingCta.text}
            </p>

            <div className="pt-4">
              <a
                href={closingCta.buttonUrl || BOOKING_CTA_URL}
                className="inline-flex items-center justify-center gap-3 bg-[#2F6BFF] hover:bg-[#1D55E6] text-white font-semibold text-sm sm:text-base px-8 py-4 rounded-full shadow-lg shadow-black/40 transition-all duration-200 link min-h-[48px] group cursor-pointer focus-visible:ring-2 focus-visible:ring-[#2F6BFF]"
              >
                <span>{closingCta.buttonLabel || BOOKING_CTA_LABEL}</span>
                <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowUpRight className="w-4 h-4 text-white" />
                </span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
};

export default AboutPage;
