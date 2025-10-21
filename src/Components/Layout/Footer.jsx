import { ArrowRight } from 'lucide-react'
import React, { useState } from 'react'
import { ContactModal, SlidingButton } from '../index';

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
     <div className='bg-[#1a202c] w-full overflow-hidden flex flex-col justify-center items-center'>
        <SlidingButton text={'Contact Us'}/>
        <div className="text-center  flex items-end justify-center pt-8 pb-0 mb-0" style={{ paddingBottom: '0', marginBottom: '0' }}>
          <svg width="160" height="160" viewBox="0 0 24 12" fill="none" className="text-blue-400" style={{ marginBottom: '0', paddingBottom: '0', display: 'block' }}>
            <path d="M12 2L8 10H16L12 2Z" fill="currentColor" />
            <path d="M8 10L4 18H20L16 10H8Z" fill="currentColor" opacity="0.7" />
          </svg>
          <div className="text-white text-[10rem] font-bold font-poppins bottom-0 tracking-tighter leading-none pt-4" style={{ height: '9rem' }}>

            ALAQ Solutions.
          </div>
        </div>
        <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
  )
}

export default Footer