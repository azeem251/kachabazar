import React, { useEffect } from 'react';
import { FaAngleRight } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';

import fishImg from '../../assets/fish_img.png';
import FruitesImg from '../../assets/fruits_img.png';
import cookingImg from '../../assets/cooking_img.png';
import biscuitsImg from '../../assets/biscuits_img.png';
import housefilterImg from '../../assets/household_img.png';
import petCareImg from '../../assets/pet_care_img.png';
import milkImg from '../../assets/milk_img.png';
import drinkImg from '../../assets/drink_img.png';
import { BACKEND_URL } from '../../utils/api';
import axios from 'axios';
import { setProducts } from '../../ReduxSlices/productSlice';
import { useDispatch } from 'react-redux';

const FeaturedCategory = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const queryParams = new URLSearchParams(location.search);

  const selectedSubcategory = queryParams.get('subcategory');
  const categorySlug = queryParams.get('category');

  const readableCategory = categorySlug?.replace(/-/g, ' ');
  const readableSubcategory = selectedSubcategory?.replace(/-/g, ' ');

  const categories = [
    {
      label: 'Fish & Meat',
      image: fishImg,
      subcategories: ['Fish', 'Meat'],
    },
    {
      label: 'Fruits & Vegetables',
      image: FruitesImg,
      subcategories: ['Fruits', 'Vegetables'],
    },
    {
      label: 'Cooking & Essentials',
      image: cookingImg,
      subcategories: ['Flour', 'Oil'],
    },
    {
      label: 'Biscuits & Cakes',
      image: biscuitsImg,
      subcategories: ['Biscuits', 'Cakes'],
    },
    {
      label: 'Household Tools',
      image: housefilterImg,
      subcategories: ['Water Filter', 'Cleaner Tools'],
    },
    {
      label: 'Pet Care',
      image: petCareImg,
      subcategories: ['Dog Care', 'Cat Care'],
    },
    {
      label: 'Milks & Dairy',
      image: milkImg,
      subcategories: ['Butter & Ghee', 'Ice Cream'],
    },
    {
      label: 'Drinks',
      image: drinkImg,
      subcategories: ['Tea', 'Water'],
    },
  ];
  useEffect(() => {
    const fetchProducts = async () => {
      if (!readableCategory) return;

      try {
        const url = new URL(`${BACKEND_URL}/api/products`);
        url.searchParams.append("category", readableCategory);

        if (readableSubcategory) {
          url.searchParams.append("subcategory", readableSubcategory);
        }

        const res = await axios.get(url.toString());

        dispatch(setProducts(res.data));


      } catch (error) {
        console.error('Error fetching products', error);
      }
    };

    fetchProducts();
  }, [readableCategory, readableSubcategory, dispatch]);

  return (
    <div className="featuered_wrapper py-5 bg-gray-100">
      <div className="container">
        <div className="top-heading text-center">
          <h2 className="mb-2">Featured Categories</h2>
          <p className="text-gray-500">
            Choose your necessary products from this feature categories.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-0 mt-4">
          {categories.map((item) => (
            <div
              key={item.label}
              className="features_items bg-white p-3 border-gray-200 border-r border-b hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-center gap-3.5">
                <div>
                  <img src={item.image} alt={item.label} width={35} />
                </div>
                <div>
                  <strong className="text-gray-600 text-sm">{item.label}</strong>
                  {item.subcategories.map((subItem) => (
                    <span
                      key={subItem}
                      onClick={() => {
                        navigate(
                          // `/search?category=${encodeURIComponent(item.label)}&subcategory=${encodeURIComponent(subItem)}`
                          `/search?category=${item.label}&subcategory=${subItem}`

                        );
                      }}
                      className={`block cursor-pointer text-sm transition-all duration-200 hover:pl-2 ${readableSubcategory === subItem ? 'text-emerald-600 font-semibold' : 'text-gray-600'
                        }`}
                    >
                      <FaAngleRight className="mr-1 inline-block" /> {subItem}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedCategory;
