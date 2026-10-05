import React, { useRef } from 'react';
import { DirectionPad } from '../index';

const ProjectTile = ({ project, animationEnabled }) => {
  const projectCard = useRef(null);
  const { name, description, color, url, tag, accent } = project;

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="overflow-hidden rounded-3xl snap-start font-poppins flex-shrink-0 block group transition-all duration-300"
      style={{
        width: animationEnabled ? '34rem' : 'min(84vw, 34rem)',
        WebkitMaskImage: '-webkit-radial-gradient(white, black)',
      }}
    >
      <div
        ref={projectCard}
        className="rounded-3xl relative p-6 sm:p-8 flex flex-col justify-between h-[21rem] sm:h-[23rem] w-full max-w-full shadow-xl border border-gray-700/60 hover:border-blue-400/60 transition-all duration-300 overflow-hidden group-hover:-translate-y-1 backdrop-blur-md"
        style={{
          backgroundColor: color || '#161f30',
        }}
      >
        {/* Subtle accent highlight line on top */}
        <div 
          className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-400"
          style={{ background: accent ? `linear-gradient(to right, ${accent}, #60a5fa)` : undefined }}
        ></div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <span 
              className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border border-blue-400/30 text-blue-400 bg-blue-500/10"
              style={{ color: accent || '#60a5fa', borderColor: `${accent || '#60a5fa'}40` }}
            >
              {tag || 'Enterprise Solution'}
            </span>
            <DirectionPad bgColor="bg-white/90" />
          </div>

          <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white mb-3 group-hover:text-blue-300 transition-colors">
            {name}
          </h3>
        </div>

        <div>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed line-clamp-4 mb-4">
            {description}
          </p>

          <div className="pt-3 border-t border-gray-700/50 flex items-center justify-between text-xs text-gray-400">
            <span>Production Ready</span>
            <span className="text-blue-400 font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
              Explore Solution →
            </span>
          </div>
        </div>
      </div>
    </a>
  );
};

export default ProjectTile;
