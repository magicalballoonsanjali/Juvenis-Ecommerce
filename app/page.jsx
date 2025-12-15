"use client"
import Image from "next/image";
import Navbar from "../components/Navbar";
import HeaderSlider from "../components/HeaderSlider";
import HomeProducts from "../components/HomeProducts";
import FeaturedProduct from "../components/FeaturedProduct";
import SelfCareSimplified from "../components/SelfCareSimplified";
import Review from "../components/Review";
import Footer from "../components/Footer";
import Topslider from "../components/Topslider";
import MiddlePart from "../components/MiddlePart";

export default function Home() {
  return (
    <>
    <Topslider/>
    <Suspense>
    <Navbar/>
    </Suspense>
    <HeaderSlider/>
    <HomeProducts/>
    <FeaturedProduct/>
    <SelfCareSimplified/>
    <MiddlePart/>
    {/* <Review/> */}
    <Footer/>
    </>
  );
}
