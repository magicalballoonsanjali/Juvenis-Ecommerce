"use client";

import React, { Suspense } from "react";
import {
  MapPin,
  Phone,
  ShoppingCart,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Clock3,
  ArrowRight,
  Mail,
  Sparkle,
  SparklesIcon,
} from "lucide-react";
import Navbar from "./Navbar";
import { Router } from "lucide-react";
import { useRouter } from "next/navigation";
import Footer from "./Footer";
import Footer2 from "./Footer2";
import { BsWhatsapp } from "react-icons/bs";

const ContactSection = () => {
    const router = useRouter();
  return (
    <div className="bg-[#f8fbff] text-gray-800">
        
               <Suspense fallback={<div>Loading Navbar...</div>}>
                <Navbar />
              </Suspense>
      {/* HERO SECTION */}
    <section className="relative overflow-hidden border-b border-blue-100 bg-[#f4efe2]">
  {/* Background Blur */}
  <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100 rounded-full blur-3xl opacity-40 -translate-y-1/2 translate-x-1/2" />

  <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-20 relative z-10">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
      
      {/* LEFT CONTENT */}
      <div className="max-w-3xl">
        <span className="inline-block px-4 py-2 rounded-full bg-[#e39992] text-white text-sm font-semibold mb-6">
          Contact Juvenis Clinic
        </span>

        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
          Get In Touch <br />
          With Us
        </h1>

        <p className="mt-6 text-lg md:text-xl text-gray-600 leading-8 max-w-2xl">
          Need help choosing the right skincare or haircare products?
          We’re available online, on call and in clinic to assist you.
        </p>

        <div className="flex flex-wrap gap-4 mt-10">
  <a
    href="/all-products"
    className="bg-[#e39992] hover:bg-[#d3776f] text-white px-8 py-4 rounded-2xl font-semibold shadow-lg shadow-blue-200 transition-all duration-300 hover:-translate-y-1 inline-flex items-center justify-center"
  >
    <ShoppingCart className="mr-2"/>Shop Online
  </a>

  <a
    href="https://wa.me/919769933396"
    target="_blank"
    rel="noopener noreferrer"
    className="border-2 border-[#e39992] text-[#e39992] hover:bg-[#d3776f] hover:text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 inline-flex items-center justify-center"
  >
   <BsWhatsapp size={25} className="mr-2"/> WhatsApp Us
  </a>
</div>
      </div>

      {/* RIGHT IMAGE */}
      <div className="relative flex justify-center lg:justify-end">
        {/* Glow */}
        <div className="absolute inset-0 bg-blue-200 blur-3xl opacity-30 rounded-full" />

        <img
          src="/address.jpg"
          alt="Juvenis Clinic"
          className="relative z-10 w-full max-w-[550px] object-contain drop-shadow-2xl rounded-xl"
        />
      </div>
    </div>
  </div>
</section>
      {/* MAIN GRID */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* SHOP ONLINE */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-8 border border-blue-100 shadow-md hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 rounded-2xl bg-pink-100 flex items-center justify-center mb-6">
              <ShoppingCart className="text-[#e39992]" size={30} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
             Shop Online
            </h3>


            <p className="text-gray-600 leading-8 mb-8">
              Browse and order your favorite skincare & haircare products
              directly from our website.
            </p>

            <ul className="space-y-3 text-gray-700 mb-8">
              <li className="flex gap-2"> <SparklesIcon size={20} className="text-[#e39992]"/> Easy Online Ordering</li>
              <li className="flex gap-2"><SparklesIcon size={20}  className="text-[#e39992]"/> Secure Payments</li>
              <li className="flex gap-2"><SparklesIcon size={20}  className="text-[#e39992]"/>Fast Delivery</li>
            </ul>

            <button onClick={()=>router.push("/all-products")} className="flex items-center gap-2 text-[#e39992] font-semibold hover:gap-4 transition-all">
              Explore Products
              <ArrowRight size={18} />
            </button>
          </div>

          {/* CALL / WHATSAPP */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-8 border border-blue-100 shadow-md hover:shadow-xl transition-all duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* LEFT */}
              <div>
                <div className="w-16 h-16 rounded-2xl bg-pink-100 flex items-center justify-center mb-6">
                  <MessageCircle className="text-[#e39992]" size={30} />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-5">
                  Order via Call or WhatsApp
                </h3>

                <p className="text-gray-600 leading-8 mb-6">
                  Want assistance before ordering? Our team can help you
                  with:
                </p>

                <ul className="space-y-4 text-gray-700">
                  <li>• Product recommendations</li>
                  <li>• Order placement</li>
                  <li>• Skin & haircare guidance</li>
                  <li>• Prescription-based product inquiries</li>
                </ul>
              </div>

              {/* RIGHT */}
              <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-3xl p-8">
                <div className="mb-8">
                  <p className="text-lg font-semibold tracking-wide uppercase text-[#e39992] pb-8">
                  CONTACT
                  </p>

                 <div className="space-y-3">
  <div className="flex items-center gap-3">
    <Phone className="text-[#e39992]" size={20} />

    <a
      href="tel:+919769933396"
      className="text-xl font-bold text-gray-900 hover:text-[#e39992] transition"
    >
      +91 9769933396
    </a>
  </div>

  <div className="flex items-center gap-3">
    <Phone className="text-[#e39992]" size={20} />

    <a
      href="tel:+919769911196"
      className="text-xl font-bold text-gray-900 hover:text-[#e39992] transition"
    >
      +91 9769911196
    </a>
  </div>
</div>
                </div>

                <div className="border-t border-blue-100 pt-6">
                  <div className="flex items-start gap-3">
                    <Clock3 className="text-[#e39992] mt-1" size={20} />

                    <div>
                      <p className="font-semibold text-gray-900 mb-2">
                         Available:
                      </p>

                      <p className="text-gray-600 leading-7">
                        Monday to Friday: 10am to 8pm
                      </p>

                      <p className="text-gray-600 leading-7">
                        Saturday: 10am to 2pm
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CLINIC */}
        {/* CLINIC */}
<div className="lg:col-span-12 bg-white rounded-3xl border border-blue-100 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">

  <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] min-h-[500px]">

    {/* LEFT CONTENT */}
    <div className="p-8 flex flex-col justify-center">
      <div className="w-16 h-16 rounded-2xl bg-pink-100 flex items-center justify-center mb-6">
        <MapPin className="text-[#e39992]" size={30} />
      </div>

      <h3 className="text-2xl font-bold text-gray-900 mb-5">
        Visit Our Clinic
      </h3>

      <p className="text-gray-600 leading-8 text-lg">
        Prefer buying in person?
        <br />
        Visit our clinic for personalized assistance and product guidance.
      </p>

      <div className="mt-8">
        <h4 className="font-bold text-gray-900 mb-3 text-lg">
          Clinic Address
        </h4>

        <p className="text-gray-600 leading-8">
         <b>Juvenis Clinic </b>  <br/>4 Adarsh, Ground floor, Behind Archies gallery,<br/>
          86 S V Road, Santacruz west, Mumbai 400054
        </p>
      </div>

      {/* TIMINGS */}
      <div className="mt-8 bg-pink-100 rounded-3xl p-6 border border-blue-100">
        <div className="flex items-start gap-4">
          <Clock3 className="text-[#e39992] mt-1" size={22} />

          <div>
            <h4 className="font-bold text-gray-900 mb-4">
              Clinic Timings
            </h4>

            <p className="text-gray-600 leading-7">
              Monday to Friday: 10am to 8pm
            </p>

            <p className="text-gray-600 leading-7">
              Saturday: 10am to 2pm
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* RIGHT MAP */}
    <div className="h-[350px] lg:h-full">
      <iframe
        title="Juvenis Clinic Map"
        src="https://www.google.com/maps?q=Juvenis+Clinic+Santacruz+West+Mumbai&output=embed"
        className="w-full h-full border-0"
        allowFullScreen=""
        loading="lazy"
      ></iframe>
    </div>

  </div>
