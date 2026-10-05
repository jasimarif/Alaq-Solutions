import React from 'react';
import { ArrowRight, ShieldCheck, Cpu, UserCheck, Lock } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { scrollToTarget } from '../../utils/lenis';

const STEP_ICONS = [Cpu, Lock, UserCheck, ShieldCheck];

const WedgeStrip = ({
  badge = "The Safe Wedge",
  title = "Why operations leaders trust our architecture",
  subtitle = "We separate intelligent interpretation from ledger execution. AI does the reading; deterministic code does the writing.",
  steps = [],
  link = "#contact",
  className = '',
}) => {
  const handleLinkClick = (e) => {
    if (link && link.startsWith('#')) {
      e.preventDefault();
      scrollToTarget(link, -80);
    }
  };

  return (
    <section className={`py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white font-sans border-y border-slate-200/80 ${className}`}>
      <div className="max-w-7xl mx-auto space-y-12">
        <SectionHeading
          badge={badge}
          title={title}
          subtitle={subtitle}
          align="center"
          theme="light"
        />

        {/* 4 Step Grid: 2 per row on mobile, 4 on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 items-stretch">
          {steps.map((step, idx) => {
            const Icon = STEP_ICONS[idx % STEP_ICONS.length];
            return (
              <div
                key={idx}
                className="bg-[#EEF0F3] border border-[#E2E5EA] rounded-[18px] sm:rounded-[24px] p-3.5 sm:p-6 flex flex-col justify-between space-y-2.5 sm:space-y-4 shadow-2xs hover:shadow-sm transition-all duration-200 font-sans h-full"
              >
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-[10px] sm:text-xs font-semibold text-slate-600 bg-white px-2 sm:px-2.5 py-0.5 rounded-full border border-slate-200/80">
                      Step {step.step}
                    </span>
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white border border-slate-200/80 text-slate-700 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#2F6BFF]" />
                    </div>
                  </div>

                  <h3 className="text-xs sm:text-base lg:text-lg font-bold text-[#0F172A] leading-snug sm:leading-tight">
                    {step.title}
                  </h3>

                  <p className="text-[11px] sm:text-xs text-[#526071] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {link && (
          <div className="text-center pt-2">
            <a
              href={link}
              onClick={handleLinkClick}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#0F172A] hover:text-[#2F6BFF] link group"
            >
              <span>Read the technical architecture breakdown or speak with our engineers</span>
              <ArrowRight className="w-4 h-4 text-[#2F6BFF] group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default WedgeStrip;
