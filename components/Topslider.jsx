import React from 'react'

const Topslider = () => {
  return (
    <>
   <div className="overflow-hidden bg-[#e39992] text-white py-1">
  <div className="animate-marquee whitespace-nowrap">
    <span className="mx-4">Welcome to Juvenis products</span>
    <span className="mx-4">Sign up & enjoy 10% off</span>
    <span className="mx-4">Free shipping on orders above Rs.999</span>
     <span className="mx-4">Welcome to Juvenis products</span>
    <span className="mx-4">Sign up & enjoy 10% off</span>
    <span className="mx-4">Free shipping on orders above Rs.999</span>
  </div>
</div>

<style jsx>{`
  @keyframes marquee {
    0% { transform: translateX(100%); }
    100% { transform: translateX(-100%); }
  }
  .animate-marquee {
    display: inline-block;
    animation: marquee 30s linear infinite;
  }
`}</style>
</>
  )
}

export default Topslider
