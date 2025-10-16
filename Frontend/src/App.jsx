
import reactLogo from './assets/react.svg'

import './App.css'
// import About from './about'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import Topbar from './components/Topbar/Topbar'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
// import { setUser, clearUser } from '../features/auth/authSlice';
import { setUser ,clearUser} from './ReduxSlices/authSlice'
import { BACKEND_URL } from './utils/api'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'
import TawkMessenger from './components/TawkMessenger/TawkMessenger'
import useAuthCheck from './utils/useAuthCheck'
// import SidebarDrawer from './components/CartDrawer/CartDrawer'
function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
//   useEffect(() => {
//   const checkAuth = async () => {
//     try {
//       const res = await axios.get(`${BACKEND_URL}/api/auth/me`, {
//         withCredentials: true,
//       });

//       console.log("✅ Google login response:", res.data);
//       dispatch(setUser(res.data)); // 👈 सिर्फ user object भेजो
//       // localStorage.setItem("user", JSON.stringify(res.data));
//     } catch (err) {
//       // console.log("❌ Auth check failed", err);
//       dispatch(clearUser());
//     }
//   };

//   checkAuth();
// }, []);

//  const { isAuthenticated, user } = useSelector((state) => state.auth);
//     useEffect(() => {
//         console.log("Auth State Changed →", isAuthenticated, user);
//     }, [isAuthenticated, user]);

// useEffect(() => {
//     const user = localStorage.getItem('user');
//     if (user) {
//       dispatch(setUser(JSON.parse(user)));
//       console.log(user)
//     }
//   }, []);
 

  useAuthCheck();
   const { authChecked } = useSelector((state) => state.auth);
    if (!authChecked) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>🔄 Checking Authentication...</p>
      </div>
    );
  }
  return (
    <>
   
  <Topbar/>
  <Header/>
    {/* <SidebarDrawer/> */}
     <ScrollToTop />
  <Outlet/>
  <Footer/>
  <TawkMessenger/>

    </>
  )
}

export default App
