import React, { useState, useEffect } from "react";
import { assets } from "@/assets/juvenis-assets";
import Image from "next/image";

const HeaderSlider = () => {
  const sliderData = [
    {
      id: 1,
      title: "Certified Products. Honest Prices",
      offer: "Limited Time Offer 30% Off",
      buttonText1: "Buy now",
      buttonText2: "Find more",
      imgSrc: assets.acansis_cream1_jpeg,
    },
    {
      id: 2,
      title: "Trusted by Thousands of Patients.",
      offer: "Hurry up only few lefts!",
      buttonText1: "Shop Now",
      buttonText2: "Explore Deals",
      imgSrc: assets.acnelude_spray,
    },
    {
      id: 3,
      title: "Shop Smarter for Your Health.",
      offer: "Exclusive Deal 40% Off",
      buttonText1: "Order Now",
      buttonText2: "Learn More",
      imgSrc: assets.anti_scar_cream,
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [sliderData.length]);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="overflow-hidden relative w-full ">
      <div
        className="flex transition-transform duration-700 ease-in-out "
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {sliderData.map((slide, index) => (
          <div
            key={slide.id}
            className=" flex flex-col-reverse md:flex-row 
    items-center justify-between 
    py-8 md:px-14 px-5 mt-6 rounded-xl min-w-full 
    bg-[url('/slider1.webp')] 
    bg-cover bg-center bg-no-repeat 
    h-[400px] md:h-[500px] "
          >
            <div className="md:pl-50 xl:pl-40 ">
              <p className="md:text-base text-[#56b3e6] pb-1">{slide.offer}</p>
              <h1 className="max-w-lg md:text-[40px] md:leading-[48px] text-2xl font-semibold">
                {slide.title}
              </h1>
              <div className="flex items-center mt-4 md:mt-6 ">
                <button className="md:px-10 px-4 md:py-2.5 py-2 bg-[#009bf1] rounded-full text-white font-medium ">
                  {slide.buttonText1}
                </button>
                <button className="group flex items-center gap-2 px-6 py-2.5 font-medium">
                  {slide.buttonText2}
                  <Image
                    className="group-hover:translate-x-1 transition "
                    src={assets.arrow_icon}
                    alt="arrow_icon"
                  />
                </button>
              </div>
            </div>
            {/* <div className="flex items-center flex-1 justify-center">
              <Image
                className="md:w-72 w-48 mix-blend-multiply"
                src={slide.imgSrc}
                alt={`Slide ${index + 1}`}
              />
            </div> */}
          </div>
        ))}
      </div>
      {/* 3 dots */}
      <div className="flex items-center justify-center gap-2 mt-8">
        {sliderData.map((_, index) => (
          <div
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`h-2 w-2 rounded-full cursor-pointer ${
              currentSlide === index ? "bg-[#009bf1]" : "bg-gray-500/30"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HeaderSlider;
