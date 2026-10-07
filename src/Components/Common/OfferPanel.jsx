import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { BOOKING_CTA_URL, BOOKING_CTA_LABEL } from '../../data/config';

const OfferPanel = ({
  title = "Send us one messy order. We'll show you the automated version.",
  subtitle = "Send us a typical dealer purchase order, cut list, or messy PDF. We will run it through our parser and demonstrate how clean deterministic records post directly to your ERP without manual re-keying.",
  ctaLabel = "Send us one messy order",
  ctaUrl = "/contact",
  className = '',
}) => {
  return (
    <section className={`py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans ${className}`}>
      <div className="bg-panel-tint border border-border-light rounded-[32px] p-8 sm:p-14 text-center space-y-6 relative overflow-hidden shadow-2xs">
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1F3A] tracking-tight leading-tight max-w-3xl mx-auto text-balance">
          {title}
        </h2>

        <p className="text-base sm:text-lg text-text-muted-dark max-w-2xl mx-auto leading-relaxed text-balance">
          {subtitle}
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to={ctaUrl || "/#contact"}
            className="inline-flex items-center justify-center gap-2 bg-[#0B1F3A] hover:bg-[#071529] text-white font-semibold text-sm sm:text-base px-8 py-4 rounded-full transition-all duration-200 shadow-md link min-h-[48px] group"
          >
            <span>{ctaLabel}</span>
            <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OfferPanel;
