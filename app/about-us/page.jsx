import Aboutus from "@/components/Aboutus";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

import React, { Suspense } from 'react'

const page = () => {
  return (
    <>
      <Suspense fallback={<div>Loading Navbar...</div>}>
        <Navbar />
        <Aboutus />
      </Suspense>
       <Footer/>
    </>
  );
};

export default page;
