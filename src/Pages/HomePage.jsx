import React from 'react'
import ProductPage from './ProductsPage'
import CollaborationSection from '../Components/Collaboration'
import Projects from '../Components/Projects'
import ProgressIndicator from '../Components/ProgressIndicator'

const HomePage = () => {
  return (
    <div >
        <ProgressIndicator />
        <ProductPage/>
        <Projects/>
        <CollaborationSection/>
    </div>
  )
}

export default HomePage