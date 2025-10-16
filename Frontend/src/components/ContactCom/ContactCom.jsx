import React from 'react'
import { Link } from 'react-router-dom';
import { IoMailOpenOutline,IoLocationOutline  } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa";
const ContactCom = () => {
  return (
    <div className='contact_wrapper py-5'>
      <div className='container'>
        <div className='contact_row'>
            <div className='row gy-3 text-center justify-center'>
                <div className='col-lg-4 col-md-6'>
                    <div className='contact_box text-center p-4 border border-gray-200 h-auto rounded'>
                        <div className=''>
                            <IoMailOpenOutline className='text-center mx-auto mb-3 text-green-500' size={35}/>
                            <h4><strong>Email Us</strong></h4>
                        </div>
                        <div className='content_box mt-2'>
                            <p className='mb-3'><strong><Link>aliqamar123@gmail.com</Link> </strong> Interactively grow empowered for process-centric total linkage. </p>
                        </div>
                    </div>
                </div>
                <div className='col-lg-4 col-md-6'>
                    <div className='contact_box text-center p-4 border border-gray-200 h-auto rounded'>
                        <div className=''>
                            <FaRegBell className='text-center mx-auto mb-3 text-green-500' size={35}/>
                            <h4><strong>Call Us</strong></h4>
                        </div>
                        <div className='content_box mt-2'>
                            <p className='mb-3'><strong><Link>+91 8794651886</Link> </strong> Distinctively disseminate focused solutions clicks-and-mortar ministate. </p>
                        </div>
                    </div>
                </div>
                <div className='col-lg-4 col-md-6'>
                    <div className='contact_box text-center p-4 border border-gray-200 h-auto rounded'>
                        <div className=''>
                            <IoLocationOutline  className='text-center mx-auto mb-3 text-green-500' size={35}/>
                            <h4><strong>Location</strong></h4>
                        </div>
                        <div className='content_box mt-2'>
                            <p className=''><strong><Link>Sector 63 C</Link> </strong> Block C-23 Noida Uttar Pradesh </p>
                            <p className='mb-3'>Pin Code - 201301, India</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ContactCom
