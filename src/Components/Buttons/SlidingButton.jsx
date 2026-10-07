import { ArrowRight } from 'lucide-react'
import React from 'react'

const SlidingButton = ({ text, shadow, onClick, className = '' }) => {
  return (
    <button 
      onClick={onClick} 
      className={`relative inline-flex items-center justify-center gap-2.5 sm:gap-3 bg-accent-soft hover:text-white text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-poppins cursor-pointer font-semibold text-sm sm:text-base overflow-hidden group transition-all duration-300 ${shadow ? 'shadow-md hover:shadow-lg shadow-accent/20' : ''} ${className}`}
    >
      <span className="relative z-10 transition-colors duration-500 whitespace-nowrap">{text}</span>
      <div className='relative z-10 bg-accent rounded-full p-1 sm:p-1.5 group-hover:bg-white transition-colors duration-500 flex-shrink-0'>
        <ArrowRight className="text-white group-hover:text-accent transition-colors duration-500 w-3.5 h-3.5 sm:w-4 sm:h-4" />
      </div>

      {/* Sliding background overlay */}
      <div className="absolute inset-0 bg-blue-600 rounded-full transform translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
    </button>
  )
}

export default SlidingButton