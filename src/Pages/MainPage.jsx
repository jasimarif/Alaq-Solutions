import React, { useEffect, useRef } from 'react'
import LandingPage from './LandingPage'
import HomePage from './HomePage'
import ScrollTabsComponent from '../Components/WhyChooseUs'
import WhyChooseUsFade from '../Components/WhyChooseUsFade'
import WhyChooseUs from '../Components/WhyChooseUs'

const MainPage = () => {
  return (
    <div className="bg-[#0f1419]">
        <LandingPage/>
        <HomePage/>
        
    </div>

  )
}

export default MainPage

