import React from 'react';
import { Mail, MapPin, Calendar, Clock, FileText, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import PageWrapper from '../Components/Common/PageWrapper';
import ContactForm from '../Components/ContactUs/ContactForm';
import { PAGE_SEO } from '../data/seo';
import { CONTACT_CONTENT } from '../data/contact';

const ContactPage = () => {
  const { hero, messyOrderOffer, bookingSection, contactInfo } = CONTACT_CONTENT;

  return (
    <PageWrapper seo={PAGE_SEO.contact} showCta={false}>
      <div className="py-14 sm:py-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto font-poppins">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/30 text-accent-soft text-xs font-semibold mb-4">
            <Mail className="w-3.5 h-3.5" />
            <span>{hero.badge}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
            {hero.title}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-gray-300 leading-relaxed">
            {hero.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Shared ContactForm */}
          <div className="lg:col-span-7 bg-surface-dark/90 rounded-3xl p-6 sm:p-10 border border-border-dark/80 shadow-2xl">
            <div className="mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Send Us a Note or an Order Sample
              </h2>
              <p className="text-sm text-gray-400 mt-1">
                Tell us about your paperwork bottleneck. We respond within one business day.
              </p>
            </div>
            <ContactForm
              buttonText="Send Workflow Request"
              offerLabel={messyOrderOffer.title}
            />
          </div>

          {/* Right Column: Fast Booking & Offers */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick 20-min Audit Box */}
            <div className="bg-gradient-to-br from-blue-900/30 to-slate-900/80 rounded-3xl p-6 sm:p-8 border border-accent/30 shadow-xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 text-accent-soft text-xs font-semibold">
                <Clock className="w-3.5 h-3.5" />
                <span>{bookingSection.badge}</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                {bookingSection.title}
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                {bookingSection.description}
              </p>
              <button
                type="button"
                onClick={() => {
                  const firstInput = document.getElementById('firstName');
                  if (firstInput) firstInput.focus();
                }}
                className="w-full inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-white font-medium text-sm py-3 px-6 rounded-xl transition shadow-md shadow-accent/20 link cursor-pointer"
              >
                <span>{bookingSection.ctaLabel}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* "Send Us One Messy Order" Box */}
            <div className="bg-surface-dark/70 rounded-3xl p-6 sm:p-8 border border-border-dark/60 shadow-lg space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-semibold">
                <FileText className="w-3.5 h-3.5" />
                <span>{messyOrderOffer.badge}</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                {messyOrderOffer.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                {messyOrderOffer.description}
              </p>
              <ul className="space-y-2 pt-1 border-t border-border-dark">
                {messyOrderOffer.points.map((pt, i) => (
                  <li key={i} className="text-xs text-gray-400 flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Location & Coverage */}
            <div className="bg-[#121824] rounded-2xl p-6 border border-border-dark text-xs text-gray-400 space-y-2.5">
              <div className="flex items-center gap-2 text-gray-300 font-semibold">
                <MapPin className="w-4 h-4 text-accent-soft" />
                <span>{contactInfo.location}</span>
              </div>
              <p>{contactInfo.note}</p>
              <p className="pt-1 text-gray-400">
                Direct email:{' '}
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-accent-soft hover:underline link"
                >
                  {contactInfo.email}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ContactPage;
