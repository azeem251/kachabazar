import React from 'react'
import aboutImg from "../../assets/about_wrapper.jpg"
import ContactCom from '../../components/ContactCom/ContactCom'
import KachaBazar from '../../components/kachaBazar/KachaBazar'
import ContactForm from '../../components/ContactForm/ContactForm'
const Contact = () => {
    return (
        <>
            <div className='about_wrapper' style={{
                backgroundImage: `url(${aboutImg})`, // ✅ fixed
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}>
                <div className='container'>
                    <div className='text-center'>
                        <h1>Contact Us</h1>
                    </div>
                </div>
            </div>
            <ContactCom/>
            <ContactForm/>
            <KachaBazar/>
        </>
    )
}

export default Contact
