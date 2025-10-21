import { ArrowRight } from 'lucide-react'
import React from 'react'

const SlidingButton = ({text, shadow, onClick}) => {
  return (
    <button onClick={onClick} className={`relative bg-[#60a5fa]  hover:text-white text-white px-6 py-3 rounded-full font-poppins cursor-none font-medium text-lg overflow-hidden flex items-center gap-6 group ${shadow ? 'shadow-lg hover:shadow-xl' : ''}`}>
          <span className="relative z-10 transition-colors duration-500">{text}</span>
          <div className='relative z-10 bg-blue-500 rounded-full p-2 group-hover:bg-white transition-colors duration-500'>
            <ArrowRight className="text-white group-hover:text-blue-500 transition-colors duration-500" size={22} />
          </div>

          {/* Sliding background overlay */}
          <div className="absolute inset-0 bg-blue-500 rounded-full transform translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
        </button>
  )
}

export default SlidingButton