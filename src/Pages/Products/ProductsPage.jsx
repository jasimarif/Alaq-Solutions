import React, { useState } from 'react';



const TabButton = ({ active, children, onClick }) => (
  <button
    onClick={onClick}
    className={`px-6 py-3 text-base font-medium cursor-none tracking-tighter transition-all relative`}
  >
    <span className={active ? 'text-white' : 'text-gray-400 hover:text-gray-300'}>
      {children}
    </span>
    {active && (
      <span className="absolute rounded-2xl bottom-0 left-0 right-0 h-[3px] bg-[#60a5fa] transform translate-y-1/2" />
    )}
  </button>
);

const ProductPage = () => {
  const [activeTab, setActiveTab] = useState('core');

 

  return (
    <div  className="min-h-screen w-full bg-[#1a202c] p-8 font-poppins flex items-center justify-center">
      <div className="max-w-7xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-light tracking-tighter text-white mb-4">
            Two separate products<br />that are better together.
          </h1>
        </div>

        <div className="flex justify-center mb-12 border-b border-gray-600 w-fit mx-auto">
          <TabButton
            active={activeTab === 'core'}
            onClick={() => setActiveTab('core')}
          >
            Core Accounting
          </TabButton>
          <TabButton
            active={activeTab === 'revenue'}
            onClick={() => setActiveTab('revenue')}
          >
            Revenue Automation
          </TabButton>
        </div>

        {/* cards - using flexbox for better centering */}
        <div className='flex justify-center items-center gap-4'>
          {/* Left column (card 1) */}
          <div className='relative'>
            <div 
              className='bg-[#374151] pl-10 pt-20 rounded-3xl h-[28rem] w-[30rem] will-change-transform overflow-hidden relative border border-[#4b5563]'
            >
            </div>
          </div>

          {/* Right column (cards 2 and 3) */}
          <div className='flex flex-col gap-4'>
            <div 
              className='bg-[#374151] rounded-3xl h-[19rem] w-[22rem] will-change-transform border border-[#4b5563]'
            >
            </div>
            
            <div 
              className='bg-[#374151] rounded-3xl h-[8rem] w-[22rem] will-change-transform border border-[#4b5563]'
            >
            </div>
          </div>

         
        </div>
      </div>
    </div>
  );
};

export default ProductPage;