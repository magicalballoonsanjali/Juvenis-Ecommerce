import React from 'react'
import AllProductsClient from '../../components/AllProductsClient'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
        <Navbar/>
      <AllProductsClient/>
      <Footer/>
     </Suspense>
  )
}

export default page
