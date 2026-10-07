import React, { useState } from 'react';
import {
  PageWrapper,
  Hero,
  SectionHeading,
  SolutionCard,
  WedgeStrip,
  SocialMediaSection,
  BeyondAutomation,
} from '../../Components/Common';
import { HOME_CONTENT } from '../../data/home';
import { PAGE_SEO } from '../../data/seo';

const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "ALAQ Solutions",
  "url": "https://www.alaqsolution.com",
  "logo": "https://www.alaqsolution.com/logo.png",
  "description": "Pragmatic shop-floor to ERP paperwork automation for manufacturing, construction, and steel building operations.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Windsor",
    "addressRegion": "ON",
    "addressCountry": "CA"
  },
  "areaServed": ["Ontario", "Michigan"],
  "knowsAbout": ["NetSuite ERP", "SuiteScript", "Manufacturing Automation", "Order Intake Automation"]
};

const SOLUTION_METRIC_KEYS = [
  'automations_order_intake_speed',
  'automations_quote_packets_speed',
  'automations_finance_acceleration',
];

const HomePage = () => {
  // Flip card state for Solutions: only one card flipped at a time
  const [flippedSolutionIndex, setFlippedSolutionIndex] = useState(null);

  const homeSeo = {
    ...PAGE_SEO.home,
    jsonLd: ORGANIZATION_JSON_LD,
  };

  // Flip card toggle handler
  const handleToggleSolutionFlip = (idx) => {
    setFlippedSolutionIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <PageWrapper
      seo={homeSeo}
      ctaTitle={HOME_CONTENT.ctaBanner.title}
      ctaSubtitle={HOME_CONTENT.ctaBanner.subtitle}
    >
      {/* 1. Hero Section (100vh, dark full-bleed crossfade) */}
      <Hero
        headlineLine1={HOME_CONTENT.hero.headlineLine1}
        headlineLine2={HOME_CONTENT.hero.headlineLine2}
        subheadline={HOME_CONTENT.hero.subheadline}
        primaryCta={HOME_CONTENT.hero.primaryCta}
        secondaryCta={HOME_CONTENT.hero.secondaryCta}
        trustPoints={HOME_CONTENT.hero.trustPoints}
      />

      {/* 2. Core Automations Section: 3D Flip Cards (Front overview, Back specs) */}
      <section id="solutions" className="pt-20 sm:pt-24 pb-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-200/80 font-sans scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            badge={HOME_CONTENT.automationsSection.badge}
            title={HOME_CONTENT.automationsSection.title}
            subtitle={HOME_CONTENT.automationsSection.subtitle}
            theme="light"
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-8 items-stretch">
            {HOME_CONTENT.automationsSection.automations.map((automation, idx) => (
              <SolutionCard
                key={idx}
                index={idx}
                title={automation.title}
                tagline={automation.tagline}
                description={automation.description}
                inputLabel={automation.inputLabel}
                outputLabel={automation.outputLabel}
                features={automation.features}
                metrics={automation.metrics}
                metricKey={SOLUTION_METRIC_KEYS[idx]}
                isFlipped={flippedSolutionIndex === idx}
                onToggleFlip={() => handleToggleSolutionFlip(idx)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 3. The Wedge Strip / Process Steps */}
      <div id="how-it-works">
        <WedgeStrip
          badge={HOME_CONTENT.wedgeStrip.badge}
          title={HOME_CONTENT.wedgeStrip.title}
          subtitle={HOME_CONTENT.wedgeStrip.subtitle}
          steps={HOME_CONTENT.wedgeStrip.steps}
          link="#contact"
        />
      </div>

      {/* 4. Social Media Marketing: 3D Flip Cards & Consultation CTA */}
      <SocialMediaSection />

      {/* 5. Beyond Automation: Automotive trading & car trading */}
      <BeyondAutomation />
    </PageWrapper>
  );
};

export default HomePage;