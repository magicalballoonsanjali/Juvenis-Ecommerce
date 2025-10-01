import React from 'react'
import { assets } from '@/assets/juvenis-assets.js'
import Image from 'next/image'
import { useAppContext } from '@/context/AppContext'

const Navbar = () => {

  const { router } = useAppContext()

  return (
    <div className='flex items-center px-4 md:px-8 py-3 justify-between border-b'>
      <Image
              className="cursor-pointer"
              onClick={() => router.push("/")}
              src={assets.juvenis_logo}
              alt="logo"
            />
      <button onClick={() => router.push("/")}  className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'>Logout</button>
    </div>
  )
}

export default Navbar