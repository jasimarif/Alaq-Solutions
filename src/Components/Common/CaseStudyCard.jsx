import React from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { resolveMetric } from '../../data/metrics';
import { formatDevText } from '../../utils/devText';

const CaseStudyCard = ({
  id,
  title,
  client,
  industry,
  problem,
  problemSummary,
  resultMetric,
  onOpenModal,
  className = '',
}) => {
  // Resolve metric safely with plain-language fallback without [X]
  const cleanResult = resolveMetric(null, formatDevText(resultMetric));

  // Derive a concise, single-sentence summary of the problem from existing text
  const fullProblem = formatDevText(problem || problemSummary);
  const shortProblem = fullProblem
    ? fullProblem.split('. ')[0].replace(/\.$/, '') + '.'
    : '';

  const displayIndustry = formatDevText(industry);
  const displayClient = formatDevText(client);

  return (
    <button
      type="button"
      onClick={() => onOpenModal && onOpenModal(id)}
      aria-haspopup="dialog"
      aria-label={`View full case study details for ${title}`}
      className={`group w-full text-left bg-white border border-slate-200/90 rounded-[28px] p-6 sm:p-8 flex flex-col justify-between font-sans transition-all duration-300 ease-out shadow-[0_2px_12px_rgba(11,31,58,0.04)] hover:shadow-[0_20px_45px_rgba(11,31,58,0.1)] hover:-translate-y-1.5 hover:border-[#2F6BFF]/40 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-[#2F6BFF] cursor-pointer motion-reduce:hover:translate-y-0 motion-reduce:transition-none h-full min-h-[320px] relative overflow-hidden ${className}`}
    >
      {/* Top subtle hover accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent group-hover:from-[#2F6BFF] group-hover:via-[#8DB4FF] group-hover:to-[#2F6BFF] transition-all duration-500 opacity-60 group-hover:opacity-100" />

      <div className="space-y-4 w-full">
        {/* Industry and Client Profile header */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
          {displayIndustry && (
            <span className="text-[11px] font-bold text-[#2F6BFF] bg-blue-50/70 px-3 py-1 rounded-full border border-blue-200/60 uppercase tracking-wider font-sans">
              {displayIndustry}
            </span>
          )}
          {displayClient ? (
            <span className="text-[11px] font-sans font-semibold text-slate-600 bg-slate-100/90 px-2.5 py-1 rounded-full border border-slate-200/80 truncate max-w-[280px]">
              {displayClient}
            </span>
          ) : (
            <span className="text-[11px] font-sans font-semibold text-slate-600 bg-slate-100/90 px-2.5 py-1 rounded-full border border-slate-200/80">
              Case Study
            </span>
          )}
        </div>

        {/* Prominent Result Metric Card: Eye-catching Hero Callout */}
        {cleanResult && (
          <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50/40 border border-slate-200/90 space-y-1 shadow-2xs">
            <span className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-widest text-[#2F6BFF]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified Impact</span>
            </span>
            <div className="text-lg sm:text-xl font-black text-[#0B1F3A] tracking-tight leading-snug">
              {cleanResult}
            </div>
          </div>
        )}

        {/* Card Title */}
        <h3 className="text-base sm:text-lg font-extrabold text-[#0B1F3A] tracking-tight leading-snug group-hover:text-[#2F6BFF] transition-colors duration-200">
          {title}
        </h3>

        {/* Short, single-sentence summary of the problem */}
        {shortProblem && (
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {shortProblem}
          </p>
        )}
      </div>

      {/* Modern interactive footer affordance */}
      <div className="pt-5 mt-4 border-t border-slate-100 w-full flex items-center justify-between">
        <span className="inline-flex items-center gap-2 text-xs font-bold text-[#0B1F3A] group-hover:text-[#2F6BFF] transition-colors duration-200">
          <span>View details</span>
          <span className="w-7 h-7 rounded-full bg-slate-100 group-hover:bg-[#2F6BFF] text-slate-600 group-hover:text-white flex items-center justify-center transition-all duration-300 group-hover:translate-x-1 shadow-2xs">
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </span>
        <span className="text-[11px] text-slate-400 font-medium hidden sm:inline opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          Click to inspect
        </span>
      </div>
    </button>
  );
};

export default CaseStudyCard;
