import { ArrowRight } from 'lucide-react'
import React from 'react'

const Footer = () => {
  return (
     <div className='bg-[#132D25] w-full overflow-hidden flex flex-col justify-center items-center'>
        <button className="relative bg-[#d4f4af] hover:text-white text-[#1a3a35] px-6 py-3 rounded-full font-poppins cursor-none font-semibold text-lg overflow-hidden flex items-center gap-3 group shadow-lg hover:shadow-xl">
          <span className="relative z-10 transition-colors duration-500">Contact Us</span>
          <div className='relative z-10 bg-[#FF862F] rounded-full p-2 group-hover:bg-white transition-colors duration-500'>
            <ArrowRight className="text-white group-hover:text-[#FF862F] transition-colors duration-500" size={22} />
          </div>

          {/* Sliding background overlay */}
          <div className="absolute inset-0 bg-[#FF862F] rounded-full transform translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
        </button>
        <div className="text-center  flex items-end justify-center pt-8 pb-0 mb-0" style={{ paddingBottom: '0', marginBottom: '0' }}>
          <svg width="160" height="160" viewBox="0 0 24 12" fill="none" className="text-orange-500" style={{ marginBottom: '0', paddingBottom: '0', display: 'block' }}>
            <path d="M12 2L8 10H16L12 2Z" fill="currentColor" />
            <path d="M8 10L4 18H20L16 10H8Z" fill="currentColor" opacity="0.7" />
          </svg>
          <div className="text-white text-[10rem] font-bold font-poppins bottom-0 tracking-tighter leading-none pt-4" style={{ height: '9rem' }}>

            ALAQ Solutions.
          </div>
        </div>
      </div>
  )
}

export default Footer