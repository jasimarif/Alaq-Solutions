import React from 'react'
import ProductPage from './ProductsPage'
import CollaborationSection from '../Components/Collaboration'
import Projects from '../Components/Projects'

const HomePage = () => {
  return (
    <div >
        <ProductPage/>
        <Projects/>
        <CollaborationSection/>
    </div>
  )
}

export default HomePage