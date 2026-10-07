import React from 'react';
import {
  Building2,
  Factory,
  Truck,
  ArrowRight,
} from 'lucide-react';
import { formatDevText } from '../../utils/devText';

const SECTOR_ICONS = {
  'construction-steel-buildings': Building2,
  'manufacturing-fabrication': Factory,
  distribution: Truck,
};

const IndustryCard = ({
  id,
  title,
  tagline,
  problem,
  onOpenModal,
  className = '',
}) => {
  const Icon = SECTOR_ICONS[id] || Factory;

  // Derive a clean, single-sentence problem statement from existing copy
  const cleanProblem = formatDevText(problem);
  const shortProblem = cleanProblem
    ? cleanProblem.split('. ')[0].replace(/\.$/, '') + '.'
    : '';

  const displayTagline = formatDevText(tagline);

  return (
    <button
      type="button"
      onClick={() => onOpenModal && onOpenModal(id)}
      aria-haspopup="dialog"
      aria-label={`View detailed workflows for ${title}`}
      className={`group w-full text-left bg-white border border-slate-200/90 rounded-[28px] p-6 sm:p-8 flex flex-col justify-between font-sans transition-all duration-300 ease-out shadow-[0_2px_12px_rgba(11,31,58,0.04)] hover:shadow-[0_20px_45px_rgba(11,31,58,0.1)] hover:-translate-y-1.5 hover:border-[#2F6BFF]/40 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-focus-ring cursor-pointer motion-reduce:hover:translate-y-0 motion-reduce:transition-none h-full min-h-[300px] relative overflow-hidden ${className}`}
    >
      {/* Top subtle hover accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent group-hover:from-[#2F6BFF] group-hover:via-[#8DB4FF] group-hover:to-[#2F6BFF] transition-all duration-500 opacity-60 group-hover:opacity-100" />

      <div className="space-y-4 w-full">
        {/* Top bar: deep navy sector icon & verified overview badge */}
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 rounded-2xl bg-[#0B1F3A] text-white flex items-center justify-center shadow-xs transition-transform duration-300 ease-out group-hover:scale-105 motion-reduce:group-hover:scale-100 flex-shrink-0">
            <Icon className="w-6 h-6 text-white" />
          </div>
          <span className="flex items-center gap-1.5 text-[11px] font-sans font-semibold text-slate-600 bg-slate-100/90 px-3 py-1 rounded-full border border-slate-200/80 shadow-2xs group-hover:bg-blue-50/60 group-hover:text-blue-900 group-hover:border-blue-200/60 transition-colors">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
            <span>Overview</span>
          </span>
        </div>

        {/* Title & Tagline */}
        <div>
          {displayTagline && (
            <span className="text-xs font-bold text-accent uppercase tracking-wider block mb-1.5 font-sans">
              {displayTagline}
            </span>
          )}
          <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B1F3A] tracking-tight leading-snug group-hover:text-accent transition-colors duration-200">
            {title}
          </h3>
        </div>

        {/* Short, single-sentence summary of the problem */}
        {shortProblem && (
          <p className="text-sm text-slate-600 leading-relaxed">
            {shortProblem}
          </p>
        )}
      </div>

      {/* Modern interactive footer affordance */}
      <div className="pt-5 mt-4 border-t border-slate-100 w-full flex items-center justify-between">
        <span className="inline-flex items-center gap-2 text-xs font-bold text-[#0B1F3A] group-hover:text-accent transition-colors duration-200">
          <span>View details</span>
          <span className="w-7 h-7 rounded-full bg-slate-100 group-hover:bg-accent text-slate-600 group-hover:text-white flex items-center justify-center transition-all duration-300 group-hover:translate-x-1 shadow-2xs">
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

export default IndustryCard;
