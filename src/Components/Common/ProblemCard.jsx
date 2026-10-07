import React from 'react';
import { Clock } from 'lucide-react';

const ProblemCard = ({
  number,
  title,
  description,
  symptoms = [],
  impact,
  className = '',
}) => {
  return (
    <div
      className={`bg-surface-light-2 border border-border-light rounded-[28px] p-6 sm:p-8 flex flex-col justify-between font-sans transition-all duration-300 hover:shadow-md ${className}`}
    >
      <div className="space-y-4">
        {/* Header row: clean step number */}
        <div className="flex items-center justify-between">
          <span className="font-sans text-xs font-semibold text-slate-600 bg-white/90 px-3 py-1 rounded-full border border-slate-200/90 shadow-2xs">
            {number}
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-text-dark tracking-tight leading-snug">
          {title}
        </h3>

        <p className="text-sm text-text-muted-dark leading-relaxed">
          {description}
        </p>

        {symptoms && symptoms.length > 0 && (
          <ul className="space-y-2 pt-3 border-t border-slate-200/80">
            {symptoms.map((symptom, idx) => (
              <li key={idx} className="text-xs text-text-muted-dark flex items-start gap-2">
                <span className="text-slate-400 font-bold mt-0.5">•</span>
                <span className="leading-snug">{symptom}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {impact && (
        <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center gap-2.5 text-xs text-text-dark bg-white p-3 rounded-2xl border border-slate-200/90 shadow-2xs">
          <Clock className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
          <span className="font-medium">Operational impact: {impact}</span>
        </div>
      )}
    </div>
  );
};

export default ProblemCard;
