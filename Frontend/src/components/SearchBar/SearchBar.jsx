import React, { useEffect, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL } from '../../utils/api';
import { useDebounce } from '../../utils/useDebounce';

const highlightText = (text, query) => {
  if (!query) return text;

  const regex = new RegExp(`(${query})`, 'ig'); // case-insensitive match
  return text.replace(regex, `<span class="text-blue-600 font-semibold">$1</span>`);
};

const SearchBar = ({ alwaysVisible = false ,onClose}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    const fetchData = async () => {
      if (!debouncedQuery.trim()) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        const response = await axios.get(`${BACKEND_URL}/api/products/search?q=${debouncedQuery}`);
        const products = response.data?.data;
        setResults(Array.isArray(products) ? products : []);
      } catch (err) {
        console.error('Search error:', err.message);
        setResults([]);
      }

      setTimeout(() => setLoading(false), 800);
    };

    fetchData();
  }, [debouncedQuery]);

  const handleChange = (e) => setQuery(e.target.value);
  const handleProductClick = (product) => {
    navigate(`/product/${product.name.replace(/\s+/g, "-")}/${product._id}`);
    setQuery('');
    setResults([]);
    
    if (onClose) {
      onClose(); // ✅ This will close the modal
    }
  };
  return (
    <div className={`${alwaysVisible ? "flex" : "hidden lg:flex"} relative flex-col w-full md:w-[65%]`}>
      <div className="flex items-center border border-gray-300 rounded-t-md bg-white px-3 py-2">
        <input
          type="text"
          placeholder="Search for products (e.g fish, apple, oil)"
          className="flex-1 outline-none text-gray-700"
          value={query}
          onChange={handleChange}
        />
        <CiSearch className="text-xl text-gray-500 cursor-pointer" />
      </div>

      {query.trim() && (
        <ul className="absolute z-50 top-full left-0 w-full bg-white shadow-md rounded-b-md max-h-64 overflow-y-auto border border-t-0 border-gray-300">
          {loading ? (
            <li className="flex justify-center items-center py-4">
              <div className="w-6 h-6 border-2 border-t-emerald-500 border-gray-300 rounded-full animate-spin" />
            </li>
          ) : results.length === 0 ? (
            <li className="flex flex-col items-center justify-center px-4 py-3">
              <img
                src="https://cdn.iconscout.com/icon/premium/png-512-thumb/no-item-found-4372002-3633300.png"
                className="w-[40px]"
                alt="Not found"
              />
              <span className="text-red-600 mt-1 text-sm">No Product found</span>
            </li>
          ) : (
            results.map((product) => (
            <li
              key={product._id}
              onClick={() => handleProductClick(product)}
              className="flex gap-3 items-center px-4 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-9 h-9 object-cover rounded border"
              />
              <div className="flex flex-col">
                <span
                  className="font-medium text-gray-800"
                  dangerouslySetInnerHTML={{ __html: highlightText(product.name, query) }}
                />
                <span
                  className="text-sm text-gray-500"
                  dangerouslySetInnerHTML={{
                    __html: `${highlightText(product.category, query)} → ${highlightText(product.subcategory, query)}`
                  }}
                />
              </div>
            </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
