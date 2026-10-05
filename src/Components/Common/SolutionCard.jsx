import React from 'react';
import {
  RotateCcw,
  Check,
  FileText,
  CheckCircle2,
  ArrowRight,
  Layers,
} from 'lucide-react';
import { filterDevItems, formatDevText } from '../../utils/devText';
import { resolveMetric } from '../../data/metrics';
import { scrollToTarget } from '../../utils/lenis';

const SolutionCard = ({
  index,
  title,
  tagline,
  description,
  shortDescription,
  inputLabel,
  outputLabel,
  features = [],
  metrics,
  metricKey,
  isFlipped = false,
  onToggleFlip,
  className = '',
}) => {
  const safeFeatures = filterDevItems(features);
  const displayTagline = formatDevText(tagline);
  const cleanDescription = formatDevText(description);

  // Derive short single-sentence summary if not explicitly passed
  const shortSummary =
    shortDescription ||
    (cleanDescription
      ? cleanDescription.split('. ')[0].replace(/\.$/, '') + '.'
      : '');

  const displayMetrics = resolveMetric(metricKey, formatDevText(metrics));

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      // If pressing on an inner interactive button/link, don't trigger card flip
      if (e.target.tagName === 'A' || e.target.closest('a')) return;
      e.preventDefault();
      onToggleFlip();
    }
  };

  const handleAuditClick = (e) => {
    e.stopPropagation();
    scrollToTarget('#contact', -80);
  };

  const handleFlipBackClick = (e) => {
    e.stopPropagation();
    onToggleFlip();
  };

  return (
    <div
      className={`flip-card-perspective h-[320px] sm:h-[340px] lg:h-[540px] w-full font-sans ${className}`}
    >
      <div
        role="button"
        tabIndex={0}
        aria-expanded={isFlipped}
        aria-label={`${title} - ${isFlipped ? 'Flipped. Click or press Enter to flip back' : 'Click or press Enter to view technical details'}`}
        onClick={onToggleFlip}
        onKeyDown={handleKeyDown}
        className={`flip-card-inner h-full w-full rounded-[20px] sm:rounded-[28px] focus:outline-none focus:ring-2 focus:ring-[#2F6BFF] cursor-pointer ${
          isFlipped ? 'flip-card-flipped' : ''
        }`}
      >
        {/* ================= FRONT FACE (Resting State: Clean Eye-Catching Overview) ================= */}
        <div
          aria-hidden={isFlipped}
          className="absolute inset-0 w-full h-full rounded-[20px] sm:rounded-[28px] p-5 sm:p-6 lg:p-7 bg-white border border-slate-200/90 flex flex-col justify-between text-left backface-hidden shadow-[0_4px_20px_rgba(11,31,58,0.05)] hover:shadow-[0_20px_45px_rgba(11,31,58,0.12)] hover:-translate-y-1.5 hover:border-[#2F6BFF]/50 transition-all duration-300 ease-out group relative overflow-hidden"
        >
          {/* Top subtle hover accent bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2F6BFF] via-[#8DB4FF] to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

          <div className="space-y-2.5 sm:space-y-3.5 text-left">
            {/* Top row: Category Tagline and Workflow Badge */}
            <div className="flex items-center justify-between gap-2">
              {displayTagline && (
                <span className="text-xs font-bold text-[#2F6BFF] uppercase tracking-wider font-sans truncate max-w-[60%]">
                  {displayTagline}
                </span>
              )}
              <span className="flex items-center gap-1.5 text-xs font-medium text-slate-600 bg-slate-100 border border-slate-200/80 px-2.5 py-0.5 rounded-full whitespace-nowrap ml-auto font-sans">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2F6BFF]" />
                <span>Workflow 0{index + 1}</span>
              </span>
            </div>

            {/* Title */}
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#0B1F3A] tracking-tight leading-snug group-hover:text-[#2F6BFF] transition-colors duration-200 line-clamp-2">
              {title}
            </h3>

            {/* Short, single-sentence summary */}
            {shortSummary && (
              <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed font-normal line-clamp-2">
                {shortSummary}
              </p>
            )}

            {/* Interactive Pipeline Architecture Preview (Desktop only) */}
            <div className="hidden lg:block p-2 sm:p-3 rounded-xl bg-slate-50/90 border border-slate-200/80 space-y-1 sm:space-y-1.5">
              <div className="flex items-center justify-between text-[8px] sm:text-[9.5px] font-bold text-slate-400 uppercase tracking-wider">
                <span>Shop Input</span>
                <span>NetSuite ERP</span>
              </div>
              <div className="flex items-center justify-between gap-1">
                <div className="flex items-center gap-1 text-[10px] sm:text-xs font-semibold text-slate-700 bg-white px-2 py-1 rounded-lg border border-slate-200 shadow-2xs truncate flex-1 min-w-0">
                  <FileText className="w-3 h-3 text-[#2F6BFF] flex-shrink-0" />
                  <span className="truncate sm:hidden">{inputLabel ? inputLabel.split(' ')[0] + ' ' + (inputLabel.split(' ')[1] || '') : 'Shop Docs'}</span>
                  <span className="hidden sm:inline truncate">{inputLabel || 'Shop Documents'}</span>
                </div>
                <div className="flex items-center justify-center w-4 h-4 text-[#2F6BFF] flex-shrink-0 font-bold text-xs">
                  →
                </div>
                <div className="flex items-center gap-1 text-[10px] sm:text-xs font-bold text-emerald-900 bg-emerald-50/90 px-2 py-1 rounded-lg border border-emerald-200/80 shadow-2xs truncate flex-1 min-w-0">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                  <span className="truncate sm:hidden">{outputLabel ? outputLabel.split(' ')[0] + ' ' + (outputLabel.split(' ')[1] || '') : 'NetSuite'}</span>
                  <span className="hidden sm:inline truncate">{outputLabel || 'Validated Records'}</span>
                </div>
              </div>
            </div>

            {/* Metric pill in resting state (Desktop only) */}
            {displayMetrics && (
              <div className="hidden lg:block overflow-hidden">
                <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold text-[#1E3A8A] bg-blue-50/80 border border-blue-200/70 px-2.5 py-1 sm:px-3 sm:py-1 rounded-lg shadow-2xs truncate max-w-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2F6BFF] flex-shrink-0" />
                  <span className="truncate">{displayMetrics}</span>
                </span>
              </div>
            )}
          </div>

          {/* Bottom Flip Affordance Button: min 44px tap target */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 min-h-[44px]">
            <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-500 group-hover:text-[#2F6BFF] transition-colors">
              <RotateCcw className="w-3.5 h-3.5 text-[#2F6BFF] transition-transform duration-300 group-hover:-rotate-45 flex-shrink-0" />
              <span className="hidden sm:inline">Inspect technical setup</span>
              <span className="sm:hidden">Inspect setup</span>
            </span>
            <span className="h-[44px] min-h-[44px] px-4 rounded-xl bg-[#2F6BFF] group-hover:bg-[#1D55E6] text-white text-xs sm:text-sm font-semibold inline-flex items-center gap-2 shadow-sm transition-colors whitespace-nowrap">
              <span>Explore Workflow</span>
              <span aria-hidden="true">↻</span>
            </span>
          </div>
        </div>

        {/* ================= BACK FACE (Detailed View with Internal Scroll) ================= */}
        <div
          aria-hidden={!isFlipped}
          className="absolute inset-0 w-full h-full rounded-[20px] sm:rounded-[28px] p-5 sm:p-6 bg-white border-2 border-[#2F6BFF]/40 flex flex-col justify-between text-left backface-hidden [transform:rotateY(180deg)] shadow-xl overflow-hidden"
        >
          {/* Top bar with 44px Back button */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 flex-shrink-0 min-h-[44px]">
            <span className="text-xs sm:text-sm font-bold text-[#0B1F3A] uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-[#2F6BFF]" />
              <span>Technical Specs</span>
            </span>
            <button
              type="button"
              tabIndex={isFlipped ? 0 : -1}
              onClick={handleFlipBackClick}
              className="h-[44px] min-h-[44px] px-4 rounded-xl text-xs sm:text-sm text-slate-700 hover:text-[#0B1F3A] bg-slate-100 hover:bg-slate-200 transition-colors font-bold shadow-2xs flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#2F6BFF]"
            >
              <span>← Back</span>
            </button>
          </div>

          {/* Scrollable details container with thin custom scrollbar */}
          <div
            data-lenis-prevent="true"
            className="overflow-y-auto overscroll-contain thin-scrollbar pr-1.5 space-y-3.5 flex-grow min-h-0 py-2 text-left"
          >
            {/* Title and readable description */}
            <div className="space-y-1 text-left">
              <h4 className="text-sm sm:text-base font-bold text-[#0B1F3A] leading-snug">
                {title}
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                {cleanDescription}
              </p>
            </div>

            {/* Features checklist with comfortable line height */}
            {safeFeatures.length > 0 && (
              <div className="space-y-2 pt-1 text-left">
                <span className="text-xs font-bold text-[#0B1F3A] uppercase tracking-wider block">
                  Automated Checks & Logic:
                </span>
                <ul className="space-y-2 text-left">
                  {safeFeatures.map((feat, idx) => (
                    <li key={idx} className="text-sm text-slate-700 flex items-start gap-2.5 text-left">
                      <div className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200/80 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span className="leading-snug">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Clean Data Transformation Console: Desktop only */}
            <div className="hidden lg:block rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
              <div className="bg-[#0B1F3A] text-white px-3.5 py-2 text-[10px] font-mono flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-white font-medium">NetSuite RESTlet Pipeline</span>
                </div>
                <span className="text-[#8DB4FF] font-semibold">100% Deterministic</span>
              </div>

              <div className="bg-slate-50/90 p-3 space-y-2">
                {inputLabel && (
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                    <FileText className="w-3.5 h-3.5 text-[#2F6BFF] flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] text-slate-400 block font-mono">Source Ingestion</span>
                      <span className="text-[#0B1F3A] truncate font-semibold text-xs block">
                        {inputLabel}
                      </span>
                    </div>
                  </div>
                )}
                {outputLabel && (
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-200 shadow-2xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] text-emerald-600 block font-mono">Direct ERP Post</span>
                      <span className="text-emerald-950 truncate font-bold text-xs block">
                        {outputLabel}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Back Face Footer Controls */}
          <div className="pt-2 sm:pt-3 mt-1 sm:mt-2 border-t border-slate-100 flex items-center justify-between gap-1 flex-shrink-0 min-h-[44px]">
            <button
              type="button"
              tabIndex={isFlipped ? 0 : -1}
              onClick={handleFlipBackClick}
              className="min-h-[44px] inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-600 hover:text-[#0B1F3A] link py-1"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#2F6BFF] flex-shrink-0" />
              <span className="hidden sm:inline">Back to overview</span>
              <span className="sm:hidden">Back</span>
            </button>

            <a
              href="#contact"
              tabIndex={isFlipped ? 0 : -1}
              onClick={handleAuditClick}
              className="min-h-[44px] inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#2F6BFF] hover:text-[#1D55E6] link py-1"
            >
              <span>Explore setup</span>
              <ArrowRight className="w-3.5 h-3.5 flex-shrink-0" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolutionCard;
