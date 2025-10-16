import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import slider_one from '../../assets/slider-1.jpg';
import slider_two from '../../assets/slider-2.jpg';
import slider_three from '../../assets/slider-3.jpg';
import orange_img from "../../assets/orange_img.jpg"
import meat_img from '../../assets/meat_img.jpg'
import CountdownTimer from '../CountdownTimer/CountdownTimer';
import { Autoplay } from 'swiper/modules';
const slides = [
    {
        image: slider_one,
        title: 'Fresh Organic Vegetables',
        text: 'Get the freshest vegetables directly from farms at the best prices.',
        buttonText: 'Shop Vegetables',
    },
    {
        image: slider_two,
        title: '100% Natural Fruits',
        text: 'Handpicked fruits with no preservatives, delivered to your door.',
        buttonText: 'Shop Fruits',
    },
    {
        image: slider_three,
        title: 'Meat & Fish Delivered Fresh',
        text: 'High quality, hygienic and chilled meat & fish from trusted sources.',
        buttonText: 'Shop Meat',
    },
    {
        image: slider_one,
        title: 'Fresh Organic Vegetables',
        text: 'Get the freshest vegetables directly from farms at the best prices.',
        buttonText: 'Shop Vegetables',
    },
    {
        image: slider_two,
        title: '100% Natural Fruits',
        text: 'Handpicked fruits with no preservatives, delivered to your door.',
        buttonText: 'Shop Fruits',
    },
    {
        image: slider_three,
        title: 'Meat & Fish Delivered Fresh',
        text: 'High quality, hygienic and chilled meat & fish from trusted sources.',
        buttonText: 'Shop Meat',
    },
];

const HeroSwiper = () => {
    return (
        <div className='swiper_wrapper my-3'>
            <div className='container'>
                <div className='row gy-4'>
                    <div className='col-lg-7 '>
                        <div className="w-full relative rounded overflow-hidden">
                            <Swiper
                                pagination={{ clickable: true }}
                                loop={true}
                                modules={[Pagination, Autoplay]}

                                autoplay={{
                                    delay: 2000,     // 🕒 3 सेकंड में auto slide
                                    disableOnInteraction: false, // 👉 यूज़र रोकने के बाद भी autoplay चालू रहे
                                }}
                                grabCursor={true}
                                className="mySwiper h-full rounded"
                            >
                                {slides.map((slide, index) => (
                                    <SwiperSlide key={index}>
                                        <div className="relative w-full h-[370px] ">
                                            <img
                                                src={slide.image}
                                                alt={`Slide ${index + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute px-5 inset-0  flex flex-col justify-center items-start text-left  lg:px-16 ">
                                                <h2 className="text-2xl md:text-4xl font-bold mb-3">{slide.title}</h2>
                                                <p className="mb-4 max-w-md text-slate-400 text-sm md:text-base w-[350px]">{slide.text}</p>
                                                <button className="bg-green-600 hover:bg-green-700 text-white w-[160px] h-[40px] rounded text-sm font-semibold transition">
                                                    {slide.buttonText}
                                                </button>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>

                    {/* Right column (optional) */}
                    <div className='col-lg-5'>
                        <div className="lates_box my-6 rounded-xl">
                            {/* Top Heading */}
                            <div className="top_heading ">
                                <p className="bg-amber-100 p-2 text-center font-semibold text-amber-700 rounded-xl">
                                    🎁 Latest Super Discount Active Coupon Code
                                </p>
                            </div>

                            {/* Coupon Content */}
                            <div className="product_timer_main_box p-3 flex flex-col gap-3">
                                <div className="flex flex-col md:flex-row gap-4 bg-white shadow-md p-4 rounded-lg border border-gray-100">

                                    {/* Left Product + Info */}
                                    <div className="flex flex-col sm:flex-row gap-4 flex-1 items-start">
                                        {/* Product Image */}
                                        <img
                                            src={orange_img}
                                            alt="product"
                                            className="w-full sm:w-28 h-auto object-contain rounded"
                                        />

                                        {/* Product Content */}
                                        <div className="content_img space-y-2 w-full">
                                            <p className="text-base">
                                                <strong className="text-red-500 text-md">50%</strong> Off
                                                <span className="ml-2 bg-red-100 text-red-500 text-xs px-3 py-1 rounded-full">Inactive</span>
                                            </p>

                                            <p className="text-slate-800 text-md font-semibold">August Gift Voucher</p>

                                            {/* Timer Box */}
                                            <div className="flex flex-wrap gap-2">
                                                <CountdownTimer />
                                            </div>
                                        </div>
                                    </div>


                                    {/* Vertical Divider */}
                                    <div className="hidden md:flex border-l border-dashed border-gray-300"></div>

                                    {/* Coupon Code Area */}
                                    <div className="flex flex-col justify-center items-start md:items-end text-sm">
                                        <button className="bg-green-100 text-green-700 font-semibold px-4 py-2 rounded-full hover:bg-green-200 transition">
                                            AUGUST25
                                        </button>

                                        <p className="text-gray-500 mt-1 text-sm text-center">
                                            * Valid on orders <br /> above ₹2000
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col md:flex-row gap-4 bg-white shadow-md p-4 rounded-lg border border-gray-100">

                                    {/* Left Product + Info */}
                                    <div className="flex flex-col sm:flex-row gap-4 flex-1 items-start">
                                        {/* Product Image */}
                                        <img
                                            src={meat_img}
                                            alt="product"
                                            className="w-full sm:w-28 h-auto object-contain rounded"
                                        />

                                        {/* Product Content */}
                                        <div className="content_img space-y-2 w-full">
                                            <p className="text-base">
                                                <strong className="text-red-500 text-sm">80%</strong> Off
                                                <span className="ml-2 bg-red-100 text-red-500 text-xs px-3 py-1 rounded-full">Inactive</span>
                                            </p>

                                            <p className="text-slate-800 text-md font-semibold">Summer Gift Voucher</p>

                                            {/* Timer Box */}
                                            <div className="flex flex-wrap gap-2">
                                                <CountdownTimer />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Vertical Divider */}
                                    <div className="hidden md:flex border-l border-dashed border-gray-300"></div>

                                    {/* Coupon Code Area */}
                                    <div className="flex flex-col justify-center items-start md:items-end text-sm">
                                        <button className="bg-green-100 text-green-700 font-semibold px-4 py-2 rounded-full hover:bg-green-200 transition">
                                            SUMMER25
                                        </button>
                                        <p className="text-gray-500 mt-1 text-sm text-center">
                                            * Valid on orders <br /> above ₹3500
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>

                </div>
            </div>
        </div>
    );
};

export default HeroSwiper;
