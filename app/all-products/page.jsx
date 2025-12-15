import { Suspense } from "react";
import Navbar from "../../components/Navbar";
import AllProductsClient from "../../components/AllProductsClient";
import Footer from "../../components/Footer";

export default function Page() {
  return (
    <>
      <Suspense fallback={<div>Loading Navbar...</div>}>
        <Navbar />
      </Suspense>

      <Suspense fallback={<div>Loading Products...</div>}>
        <AllProductsClient />
      </Suspense>

      <Footer />
    </>
  );
}
