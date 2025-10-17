import React from 'react'
import ProductPage from './ProductsPage'
import CollaborationSection from '../Components/Collaboration'
import Projects from '../Components/Projects'
import ProgressIndicator from '../Components/ProgressIndicator'
import { ArrowRight } from 'lucide-react'
import Footer from '../Components/Footer'
import TimelineSection from '../Components/Timeline'

const HomePage = () => {
  return (
    <div >
      <ProgressIndicator />
      <ProductPage />
      <Projects />
      <TimelineSection />
      <CollaborationSection />
     <Footer/>
    </div>
  )
}

export default HomePage