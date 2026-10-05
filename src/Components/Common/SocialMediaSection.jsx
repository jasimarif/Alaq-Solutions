import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import SocialMediaCard from './SocialMediaCard';
import { scrollToTarget } from '../../utils/lenis';

const FACEBOOK_CARD_DATA = {
  channelNumber: '01',
  platform: 'facebook',
  label: 'FACEBOOK MARKETING',
  title: 'Local Reach & Lead Generation',
  description:
    'Get your company in front of contractors, dealers and procurement teams across Ontario and Michigan with targeted Facebook campaigns built to generate real quote requests.',
  chips: ['Lead Ads', 'Retargeting', 'Local Targeting'],
  backTitle: 'How we run Facebook for you',
  items: [
    'Audience setup: target contractors, builders, dealers and buyers by region, industry and job role',
    'Campaign creation: lead-gen ads and quote-request forms tied to your products and services',
    'Content: product showcases, project completions and shop floor photos, written in plain language',
    'Retargeting: re-reach website visitors and people who engaged but did not enquire',
    'Weekly optimisation: we adjust budgets, creatives and audiences based on cost per lead',
    'Monthly report: leads, cost per lead and what\'s working, in plain numbers',
  ],
  footerText: 'Best for: lead generation, local awareness, dealer outreach',
  ctaText: 'Ask about Facebook',
};

const INSTAGRAM_CARD_DATA = {
  channelNumber: '02',
  platform: 'instagram',
  label: 'INSTAGRAM MARKETING',
  title: 'Show the Work. Build the Brand.',
  description:
    'Turn your fabrication floor, finished builds and team into scroll-stopping content that builds trust with buyers and attracts skilled workers.',
  chips: ['Reels', 'Project Showcases', 'Brand Presence'],
  backTitle: 'How we run Instagram for you',
  items: [
    'Content planning: a monthly calendar built around your projects, products and team',
    'Reels and short video: steel going up, welds, machinery, before-and-after builds',
    'Project showcases: carousels that present finished jobs with specs and results',
    'Stories and highlights: day-to-day shop floor activity and customer wins',
    'Hiring and culture posts: attract welders, fabricators and operators',
    'Growth and reporting: reach, profile visits, enquiries and follower growth, reviewed monthly',
  ],
  footerText: 'Best for: brand credibility, recruiting, project showcasing',
  ctaText: 'Ask about Instagram',
};

const SocialMediaSection = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Entrance animation triggered via IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleConsultationClick = (e) => {
    e.preventDefault();
    scrollToTarget('#contact', -80);
  };

  return (
    <section
      id="social-media"
      ref={sectionRef}
      aria-label="Social Media Marketing"
      className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#F6F7F9] border-t border-slate-200/80 font-sans scroll-mt-24 sm:scroll-mt-28 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Centered Section Header */}
        <div
          className={`text-center max-w-3xl mx-auto mb-12 sm:mb-16 transition-all duration-700 ease-out motion-reduce:transition-none ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-6 motion-reduce:opacity-100 motion-reduce:translate-y-0'
          }`}
        >
          {/* Eyebrow Chip */}
          <div className="mb-3.5">
            <span className="inline-flex items-center text-xs font-bold text-[#2F6BFF] uppercase tracking-wider bg-blue-50/90 px-3.5 py-1.5 rounded-full border border-blue-200/70 shadow-2xs font-sans">
              SOCIAL MEDIA MARKETING
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1F3A] tracking-tight leading-[1.15] text-balance">
            Put your shop in front of the buyers who matter
          </h2>

          {/* Subtext */}
          <p className="mt-4 text-base sm:text-lg text-[#526071] leading-relaxed text-balance">
            Practical social media marketing for construction, steel building and manufacturing companies. Real shop floor content, targeted ads and measurable leads. No vanity metrics, no fluff.
          </p>
        </div>

        {/* Two 3D Flip Cards Grid (Max width ~1020px, 2 columns on desktop, stacked on mobile) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 max-w-[1020px] mx-auto items-stretch">
          {/* Card 1: Facebook Marketing */}
          <div
            className={`transition-all duration-700 delay-100 ease-out motion-reduce:transition-none ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-6 motion-reduce:opacity-100 motion-reduce:translate-y-0'
            }`}
          >
            <SocialMediaCard {...FACEBOOK_CARD_DATA} />
          </div>

          {/* Card 2: Instagram Marketing */}
          <div
            className={`transition-all duration-700 delay-200 ease-out motion-reduce:transition-none ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-6 motion-reduce:opacity-100 motion-reduce:translate-y-0'
            }`}
          >
            <SocialMediaCard {...INSTAGRAM_CARD_DATA} />
          </div>
        </div>

        {/* Below the Cards: Supporting Text & Primary Consultation CTA */}
        <div
          className={`mt-12 sm:mt-16 text-center space-y-5 max-w-2xl mx-auto transition-all duration-700 delay-300 ease-out motion-reduce:transition-none ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-6 motion-reduce:opacity-100 motion-reduce:translate-y-0'
          }`}
        >
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium text-balance">
            Running both? We coordinate Facebook and Instagram so your message, budget and reporting stay in one place.
          </p>

          <div className="pt-2">
            <a
              href="#contact"
              onClick={handleConsultationClick}
              className="inline-flex items-center justify-center gap-3 bg-[#2F6BFF] hover:bg-[#1D55E6] text-white font-semibold text-sm sm:text-base px-8 py-3.5 sm:py-4 rounded-full shadow-lg shadow-black/10 transition-all duration-200 link min-h-[48px] group"
            >
              <span>Book a free social media consultation</span>
              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 transition-transform group-hover:translate-x-0.5">
                <ArrowUpRight className="w-4 h-4 text-white" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialMediaSection;
