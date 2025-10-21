import React, { useEffect, useRef } from 'react'
import { LandingPage, HomePage } from './index'
import { WhyChooseUs as ScrollTabsComponent, WhyChooseUsFade, WhyChooseUs } from '../Components'

const MainPage = () => {
  return (
    <div className="bg-[#0f1419]">
        <LandingPage/>
        <HomePage/>
        
    </div>

  )
}

export default MainPage