</div>

          {/* map */}
        

          
     
      
        </div>
      </section>

      {/* MAP */}
      {/* <section className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 pb-24">
        <div className="bg-white rounded-[32px] overflow-hidden border border-blue-100 shadow-lg">
          <div className="p-8 border-b border-blue-100">
            <h3 className="text-3xl font-bold text-gray-900 mb-3">
              Find Us
            </h3>

            <p className="text-gray-600">
              Visit our clinic in Santacruz West, Mumbai.
            </p>
          </div>

          <div className="w-full h-[450px]">
            <iframe
              title="Juvenis Clinic Map"
              src="https://www.google.com/maps?q=Juvenis+Clinic+Santacruz+West+Mumbai&output=embed"
              className="w-full h-full border-0"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section> */}

      {/* WHY CHOOSE US */}
          <div className="lg:col-span-5 bg-white text-gray-700 rounded-3xl p-8 shadow-xl gap-10 flex  justify-center  flex-col items-center my-20">
            <h3 className="text-3xl font-medium pt-10 text-center">
              Why Customers Choose Us
            </h3>

            <div className="flex md:space-x-30 md:justify-between md:flex-row  flex-col gap-20 md:gap-10 justify-center items-center text-center py-8">
              <div className="flex gap-2 flex-col  justify-center items-center">
                <ShieldCheck size={60} className="mb-3 text-[#e39992] " />
                <p className="text-lg  leading-7">
                 GENUINE PRODUCTS
                </p>
              </div>

              <div className="flex gap-2 flex-col justify-center items-center">
                <Sparkles size={60} className="mb-3 text-[#e39992]" />
                <p className="text-lg leading-7">
                    EXPERT GUIDANCE
                </p>
              </div>

              <div className="flex gap-2 flex-col justify-center items-center">
                <ShieldCheck size={60} className="mb-3 text-[#e39992]" />
                <p className="text-lg leading-7">
       TRUSTED SKINCARE & HAIRCARE SOLUTIONS
                </p>
              </div>

              <div className="flex gap-2 flex-col justify-center items-center">
                <ShoppingCart size={60} className="mb-3 text-[#e39992]" />
                <p className="text-lg leading-7">
                  EASY ORDERING OPTIONS
                </p>
              </div>
            </div>
          </div>

      {/* FOOTER CARD */}
      <section className="pb-20 px-6 pt-20">
        <div className="max-w-4xl mx-auto bg-white border border-blue-100 rounded-[32px] p-10 shadow-xl text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Need More Information?
          </h3>

          <p className="text-gray-600 leading-8 mb-8">
            We’re here to help you choose the right skincare & haircare
            solutions with expert support and personalized guidance.
          </p>

          <div className="flex  justify-center ">
  {/* <a
    href="/contact"
    className="bg-[#009bf1] hover:bg-[#0284d1] text-white px-8 py-4 rounded-2xl font-semibold transition-all inline-flex items-center justify-center"
  >
    Contact Us
  </a> */}

  <a
    href="mailto:products@juvenisinnovations.in"
    className="border border-[#e39992] text-[#e39992] px-4 md:px-8 py-4 rounded-2xl font-semibold hover:bg-blue-50 transition-all flex items-center gap-2"
  >
    <Mail size={18} />
    products@juvenisinnovations.in
  </a>
</div>
        </div>
      </section>
      <Footer2/>
    </div>
  );
};

export default ContactSection;