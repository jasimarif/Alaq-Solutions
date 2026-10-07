import React from 'react';
import { Star, Quote } from 'lucide-react';

const TestimonialSection = () => {
  return (
    <section className="py-10 sm:py-16 md:py-20 px-4 sm:px-8 md:px-12 bg-bg-dark font-poppins w-full overflow-hidden border-t border-gray-800/60">
      <div className="max-w-4xl w-full mx-auto">
        {/* Simple, decent testimonial card */}
        <div className="bg-gradient-to-b from-[#162030] to-[#0f1724] border border-accent/20 rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-2xl relative text-center">
          {/* Quote Icon Badge */}
          <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-accent/15 border border-accent/30 text-accent-soft mb-5">
            <Quote className="w-5 h-5 sm:w-6 sm:h-6 rotate-180" />
          </div>

          {/* Testimonial Quote Text - Always visible & readable */}
          <p className="text-base sm:text-xl md:text-2xl font-normal leading-relaxed text-gray-100 max-w-3xl mx-auto tracking-normal">
            “We migrated our financial architecture to <span className="text-accent-soft font-semibold">ALAQ Solutions</span> to accelerate our month-end close. It is modern, seamless, and gives our executive team total visibility across multiple legal entities and currencies.”
          </p>

          {/* Star rating */}
          <div className="flex items-center justify-center gap-1.5 my-5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="text-xs text-gray-400 ml-1.5">5.0 Verified Client Review</span>
          </div>

          {/* CEO & Company Attribution */}
          <div className="pt-5 border-t border-gray-800/80 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden ring-2 ring-blue-400/50 shadow-md flex-shrink-0">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&fit=crop"
                alt="Jasim Arif Ali"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-1.5 mb-0.5">
                <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                <span className="text-xs text-accent-soft font-semibold tracking-wide uppercase">OaksVille</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white leading-tight">Jasim Arif Ali</h3>
              <p className="text-gray-400 text-xs">CEO & Founder</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;