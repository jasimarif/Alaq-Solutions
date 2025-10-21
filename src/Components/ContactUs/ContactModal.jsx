import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { X } from 'lucide-react';
import { SlidingButton } from '../index';

const ContactModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    message: ''
  });
  const [show, setShow] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setShow(true);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    onClose();
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-all flex items-center justify-center  duration-300  z-50 font-poppins">
      <div ref={modalRef} className="bg-[#1a202c] rounded-4xl shadow-lg mx-4 flex relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-8 cursor-none bg-black/50 rounded-full p-2  text-white hover:text-gray-400 transition-colors duration-200 z-10"
        >
          <X size={24} />
        </button>
        <div className='flex items-center justify-center'>
        {/* Left side: heading */}
        <div className="flex-1 p-8 flex flex-col  justify-center ">
          <svg width="100" height="100" viewBox="0 0 24 12" fill="none" className="text-blue-400 mb-4">
            <path d="M12 2L8 10H16L12 2Z" fill="currentColor" />
            <path d="M8 10L4 18H20L16 10H8Z" fill="currentColor" opacity="0.7" />
          </svg>
          <h2 className="text-white text-8xl font-medium tracking-tighter font-poppins">
            Schedule a <span className='text-blue-400'>Meeting</span> 
          </h2>
          <p className='pt-8 text-white '>
            Let's get some basic info, and then we will get you on the calendar.
          </p>
        </div>
        {/* Right side: Form */}
        <div className="flex-1 p-8 mt-18">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-[#60a5fa] font-poppins"
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
                className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-[#60a5fa] font-poppins"
                required
              />
            </div>
            <div>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-[#60a5fa] font-poppins"
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
                className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-[#60a5fa] font-poppins"
                required
              />
            </div>
            <div>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                placeholder="Message"
                className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-[#60a5fa] font-poppins resize-none"
                required
              />
            </div>
          <div className="flex justify-end">
             <SlidingButton text={'Submit'}/>
            </div>   
          </form>
         
        </div>
        
        </div>
      </div>
    </div>
  );
};

export default ContactModal;