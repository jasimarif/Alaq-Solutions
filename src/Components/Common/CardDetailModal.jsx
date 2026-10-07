import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Cpu,
  UserCheck,
  AlertTriangle,
} from 'lucide-react';
import { getLenis } from '../../utils/lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const CardDetailModal = ({
  isOpen,
  onClose,
  data,
  type = 'industry', // 'industry' | 'case-study'
}) => {
  const modalRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const closeButtonRef = useRef(null);
  const triggerRef = useRef(null);

  // Keep track of the element that opened the modal to restore focus on close
  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement;

      // Compensate for scrollbar width to prevent page shift
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.overflow = 'hidden';

      // Stop Lenis smooth scroll while modal is active
      const lenis = getLenis();
      if (lenis) {
        lenis.stop();
      }

      // Move focus into the modal and reset scroll to top
      setTimeout(() => {
        if (closeButtonRef.current) {
          closeButtonRef.current.focus();
        }
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTop = 0;
        }
      }, 50);
    } else {
      // Restore page scroll
      document.body.style.paddingRight = '';
      document.body.style.overflow = '';

      // Resume Lenis and refresh ScrollTrigger
      const lenis = getLenis();
      if (lenis) {
        lenis.start();
      }
      setTimeout(() => {
        if (typeof ScrollTrigger !== 'undefined' && ScrollTrigger.refresh) {
          ScrollTrigger.refresh();
        }
      }, 100);

      // Return focus to the card that triggered the modal
      if (triggerRef.current && typeof triggerRef.current.focus === 'function') {
        triggerRef.current.focus();
      }
    }

    return () => {
      document.body.style.paddingRight = '';
      document.body.style.overflow = '';
      const lenis = getLenis();
      if (lenis) {
        lenis.start();
      }
    };
  }, [isOpen]);

  // Keyboard navigation: Escape to close, Tab trap
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'Tab' && modalRef.current) {
        // Focus trap
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !data || typeof document === 'undefined') return null;

  const isIndustry = type === 'industry';
  const IconComponent = data.icon;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-headline"
      data-lenis-prevent="true"
      className="fixed inset-0 z-[9990] flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6"
    >
      {/* Neutral dark backdrop with subtle blur */}
      <div
        onClick={onClose}
        aria-hidden="true"
        data-lenis-prevent="true"
        className="fixed inset-0 bg-[#090E15]/75 backdrop-blur-sm transition-opacity duration-200"
      />

      {/* Centered Modal Container / Bottom Sheet on small mobile */}
      <div
        ref={modalRef}
        data-lenis-prevent="true"
        className="relative z-10 w-full sm:max-w-[860px] h-[90vh] sm:h-auto sm:max-h-[85vh] bg-white rounded-t-[28px] sm:rounded-[28px] shadow-[0_24px_70px_rgba(0,0,0,0.35)] border border-slate-200/90 flex flex-col overflow-hidden font-sans animate-modalIn motion-reduce:animate-none"
      >
        {/* Fixed Header */}
        <div className="px-6 py-5 sm:px-8 border-b border-slate-200/80 bg-gradient-to-b from-slate-50 to-white flex flex-col gap-3.5 flex-shrink-0">
          <div className="flex items-center justify-between gap-3">
            {/* Sector / Industry badge or category */}
            <div className="flex items-center gap-3">
              {IconComponent && (
                <div className="w-10 h-10 rounded-xl bg-[#0B1F3A] text-white flex items-center justify-center shadow-xs flex-shrink-0">
                  <IconComponent className="w-5 h-5 text-white" />
                </div>
              )}
              <div className="flex flex-wrap items-center gap-2">
                {data.tagline && (
                  <span className="text-xs font-bold text-accent uppercase tracking-wider">
                    {data.tagline}
                  </span>
                )}
                {data.industry && (
                  <span className="text-xs font-bold text-slate-700 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-2xs uppercase tracking-wider">
                    {data.industry}
                  </span>
                )}
              </div>
            </div>

            {/* Close Button Only (Previous/Next removed per user instruction) */}
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close dialog"
              className="w-10 h-10 sm:w-9 sm:h-9 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-[#0B1F3A] hover:bg-slate-100 flex items-center justify-center transition-colors link shadow-2xs focus:outline-none focus:ring-2 focus:ring-focus-ring"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Title & Client Profile */}
          <div>
            <h2
              id="modal-headline"
              className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#0B1F3A] tracking-tight leading-snug"
            >
              {data.title}
            </h2>
            {data.client && (
              <div className="mt-1.5 flex items-center gap-2">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  Client Profile:
                </span>
                <span className="text-xs text-slate-700 font-medium bg-slate-100/90 px-3 py-0.5 rounded-full border border-slate-200/80">
                  {data.client}
                </span>
              </div>
            )}
          </div>

          {/* High-Contrast Operational Outcome / Impact Banner */}
          {(data.impact || data.resultMetric) && (
            <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-[#0B1F3A] to-[#122A4E] text-white border border-border-dark/40 shadow-sm flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-accent-soft flex-shrink-0" />
                <span className="text-xs sm:text-sm font-bold tracking-tight text-white">
                  {data.impact || data.resultMetric}
                </span>
              </div>
              <span className="bg-accent/20 text-accent-soft border border-blue-400/30 text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full shrink-0 hidden sm:inline-flex">
                Verified Outcome
              </span>
            </div>
          )}
        </div>

        {/* Scrollable Modal Body: flex-1 min-h-0 with data-lenis-prevent and native scroll */}
        <div
          ref={scrollContainerRef}
          data-lenis-prevent="true"
          className="flex-1 min-h-0 overflow-y-auto overscroll-contain thin-scrollbar p-6 sm:p-8 space-y-6 text-text-dark"
        >
          {/* Section: The Operational Bottleneck */}
          {data.problem && (
            <div className="relative p-5 sm:p-6 rounded-2xl bg-white border border-rose-200/90 shadow-[0_2px_12px_rgba(244,63,94,0.05)] space-y-2.5 overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-rose-500" />
              <div className="flex items-center gap-2 text-rose-700 font-bold text-xs uppercase tracking-wider">
                <span className="p-1 rounded-md bg-rose-50 text-rose-600">
                  <AlertTriangle className="w-3.5 h-3.5" />
                </span>
                <span>The Operational Bottleneck</span>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">
                {data.problem}
              </p>
            </div>
          )}

          {/* Section: The Automated Solution / What We Built */}
          {(data.solution || data.whatWeBuilt) && (
            <div className="relative p-5 sm:p-6 rounded-2xl bg-white border border-emerald-200/90 shadow-[0_2px_12px_rgba(16,185,129,0.05)] space-y-2.5 overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-emerald-500" />
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
                <span className="p-1 rounded-md bg-emerald-50 text-emerald-600">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </span>
                <span>{isIndustry ? 'Automated Solution Architecture' : 'What We Built'}</span>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">
                {data.solution || data.whatWeBuilt}
              </p>
            </div>
          )}

          {/* Section: Safe Wedge Architecture (AI vs Code Split) */}
          {data.aiVsCodeSplit && (
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-50/90 border border-slate-200/90 space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#0B1F3A] uppercase tracking-wider block">
                  Safe Wedge Architecture (Deterministic Verification)
                </span>
                <span className="text-[10px] font-bold text-slate-500 bg-white px-2.5 py-0.5 rounded-full border border-slate-200 shadow-2xs">
                  Zero Hallucinations
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                {data.aiVsCodeSplit.aiRole && (
                  <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-2xs space-y-1.5">
                    <div className="flex items-center gap-1.5 font-bold text-[#0B1F3A]">
                      <Cpu className="w-3.5 h-3.5 text-accent" />
                      <span>AI Role:</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed text-xs">
                      {data.aiVsCodeSplit.aiRole}
                    </p>
                  </div>
                )}
                {data.aiVsCodeSplit.codeRole && (
                  <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-2xs space-y-1.5">
                    <div className="flex items-center gap-1.5 font-bold text-[#0B1F3A]">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Code Role:</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed text-xs">
                      {data.aiVsCodeSplit.codeRole}
                    </p>
                  </div>
                )}
                {data.aiVsCodeSplit.humanApproval && (
                  <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-2xs space-y-1.5">
                    <div className="flex items-center gap-1.5 font-bold text-[#0B1F3A]">
                      <UserCheck className="w-3.5 h-3.5 text-amber-600" />
                      <span>Human Review:</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed text-xs">
                      {data.aiVsCodeSplit.humanApproval}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Section: What You Send vs What You Get in ERP */}
          {((data.whatYouSend && data.whatYouSend.length > 0) ||
            (data.whatYouGet && data.whatYouGet.length > 0)) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.whatYouSend && data.whatYouSend.length > 0 && (
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="text-xs font-bold text-[#0B1F3A] uppercase tracking-wider block">
                      What Your Shop Sends Us:
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono font-medium">
                      Raw Inputs
                    </span>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-600">
                    {data.whatYouSend.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <FileText className="w-3.5 h-3.5 text-slate-400 mt-0.5 flex-shrink-0" />
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {data.whatYouGet && data.whatYouGet.length > 0 && (
                <div className="p-5 rounded-2xl bg-emerald-50/40 border border-emerald-200/80 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-emerald-100">
                    <span className="text-xs font-bold text-emerald-950 uppercase tracking-wider block">
                      What NetSuite ERP Receives:
                    </span>
                    <span className="text-[10px] text-emerald-700 font-mono font-semibold bg-emerald-100/80 px-2 py-0.5 rounded-full">
                      Clean & Matched
                    </span>
                  </div>
                  <ul className="space-y-2 text-xs text-emerald-900">
                    {data.whatYouGet.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Section: Workflows or Highlights List */}
          {data.workflows && data.workflows.length > 0 && (
            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
              <span className="text-xs font-bold text-[#0B1F3A] uppercase tracking-wider block">
                Included Workflows in this Scope:
              </span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700">
                {data.workflows.map((wf, idx) => (
                  <li key={idx} className="flex items-start gap-2 p-2 rounded-xl bg-slate-50/80 border border-slate-200/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                    <span className="leading-snug font-medium">{wf}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {data.highlights && data.highlights.length > 0 && (
            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
              <span className="text-xs font-bold text-[#0B1F3A] uppercase tracking-wider block">
                Production Highlights:
              </span>
              <ul className="space-y-2 text-xs text-slate-700">
                {data.highlights.map((hl, idx) => (
                  <li key={idx} className="flex items-start gap-2 p-2 rounded-xl bg-slate-50/80 border border-slate-200/60">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span className="leading-snug font-medium">{hl}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default CardDetailModal;
