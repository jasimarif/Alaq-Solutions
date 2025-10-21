import React from 'react'
import { ProductsPage as ProductPage } from '../index'
import { Collaboration as CollaborationSection, Projects, ProgressIndicator, Footer, Timeline as TimelineSection, WhyChooseUs, TestimonialSection } from '../../Components'
import { ArrowRight } from 'lucide-react'

const HomePage = () => {
  return (
    <div className="bg-[#1a202c]">
      <ProgressIndicator />
      <ProductPage />
      <Projects />
      <WhyChooseUs />
      <TimelineSection />
      <TestimonialSection/>
      <CollaborationSection />
      <Footer />
    </div>
  )
}

export default HomePage