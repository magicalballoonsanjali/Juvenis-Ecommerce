import React from 'react'
import Navbar from '../../components/Navbar'
import Footer2 from '../../components/Footer2'

const page = () => {
  return (
    <div>
        <Navbar/>
       <div className='space-y-10 max-w-7xl mx-auto mt-8'>
      <section className="bg-white  rounded-xl p-6 md:p-8 mt-5 ">
  <h2 className="text-2xl font-semibold text-[#1c479e] mb-6 border-b pb-3">
    Shipping Policy
  </h2>

  <div className="space-y-5 text-sm md:text-[15px] leading-7 text-gray-600">

    <p>
      Thank you for shopping from Juvenis Inovations website.
    </p>

    <div>
      <h3 className="text-lg font-medium text-gray-800 mb-3">
        Shipping Policy:
      </h3>

      <ul className="list-disc pl-5 space-y-2">
        <li>
          Shipping cost is calculated on a "per order," "per item" or
          "per pound" basis.
        </li>

        <li>
          We sometimes offer free delivery for specific shipping options
          in select categories, or free shipping sitewide.
        </li>

        <li>
          Shipping charges would be anywhere between Rs. 100- Rs. 300,
          depending on products/location.
        </li>

        <li>
          Products will be delivered within 5-7 business days.
        </li>

        <li>
          Certain products may require additional days to process prior
          to delivery.
        </li>

        <li>
          In certain condition, product delivery may be delayed.
        </li>
      </ul>
    </div>

    <p>
      If, for any reason, you are not completely satisfied with a
      purchase, we request you to review our policy on Returns,
      Cancellations, Replacement and Refunds.
    </p>

    <div>
      <h3 className="text-lg font-medium text-gray-800 mb-2">
        Contact Us:
      </h3>

      <p>
        If you have any questions about our Returns and Refunds Policy,
        please email us on products@juvenisinnovations.in.
      </p>
    </div>

  </div>
</section>
</div>
<Footer2/>
    </div>
  )
}

export default page
