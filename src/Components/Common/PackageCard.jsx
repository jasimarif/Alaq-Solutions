

import React from 'react';
import { Check, ShieldCheck, Cpu, ArrowUpRight } from 'lucide-react';
import { BOOKING_CTA_URL, BOOKING_CTA_LABEL } from '../../data/config';
import { scrollToTarget } from '../../utils/lenis';

const PackageCard = ({
  name,
  scope = 'Fixed-Scope Automation Package',
  timeline = '[X weeks] to live deployment',
  idealFor,
  included = [],
  aiRole,
  codeRole,
  featured = false,
  ctaText = BOOKING_CTA_LABEL,
  ctaUrl = BOOKING_CTA_URL,
  className = '',
}) => {
  return (
    <div
      className={`rounded-[28px] p-6 sm:p-8 flex flex-col justify-between font-sans transition-all duration-300 relative overflow-hidden ${featured
          ? 'bg-white border-2 border-[#2F6BFF] shadow-lg shadow-blue-500/5'
          : 'bg-[#EEF0F3] border border-[#E2E5EA] shadow-2xs hover:shadow-md'
        } ${className}`}
    >
      {featured && (
        <div className="absolute top-0 right-0 bg-[#2F6BFF] text-white text-[11px] font-bold px-4 py-1 rounded-bl-2xl uppercase tracking-wider">
          Featured Package
        </div>
      )}

      <div className="space-y-5">
        <div>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            {scope}
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight">
            {name}
          </h3>
          <p className="text-xs font-sans font-medium text-slate-600 mt-1.5 inline-block bg-white px-2.5 py-0.5 rounded-full border border-slate-200/80">
            Delivery: {timeline}
          </p>
        </div>

        {idealFor && (
          <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 text-xs text-[#526071]">
            <span className="font-semibold text-[#0F172A] block mb-0.5">Ideal for:</span>
            {idealFor}
          </div>
        )}

        {/* AI vs Code Split */}
        {(aiRole || codeRole) && (
          <div className="space-y-2.5 pt-1">
            {aiRole && (
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 text-xs">
                <div className="flex items-center gap-1.5 text-[#0F172A] font-semibold mb-1">
                  <Cpu className="w-3.5 h-3.5 text-[#2F6BFF]" />
                  <span>What AI handles:</span>
                </div>
                <p className="text-[#526071] leading-relaxed">{aiRole}</p>
              </div>
            )}
            {codeRole && (
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 text-xs">
                <div className="flex items-center gap-1.5 text-[#0F172A] font-semibold mb-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>What deterministic code writes:</span>
                </div>
                <p className="text-[#526071] leading-relaxed">{codeRole}</p>
              </div>
            )}
          </div>
        )}

        {/* Deliverables Checklist */}
        {included && included.length > 0 && (
          <div className="space-y-2 pt-2 border-t border-slate-200/80">
            <span className="text-xs font-semibold text-[#0F172A] uppercase tracking-wider block mb-2">
              Deliverables:
            </span>
            <ul className="space-y-2">
              {included.map((item, idx) => (
                <li key={idx} className="text-xs text-[#526071] flex items-start gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-white border border-slate-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5 text-slate-800" />
                  </div>
                  <span className="leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Button */}
      <div className="mt-8 pt-5 border-t border-slate-200/80">
        <a
          href={ctaUrl || '#contact'}
          onClick={(e) => {
            const el = document.querySelector('#contact');
            if (el) {
              e.preventDefault();
              scrollToTarget('#contact', -80);
            }
          }}
          className={`w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full font-semibold text-xs sm:text-sm transition-all duration-200 shadow-sm link min-h-[44px] cursor-pointer ${
            featured
              ? 'bg-[#2F6BFF] hover:bg-[#1D55E6] text-white shadow-blue-500/20'
              : 'bg-white hover:bg-slate-100 text-[#0F172A] border border-slate-300'
          }`}
        >
          <span>{ctaText}</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};

export default PackageCard;
