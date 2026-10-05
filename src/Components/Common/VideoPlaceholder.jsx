import React from 'react';
import { Play, Video, Clock } from 'lucide-react';
import { formatDevText, isDev } from '../../utils/devText';

const VideoPlaceholder = ({
  title = "Screen Recording Demo [PLACEHOLDER]",
  duration = "[PLACEHOLDER] 30 to 60 seconds",
  caption = "[PLACEHOLDER] Unedited screen recording showing the document parser extracting line items and deterministic code posting clean records into the ERP.",
  className = '',
}) => {
  const displayTitle = formatDevText(title) || "Workflow Demonstration";
  const displayDuration = formatDevText(duration) || "Quick Walkthrough";
  const displayCaption = formatDevText(caption);

  return (
    <div className={`font-sans space-y-2.5 ${className}`}>
      <div className="relative aspect-video w-full rounded-2xl bg-gradient-to-br from-[#1b263b] via-[#101927] to-[#0a101a] border border-blue-500/30 overflow-hidden shadow-2xl flex flex-col items-center justify-center p-6 text-center group">
        {/* Subtle grid pattern background */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(96,165,250,0.4) 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        ></div>

        {/* Ambient glow on hover */}
        <div className="absolute w-40 h-40 bg-blue-500/20 blur-3xl rounded-full pointer-events-none group-hover:scale-125 transition-transform duration-500"></div>

        {/* Play badge */}
        <div className="relative z-10 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-blue-500/20 border-2 border-blue-400/80 flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300 shadow-xl shadow-blue-500/20">
          <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-current ml-1" />
        </div>

        {/* Duration badge */}
        <div className="absolute top-4 right-4 z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-700 text-gray-300 text-xs font-sans">
          <Clock className="w-3 h-3 text-blue-400" />
          <span>{displayDuration}</span>
        </div>

        {/* Video type tag */}
        <div className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-400 text-xs font-semibold font-sans">
          <Video className="w-3 h-3" />
          <span>Screen Recording</span>
        </div>

        {/* Title inside card */}
        <div className="relative z-10 mt-4 max-w-md">
          <h4 className="text-white font-semibold text-sm sm:text-base tracking-tight font-sans">
            {displayTitle}
          </h4>
          {isDev && (
            <span className="text-[11px] font-sans text-gray-400 block mt-1">
              [PLACEHOLDER] 30 to 60 second screen recording will be embedded here
            </span>
          )}
        </div>
      </div>

      {displayCaption && (
        <p className="text-xs text-gray-400 px-1 leading-relaxed font-sans">
          {displayCaption}
        </p>
      )}
    </div>
  );
};

export default VideoPlaceholder;
