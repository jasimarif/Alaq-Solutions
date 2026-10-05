import React from 'react';
import Navbar from '../Layout/Navbar';
import Footer from '../Layout/Footer';
import CTABanner from './CTABanner';
import SEO from './SEO';

const PageWrapper = ({
  children,
  seo = {},
  ctaTitle,
  ctaSubtitle,
  showCta = true,
  className = '',
}) => {
  return (
    <div className="bg-[#F6F7F9] min-h-screen flex flex-col font-sans text-[#0F172A] selection:bg-[#2F6BFF] selection:text-white">
      {/* React 19 Document Metadata */}
      <SEO
        title={seo.title}
        description={seo.description}
        canonical={seo.canonical}
        ogType={seo.ogType}
        jsonLd={seo.jsonLd}
      />

      {/* Global Navigation Header */}
      <Navbar />

      {/* Main Content Area */}
      <main id="main-content" className={`flex-grow ${className}`}>
        {children}
      </main>

      {/* Unified Global Ending CTA Banner */}
      {showCta && <CTABanner title={ctaTitle} subtitle={ctaSubtitle} />}

      {/* Global Navigation Footer */}
      <Footer />
    </div>
  );
};

export default PageWrapper;
