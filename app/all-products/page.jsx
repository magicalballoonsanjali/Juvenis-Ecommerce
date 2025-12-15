import React from 'react'
import AllProductsClient from '../../components/AllProductsClient'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

const page = () => {
  return (
    <div>
        <Navbar/>
      <AllProductsClient/>
      <Footer/>
    </div>
  )
}

export default page
