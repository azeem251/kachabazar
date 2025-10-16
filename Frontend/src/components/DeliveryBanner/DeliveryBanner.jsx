import React from 'react'
import delivaryImg from "../../assets/delivery_img.png"
const DeliveryBanner = () => {
  return (
    <div className='delivery_banner py-4'>
        <div className='container bg-[var(--primary-bg-color)] p-5 rounded-2xl'>
            <div className='row gy-3 row_delivery items-center bg-white rounded-2xl p-3'>
                <div className='col-lg-7 col-md-6'>
                    <div className='left_content_delivery flex flex-col gap-2'>
                        <p>Organic Products and Food</p>
                        <strong className='text-2xl font-bold '>Quick Delivery to Your Home</strong>
                        <p className='text-sm'>There are many products you will find in our shop, Choose your daily necessary product from our KachaBazar shop and get some special offers. See Our latest discounted products from here and get a special discount.</p>
                        <button className='text-center text-white rounded mt-3 bg-[var(--primary-bg-color)] w-[150px] h-[44px] '>Download App</button>
                    </div>
                </div>
                <div className='col-lg-5 col-md-6 '>
                    <div>
                        <img src={delivaryImg} alt={delivaryImg} className='img-fluid mx-auto text-center' />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DeliveryBanner
