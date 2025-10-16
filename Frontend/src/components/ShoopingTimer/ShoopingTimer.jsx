import React from 'react'
import { CiDeliveryTruck, CiWallet, CiGift } from "react-icons/ci";
import { MdOutlinePhone } from "react-icons/md";
const ShoopingTimer = () => {
    return (
        <div className='shooppingTimer_wrapper py-5 '>
            <div className='container'>
                <div className='row gy-4 justify-center'>
                    <div className='col-lg-3 col-md-6'>
                        <div className='shooping_box'>
                            <div className='flex items-center gap-1.5'>
                                <div className='shooping_icons'><CiDeliveryTruck size={22} /></div>
                                <p>Free Shipping From ₹500.00</p>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-3 col-md-6'>
                        <div className='shooping_box'>
                            <div className='flex items-center gap-1.5'>
                                <div className='shooping_icons'><MdOutlinePhone size={22} /></div>
                                <p>Support 24/7 At Anytime</p>
                            </div>
                        </div>
                    </div>

                    <div className='col-lg-3 col-md-6'>
                        <div className='shooping_box'>
                            <div className='flex items-center gap-1.5'>
                                <div className='shooping_icons'><CiWallet size={22} /></div>
                                <p>Secure Payment Totally Safe</p>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-3 col-md-6'>
                        <div className='shooping_box'>
                            <div className='flex items-center gap-1.5'>
                                <div className='shooping_icons'><CiGift size={22} /></div>
                                <p>Latest Offer Upto 20% Off</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShoopingTimer
