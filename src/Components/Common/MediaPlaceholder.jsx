import React from 'react';
import { Image, Layers, User, Network } from 'lucide-react';
import { isDev } from '../../utils/devText';

const MediaPlaceholder = ({
  label = "Architecture Diagram",
  description = "Visual diagram illustrating the workflow and verification boundaries.",
  type = "diagram", // 'diagram' | 'screenshot' | 'photo' | 'architecture'
  height = "h-64 sm:h-72",
  className = '',
}) => {
  const getIcon = () => {
    switch (type) {
      case 'photo':
        return <User className="w-8 h-8 text-accent-soft" />;
      case 'screenshot':
        return <Layers className="w-8 h-8 text-accent-soft" />;
      case 'architecture':
        return <Network className="w-8 h-8 text-accent-soft" />;
      default:
        return <Image className="w-8 h-8 text-accent-soft" />;
    }
  };

  return (
    <div className={`font-sans space-y-2 ${className}`}>
      <div
        className={`relative w-full ${height} rounded-2xl bg-gradient-to-br from-[#182335] via-[#111926] to-[#0c131f] border border-dashed border-border-dark hover:border-accent/50 transition-colors flex flex-col items-center justify-center p-6 text-center shadow-lg group overflow-hidden`}
      >
        {/* Subtle grid background */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        ></div>

        <div className="relative z-10 w-14 h-14 rounded-2xl bg-slate-800/80 border border-border-dark flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
          {getIcon()}
        </div>

        <div className="relative z-10 max-w-sm">
          <span className="text-white font-semibold text-sm block">
            {label}
          </span>
          {isDev && (
            <span className="text-[11px] font-sans text-gray-400 block mt-1">
              [PLACEHOLDER] {type.toUpperCase()} SLOT
            </span>
          )}
        </div>
      </div>

      {description && (
        <p className="text-xs text-gray-400 px-1 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};

export default MediaPlaceholder;
