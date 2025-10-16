import React, { useState } from 'react';
import Swal from 'sweetalert2';
import contactImg from '../../assets/contact_img.png';
import { BACKEND_URL } from '../../utils/api';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', message: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error message when typing
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const { name, email, phone, message } = formData;
    const newErrors = {};

    if (!name.trim()) newErrors.name = "Please enter your name";
    if (!email.trim()) newErrors.email = "Please enter your email";
    if (!phone.trim()) newErrors.phone = "Please enter your phone number";
    if (!message.trim()) newErrors.message = "Please enter your message";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    Swal.fire({
      title: 'Sending...',
      text: 'Please wait while we submit your message.',
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => Swal.showLoading()
    });

    try {
      const res = await fetch(`${BACKEND_URL}/api/contact`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Message Sent!',
          text: 'Thank you! Our team will contact you shortly.',
        });
        setFormData({ name: '', email: '', phone: '', message: '' });
        setErrors({});
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Send Failed',
          text: data.message || 'Something went wrong. Please try again.',
        });
      }

    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Server Error',
        text: 'Unable to send email. Please try again later.',
      });
    }
  };

  // Reusable tailwind input styles
  const getInputClass = (field) =>
    `w-full h-[42px] px-3 mt-1 transition-all duration-200 ease-in-out bg-white border rounded-md focus:outline-none focus:ring-1 ${
      errors[field]
        ? 'border-red-500 focus:ring-red-500'
        : formData[field]
        ? 'border-green-500 focus:ring-green-500'
        : 'border-gray-300 focus:ring-green-400'
    }`;

  return (
    <div className='contact_form_wrapper py-5'>
      <div className='container'>
        <div className='row gy-3'>
          <div className='col-lg-5 col-md-6'>
            <img src={contactImg} className='img-fluid' loading='lazy' alt="Contact" />
          </div>
          <div className='col-lg-7 col-md-6'>
            <div className='contact_right_content'>
              <h3>For any support just send your query</h3>
              <p>If you have any questions, feel free to contact us using the form below.</p>

              <form className='fomr_contact mt-4 p-4 bg-slate-50 rounded' onSubmit={handleSubmit}>
                <div className='row gy-3'>

                  <div className='col-lg-6'>
                    <div className='input_contact'>
                      <label className='text-gray-400'>Your Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        className={getInputClass('name')}
                      />
                      {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
                    </div>
                  </div>

                  <div className='col-lg-6'>
                    <div className='input_contact'>
                      <label className='text-gray-400'>Your Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className={getInputClass('email')}
                      />
                      {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
                    </div>
                  </div>

                  <div className='col-lg-12'>
                    <div className='input_contact'>
                      <label className='text-gray-400'>Your Phone</label>
                      <input
                        type="number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                        className={getInputClass('phone')}
                      />
                      {errors.phone && <p className="text-sm text-red-600">{errors.phone}</p>}
                    </div>
                  </div>

                  <div className='col-lg-12'>
                    <div className='input_contact'>
                      <label className='text-gray-400'>Your Message</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Enter your message"
                        className={`w-full h-[120px] px-3 mt-1 p-2 resize-none transition-all duration-200 ease-in-out bg-white border rounded-md focus:outline-none focus:ring-1 ${
                          errors.message
                            ? 'border-red-500 focus:ring-red-500'
                            : formData.message
                            ? 'border-green-500 focus:ring-green-500'
                            : 'border-gray-300 focus:ring-green-400'
                        }`}
                      />
                      {errors.message && <p className="text-sm text-red-600">{errors.message}</p>}
                    </div>
                  </div>

                  <div className='col-lg-12'>
                    <button
                      type="submit"
                      className='text-white bg-green-700 hover:bg-green-800 w-full h-[42px] rounded transition-colors duration-200'>
                      Send Message
                    </button>
                  </div>

                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
