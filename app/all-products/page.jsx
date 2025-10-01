"use client"
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Suspense } from 'react';
import AllProductsClient from '@/components/AllProductsClient';

export default function Page() {
  return (
    <>
     
      <Suspense fallback={<div>Loading...</div>}>
       <Navbar />
        <AllProductsClient />
      </Suspense>
      <Footer />
    </>
  );
}
