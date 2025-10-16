



import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setSingleProduct } from '../../ReduxSlices/singleProductSlice';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { FaHome, FaFacebookF, FaTwitter, FaRedditAlien, FaWhatsapp, FaLinkedinIn } from 'react-icons/fa';
import { CiDeliveryTruck } from "react-icons/ci";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { BsArrowLeftRight } from "react-icons/bs";
import { PiFlowArrow } from "react-icons/pi";
import { FiSun, FiMapPin } from "react-icons/fi";
import DeliveryBanner from '../DeliveryBanner/DeliveryBanner';
import KachaBazar from '../kachaBazar/KachaBazar';
import ShoopingTimer from '../ShoopingTimer/ShoopingTimer';
import RelatedProducts from '../RelatedProducts/RelatedProducts';
import { BACKEND_URL } from '../../utils/api';
import { addToCart, updateCartItemQuantity } from '../../ReduxSlices/cartSlice';
import Swal from 'sweetalert2';



const ProductDetail = () => {
  const { id, name } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.singleProduct.data);
  const [qty, setQty] = useState(1);
  const [showMore, setShowMore] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isZoomed, setIsZoomed] = useState(false);
  const imageRef = useRef(null);
  const zoomRef = useRef(null);
  const cartItems = useSelector((state) => state.cart.items);
  const { user } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const handleAddToCart = async () => {
    const isExist = cartItems.find(item => item.id === product._id);
    const totalPrice = product.price * qty;
    if (!user || !user.user || !user.user._id) {
      // 🟡 Show toast or swal and redirect
      Swal.fire({
        icon: 'warning',
        title: 'Please Login First',
        text: 'You need to be logged in to add items to cart.',
        confirmButtonText: 'Login',
        confirmButtonColor: '#10b981'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/auth/login');
        }
      });
      return;
    }

    if (isExist) {
      if (isExist.quantity === qty) {
        // Quantity already same → show already exist message
        Swal.fire({
          icon: 'warning',
          title: 'Product Already Exists',
          text: 'This product is already in your cart with the same quantity.',
          confirmButtonColor: '#f97316',
        });
      } else {
        // Quantity different → update in backend 
        try {
          await axios.put(`${BACKEND_URL}/api/cart/update`, {
            productId: product._id,
            quantity: qty,
            price: totalPrice,
          }, {
            withCredentials: true,
          });

          // 🔁 Update quantity and price in Redux
          dispatch(updateCartItemQuantity({
            productId: product._id,
            newQuantity: qty,
            newPrice: totalPrice,
          }));

          Swal.fire({
            icon: 'info',
            title: 'Quantity Updated',
            text: `Quantity updated to ${qty}`,
            confirmButtonColor: '#0ea5e9',
          });
        } catch (err) {
          console.error("Error updating quantity in cart:", err);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to update quantity. Try again.',
          });
        }
      }
    } else {
      // New item → add to cart
      try {
        await axios.post(`${BACKEND_URL}/api/cart/add`, {
          productId: product._id,
          quantity: qty,
          price: totalPrice,
        }, {
          withCredentials: true,
        });

        dispatch(addToCart({
          id: product._id,
          name: product.name,
          price: totalPrice, // Important: set total price here
          image: product.image,
          quantity: qty,
        }));

        Swal.fire({
          icon: 'success',
          title: 'Item Added',
          text: 'Product has been added to your cart!',
          confirmButtonColor: '#10b981',
        });
      } catch (error) {
        console.error("Failed to add to cart:", error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to add product to cart. Please try again.',
          confirmButtonColor: '#ef4444',
        });
      }
    }
  };



  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${BACKEND_URL}/api/products/${name}/${id}`);
        if (!res.data || Object.keys(res.data).length === 0) {
          setTimeout(() => {
            setNotFound(true);
            setLoading(false);
          }, 4000);
          return;
        }
        dispatch(setSingleProduct(res.data));
        setNotFound(false);
      } catch (err) {
        setTimeout(() => {
          setNotFound(true);
          setLoading(false);
        }, 4000);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };

    fetchProduct();
  }, [name, id, dispatch]);



  const handleZoomMove = (e) => {
    const image = imageRef.current;
    const zoom = zoomRef.current;
    if (!image || !zoom) return;

    const rect = image.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    zoom.style.backgroundPosition = `${x}% ${y}%`;
  };

  if (loading) return <LoadingSpinner />;
  if (notFound) {
    return (
      <div className="container py-5 text-center">
        <img src="https://pinkwardrobe.in/images/NoProduct.jpg" className='w-[700px] mx-auto' alt="not found" />
        <p className=" text-red-500">Sorry, we couldn’t find the product you’re looking for.</p>
        <Link to="/" className="mt-4 inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-emerald-700 transition">
          Go to Home
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="bg-gray-50 py-5">
        <div className='container'>
          {/* Breadcrumb */}
          <div className="text-sm text-gray-600 mb-3 flex flex-wrap items-center gap-2">
            <Link to="/" className="text-black font-medium hover:text-emerald-600 flex items-center gap-1">
              <FaHome size={14} /> Home
            </Link>
            <span className="text-gray-400">›</span>
            <Link to={`/search?category=${encodeURIComponent(product.category.toLowerCase().replace(/\s+/g, '-'))}`} className="text-black font-medium hover:text-emerald-600 capitalize">
              {product.category}
            </Link>
            <span className="text-gray-400">›</span>
            <span className="text-gray-800 font-medium capitalize">{product.name}</span>
          </div>
        </div>

        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-4 rounded shadow-sm">

            {/* 🖼️ Image + Zoom */}
            <div className="relative w-full flex items-center">
              <div
                className="overflow-hidden   rounded cursor-zoom-in w-[400px] mx-auto"
                ref={imageRef}
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
                onMouseMove={handleZoomMove}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-contain w-full h-auto"
                />
              </div>

              {/* Zoom Preview Box - fixed on right side */}
              {isZoomed && (
                <div
                  ref={zoomRef}
                  className="absolute top-0 left-[430px] w-[900px] h-[600px] border-2 border-gray-200 bg-white shadow-xl rounded hidden md:block z-20"
                  style={{
                    backgroundImage: `url(${product.image})`,
                    backgroundSize: '300% auto',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                  }}
                />
              )}
            </div>

            {/* 📦 Product Info */}
            <div className="">
              <h2 className="text-2xl font-bold text-green-600">{product.name}</h2>

              <span className="inline-block my-2 text-green-600 text-sm font-semibold bg-green-100 px-3 py-1 rounded-full">
                Stock: <strong className='text-red-600'>{product.stock}</strong>
              </span>

              <p className="text-2xl !font-bold text-gray-900">Price: {product.price}₹</p>

              <p className="text-gray-600 my-2">
                {product.description.length > 235
                  ? showMore
                    ? product.description
                    : `${product.description.slice(0, 235)}...`
                  : product.description}
              </p>

              {product.description.length > 235 && (
                <button
                  onClick={() => setShowMore(!showMore)}
                  className="text-orange-500 text-sm underline"
                >
                  {showMore ? 'Show Less' : 'Show More'}
                </button>
              )}

              <div className="flex items-center flex-wrap gap-4 mt-4">
                <div className="flex border border-gray-300 rounded overflow-hidden">
                  <button onClick={() => setQty(qty > 1 ? qty - 1 : 1)} className="px-3 py-1">-</button>
                  <span className="px-4 py-1 bg-gray-100">{qty}</span>
                  <button onClick={() => setQty(qty + 1)} className="px-3 py-1">+</button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="bg-gray-900 text-white w-[150px] h-[33px] rounded hover:bg-emerald-600"
                >
                  Add to Cart
                </button>
              </div>

              <div className="mt-4 text-sm">
                <p><strong>Category:</strong> <span>{product.category}</span></p>
                <p className='bg-slate-100 inline-block w-[120px] text-center text-slate-500 rounded-2xl mt-2'>{product.subcategory}</p>
              </div>

              <div className="mt-4 text-sm">
                <p className="mb-1">Call Us To Order: <span className="text-green-600 font-semibold">+91 8791328156</span></p>
                <p className="font-medium">Share your social network</p>
                <p className="text-gray-500 text-xs">Get more traffic by sharing this product:</p>
                <div className="flex items-center gap-3 mt-2 flex-wrap">
                  <Link><FaFacebookF size={22} className="bg-blue-600 p-1 rounded text-white" /></Link>
                  <Link><FaTwitter size={22} className="bg-sky-400 p-1 rounded text-white" /></Link>
                  <Link><FaRedditAlien size={22} className="bg-orange-500 p-1 rounded text-white" /></Link>
                  <Link><FaWhatsapp size={22} className="bg-green-500 p-1 rounded text-white" /></Link>
                  <Link><FaLinkedinIn size={22} className="bg-blue-700 p-1 rounded text-white" /></Link>
                </div>
              </div>
            </div>
            {/* 📋 Policy Section */}
            <div className="mt-6 ">
              <div className="flex flex-col gap-3 text-gray-600 text-sm bg-gray-50 p-4 rounded border border-gray-200 col-span-full md:col-span-1">
                <p className="flex items-start gap-3"><CiDeliveryTruck size={22} /> Free shipping on orders over ₹100</p>
                <p className="flex items-start gap-3"><IoHomeOutline size={22} /> Home Delivery within 1 Hour</p>
                <p className="flex items-start gap-3"><MdOutlineCurrencyRupee size={22} /> Cash on Delivery Available</p>
                <p className="flex items-start gap-3"><BsArrowLeftRight size={22} /> 7 Days return money back guarantee</p>
                <p className="flex items-start gap-3"><PiFlowArrow size={22} /> No Warranty Available</p>
                <p className="flex items-start gap-3"><FiSun size={22} /> 100% Organic Products</p>
                <p className="flex items-start gap-3"><FiMapPin size={22} /> Delivery from: Boho One, Middlesbrough, TS2 1AE</p>
              </div>
            </div>
          </div>


        </div>
      </div>

      <RelatedProducts category={product.category} currentProductId={product._id} />
      <ShoopingTimer />
      <KachaBazar />
    </>
  );
};

export default ProductDetail;
