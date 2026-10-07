import React from 'react';
import { ArrowUpRight, ShieldCheck, MapPin, Mail } from 'lucide-react';
import { BOOKING_CTA_URL, BOOKING_CTA_LABEL, COMPANY } from '../../data/config';
import ContactForm from '../ContactUs/ContactForm';

const CTABanner = ({
  title = "Ready to get paperwork off your shop floor?",
  subtitle = "Send us one messy dealer order, cut list, or note below. Our engineering team in Windsor will review it and show you what automated ERP entry looks like.",
  className = '',
}) => {
  return (
    <section
      id="contact"
      aria-label="Contact and Order Intake"
      className={`w-full py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-surface-dark font-sans relative overflow-hidden border-t border-border-dark/80 ${className}`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column (Desktop): Headline, Subheadline, Contact Button, Trust Badges */}
          <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight text-balance text-center lg:text-left">
              {title}
            </h2>

            <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed text-balance font-normal text-center lg:text-left max-w-xl mx-auto lg:mx-0">
              {subtitle}
            </p>

            <div className="pt-2 flex justify-center lg:justify-start">
              <button
                type="button"
                onClick={() => {
                  const firstInput = document.getElementById('firstName');
                  if (firstInput) {
                    firstInput.focus();
                  } else {
                    const formElement = document.querySelector('form');
                    if (formElement) {
                      formElement.scrollIntoView({ behavior: 'smooth' });
                    }
                  }
                }}
                className="inline-flex items-center justify-center gap-3 bg-accent hover:bg-accent-hover text-white font-semibold text-sm sm:text-base px-8 py-3.5 sm:py-4 rounded-full shadow-lg shadow-black/40 transition-all duration-200 link min-h-[48px] group cursor-pointer"
              >
                <span>{BOOKING_CTA_LABEL}</span>
                <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 transition-transform group-hover:translate-x-0.5">
                  <ArrowUpRight className="w-4 h-4 text-white" />
                </span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 border-t border-border-dark/80 space-y-2.5 text-xs text-slate-400 flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Deterministic ERP verification: AI never touches your general ledger.</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-accent-soft flex-shrink-0" />
                <span>{COMPANY.location} • Serving Ontario & Michigan</span>
              </div>
            </div>
          </div>

          {/* Right Column (Desktop): Embedded Contact Form in Dark Gray Card */}
          <div className="lg:col-span-7">
            <div className="bg-surface-dark border border-border-dark/60 rounded-[32px] p-6 sm:p-8 md:p-10 shadow-2xl backdrop-blur-sm">
              <div className="pb-5 mb-5 border-b border-border-dark text-left">
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Send us a message or messy order
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Direct to our engineering team in Windsor, Ontario. We reply within one business day.
                </p>
              </div>

              <ContactForm buttonText="Send to Engineering Team" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
