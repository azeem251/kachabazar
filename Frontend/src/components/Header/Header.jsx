import React, { useState, useEffect, useRef } from "react";
import logo from "../../assets/logo.svg";
import { CiSearch, CiBellOff } from "react-icons/ci";
import { IoCartOutline, IoClose } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { useSelector } from "react-redux";

import SearchBar from "../SearchBar/SearchBar";
import CartDrawer from "../CartDrawer/CartDrawer";

const Header = () => {
    const [showSearchModal, setShowSearchModal] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const [lastScrollTop, setLastScrollTop] = useState(0);
    const { user } = useSelector((state) => state.auth)
    const [qurey, setQurey] = useState("")
    const navigate = useNavigate()
    const cartItems = useSelector((state) => state.cart.items);
    const [drawerOpen, setDrawerOpen] = useState(false);
    function handlechangeQurey(e) {
        setQurey(e.target.value)

    }
    // Handle scroll behavior
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            if (scrollTop > lastScrollTop) {
                // scrolling down
                setIsSticky(true);
            } else {
                // scrolling up
                setIsSticky(false);
            }

            setLastScrollTop(scrollTop <= 0 ? 0 : scrollTop);
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollTop]);
    const cartIconRef = useRef(null)
    return (
        <>
            <div className={`header_wrapper bg-[var(--primary-bg-color)] p-3 transition-all duration-300 z-10 ${isSticky ? "fixed top-0 w-full shadow-md" : ""}`}>
                <div className="container">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <div className="logo_bar">
                            <Link to={"/"}>
                                <img src={logo} alt="logo" className="w-36 h-auto" />
                            </Link>
                        </div>

                        {/* Search Input (hidden on md screens and below) */}
                        {/* <div className="hidden lg:flex relative items-center border border-gray-300 rounded-md bg-white w-[65%] px-3 py-2">
                            <input
                                type="text"
                                placeholder="Search for products (e.g fish, apple, oil)"
                                className="flex-1 outline-none text-gray-700"
                                value={qurey}
                                onChange={handlechangeQurey}
                            />
                            <CiSearch className="text-xl text-gray-500 cursor-pointer" />
                        </div> */}
                        {/* Header me (mobile par hide rahega) */}
                        <div className="hidden md:flex w-100 justify-center">
                            <SearchBar />
                        </div>

                        {/* Icons */}
                        <div className="flex items-center gap-4 text-xl text-gray-600">
                            <CiSearch
                                className="lg:hidden text-white cursor-pointer"
                                size={26}
                                onClick={() => setShowSearchModal(true)}
                            />
                            <CiBellOff className="cursor-pointer text-white" size={26} />
                            <div className="relative">
                                <IoCartOutline className="text-white cursor-pointer" size={26} ref={cartIconRef} onClick={() => setDrawerOpen(true)} />
                                <span className="absolute -top-3 -right-3 bg-red-500 text-white text-xs font-bold w-[22px] h-[22px] flex justify-center items-center rounded-full">
                                    {user && user.user ? cartItems.length : 0}
                                </span>
                            </div>
                            {
                                user ? (
                                    <div className="flex gap-1   items-end text-white leading-tight">
                                        <strong className="text-md">
                                            {user?.user?.name.charAt(0).toUpperCase() + user.user.name.slice(1)}
                                        </strong>
                                        <span className="text-sm  flex"> ({user.user.role})</span>
                                    </div>
                                ) : (
                                    <FaRegUser className="cursor-pointer text-white" size={22} onClick={() => {
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                        navigate('auth/login');
                                    }} />
                                )
                            }


                        </div>
                    </div>
                </div>
            </div>

            {/* Navbar */}
            <Navbar />

            {/* Search Modal */}
            {showSearchModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50" style={{ background: "rgba(0,0,0,.6)" }}>
                    <div className="bg-white w-[90%] h-[150px] max-w-md p-6 rounded-lg shadow-lg animate-slide-down relative">
                        <button
                            className="absolute top-3 right-3 text-gray-500 hover:text-red-600"
                            onClick={() => setShowSearchModal(false)}
                        >
                            <IoClose size={24} />
                        </button>
                        <h2 className="text-lg font-semibold mb-4 text-center mt-2">
                            Search Products
                        </h2>
                        <div className="flex gap-2 p-3  justify-center">
                            <SearchBar alwaysVisible className="w-100" onClose={() => setShowSearchModal(false)} />
                        </div>
                    </div>
                </div>
            )}
            {/* Modal Animation */}
            <style>{`
                @keyframes slideDown {
                    from { transform: translateY(-20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                .animate-slide-down {
                    animation: slideDown 0.3s ease-out;
                }
            `}</style>
            <CartDrawer open={drawerOpen}
                onClose={() => {
                    setDrawerOpen(false);
                    setTimeout(() => {
                        cartIconRef.current?.focus(); // ✅ focus वापस cart icon पर
                    }, 100);
                }} />
        </>
    );
};

export default Header;
