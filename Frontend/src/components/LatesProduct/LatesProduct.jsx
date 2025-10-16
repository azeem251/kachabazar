import React, { useEffect, useState } from 'react';
import { MdPunchClock } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setProducts } from '../../ReduxSlices/productSlice';
import { BACKEND_URL } from '../../utils/api';
import { Link } from 'react-router-dom';

const LatestProduct = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.list);
    const [sortOrder, setSortOrder] = useState('');
    const [visibleCount, setVisibleCount] = useState(12);
    const [loadingMore, setLoadingMore] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get(`${BACKEND_URL}/api/products`);
                dispatch(setProducts(res.data));
            } catch (err) {
                console.error('Failed to fetch products:', err);
            }
        };
        fetchProducts();
    }, [dispatch]);

    // ✅ Filter only selected categories and subcategories
    let filteredProducts = products.filter(
        (product) =>
        (
            (product.category === 'Cooking Essentials' && (product.subcategory === 'Flour' || product.subcategory === 'Oil')) ||
            (product.category === 'Biscuits & Cakes' && (product.subcategory === 'Biscuits' || product.subcategory === 'Cakes')) ||
            (product.category === 'Pet Care' && (product.subcategory === 'Dog Care' || product.subcategory === 'Cat Care'))
        )
    );
    if (sortOrder === 'low') {
        filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'high') {
        filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
    }

    const visibleProducts = filteredProducts.slice(0, visibleCount);

    const handleLoadMore = () => {
        setLoadingMore(true);
        setTimeout(() => {
            setVisibleCount((prev) => prev + 6);
            setLoadingMore(false);
        }, 1000);
    };

    return (
        <div className='vegitables_wrapper py-5 bg-gray-50 my-4'>
            <div className='container mx-auto px-4'>
                <div className='top-heading text-center'>
                    <h2 className='mb-2 text-2xl font-semibold'>Latest Discounted Products</h2>
                    <p className='text-gray-500 text-center mx-auto mt-3 max-w-xl'>
                        Explore discounted items in Cooking Essentials, Biscuits, Cakes & Pet Care categories.
                    </p>
                </div>
                <div className='prodcut_shorded px-3 py-2 flex justify-between items-center bg-amber-100'>
                    <p className="text-center  text-sm text-gray-600 font-medium">
                        Total Products Found: {filteredProducts.length}
                    </p>

                    {/* 🔽 Sort Dropdown */}
                    <div className="flex justify-center">
                        <select
                            onChange={(e) => setSortOrder(e.target.value)}
                            className=" border border-gray-300 rounded focus:outline-none text-xs bg-white"
                            value={sortOrder}
                        >
                            <option value="">Sort by Price</option>
                            <option value="low">Price: Low to High</option>
                            <option value="high">Price: High to Low</option>
                        </select>
                    </div>

                </div>
                <div className='mt-6'>
                    {visibleProducts.length > 0 ? (
                        <div className='grid mt-4 grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2'>
                            {visibleProducts.map((product) => (
                                <div key={product._id}  className='group box-border overflow-hidden flex rounded-md shadow-sm p-0 flex-col items-center bg-white relative'>
                                    <div className='absolute top-2 left-2  bg-gray-100 text-green-500 rounded-full text-xs px-2 py-0 font-medium'>
                                        Stock: <span className='text-orange-700 pl-1 font-bold'>{product.stock}</span>
                                    </div>

                                    <Link to={`/product/${product.name.replace(/\s+/g, "-")}/${product._id}`}>
                                        <div className='relative flex justify-center cursor-pointer pt-2 w-full h-44'>
                                            <div className='relative w-full h-full'>
                                                <img
                                                    alt={product.name}
                                                    loading='lazy'
                                                    src={product.image}
                                                    className='object-contain transition duration-150 ease-linear transform group-hover:scale-105 w-full h-full p-2'
                                                />
                                            </div>
                                        </div>
                                    </Link>

                                    <div className='w-full px-3 lg:px-4 pb-4 overflow-hidden'>
                                        <div className='relative mb-1'>
                                            <h6 className='truncate mb-0 block text-sm font-medium text-gray-500'>
                                                <span className='line-clamp-2 prdoctu_name'>{product.name}</span>
                                            </h6>
                                        </div>
                                        <div className='flex justify-between items-center text-heading text-sm sm:text-base lg:text-xl'>
                                            <div className='font-serif product-price font-bold'>
                                                <span className='inline-block text-lg font-semibold text-gray-800'>₹{product.price}</span>
                                            </div>
                                            <button
                                                aria-label='cart'
                                                className='h-9 w-9 flex items-center justify-center border border-gray-200 rounded text-emerald-500 hover:border-emerald-500 hover:bg-emerald-500 hover:text-white transition-all'>
                                                <MdPunchClock size={20} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className='flex justify-center items-center h-80'>
                            <div className='text-center'>
                                <img
                                    src='https://cdn-icons-png.flaticon.com/512/6134/6134065.png'
                                    alt='No Products Found'
                                    className='w-32 mx-auto mb-3'
                                />
                                <p className='text-gray-500 font-medium'>No products found.</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Load More */}
                {visibleCount < filteredProducts.length && (
                    <div className='mt-6 flex justify-center'>
                        <button
                            onClick={handleLoadMore}
                            className='px-5 py-2 bg-[var(--primary-bg-color)] my-4 text-white rounded hover:bg-emerald-700 transition-all'
                            disabled={loadingMore}
                        >
                            {loadingMore ? "Loading..." : "Load More"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LatestProduct;
