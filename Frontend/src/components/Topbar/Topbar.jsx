import React, { useEffect, useState } from 'react';
import { MdOutlinePhone } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
// import { clearUser } from '../features/auth/authSlice';
import { clearUser } from '../../ReduxSlices/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import axios from 'axios';
import { BACKEND_URL } from '../../utils/api';
const Topbar = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);


  const { isAuthenticated } = useSelector((state) => state.auth);


  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      // await axios.get('http://localhost:4747/api/auth/logout', {
      //   withCredentials: true,
      // });
      await axios.get(`${BACKEND_URL}/api/auth/logout`, {
        withCredentials: true,
      });
      dispatch(clearUser());
      localStorage.removeItem('user');
      Swal.fire({
        icon: 'success',
        title: 'Logged Out',
        text: 'You have been logged out successfully!',
        showConfirmButton: false,
        timer: 2000,
      });

      navigate('/auth/login');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Logout Failed',
        text: error.response?.data?.message || 'Something went wrong!',
      });
    }
  };

  useEffect(() => {
    const controlTopbar = () => {
      if (window.scrollY > lastScrollY) {
        // scrolling down
        setShow(false);
      } else {
        // scrolling up
        setShow(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", controlTopbar);
    return () => window.removeEventListener("scroll", controlTopbar);
  }, [lastScrollY]);

  return (
    <div
      className={`topBar_wrapper p-2 bg-[var(--bg-light-color)]  top-0 w-full z-50 transition-transform duration-300 ${show ? "translate-y-0" : "-translate-y-full"
        }`}
    >
      <div className='container'>
        <div className='row align-items-center gy-3'>
          <div className='col-lg-6 col-md-6'>
            <p className="flex items-center top_right_links gap-2 mb-0 text-slate-700">
              <MdOutlinePhone size={15} />
              We are available 24/7, Need help?
              <span className="text-xl text-[var(--primary-bg-color)] font-semibold">+918791328155</span>
            </p>
          </div>
          <div className='col-lg-6 col-md-6 text-end'>
            <ul className='flex gap-3 top_right_links justify-end text-slate-700'>
              <li><Link to={'/about'} className='text-slate-600'>About</Link> | </li>
              <li><Link to={'/contact'} className='text-slate-600'>Contact</Link> | </li>
              <li><Link className='text-slate-600'>My Account</Link> | </li>
              <li><Link className='text-slate-600' to={'auth/forgot-password'}>Forget Password</Link> | </li>
              {!isAuthenticated ? (
                <button
                  className='bg-[var(--primary-bg-color)] w-[110px] h-[22px] rounded text-white'
                  onClick={() => navigate('/auth/login')}
                >
                  Login
                </button>
              ) : (
                <button
                  className='bg-red-500 w-[110px] h-[22px] rounded text-white'
                  onClick={handleLogout}
                >
                  Logout
                </button>
              )}

            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;

