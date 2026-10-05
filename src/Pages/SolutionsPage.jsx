import React from 'react';
import {
  PageWrapper,
  SectionHeading,
  PackageCard,
} from '../Components/Common';
import { SOLUTIONS_CONTENT } from '../data/solutions';
import { PAGE_SEO } from '../data/seo';
import { BOOKING_CTA_URL, BOOKING_CTA_LABEL } from '../data/config';
import { Check, ShieldCheck, Cpu, UserCheck, ArrowRight, FileText } from 'lucide-react';
import { scrollToTarget } from '../utils/lenis';

const SolutionsPage = () => {
  return (
    <PageWrapper seo={PAGE_SEO.solutions}>
      {/* Hero Header */}
      <section className="pt-12 sm:pt-20 pb-12 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto font-poppins">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider">
            <span>{SOLUTIONS_CONTENT.hero.badge}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            {SOLUTIONS_CONTENT.hero.title}
          </h1>
          <p className="text-base sm:text-lg text-gray-300 leading-relaxed pt-2">
            {SOLUTIONS_CONTENT.hero.subtitle}
          </p>
          <div className="pt-4">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToTarget('#contact', -80);
              }}
              className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium text-sm py-3 px-6 rounded-full transition shadow-lg shadow-blue-500/25 link cursor-pointer"
            >
              <span>{BOOKING_CTA_LABEL}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* 3 Fixed-Scope Packages */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto font-poppins border-t border-slate-800">
        <SectionHeading
          badge={SOLUTIONS_CONTENT.packagesSection.badge}
          title={SOLUTIONS_CONTENT.packagesSection.title}
          subtitle={SOLUTIONS_CONTENT.packagesSection.subtitle}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {SOLUTIONS_CONTENT.packagesSection.packages.map((pkg) => (
            <PackageCard
              key={pkg.id}
              name={pkg.name}
              scope={pkg.scope}
              timeline={pkg.timeline}
              featured={pkg.featured}
              idealFor={pkg.idealFor}
              aiRole={pkg.aiRole}
              codeRole={pkg.codeRole}
              included={pkg.included}
              ctaText={BOOKING_CTA_LABEL}
              ctaUrl={BOOKING_CTA_URL}
            />
          ))}
        </div>
      </section>

      {/* 6 Detailed Workflow Sections */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto font-poppins border-t border-slate-800 space-y-16">
        <SectionHeading
          badge={SOLUTIONS_CONTENT.workflowsSection.badge}
          title={SOLUTIONS_CONTENT.workflowsSection.title}
          subtitle={SOLUTIONS_CONTENT.workflowsSection.subtitle}
        />

        <div className="space-y-12">
          {SOLUTIONS_CONTENT.workflowsSection.workflows.map((wf, idx) => (
            <div
              key={wf.id}
              id={wf.id}
              className="bg-gradient-to-b from-[#182334] to-[#101724] border border-slate-700/80 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl space-y-8 scroll-mt-24"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                <div>
                  <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider block mb-1">
                    Workflow {idx + 1} • {wf.tagline}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    {wf.title}
                  </h3>
                </div>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToTarget('#contact', -80);
                  }}
                  className="self-start md:self-auto inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 link cursor-pointer"
                >
                  <span>Automate this workflow</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Problem & What we built */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-xs font-semibold text-rose-400 block">The Bottleneck</span>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">{wf.problem}</p>
                </div>
                <div className="bg-blue-950/20 p-5 rounded-2xl border border-blue-500/25 space-y-2">
                  <span className="text-xs font-semibold text-blue-400 block">What We Built</span>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">{wf.whatWeBuilt}</p>
                </div>
              </div>

              {/* What You Send vs What You Get */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
                <div className="space-y-3">
                  <span className="text-xs font-bold text-gray-300 uppercase tracking-wider block">
                    What You Send
                  </span>
                  <ul className="space-y-2">
                    {wf.whatYouSend.map((item, i) => (
                      <li key={i} className="text-xs text-gray-300 flex items-start gap-2">
                        <FileText className="w-3.5 h-3.5 text-blue-400 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-3">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                    What You Get in NetSuite
                  </span>
                  <ul className="space-y-2">
                    {wf.whatYouGet.map((item, i) => (
                      <li key={i} className="text-xs text-gray-200 flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* AI vs Code vs Human Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs pt-2">
                <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-500/20 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-blue-300 font-semibold">
                    <Cpu className="w-3.5 h-3.5 text-blue-400" />
                    <span>AI Interpretation</span>
                  </div>
                  <p className="text-gray-300">{wf.aiRole}</p>
                </div>
                <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/20 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-emerald-300 font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Deterministic Code</span>
                  </div>
                  <p className="text-gray-300">{wf.codeRole}</p>
                </div>
                <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/20 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-purple-300 font-semibold">
                    <UserCheck className="w-3.5 h-3.5 text-purple-400" />
                    <span>Human Approval</span>
                  </div>
                  <p className="text-gray-300">{wf.humanRole}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageWrapper>
  );
};

export default SolutionsPage;
