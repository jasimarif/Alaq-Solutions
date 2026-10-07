import React from 'react';
import {
  PageWrapper,
  SectionHeading,
} from '../Components/Common';
import { PRODUCTS_CONTENT } from '../data/products';
import { PAGE_SEO } from '../data/seo';
import { BOOKING_CTA_LABEL } from '../data/config';
import { Check, ArrowRight, ShieldCheck, Box, Users, CreditCard } from 'lucide-react';
import { scrollToTarget } from '../utils/lenis';

const PRODUCT_ICONS = [Box, Users, CreditCard];

const ProductsPage = () => {
  return (
    <PageWrapper seo={PAGE_SEO.products}>
      {/* Hero Header */}
      <section className="pt-12 sm:pt-20 pb-12 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto font-poppins">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-accent/10 border border-accent/30 text-accent-soft text-xs font-semibold uppercase tracking-wider">
            <span>{PRODUCTS_CONTENT.hero.badge}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            {PRODUCTS_CONTENT.hero.title}
          </h1>
          <p className="text-base sm:text-lg text-gray-300 leading-relaxed pt-2">
            {PRODUCTS_CONTENT.hero.subtitle}
          </p>
          <div className="pt-4">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToTarget('#contact', -80);
              }}
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white font-medium text-sm py-3 px-6 rounded-full transition shadow-lg shadow-accent/25 link cursor-pointer"
            >
              <span>{BOOKING_CTA_LABEL}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Products List */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto font-poppins border-t border-border-dark space-y-16">
        {PRODUCTS_CONTENT.products.map((prod, idx) => {
          const Icon = PRODUCT_ICONS[idx % PRODUCT_ICONS.length];
          return (
            <div
              key={prod.id}
              id={prod.id}
              className="bg-gradient-to-b from-surface-dark to-bg-darker border border-border-dark/80 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl space-y-8 scroll-mt-24"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border-dark">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-accent/20 text-accent-soft flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-accent-soft uppercase tracking-wider block">
                      {prod.category}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                      {prod.title}
                    </h2>
                  </div>
                </div>
                <div className="self-start md:self-auto">
                  <span className="text-xs font-sans font-medium text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                    {prod.status}
                  </span>
                </div>
              </div>

              {/* Tagline */}
              <p className="text-sm sm:text-base text-gray-200 font-medium">
                {prod.tagline}
              </p>

              {/* Problem & Solution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-900/80 p-5 rounded-2xl border border-border-dark space-y-2">
                  <span className="text-xs font-semibold text-rose-400 uppercase tracking-wider block">
                    The Problem
                  </span>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                    {prod.problem}
                  </p>
                </div>

                <div className="bg-accent/20 p-5 rounded-2xl border border-accent/25 space-y-2">
                  <span className="text-xs font-semibold text-accent-soft uppercase tracking-wider block">
                    The Product Solution
                  </span>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                    {prod.solution}
                  </p>
                </div>
              </div>

              {/* Features Checklist */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-white uppercase tracking-wider block">
                  Key Capabilities
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {prod.features.map((feat, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-slate-900/60 border border-border-dark flex items-start gap-2.5 text-xs text-gray-300">
                      <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* NetSuite Integration Detail */}
              <div className="p-4 rounded-xl bg-slate-900/90 border border-border-dark flex items-start gap-3 text-xs text-gray-400">
                <ShieldCheck className="w-4 h-4 text-accent-soft flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-gray-300">NetSuite Architecture: </span>
                  <span>{prod.netsuiteIntegration}</span>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </PageWrapper>
  );
};

export default ProductsPage;
