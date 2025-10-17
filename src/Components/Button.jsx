import { ArrowRight } from 'lucide-react'
import React from 'react'

const SlidingButton = ({text, shadow}) => {
  return (
    <button className={`relative bg-darkGreen  hover:text-white text-white/90 px-6 py-3 rounded-full font-poppins cursor-none font-medium text-lg overflow-hidden flex items-center gap-3 group ${shadow ? 'shadow-lg hover:shadow-xl' : ''}`}>
          <span className="relative z-10 transition-colors duration-500">{text}</span>
          <div className='relative z-10 bg-[#FF862F] rounded-full p-2 group-hover:bg-white transition-colors duration-500'>
            <ArrowRight className="text-white group-hover:text-[#FF862F] transition-colors duration-500" size={22} />
          </div>

          {/* Sliding background overlay */}
          <div className="absolute inset-0 bg-[#FF862F] rounded-full transform translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
        </button>
  )
}

export default SlidingButton