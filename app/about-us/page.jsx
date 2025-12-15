import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Aboutus from '../../components/Aboutus'
import { Suspense } from "react";

const page = () => {
  return (
    <>
    <Suspense fallback={<div>Loading...</div>}>
      <Navbar/>
   </Suspense>
      <Aboutus/>
      <Footer/>
      </>
  )
}

export default page
