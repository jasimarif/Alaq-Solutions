import React, { useState } from 'react';
import { RotateCcw, Check, ArrowRight } from 'lucide-react';
import { scrollToTarget } from '../../utils/lenis';

const SocialMediaCard = ({
  channelNumber = '01',
  platform = 'facebook', // 'facebook' | 'instagram'
  label,
  title,
  description,
  chips = [],
  backTitle,
  items = [],
  footerText,
  ctaText,
  className = '',
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleToggleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      // If pressing on an inner link or button, don't trigger flip
      if (e.target.tagName === 'A' || e.target.closest('a')) return;
      e.preventDefault();
      handleToggleFlip();
    }
  };

  const handleCtaClick = (e) => {
    e.stopPropagation();
    scrollToTarget('#contact', -80);
  };

  return (
    <div
      className={`flip-card-perspective flip-card-hover h-[500px] sm:h-[520px] w-full font-sans group ${className}`}
    >
      <div
        role="button"
        tabIndex={0}
        aria-expanded={isFlipped}
        aria-label={`${title} - ${
          isFlipped
            ? 'Showing technical specifications. Click or press Enter to return to overview'
            : 'Click, hover or press Enter to view how we run this platform for you'
        }`}
        onClick={handleToggleFlip}
        onKeyDown={handleKeyDown}
        className={`flip-card-inner h-full w-full rounded-[24px] sm:rounded-[28px] focus:outline-none focus:ring-2 focus:ring-[#2F6BFF] cursor-pointer ${
          isFlipped ? 'flip-card-flipped' : ''
        }`}
      >
        {/* ================= FRONT FACE (Overview) ================= */}
        <div
          aria-hidden={isFlipped}
          className="absolute inset-0 w-full h-full rounded-[24px] sm:rounded-[28px] p-6 sm:p-7 bg-white border border-slate-200/90 flex flex-col justify-between backface-hidden shadow-[0_4px_20px_rgba(11,31,58,0.05)] hover:shadow-[0_20px_45px_rgba(11,31,58,0.12)] hover:-translate-y-1.5 hover:border-[#2F6BFF]/50 transition-all duration-300 ease-out relative overflow-hidden"
        >
          {/* Top blue gradient accent line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2F6BFF] via-[#8DB4FF] to-transparent opacity-85 group-hover:opacity-100 transition-opacity" />

          <div className="space-y-4">
            {/* Top row: Platform Icon & Monospace Channel Badge */}
            <div className="flex items-center justify-between">
              {platform === 'facebook' ? (
                <div
                  className="w-11 h-11 rounded-2xl bg-[#1877F2]/10 border border-[#1877F2]/25 flex items-center justify-center text-[#1877F2] shadow-xs flex-shrink-0"
                  aria-label="Facebook Platform"
                >
                  <svg
                    className="w-5 h-5 fill-current"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </div>
              ) : (
                <div
                  className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white flex items-center justify-center shadow-xs flex-shrink-0"
                  aria-label="Instagram Platform"
                >
                  <svg
                    className="w-5 h-5 fill-current"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>
              )}

              {/* Monospace Pill Badge */}
              <span className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-white bg-[#0B1F3A] px-3 py-1 rounded-full shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8DB4FF] animate-pulse" />
                <span>Channel {channelNumber}</span>
              </span>
            </div>

            {/* Label & Title */}
            <div>
              <span className="text-xs font-bold text-[#2F6BFF] uppercase tracking-wider font-sans block mb-1">
                {label}
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B1F3A] tracking-tight leading-snug group-hover:text-[#2F6BFF] transition-colors duration-200">
                {title}
              </h3>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              {description}
            </p>

            {/* Interactive Campaign Pipeline Preview */}
            <div className="p-3 rounded-2xl bg-slate-50/90 border border-slate-200/80 space-y-1.5 shadow-2xs">
              <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <span>{platform === 'facebook' ? 'Target Audience' : 'Shop Content'}</span>
                <span>{platform === 'facebook' ? 'Verified Lead Pipeline' : 'Brand Authority'}</span>
              </div>
              <div className="flex items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-1.5 font-semibold text-slate-700 bg-white px-2.5 py-1 rounded-xl border border-slate-200 shadow-2xs truncate flex-1">
                  <span
                    className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                      platform === 'facebook' ? 'bg-[#1877F2]' : 'bg-[#DD2A7B]'
                    }`}
                  />
                  <span className="truncate text-[11px]">
                    {platform === 'facebook' ? 'Contractors & Dealers' : 'Reels & Finished Builds'}
                  </span>
                </div>
                <div className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-50 text-[#2F6BFF] flex-shrink-0">
                  <ArrowRight className="w-3 h-3" />
                </div>
                <div className="flex items-center gap-1.5 font-bold text-emerald-900 bg-emerald-50/90 px-2.5 py-1 rounded-xl border border-emerald-200/80 shadow-2xs truncate flex-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                  <span className="truncate text-[11px]">
                    {platform === 'facebook' ? 'Real Quote Requests' : 'Buyer Trust & Hiring'}
                  </span>
                </div>
              </div>
            </div>

            {/* Three Blue Pill Chips */}
            {chips.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-0.5">
                {chips.map((chip, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center text-[11px] font-semibold text-[#1E3A8A] bg-blue-50/80 border border-blue-200/70 px-2.5 py-0.5 rounded-full shadow-2xs"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Bottom Flip Affordance Hint */}
          <div className="pt-3.5 mt-2 border-t border-slate-100 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B1F3A] group-hover:text-[#2F6BFF] transition-colors">
              <RotateCcw className="w-3.5 h-3.5 text-[#2F6BFF] transition-transform duration-300 group-hover:-rotate-45" />
              <span className="hidden sm:inline">Hover to see how it works</span>
              <span className="sm:hidden">Tap to see how it works</span>
            </span>
            <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 group-hover:bg-[#2F6BFF] group-hover:text-white px-3 py-1 rounded-full transition-colors shadow-2xs">
              Flip to details ↻
            </span>
          </div>
        </div>

        {/* ================= BACK FACE (Details) ================= */}
        <div
          aria-hidden={!isFlipped}
          className="absolute inset-0 w-full h-full rounded-[24px] sm:rounded-[28px] p-6 sm:p-7 bg-[#0B1F3A] text-white border border-blue-500/30 ring-1 ring-blue-500/20 shadow-2xl flex flex-col justify-between backface-hidden [transform:rotateY(180deg)] overflow-hidden"
        >
          {/* Scrollable details container with thin scrollbar */}
          <div className="overflow-y-auto overscroll-contain thin-scrollbar pr-1.5 space-y-3 flex-grow min-h-0">
            {/* Header */}
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-700/60">
              <h4 className="text-base sm:text-lg font-bold text-white tracking-tight">
                {backTitle}
              </h4>
              <span className="text-[10px] font-mono font-bold text-[#8DB4FF] bg-blue-500/15 border border-blue-400/25 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Full Scope
              </span>
            </div>

            {/* 6-step Process Checklist */}
            <ul className="space-y-2">
              {items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                  <div className="w-4 h-4 rounded-full bg-blue-500/20 text-[#8DB4FF] border border-blue-400/30 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-2xs">
                    <Check className="w-2.5 h-2.5 text-[#8DB4FF]" />
                  </div>
                  <div className="leading-snug">
                    <span className="font-semibold text-white">
                      {idx + 1}. {item.split(':')[0]}:
                    </span>{' '}
                    <span className="text-slate-300 font-normal">
                      {item.includes(':') ? item.substring(item.indexOf(':') + 1).trim() : ''}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Back Face Footer: Best For + Action CTA */}
          <div className="pt-3 mt-2 border-t border-slate-700/60 space-y-2.5 flex-shrink-0">
            {footerText && (
              <p className="text-xs text-[#8DB4FF] font-medium leading-relaxed">
                {footerText}
              </p>
            )}

            <div className="flex items-center justify-between gap-3 pt-0.5">
              <button
                type="button"
                tabIndex={isFlipped ? 0 : -1}
                onClick={handleToggleFlip}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors link py-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Overview</span>
              </button>

              <a
                href="#contact"
                tabIndex={isFlipped ? 0 : -1}
                onClick={handleCtaClick}
                className="inline-flex items-center gap-1.5 bg-[#2F6BFF] hover:bg-[#1D55E6] text-white text-xs font-bold px-4 py-2 rounded-full shadow-md transition-all link"
              >
                <span>{ctaText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaCard;
