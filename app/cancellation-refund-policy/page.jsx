import React from 'react'
import Navbar from '../../components/Navbar'
import Footer2 from '../../components/Footer2'

const page = () => {
  return (
    <div>

    
      <Navbar/>
    <div className='space-y-10 max-w-7xl mx-auto mt-5'>
{/* Cancellation / Refund Policy */}
<section className="  p-6 md:p-8 ">
  <h2 className="text-2xl font-semibold text-[#1c479e] mb-6 border-b pb-3">
    Cancellation / Refund Policy
  </h2>

  <div className="space-y-5 text-sm md:text-[15px] leading-7 text-gray-600">
    
    <div>
      <h3 className="text-lg font-medium text-gray-800 mb-3">
        Cancellation/Refund Policy
      </h3>

      <ul className="list-disc space-y-2">
        <p>
          Thank you for shopping from Juvenis Inovations website.
        </p>
      </ul>
    </div>

    {/* Cancellation */}
    <div>
      <h3 className="text-lg font-medium text-gray-800 mb-3">
        Cancellation:
      </h3>


        <p>
          We ship the product within 3-5 days of receiving the order.
        

  
          You can raise a cancellation request by sending us an email on{" "}
          <span className="font-medium">
            products@juvenisinnovations.in
          </span>.
        </p>

    </div>

    {/* Return / Replacement */}
    <div>
      <h3 className="text-lg font-medium text-gray-800 mb-3">
        Return/Replacement:
      </h3>

      <p className="mb-3">
        Returns and Replacements can be requested within 7 days of delivery of
        the order, for the following reasons:
      </p>

      <ul className="list-disc pl-5 space-y-2">
        <li>Wrong products delivered</li>
        <li>Damaged products delivered</li>
        <li>Expired products delivered</li>

 </ul>
        <p>
          You can raise a request to return/replace your order by sending us an
          email on{" "}
          <span className="font-medium">
            products@juvenisinnovations.in
          </span>
        </p>
        <p>
          Once we receive a return/replacement request, you can ship the
          product to us.
        </p>

        <p>
          The product should be shipped in original packaging with all
          accompanying material in intact form.
        </p>

        <p>
          If the conditions for return are met, we will refund the amount in
          your mode of payment.
        </p>
     
    </div>

    {/* Refund */}
    <div>
      <h3 className="text-lg font-medium text-gray-800 mb-3">
        Refund:
      </h3>

      <ul className="list-disc  space-y-1">
        <p>
          Refunds for cancellations will be initiated within 2 working days of
          receipt of the cancellation request.
        </p>

        <p>
          Refunds for returns will be initiated within 2 working days of receipt
          of the returned items.
        </p>

        <p>
          Refunds to your original payment source will take 5-7 working days.
        </p>
      </ul>
    </div>

    {/* Contact */}
    <div>
      <h3 className="text-lg font-medium text-gray-800 mb-3">
        Contact Us:
      </h3>

      <ul className="list-disc space-y-2">
        <p>
          If you have any questions about our Returns and Refunds Policy,
          please email us on{" "}
          <span className="font-medium">
            products@juvenisinnovations.in
          </span>.
        </p>
      </ul>
    </div>

  </div>
</section>
    </div>
<Footer2/>
    </div>
  )
}

export default page
