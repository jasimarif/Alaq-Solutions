import React from 'react';
import { ShieldCheck, Cpu, UserCheck, ArrowRight, TrendingUp, Send, CheckCircle2, FileText, Check } from 'lucide-react';
import VideoPlaceholder from './VideoPlaceholder';

const CaseStudyTemplate = ({
  caseStudy,
  className = '',
}) => {
  const {
    id,
    title,
    client,
    industry,
    problem,
    whatWeBuilt,
    aiVsCodeSplit = {},
    result,
    whatYouSend = [],
    whatYouGet = [],
    video,
  } = caseStudy;

  return (
    <div
      id={id}
      className={`bg-gradient-to-b from-surface-dark to-bg-darker border border-border-dark/80 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl font-poppins space-y-10 ${className}`}
    >
      {/* Header Profile */}
      <div className="space-y-4 pb-8 border-b border-border-dark">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs font-semibold text-accent-soft bg-accent/10 px-3.5 py-1.5 rounded-full border border-accent/25 uppercase tracking-wider">
            {industry}
          </span>
          <span className="text-xs font-sans text-gray-400">
            Case ID: {id}
          </span>
        </div>

        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
          {title}
        </h3>

        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-300 font-sans">
          <span className="text-gray-400">Client Profile:</span>
          <span className="text-accent-soft font-medium">{client}</span>
        </div>
      </div>

      {/* Problem & What We Built */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-900/80 p-6 sm:p-7 rounded-2xl border border-border-dark space-y-3">
          <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
            <span className="w-2 h-2 rounded-full bg-rose-400"></span>
            <span>The Operational Bottleneck</span>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed">
            {problem}
          </p>
        </div>

        <div className="bg-accent/20 p-6 sm:p-7 rounded-2xl border border-accent/30 space-y-3">
          <div className="flex items-center gap-2 text-accent-soft font-semibold text-sm">
            <span className="w-2 h-2 rounded-full bg-blue-400"></span>
            <span>What We Built</span>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed">
            {whatWeBuilt}
          </p>
        </div>
      </div>

      {/* Two-Column Comparison Box: What You Send / What You Get */}
      <div className="rounded-2xl border border-border-dark/80 overflow-hidden bg-slate-900/60 shadow-xl">
        <div className="p-4 sm:p-5 bg-slate-800/80 border-b border-border-dark text-xs sm:text-sm font-semibold text-white tracking-wide flex items-center justify-between font-sans">
          <span>Workflow Transformation: Inputs to ERP Records</span>
          <span className="text-accent-soft font-sans text-xs">Direct Integration</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-800">
          {/* Column 1: What You Send */}
          <div className="p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2 text-gray-300 font-bold text-sm">
              <div className="w-6 h-6 rounded-full bg-slate-800 text-gray-400 flex items-center justify-center text-xs font-sans font-semibold">
                IN
              </div>
              <h4>What You Send Us</h4>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Unstructured documents from customers and field dealers:
            </p>
            <ul className="space-y-2.5">
              {whatYouSend.map((item, idx) => (
                <li key={idx} className="text-xs sm:text-sm text-gray-300 flex items-start gap-2.5">
                  <FileText className="w-4 h-4 text-accent-soft flex-shrink-0 mt-0.5" />
                  <span className="leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: What You Get */}
          <div className="p-6 sm:p-8 space-y-4 bg-emerald-950/10">
            <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
              <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-sans font-semibold">
                OUT
              </div>
              <h4>What You Get in Your ERP</h4>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Clean, verified records posted without manual re-keying:
            </p>
            <ul className="space-y-2.5">
              {whatYouGet.map((item, idx) => (
                <li key={idx} className="text-xs sm:text-sm text-gray-200 flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="leading-snug font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* How the AI and Code Split the Work */}
      <div className="space-y-4">
        <h4 className="text-lg font-bold text-white flex items-center gap-2">
          <span>How AI and Code Split the Work</span>
          <span className="text-xs text-gray-400 font-normal">(The Verification Wedge)</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-5 rounded-2xl bg-accent/30 border border-accent/25 space-y-2">
            <div className="flex items-center gap-1.5 text-accent-soft font-semibold">
              <Cpu className="w-4 h-4 text-accent-soft" />
              <span>1. What AI Does</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              {aiVsCodeSplit.aiRole}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/25 space-y-2">
            <div className="flex items-center gap-1.5 text-emerald-300 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>2. What Deterministic Code Does</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              {aiVsCodeSplit.codeRole}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-purple-950/30 border border-purple-500/25 space-y-2">
            <div className="flex items-center gap-1.5 text-purple-300 font-semibold">
              <UserCheck className="w-4 h-4 text-purple-400" />
              <span>3. Where Humans Approve</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              {aiVsCodeSplit.humanApproval}
            </p>
          </div>
        </div>
      </div>

      {/* Video Placeholder Slot */}
      {video && (
        <div className="pt-2">
          <VideoPlaceholder
            title={video.title}
            duration={video.duration}
            caption={video.caption}
          />
        </div>
      )}

      {/* Result Metrics */}
      <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-r from-blue-950/40 via-slate-900 to-slate-900 border border-accent/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <TrendingUp className="w-4 h-4" />
            <span>Measured Result</span>
          </div>
          <p className="text-sm sm:text-base text-gray-200 font-medium">
            {result}
          </p>
        </div>
        <span className="px-3 py-1.5 rounded-full text-xs font-sans font-medium bg-accent/15 border border-accent/30 text-accent-soft flex-shrink-0">
          Verified Deployment
        </span>
      </div>
    </div>
  );
};

export default CaseStudyTemplate;
