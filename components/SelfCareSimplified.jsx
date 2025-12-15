import React from 'react'
import { assets } from '../assets/juvenis-assets';
import Image from 'next/image';

const SelfCareSimplified = () => {
  return (
    <div className=' p-5 mt-5 mx-10 ' >
      <div className="flex flex-col items-center pt-10 pb-10">
        <p className="text-4xl font-medium ">Self Care Simplified</p>
        {/* <div className="w-28 h-0.5 bg-gray-400 mt-3"></div> */}
      </div>
     
        <div className='flex  flex-row md-flex-col  justify-between items-center px-5 md-px-20 text-xl  '>
        <div className='flex gap-2 items-center flex-col md:flex-row'>
            <Image src={assets.Layer_1} alt='clean'/>
            <span className=''>CLEAN</span>
        </div>
        <div className=" w-0.5 h-14 bg-gray-400 mt-3"></div>
        <div className='flex gap-2 items-center flex-col md:flex-row'>
            <Image src={assets.vegan} alt='vegan'/>
            <span className=''>VEGAN</span>
        </div>
         <div className="w-0.5 h-14 bg-gray-400 mt-3"></div>
        <div className='flex gap-2 items-center flex-col md:flex-row'>
            <Image src={assets.rabbit} alt='rabbit'/>
            <span className=''>CRUELTY FREE</span>
        </div>
         <div className="w-0.5 h-14 bg-gray-400 mt-3"></div>
        <div className='flex gap-2 items-center flex-col md:flex-row'>
            <Image src={assets.clinicallytested} alt='clinical'/>
            <span className=''>CLINICALLY TESTED</span>
        </div>
        </div>
   

    </div>
  )
}

export default SelfCareSimplified
