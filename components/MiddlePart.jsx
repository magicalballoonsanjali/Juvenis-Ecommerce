import React from 'react'
import { useRouter } from 'next/navigation'

const MiddlePart = () => {

    const router =useRouter();

  return (
    <div className=" flex w-full h-125 flex-col items-start justify-center p-10 gap-4 mt-5
    bg-[url('/Schedule_Your_Appointment.jpg')] 
    bg-cover bg-center bg-no-repeat 
    ">
      <p className='font-bold text-4xl flex'>Schedule Your Appointment To Transform Your Style</p>
      <button className="md:px-10 px-4 md:py-2.5 py-2 bg-[#e39992] rounded-full text-white font-medium " onClick={() => router.push("/contact-us")}>
                 Contact us </button>
    </div>
  )
}

export default MiddlePart
