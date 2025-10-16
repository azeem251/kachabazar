import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  MdOutlineArrowDropDown,
  MdShoppingCart,
  MdContactSupport,
  MdPolicy,
  MdQuestionAnswer,
  MdSecurity,
  MdInfo,
} from "react-icons/md";
import fish_img from '../../assets/fish_img.png'
import fruits_img from '../../assets/fruits_img.png'
import cooking_img from '../../assets/cooking_img.png'
import biscuits_img from '../../assets/biscuits_img.png'
import household_img from '../../assets/household_img.png'
import pet_care_img from '../../assets/pet_care_img.png'
import milk_img from '../../assets/milk_img.png'
import drink_img from '../../assets/drink_img.png'
import { IoClose } from "react-icons/io5";
import logo from '../../assets/logo.svg'
import { useDispatch } from "react-redux";
import { BACKEND_URL } from "../../utils/api";
import axios from "axios";
import { setProducts } from "../../ReduxSlices/productSlice";
const menuItems = [
  {
    label: "Fish & Meat",
    icon: fish_img,
    submenu: ["Fish", "Meat"],
  },
  {
    label: "Fruits & Vegetables",
    icon: fruits_img,
    submenu: ["Fruits", "Vegetables"],
  },
  {
    label: "Cooking Essentials",
    icon: cooking_img,
    submenu: ["Flour", "Oil"],
  },
  {
    label: "Biscuits & Cakes",
    icon: biscuits_img,
    submenu: ["Biscuits", "Cakes"],
  },
  {
    label: "Household Tools",
    icon: household_img,
    submenu: ["Water Filter", "Cleaner Tools"],
  },
  {
    label: "Pet Care",
    icon: pet_care_img,
    submenu: ["Dog Care", "Cat Care"],
  },
  {
    label: "Milks & Dairy",
    icon: milk_img,
    submenu: ["Butter & Ghee", "Ice Cream"],
  },
  {
    label: "Drinks",
    icon: drink_img,
    submenu: ["Tea", "Water", "Juice", "Coffee", "Energy Drinks"],
  },
];

const pagesMenu = [
  { label: "Orders", icon: <MdShoppingCart />, link: "/orders" },
  { label: "About Us", icon: <MdInfo />, link: "/about" },
  { label: "Contact Us", icon: <MdContactSupport />, link: "/contact" },
  { label: "FAQ", icon: <MdQuestionAnswer />, link: "/faq" },
  { label: "Privacy Policy", icon: <MdPolicy />, link: "/privacy-policy" },
  { label: "Terms & Conditions", icon: <MdSecurity />, link: "/terms-conditions" },
];

const MobileMenu = ({ isOpen, setIsOpen }) => {
  const drawerRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch()
  const [activeCategory, setActiveCategory] = useState(null);
  const queryParams = new URLSearchParams(location.search);
  const categorySlug = queryParams.get('category');
  const subcategorySlug = queryParams.get('subcategory');
  const readableCategory = categorySlug?.replace(/-/g, ' ');
  const readableSubcategory = subcategorySlug?.replace(/-/g, ' ');
  const [activeSubcategory, setActiveSubcategory] = useState(null);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsOpen]);

  const toggleCategory = (label) => {
    setActiveCategory(activeCategory === label ? null : label);
  };
  useEffect(() => {
    const fetchProducts = async () => {
      const queryParams = new URLSearchParams(location.search);
      const category = queryParams.get('category');
      const subcategory = queryParams.get('subcategory');

      try {
        const url = new URL(`${BACKEND_URL}/api/products`);
        if (category) url.searchParams.append("category", category);
        if (subcategory) url.searchParams.append("subcategory", subcategory);

        const res = await axios.get(url.toString());
        dispatch(setProducts(res.data));
      } catch (error) {
        console.error('Error fetching products', error);
      }
    };

    fetchProducts();
  }, [location.search, dispatch]);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-[999] flex model_bg">
        <aside
          ref={drawerRef}
          className="w-[280px] h-full z-30  bg-white shadow-xl overflow-y-auto transform-gpu animate-drawer-slide transition-all duration-300"
        >
          {/* Close */}
          <div className="text-right  bg-slate-600 flex justify-between h-[80px] p-2">
            <Link to={'/'}> <img src={logo} className="w-29" alt="" /></Link>
            <button
              className="text-xl text-white "
              onClick={() => setIsOpen(false)}
            >
              <IoClose size={25} />
            </button>
          </div>

          {/* Categories */}
          <div className="mb-6 ">
            <h3 className=" font-semibold text-gray-600  pb-2 border-b menu_heading_mobile  p-2">Categories</h3>
            <ul className="space-y-2">
              {menuItems.map((item, index) => (
                <li key={index} className="p-1">
                  <div
                    onClick={() => toggleCategory(item.label)}
                    className="flex justify-between items-center cursor-pointer py-2 px-3 rounded hover:bg-gray-100 transition"
                  >
                    <span className="flex items-center gap-2 text-sm text-gray-700">
                      <img src={item.icon} alt="" className="w-5 h-5" />
                      {item.label}
                    </span>
                    <MdOutlineArrowDropDown
                      className={`transition-transform duration-300 ${activeCategory === item.label ? "rotate-180" : ""
                        }`}
                    />
                  </div>
                  <div
                    className={`ml-8 overflow-hidden transition-all duration-300 ease-in-out ${activeCategory === item.label
                      ? "max-h-40 opacity-100"
                      : "max-h-0 opacity-0"
                      }`}
                  >
                    <ul className="mt-1 space-y-1 bg-slate-100 p-2 rounded">
                      {item.submenu.map((subItem, subIdx) => (
                        <li key={subIdx}>
                          <Link
                            to="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setIsOpen(false);
                              setActiveSubcategory(subItem); // ✅ Set active subcategory
                              navigate(
                                `/search?category=${encodeURIComponent(item.label)}&subcategory=${encodeURIComponent(subItem)}`
                              );
                            }}
                            className={`block text-sm px-4 py-1 
    ${activeSubcategory === subItem
                                ? "text-green-600 font-medium"
                                : "text-gray-600 hover:text-green-600"}`}
                          >
                            {subItem}
                          </Link>


                        </li>

                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Pages */}
          <div>
            <h3 className="text-md font-semibold text-gray-600 mb-3 pb-2 border-b menu_heading_mobile  p-2">Pages</h3>
            <ul className="space-y-2">
              {pagesMenu.map((page, idx) => (
                <li key={idx}>
                  <Link
                    to={page.link}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded text-sm text-gray-700 hover:bg-gray-100 transition"
                  >
                    <span className="text-green-600 text-base">{page.icon}</span>
                    {page.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes drawerSlide {
          from { transform: translateX(-100%); opacity: 0.3; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-drawer-slide {
          animation: drawerSlide 0.4s ease-out;
        }
      `}</style>
    </>
  );
};

export default MobileMenu;
