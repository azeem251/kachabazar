import React from 'react'
import kach_img_one from "../../assets/kacha_img_one.png"
import app_img from "../../assets/app_img.png"
import play_img from "../../assets/play_img.png"
import kacha_img_two from "../../assets/kacha_img_two.png"
const KachaBazar = () => {
    return (
        <div className='kachabazar_wrapper'>
            <div className='container'>
                <div className='row align-items-center justify-center'>
                    <div className='col-lg-4 col-md-6'>
                        <div className='left_side_img'>
                            <img src={kach_img_one} alt={kach_img_one} className='text-center mx-auto block w-100' />
                        </div>
                    </div>
                    <div className='col-lg-4 col-md-6'>
                        <div className='middle_content text-center'>
                            <h3 className='text-center font-bold'>Get Your Daily Needs From Our KachaBazar Store</h3>
                        <p className='mt-3'>There are many products you will find in our shop, Choose your daily necessary product from our KachaBazar shop and get some special offers.</p>
                        </div>
                        <div className='flex justify-center mt-5 gap-3'>
                            <div>
                                <img src={app_img} alt={app_img}  className='w-45'/>
                            </div>
                            <div>
                                <img src={play_img} alt={play_img}  className='w-45'/>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-4 col-md-6'>
                        <div className='left_side_img '>
                            <img src={kacha_img_two} alt={kacha_img_two}  className='text-center mx-auto block w-100'/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default KachaBazar
