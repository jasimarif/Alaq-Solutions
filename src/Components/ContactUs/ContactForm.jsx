import React, { useState } from 'react';
import { Mail, AlertCircle, CheckCircle, Send, Loader2 } from 'lucide-react';
import { initEmailJS, sendContactEmail, validateEmailJSConfig } from '../../utils/emailjs';

const ContactForm = ({
  onSuccess,
  className = '',
  buttonText = 'Send Message',
  includeCompanyField = true,
  offerLabel = null,
}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setStatusMessage('');

    try {
      if (!validateEmailJSConfig()) {
        throw new Error('EmailJS configuration is incomplete. Please check your environment variables.');
      }

      if (!initEmailJS()) {
        throw new Error('Failed to initialize EmailJS service.');
      }

      const submissionPayload = offerLabel
        ? { ...formData, message: `[Offer: ${offerLabel}]\n\n${formData.message}` }
        : formData;

      await sendContactEmail(submissionPayload);

      setSubmitStatus('success');
      setStatusMessage('Thank you. We received your note and will get back to you within one business day.');

      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        message: '',
      });

      if (onSuccess) {
        setTimeout(() => {
          onSuccess();
          setSubmitStatus(null);
          setStatusMessage('');
        }, 2500);
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setSubmitStatus('error');

      if (error.message && error.message.includes('configuration')) {
        setStatusMessage('Configuration placeholder active. Please reach us directly at info@alaqsolution.com.');
      } else if (error.status === 429) {
        setStatusMessage('Too many requests. Please wait a moment and try again.');
      } else {
        setStatusMessage('There was an issue sending your message. Please reach us at info@alaqsolution.com.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 font-sans ${className}`}>
      {submitStatus === 'success' && (
        <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 flex items-start gap-3 animate-fadeIn">
          <CheckCircle className="w-5 h-5 flex-shrink-0 text-emerald-400 mt-0.5" />
          <p className="text-sm leading-relaxed">{statusMessage}</p>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="p-4 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-300 flex items-start gap-3 animate-fadeIn">
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-400 mt-0.5" />
          <p className="text-sm leading-relaxed">{statusMessage}</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-xs font-medium text-slate-300 mb-1.5">
            First Name <span className="text-[#8DB4FF]">*</span>
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First name"
            required
            className="w-full px-4 py-2.5 bg-[#182230] text-white rounded-xl border border-slate-700/70 focus:outline-none focus:ring-2 focus:ring-[#2F6BFF]/60 focus:border-[#2F6BFF] text-sm placeholder-slate-500 transition-colors min-h-[44px]"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-xs font-medium text-slate-300 mb-1.5">
            Last Name <span className="text-[#8DB4FF]">*</span>
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last name"
            required
            className="w-full px-4 py-2.5 bg-[#182230] text-white rounded-xl border border-slate-700/70 focus:outline-none focus:ring-2 focus:ring-[#2F6BFF]/60 focus:border-[#2F6BFF] text-sm placeholder-slate-500 transition-colors min-h-[44px]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className="block text-xs font-medium text-slate-300 mb-1.5">
            Work Email <span className="text-[#8DB4FF]">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="name@company.com"
            required
            className="w-full px-4 py-2.5 bg-[#182230] text-white rounded-xl border border-slate-700/70 focus:outline-none focus:ring-2 focus:ring-[#2F6BFF]/60 focus:border-[#2F6BFF] text-sm placeholder-slate-500 transition-colors min-h-[44px]"
          />
        </div>
        {includeCompanyField && (
          <div>
            <label htmlFor="company" className="block text-xs font-medium text-slate-300 mb-1.5">
              Company Name
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="e.g. Acme Fabrication"
              className="w-full px-4 py-2.5 bg-[#182230] text-white rounded-xl border border-slate-700/70 focus:outline-none focus:ring-2 focus:ring-[#2F6BFF]/60 focus:border-[#2F6BFF] text-sm placeholder-slate-500 transition-colors min-h-[44px]"
            />
          </div>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-xs font-medium text-slate-300 mb-1.5">
          Tell us about your current order or workflow bottleneck <span className="text-[#8DB4FF]">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          placeholder="For example: we receive dealer POs in PDF format and spend hours re-typing cut lists and line items into NetSuite..."
          required
          className="w-full px-4 py-3 bg-[#182230] text-white rounded-xl border border-slate-700/70 focus:outline-none focus:ring-2 focus:ring-[#2F6BFF]/60 focus:border-[#2F6BFF] text-sm placeholder-slate-500 transition-colors resize-y min-h-[100px]"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 px-6 rounded-xl font-medium text-sm text-white bg-[#2F6BFF] hover:bg-[#1D55E6] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 shadow-md shadow-black/20 link min-h-[44px]"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-white" />
            <span>Sending to engineering team...</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4 text-white" />
            <span>{buttonText}</span>
          </>
        )}
      </button>
    </form>
  );
};

export default ContactForm;
