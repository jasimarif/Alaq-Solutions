import React, { useEffect, useRef } from 'react'
import ProductPage from './ProductsPage'
import LandingPage from './LandingPage'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HomePage from './HomePage'

gsap.registerPlugin(ScrollTrigger)

const MainPage = () => {
  const containerRef = useRef(null)
  const landingRef = useRef(null)
  const homeRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(homeRef.current, {
        y: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10
      })

      gsap.to(homeRef.current, {
        y: '0vh',
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          pin: landingRef.current,
          pinSpacing: false,
          markers: false
        }
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="relative">
      <div ref={landingRef} className="h-screen w-full">
        <LandingPage/>
      </div>
      <div className="h-screen w-full"></div>
      <div ref={homeRef} className="w-full">
        <HomePage/>
      </div>

    </div>

  )
}

export default MainPage

