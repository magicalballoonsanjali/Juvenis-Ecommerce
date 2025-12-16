
import React from 'react'

const Aboutus = () => {
  return (
    <div>
       <div className='flex flex-col-reverse md:flex-row justify-center items-center p-8 md:px-20 gap-2 '>
        <div className='md:w-1/2 flex flex-col gap-3 '>
        <h1 className='text-4xl py-4'>About Us</h1>
            <p>Juvenis Innovations LLP is a partnership firm created for the creation and distribution of new products in dermatology and cosmetology. The firm specializes in research and development of innovative skin and haircare products of superior quality.</p>
            <p>The firm was created as a lacuna was felt in the current market for innovative products that can make a big difference in patient outcomes. It aims to fill this gap in the FMCG and Pharma products market. This is the brainchild of Dr Nilesh N Goyal, a Dermatologist specializing in formulating and developing cosmetics. He has done the Diploma Certificate course of Society of Cosmetic Scientists, UK. This course has vastly improved his understanding of product manufacturing. He is aided in this endeavor by his wife Dr Madhavi N Goyal, Anesthetist trained in India and UK. </p>
            <p>Cosmetic and dermatologic products (can be clubbed as Cosmeceuticals and Nutraceuticals) aim to complement current treatment plans. These are finding increasing acceptability in current medical practice. These can be in the form of oral medications and topical applications. Currently these are mainly in the antiaging segment. The discovery and invention of newer agents has increased the possibilities of developing better products. These have an impact on appearance of skin, quality of hair, increased hair growth and improve antioxidant levels leading to a better quality of life.</p>
            <p>The Company works out of Juvenis Clinic in Santacruz west, Mumbai. All products are stocked, displayed and shipped from this site. Juvenis Clinic (www.juvenis.in) is a modern dermatology clinic offering latest in dermatosurgical treatments  like Liposuction (under local anaesthesia), Fat grafting/ transfer, Hair restoration surgery, Scar revision surgery, Skin Cancer surgery, Keloid treatment (triple combination Inj Juvetrin), Laser resurfacing and many other cosmetic treatments. </p>
        </div>
        <div className='md:w-1/2  '>
            <div className='h-full md:pt-10'>
            <img src='./About_us_page.jpg' className='w-full h-full object-cover rounded' alt='about us'/>
                        </div>
        </div>
    </div>

    </div>
    
  )
}

export default Aboutus
