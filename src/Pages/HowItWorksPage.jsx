import React from 'react';
import {
  PageWrapper,
  SectionHeading,
  MediaPlaceholder,
} from '../Components/Common';
import { HOW_IT_WORKS_CONTENT } from '../data/howItWorks';
import { PAGE_SEO } from '../data/seo';
import { BOOKING_CTA_LABEL } from '../data/config';
import { ShieldCheck, Cpu, Code2, UserCheck, AlertTriangle, ArrowRight, Check } from 'lucide-react';
import { scrollToTarget } from '../utils/lenis';

const HowItWorksPage = () => {
  const { whatAiDoes, whatCodeDoes, whereHumansApprove, badInputHandling } = HOW_IT_WORKS_CONTENT.sections;

  return (
    <PageWrapper seo={PAGE_SEO.howItWorks}>
      {/* Hero Header */}
      <section className="pt-12 sm:pt-20 pb-12 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto font-poppins">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-accent/10 border border-accent/30 text-accent-soft text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{HOW_IT_WORKS_CONTENT.hero.badge}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            {HOW_IT_WORKS_CONTENT.hero.title}
          </h1>
          <p className="text-base sm:text-lg text-gray-300 leading-relaxed pt-2">
            {HOW_IT_WORKS_CONTENT.hero.subtitle}
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

      {/* 3 Core Architecture Principles */}
      <section className="py-10 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto font-poppins border-t border-border-dark">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {HOW_IT_WORKS_CONTENT.principles.map((pr, idx) => (
            <div
              key={idx}
              className="bg-slate-900/80 p-6 rounded-2xl border border-border-dark space-y-2.5"
            >
              <div className="w-8 h-8 rounded-full bg-accent/15 text-accent-soft flex items-center justify-center font-sans font-bold text-xs">
                0{idx + 1}
              </div>
              <h3 className="text-base font-bold text-white">{pr.title}</h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">{pr.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Architecture Visual Diagram Placeholder */}
      <section className="py-10 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto font-poppins">
        <MediaPlaceholder
          type="architecture"
          label="The Safe Wedge Architecture Diagram"
          description="Visual schematic showing MCP document ingestion, AI token parsing, deterministic SuiteScript validation, and final NetSuite transaction commit."
          height="h-64 sm:h-80"
        />
      </section>

      {/* 4 Deep-Dive Sections */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto font-poppins space-y-16">
        {/* 1. What AI Does */}
        <div className="bg-gradient-to-b from-surface-dark to-bg-darker border border-accent/30 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-border-dark">
            <div className="w-10 h-10 rounded-xl bg-accent/20 text-accent-soft flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-semibold text-accent-soft uppercase tracking-wider block">
                {whatAiDoes.badge}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {whatAiDoes.title}
              </h2>
            </div>
          </div>
          <p className="text-sm text-gray-300">{whatAiDoes.subtitle}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {whatAiDoes.points.map((pt, i) => (
              <div key={i} className="p-4 rounded-xl bg-slate-900/60 border border-border-dark flex items-start gap-3 text-xs sm:text-sm text-gray-300">
                <Check className="w-4 h-4 text-accent-soft flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">{pt}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 2. What Code Does */}
        <div className="bg-gradient-to-b from-surface-dark to-bg-darker border border-emerald-500/30 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-border-dark">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block">
                {whatCodeDoes.badge}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {whatCodeDoes.title}
              </h2>
            </div>
          </div>
          <p className="text-sm text-gray-300">{whatCodeDoes.subtitle}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {whatCodeDoes.points.map((pt, i) => (
              <div key={i} className="p-4 rounded-xl bg-slate-900/60 border border-border-dark flex items-start gap-3 text-xs sm:text-sm text-gray-300">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">{pt}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Where Humans Approve */}
        <div className="bg-gradient-to-b from-surface-dark to-bg-darker border border-purple-500/30 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-border-dark">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider block">
                {whereHumansApprove.badge}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {whereHumansApprove.title}
              </h2>
            </div>
          </div>
          <p className="text-sm text-gray-300">{whereHumansApprove.subtitle}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {whereHumansApprove.points.map((pt, i) => (
              <div key={i} className="p-4 rounded-xl bg-slate-900/60 border border-border-dark flex items-start gap-3 text-xs sm:text-sm text-gray-300">
                <Check className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">{pt}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 4. What Happens When Input Is Bad */}
        <div className="bg-gradient-to-b from-surface-dark to-bg-darker border border-rose-500/30 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-border-dark">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-semibold text-rose-400 uppercase tracking-wider block">
                {badInputHandling.badge}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {badInputHandling.title}
              </h2>
            </div>
          </div>
          <p className="text-sm text-gray-300">{badInputHandling.subtitle}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {badInputHandling.points.map((pt, i) => (
              <div key={i} className="p-4 rounded-xl bg-slate-900/60 border border-border-dark flex items-start gap-3 text-xs sm:text-sm text-gray-300">
                <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">{pt}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default HowItWorksPage;
