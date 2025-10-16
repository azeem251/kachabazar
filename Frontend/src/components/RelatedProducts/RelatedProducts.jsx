// components/RelatedProducts/RelatedProducts.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { Link } from 'react-router-dom';
import { BACKEND_URL } from '../../utils/api';
import { MdPunchClock } from 'react-icons/md';

const RelatedProducts = ({ category, currentProductId }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/products?category=${category}`);
        const filtered = res.data.filter(item => item._id !== currentProductId);
        setRelatedProducts(filtered);
      } catch (err) {
        console.error("Failed to fetch related products", err);
      }
    };

    if (category) fetchRelated();
  }, [category, currentProductId]);

  if (!relatedProducts.length) {
    return (
      <div className='flex justify-center items-center h-80'>
        <div className='text-center'>
          <img
            src='https://cdn-icons-png.flaticon.com/512/6134/6134065.png'
            alt='No Products Found'
            className='w-32 mx-auto mb-3'
          />
          <p className='text-gray-500 font-medium'>No products found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className='releated_wrapper py-4 relative'>
      <div className="container relative pb-14"> {/* 👈 Add relative + bottom padding */}

        {/* 👇 Custom CSS for bottom arrows */}
        <style>
          {`
            .swiper-button-next,
            .swiper-button-prev {
              position: absolute;
              bottom: 35px; /* below the slider */
              top: auto !important;
              transform: none;
              color: #10b981;
              background: #e6e3e3;
              border-radius: 9999px;
              width: 32px;
              height: 32px;
              box-shadow: 0 2px 6px rgba(0,0,0,0.1);
              z-index: 50;
            }
             
            .swiper-button-prev:hover{
             background: #008b00;
             color: #fff;
            }
              .swiper-button-next:hover{
               background: #008b00;
             color: #fff;
              }

            .swiper-button-prev {
              left: 50%;
              margin-left: -45px;
            }

            .swiper-button-next {
              right: 50%;
              margin-right: -45px;
            }

            .swiper-button-next::after,
            .swiper-button-prev::after {
              font-size: 14px;
              font-weight: bold;
            }
          `}
        </style>

        <h3 className="text-sm font-bold mb-2 text-gray-800">Related Products</h3>

        <Swiper
          spaceBetween={0}
          loop={true}
          navigation={true}
          modules={[Navigation]}
          breakpoints={{
            320: { slidesPerView: 1 },
            480: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5 },
          }}
        >
          {relatedProducts.map(product => (
            <SwiperSlide key={product._id} className='my-3'>
              <div className='group mx-2 box-border overflow-hidden flex rounded-md shadow-md p-0 flex-col items-center bg-white relative'>
                <div className='absolute top-2 left-2  bg-gray-100 text-green-500 rounded-full text-xs px-2 py-0 font-medium'>
                  Stock: <span className='text-orange-700 pl-1 font-bold'>{product.stock}</span>
                </div>

                <Link to={`/product/${product.name.replace(/\s+/g, "-")}/${product._id}`}>
                  <div className='relative flex justify-center cursor-pointer pt-2 w-full h-44'>
                    <div className='relative w-full h-full'>
                      <img
                        alt={product.name}
                        loading='lazy'
                        src={product.image}
                        className='object-contain transition duration-150 ease-linear transform group-hover:scale-105 w-full h-full p-2'
                      />
                    </div>
                  </div>
                </Link>

                <div className='w-full px-3 lg:px-4 pb-4 overflow-hidden'>
                  <div className='relative mb-1'>
                    <h6 className='truncate mb-0 block font-medium text-gray-700'>
                      <span className='line-clamp-2'>{product.name}</span>
                    </h6>
                  </div>

                 {product.description && (
  <p className="text-[13px] text-gray-500 mt-1 !leading-[22px] line-clamp-2">
    {product.description}
  </p>
)}

                  <div className='flex justify-between items-center text-heading text-sm sm:text-base lg:text-xl mt-2'>
                    <div className='font-serif product-price font-bold'>
                      <span className='inline-block text-lg font-semibold text-gray-800'>₹{product.price}</span>
                    </div>
                    <button
                      aria-label='cart'
                      className='h-9 w-9 flex items-center justify-center border border-gray-200 rounded text-emerald-500 hover:border-emerald-500 hover:bg-emerald-500 hover:text-white transition-all'>
                      <MdPunchClock size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default RelatedProducts;
