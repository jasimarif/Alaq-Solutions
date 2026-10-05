import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { X, Sparkles } from 'lucide-react';
import ContactForm from './ContactForm';

const ContactModal = ({ isOpen, onClose, defaultOffer = null }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.95, y: 15 },
        { opacity: 1, scale: 1, y: 0, duration: 0.25, ease: 'power2.out' }
      );
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
      className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-all flex items-center justify-center z-50 font-poppins p-4 sm:p-6"
    >
      <div
        ref={modalRef}
        className="bg-[#1a202c] rounded-3xl shadow-2xl w-full max-w-4xl relative max-h-[92vh] overflow-y-auto border border-gray-700/80"
      >
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-gray-800/80 hover:bg-gray-700 rounded-full p-2.5 text-gray-300 hover:text-white transition duration-200 z-20 border border-gray-600/50 link"
        >
          <X size={18} />
        </button>

        <div className="flex flex-col lg:flex-row items-stretch">
          {/* Left column */}
          <div className="p-6 sm:p-8 lg:p-10 lg:w-5/12 flex flex-col justify-between bg-[#131924] rounded-t-3xl lg:rounded-tr-none lg:rounded-l-3xl border-b lg:border-b-0 lg:border-r border-gray-800">
            <div>
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center p-2 shadow-lg ring-2 ring-blue-400/40 overflow-hidden mb-6">
                <img
                  src="/logo.png"
                  alt="ALAQ Solutions Logo"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Pragmatic Automation</span>
              </div>

              <h2
                id="contact-modal-title"
                className="text-white text-2xl sm:text-3xl font-bold tracking-tight"
              >
                Send Us a <span className="text-blue-400">Message</span>
              </h2>

              <p className="pt-3 text-gray-300 text-sm leading-relaxed">
                Tell us about the paperwork bottleneck slowing down your shop. We will review your workflow and follow up promptly.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-800/80 text-xs text-gray-400 space-y-1">
              <p className="font-semibold text-gray-300">ALAQ Solutions</p>
              <p>Windsor, Ontario</p>
              <p>Serving Ontario and Michigan operations</p>
            </div>
          </div>

          {/* Right column: Shared Form */}
          <div className="p-6 sm:p-8 lg:p-10 lg:w-7/12">
            <ContactForm
              onSuccess={onClose}
              offerLabel={defaultOffer}
              buttonText="Send Workflow Note"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;