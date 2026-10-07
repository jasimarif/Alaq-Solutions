import React from 'react';

const SectionHeading = ({
  /* eslint-disable-next-line no-unused-vars */
  badge,
  title,
  highlightTitle,
  subtitle,
  align = 'center',
  theme = 'light', // 'light' (default) or 'dark'
  className = '',
}) => {
  const isCenter = align === 'center';
  const isDark = theme === 'dark';

  return (
    <div
      className={`mb-10 sm:mb-12 font-sans ${
        isCenter ? 'text-center mx-auto max-w-3xl' : 'text-left max-w-3xl'
      } ${className}`}
    >
      {/* Eyebrow labels suppressed across all sections per design requirements */}


      <h2
        className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15] text-balance ${
          isDark ? 'text-white' : 'text-text-dark'
        }`}
      >
        {title}{' '}
        {highlightTitle && (
          <span className="text-accent font-extrabold">{highlightTitle}</span>
        )}
      </h2>

      {subtitle && (
        <p
          className={`mt-4 text-base sm:text-lg leading-relaxed text-balance ${
            isDark ? 'text-slate-300' : 'text-text-muted-dark'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
