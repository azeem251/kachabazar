import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import {  Autoplay } from 'swiper/modules';
// Category Icons
import fish_img from '../../assets/fish_img.png';
import fruits_img from '../../assets/fruits_img.png';
import cooking_img from '../../assets/cooking_img.png';
import biscuits_img from '../../assets/biscuits_img.png';
import household_img from '../../assets/household_img.png';
import pet_care_img from '../../assets/pet_care_img.png';
import milk_img from '../../assets/milk_img.png';
import drink_img from '../../assets/drink_img.png';

const CategorySwiper = () => {
  const navigate = useNavigate();
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const categories = [
    { label: "Cooking Essentials", icon: cooking_img },
    { label: "Fish & Meat", icon: fish_img },
    { label: "Fruits & Vegetables", icon: fruits_img },
    { label: "Biscuits & Cakes", icon: biscuits_img },
    { label: "Household Tools", icon: household_img },
    { label: "Pet Care", icon: pet_care_img },
    { label: "Milks & Dairy", icon: milk_img },
    { label: "Drinks", icon: drink_img },
  ];

  const handleCategoryClick = (label) => {
    const formatted = label.replace(/-/g, ' ');
    navigate(`/search?category=${encodeURIComponent(formatted)}`);
  };

  return (
   <div className=" py-4 relative my-4 ">
  <div className="container mx-auto px-4  relative">
    {/* Navigation buttons with better alignment */}
    <div className="absolute inset-y-0 left-0 flex items-center ">
     <button
  ref={prevRef}
  className=" shadow-md rounded-full p-2  transition-all hover:bg-emerald-600 hover:text-white"
>
  <FaChevronLeft />
</button>
    </div>
    <div className="absolute inset-y-0 right-0 flex items-center ">
    <button
  ref={nextRef}
  className=" shadow-md rounded-2xl p-2 transition-all hover:bg-green-600 hover:text-white"
>
  <FaChevronRight />
</button>
    </div>

    {/* Swiper */}
 <Swiper
  loop={true}
  autoplay={{
    delay: 2000,     // 🕒 3 सेकंड में auto slide
    disableOnInteraction: false, // 👉 यूज़र रोकने के बाद भी autoplay चालू रहे
  }}
  spaceBetween={15}
  navigation={false} // ❌ Don't pass navigation here directly
  onInit={(swiper) => {
    setTimeout(() => {
      swiper.params.navigation.prevEl = prevRef.current;
      swiper.params.navigation.nextEl = nextRef.current;
      swiper.navigation.init();
      swiper.navigation.update();
    });
  }}
  modules={[Navigation, Autoplay]} // ✅ Add Autoplay module
  breakpoints={{
    320: { slidesPerView: 2 },
    480: { slidesPerView: 3 },
    768: { slidesPerView: 4 },
    1024: { slidesPerView: 6 },
    1280: { slidesPerView: 7 },

  }}
  className="!px-2"
>
  {categories.map((item, index) => (
    <SwiperSlide key={index} className="cursor-pointer flex justify-center">
      <div
        onClick={() => handleCategoryClick(item.label)}
        className="bg-white  rounded-xl mb-3 mt-2 shadow-sm hover:shadow-md transition-all  flex flex-col items-center w-100"
      >
        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shadow-inner mb-2 mt-3">
          <img
            src={item.icon}
            alt={item.label}
            className="w-6 h-6 object-contain"
          />
        </div>
        <p className="text-[12px] mb-3 text-center text-gray-800 font-bold leading-snug">
          {item.label}
        </p>
      </div>
    </SwiperSlide>
  ))}
</Swiper>

  </div>
</div>

  );
};

export default CategorySwiper;
