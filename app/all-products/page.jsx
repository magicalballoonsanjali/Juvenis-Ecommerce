import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Suspense } from 'react';
import AllProductsClient from '@/components/AllProductsClient';

export default function Page() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <AllProductsClient />
      </Suspense>
      <Footer />
    </>
  );
}
