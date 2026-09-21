import { ArrowRight } from 'lucide-react'
import React, { useState } from 'react'
import { ContactModal, SlidingButton } from '../index';

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
     <footer className='bg-[#1a202c] w-full overflow-hidden flex flex-col justify-center items-center pt-16 sm:pt-24 pb-8 px-4 font-poppins'>
        <SlidingButton text={'Contact Us'} onClick={() => setIsModalOpen(true)} />
        <div className="text-center flex flex-wrap items-center justify-center gap-3 sm:gap-5 pt-10 sm:pt-16 pb-4 max-w-full">
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white flex items-center justify-center p-2 shadow-xl ring-2 ring-blue-400/40 overflow-hidden flex-shrink-0">
            <img 
              src="/logo.png" 
              alt="ALAQ Solutions Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <div className="text-white text-3xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tighter leading-none">
            ALAQ <span className="text-blue-400">Solutions.</span>
          </div>
        </div>
        <p className="text-gray-500 text-xs sm:text-sm mt-6 text-center">
          &copy; {new Date().getFullYear()} ALAQ Solutions. All rights reserved.
        </p>
        <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </footer>
  )
}

export default Footer