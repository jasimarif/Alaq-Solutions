import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { X, Mail, AlertCircle, CheckCircle } from 'lucide-react';
import { SlidingButton } from '../index';
import { initEmailJS, sendContactEmail, validateEmailJSConfig } from '../../utils/emailjs';

const ContactModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    message: ''
  });
  const [show, setShow] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); 
  const [statusMessage, setStatusMessage] = useState('');
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setShow(true);
      setSubmitStatus(null);
      setStatusMessage('');
    } else if (show) {
      gsap.to(modalRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => setShow(false)
      });
    }
  }, [isOpen, show]);

  useEffect(() => {
    if (show && modalRef.current) {
      gsap.fromTo(modalRef.current, 
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" }
      );
    }
  }, [show]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setStatusMessage('');

    try {
      if (!validateEmailJSConfig()) {
        throw new Error('EmailJS configuration is incomplete. Please check your .env file.');
      }

      if (!initEmailJS()) {
        throw new Error('Failed to initialize EmailJS.');
      }

      // Send email using utility function
      const result = await sendContactEmail(formData);

      console.log('Email sent successfully:', result);
      setSubmitStatus('success');
      setStatusMessage('Thank you! Your message has been sent successfully.');
      
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        message: ''
      });

      setTimeout(() => {
        onClose();
        setSubmitStatus(null);
        setStatusMessage('');
      }, 3000);

    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
      
      if (error.message.includes('configuration')) {
        setStatusMessage('Configuration error. Please contact the administrator.');
      } else if (error.status === 412) {
        setStatusMessage('Email service authentication error. Please check the setup guide.');
      } else if (error.status === 400) {
        setStatusMessage('Please check your input and try again.');
      } else if (error.status === 429) {
        setStatusMessage('Too many requests. Please try again later.');
      } else if (error.status === 401) {
        setStatusMessage('Authentication failed. Please check email service configuration.');
      } else {
        setStatusMessage('Sorry, there was an error sending your message. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-all flex items-center justify-center duration-300 z-50 font-poppins p-4 sm:p-6">
      <div 
        ref={modalRef} 
        className="bg-[#1a202c] rounded-3xl sm:rounded-4xl shadow-2xl w-full max-w-4xl relative max-h-[92vh] overflow-y-auto border border-gray-700"
      >
        <button
          onClick={onClose}
          aria-label="Close contact modal"
          className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-gray-800/80 hover:bg-gray-700 rounded-full p-2.5 text-gray-300 hover:text-white transition duration-200 z-20 border border-gray-600/50"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col lg:flex-row items-stretch">
          {/* Left side: heading */}
          <div className="p-6 sm:p-10 lg:w-5/12 flex flex-col justify-center bg-[#151c27] rounded-t-3xl lg:rounded-tr-none lg:rounded-l-3xl border-b lg:border-b-0 lg:border-r border-gray-700/50">
            <div className="mb-4 inline-block">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white flex items-center justify-center p-2 shadow-lg ring-2 ring-blue-400/40 overflow-hidden flex-shrink-0">
                <img 
                  src="/logo.png" 
                  alt="ALAQ Solutions Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <h2 className="text-white text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight font-poppins">
              Schedule a <span className="text-blue-400">Meeting</span> 
            </h2>
            <p className="pt-4 text-gray-300 text-sm sm:text-base leading-relaxed">
              Let's get some basic info, and then we will get you on the calendar.
            </p>
          </div>

          {/* Right side: Form */}
          <div className="p-6 sm:p-10 lg:w-7/12 flex flex-col justify-center">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    className="w-full px-4 py-3 bg-gray-800 text-white rounded-xl border border-gray-600 focus:outline-none focus:border-[#60a5fa] font-poppins text-sm"
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    className="w-full px-4 py-3 bg-gray-800 text-white rounded-xl border border-gray-600 focus:outline-none focus:border-[#60a5fa] font-poppins text-sm"
                    required
                  />
                </div>
              </div>

              <div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Business Email"
                  className="w-full px-4 py-3 bg-gray-800 text-white rounded-xl border border-gray-600 focus:outline-none focus:border-[#60a5fa] font-poppins text-sm"
                  required
                />
              </div>

              <div>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Company Name"
                  className="w-full px-4 py-3 bg-gray-800 text-white rounded-xl border border-gray-600 focus:outline-none focus:border-[#60a5fa] font-poppins text-sm"
                  required
                />
              </div>

              <div>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="3"
                  placeholder="How can we help your team?"
                  className="w-full px-4 py-3 bg-gray-800 text-white rounded-xl border border-gray-600 focus:outline-none focus:border-[#60a5fa] font-poppins text-sm resize-none"
                  required
                />
              </div>
              
              {/* Status Message */}
              {submitStatus && (
                <div className={`flex items-center gap-2 p-3 rounded-lg ${
                  submitStatus === 'success' 
                    ? 'bg-green-900/30 text-green-400 border border-green-400/30' 
                    : 'bg-red-900/30 text-red-400 border border-red-400/30'
                }`}>
                  {submitStatus === 'success' ? (
                    <CheckCircle size={18} className="flex-shrink-0" />
                  ) : (
                    <AlertCircle size={18} className="flex-shrink-0" />
                  )}
                  <span className="text-sm font-poppins">{statusMessage}</span>
                </div>
              )}
              
              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto relative overflow-hidden bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-poppins transition-all duration-300 flex items-center justify-center gap-2 font-medium"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Mail size={16} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </div>   
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;