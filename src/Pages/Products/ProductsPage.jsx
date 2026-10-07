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
      <span className="absolute rounded-2xl bottom-0 left-0 right-0 h-[3px] bg-accent-soft transform translate-y-1/2" />
    )}
  </button>
);

const ProductPage = () => {
  const [activeTab, setActiveTab] = useState('core');

 

  return (
    <div className="min-h-screen w-full bg-bg-dark py-12 px-4 sm:px-8 font-poppins flex items-center justify-center">
      <div className="max-w-7xl w-full mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-5xl font-light tracking-tight text-white mb-4">
            Two separate products<br />that are better together.
          </h1>
        </div>

        <div className="flex justify-center mb-10 border-b border-gray-600 w-fit mx-auto">
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

        {/* cards - responsive grid/flex */}
        <div className='flex flex-col lg:flex-row justify-center items-center gap-6 max-w-5xl mx-auto'>
          {/* Left column (card 1) */}
          <div className='w-full lg:w-1/2'>
            <div 
              className='bg-[#374151] p-6 sm:p-10 rounded-3xl h-[20rem] sm:h-[28rem] w-full will-change-transform overflow-hidden relative border border-border-dark shadow-xl'
            >
            </div>
          </div>

          {/* Right column (cards 2 and 3) */}
          <div className='w-full lg:w-1/2 flex flex-col gap-4'>
            <div 
              className='bg-[#374151] rounded-3xl h-[12rem] sm:h-[18rem] w-full will-change-transform border border-border-dark shadow-xl'
            >
            </div>
            
            <div 
              className='bg-[#374151] rounded-3xl h-[7rem] sm:h-[9rem] w-full will-change-transform border border-border-dark shadow-xl'
            >
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;