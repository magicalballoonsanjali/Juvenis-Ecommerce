import React from "react";
import { assets } from "../assets/juvenis-assets";
import Image from "next/image";
import Link from "next/link";
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer2 = () => {
  return (
    <footer className="bg-[#fafafa] border-t border-gray-200 mt-20">
      
      {/* Main Footer */}
      <div className="max-w-8xl mx-auto px-6 md:px-8 lg:px-10 py-14">


            
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & About */}
          <div className="flex flex-col justify-between ">
            <Image
              className="w-52"
              src={assets.logo}
              alt="Juvenis Logo"
            />



            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-6">
              <a
                href="#"
                className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-black hover:text-white transition-all duration-300"
              >
                <FaInstagram size={15} />
              </a>

              <a
                href="#"
                className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-black hover:text-white transition-all duration-300"
              >
                <FaFacebookF size={14} />
              </a>

              <a
                href="#"
                className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-black hover:text-white transition-all duration-300"
              >
                <FaTwitter size={14} />
              </a>

              <a
                href="#"
                className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-black hover:text-white transition-all duration-300"
              >
                <FaLinkedinIn size={14} />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h2 className="text-base font-semibold text-gray-900 mb-5">
              Company
            </h2>

            <ul className="space-y-3 text-sm text-gray-500">
              <li>
                <Link
                  href="/"
                  className="hover:text-black transition duration-300"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/about-us"
                  className="hover:text-black transition duration-300"
                >
                  About Us
                </Link>
              </li>

              {/* <li>
                <Link
                  href="/contact"
                  className="hover:text-black transition duration-300"
                >
                  Contact Us
                </Link>
              </li> */}

              <li>
                <Link
                  href="/all-products"
                  className="hover:text-black transition duration-300"
                >
                  Products
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h2 className="text-base font-semibold text-gray-900 mb-5">
              Policies
            </h2>

            <ul className="space-y-3 text-sm text-gray-500">
              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:text-black transition duration-300"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  href="/t&c"
                  className="hover:text-black transition duration-300"
                >
                  Terms & Conditions
                </Link>
              </li>

              <li>
                <Link
                  href="/cancellation-refund-policy"
                  className="hover:text-black transition duration-300"
                >
                  Cancellation / Refund Policy
                </Link>
              </li>

              <li>
                <Link
                  href="/shipping-policy"
                  className="hover:text-black transition duration-300"
                >
                  Shipping Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-base font-semibold text-gray-900 mb-5">
              Get In Touch
            </h2>

            <div className="space-y-3 text-sm text-gray-500">
              <p> 9769933396</p>

              <p className="break-words">
            products@juvenisinnovations.in
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-5 flex flex-col md:flex-row items-center justify-between gap-3 justify-center flex">

          <p className="text-xs md:text-sm text-gray-500 text-center">
            © 2026 Juvenis Innovations LLP. All Rights Reserved.
          </p>

          {/* <div className="flex items-center gap-5 text-xs md:text-sm text-gray-500">
            <Link
              href="/policies"
              className="hover:text-black transition"
            >
              Privacy
            </Link>

            <Link
              href="/policies"
              className="hover:text-black transition"
            >
              Terms
            </Link>

            <Link
              href="/contact"
              className="hover:text-black transition"
            >
              Support
            </Link>
          </div> */}

        </div>
      </div>
    </footer>
  );
};

export default Footer2;