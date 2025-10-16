import React from 'react'
import logo from "../../assets/logo.svg"
import { Link, useNavigate } from 'react-router-dom'
import paypal_img from '../../assets/paypal_img.png'
import { FaInstagram, FaLinkedin, FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { useSelector } from 'react-redux';
const Footer = () => {

    const year = new Date().getFullYear()
    const navigate = useNavigate();
    console.log("full year", year)
    const { user, isAuthenticated } = useSelector((state) => state.auth);
    const handleCategoryClick = (label) => {
        const formatted = label.toLowerCase().replace(/-/g, ' ');
        navigate(`/search?category=${encodeURIComponent(formatted)}`);
    };

    return (
        <>
            <div className='Footer_wrapper py-5'>
                <div className='container'>
                    <div className='row gy-4'>
                        <div className='col-lg-3 col-md-6'>
                            <div className='footer_links'>
                                <h4 className='text-slate-600'>Company</h4>
                                <ul>
                                    <li><Link to={'/about'}>About Us</Link></li>
                                    <li><Link to={'/contact'}>Contact Us</Link></li>
                                    
                                    <li><Link>Careers</Link></li>
                                    <li><Link>Latest News</Link></li>
                                </ul>
                            </div>
                        </div>

                        <div className='col-lg-3 col-md-6'>
                            <div className='footer_links'>
                                <h4 className='text-slate-600'>Latest News</h4>
                                <ul>
                                    <li><button onClick={() => handleCategoryClick("Fish & Meat")} className="bg-transparent border-0 p-0 text-start text-slate-500">Fish & Meat</button></li>
                                    <li><button onClick={() => handleCategoryClick("Drinks")} className="bg-transparent border-0 p-0 text-start text-slate-500">Soft Drink</button></li>
                                    <li><button onClick={() => handleCategoryClick("Milks & Dairy")} className="bg-transparent border-0 p-0 text-start text-slate-500">Milk & Dairy</button></li>
                                    <li><button onClick={() => handleCategoryClick("Cooking Essentials")} className="bg-transparent border-0 p-0 text-start text-slate-500">Cooking</button></li>
                                </ul>
                            </div>
                        </div>
                        <div className='col-lg-3 col-md-6'>
                            <div className='footer_links'>
                                <h4 className='text-slate-600'>My Account</h4>
                                <ul>
                                    {isAuthenticated && user.user?.role === "admin" && (
                                        <li>
                                            <Link to="admin/dashboard">Dashboard</Link>
                                        </li>
                                    )}
                                    <li><Link to={'/admin/dashboard/orders'}>My Orders</Link></li>
                                    <li><Link>Recent Orders</Link></li>
                                    <li><Link>Update Profile</Link></li>
                                </ul>
                            </div>
                        </div>

                        <div className='col-lg-3 col-md-6'>
                            <div className='footer_links '>
                                <div className='bg-slate-400 w-[120px] h-[44px] flex items-center justify-center mb-3'><Link to={'/'}><img src={logo} alt="" /></Link></div>
                                <ul className=''>
                                    <li><Link>Sector 63 C block VDS Building</Link></li>
                                    <li><Link>Noida Uttar Pradesh</Link></li>
                                    <li><Link>Tel : +91 878459685</Link></li>
                                    <li><Link>Email : ali123@gmail.com</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='container'>
                    <div className='footerPaymetn_wrapper'>
                        <div className='row gy-4 align-items-center'>
                            <div className='col-lg-4 col-md-6'>
                                <div className='footer_socials_links'>
                                    <h4 className='text-slate-500'>Follow Us</h4>
                                    <ul className='flex gap-2 mt-3'>
                                        <li><Link to={"/"} className=' w-[33px] bg-blue-700 h-[33px] text-center text-white flex justify-center items-center rounded-full'><FaFacebookF /></Link></li>
                                        <li><Link to={'/'} className=' w-[33px] bg-red-800 h-[33px] text-center text-white flex justify-center items-center rounded-full'><FaInstagram /></Link></li>
                                        <li><Link to={'/'} className=' w-[33px] bg-sky-600 h-[33px] text-center text-white flex justify-center items-center rounded-full'><FaLinkedin /></Link></li>
                                        <li><Link to={'/'} className=' w-[33px] bg-green-500 h-[33px] text-center text-white flex justify-center items-center rounded-full'><FaWhatsapp /></Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className='col-lg-4 col-md-6'>
                                <div className='flex flex-col items-center gap-2 call_heading' >
                                    <strong>Call Us Today!</strong>
                                    <Link>+91 8794652356</Link>
                                </div>
                            </div>
                            <div className='col-lg-4 col-md-6'>
                                <div>
                                    <img src={paypal_img} alt={paypal_img} className='img-fluid' />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
            <div className='bottom_footer bg-slate-100 p-2'>
                <div className='container'>
                    <div className='flex justify-between flex_bottomFooter'>

                        <div>
                            <p>Copyright <strong className='text-green-500'>{year}</strong> @ Rainet Technology, All rights reserved.</p>
                        </div>


                        <div>
                            <p>Dev by <strong className='text-slate-400 '>Er.Azeem</strong></p>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer
