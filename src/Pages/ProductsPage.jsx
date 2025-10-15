import React, { useState } from 'react';



const TabButton = ({ active, children, onClick }) => (
  <button
    onClick={onClick}
    className={`px-6 py-3 text-base font-medium cursor-pointer tracking-tighter transition-all relative`}
  >
    <span className={active ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'}>
      {children}
    </span>
    {active && (
      <span className="absolute rounded-2xl bottom-0 left-0 right-0 h-[3px] bg-indigo-600 transform translate-y-1/2" />
    )}
  </button>
);

const ProductPage = () => {
  const [activeTab, setActiveTab] = useState('core');

 

  return (
    <div  className="min-h-screen w-full bg-white p-8 font-poppins flex items-center justify-center">
      <div className="max-w-7xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-light tracking-tighter text-gray-900 mb-4">
            Two separate products<br />that are better together.
          </h1>
        </div>

        <div className="flex justify-center mb-12 border-b border-gray-200 w-fit mx-auto">
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
              className='bg-[#F3F2F6] pl-10 pt-20 rounded-3xl h-[28rem] w-[30rem] will-change-transform overflow-hidden relative'
            >
            </div>
          </div>

          {/* Right column (cards 2 and 3) */}
          <div className='flex flex-col gap-4'>
            <div 
              className='bg-[#F3F2F6] rounded-3xl h-[19rem] w-[22rem] will-change-transform'
            >
            </div>
            
            <div 
              className='bg-[#F3F2F6] rounded-3xl h-[8rem] w-[22rem] will-change-transform'
            >
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;