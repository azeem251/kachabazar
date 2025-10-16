// src/pages/GoogleSuccess.jsx
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
// import { setUser } from '../features/auth/authSlice';
import { setUser } from '../../ReduxSlices/authSlice';
import { useNavigate } from 'react-router-dom';

const GoogleSuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/me`, {
          withCredentials: true,
        });

        dispatch(setUser(res.data.user)); // ✅ Important
        localStorage.setItem('user', JSON.stringify(res.data.user));
        navigate('/');
      } catch (error) {
        console.log('Google login error:', error);
        navigate('/auth/login');
      }
    };

    fetchUser();
  }, []);


};

export default GoogleSuccess;
