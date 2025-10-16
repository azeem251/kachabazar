import { X } from "@mui/icons-material";
import { Menu } from "@mui/material";
import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"; // ← location import
import ProductTable from "../../components/ProductTable/ProductTable";
import logo from '../../assets/logo.svg'
const AdminDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // ← current URL path
  const navigate = useNavigate()
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Mobile Toggle Button */}
      <div className="md:hidden bg-emerald-500 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Admin Panel</h1>
        <button onClick={toggleSidebar}>
          Menu
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`${isOpen ? "block" : "hidden"
          } md:block md:w-64 bg-gray-100 border border-r-slate-300`}
      >
        <h2 className="text-xl font-semibold mb-4 p-3 hidden md:block bg-slate-500"><img src={logo} className="w-[120px]" alt="admin logo img" /></h2>
        <ul className="space-y-3">
          <li>
            <Link
              to="user-details"
              className="block px-3 py-2  hover:bg-emerald-100 text-emerald-800 font-medium border-b border-slate-400"
            >
              My users
            </Link>
          </li>
          <li>
            <Link
              to="upload-product"
              className="block px-3 py-2  hover:bg-emerald-100 text-emerald-800 font-medium border-b border-slate-400"
            >
              Upload Product
            </Link>
          </li>
          <li>
            <Link
              to="/admin/dashboard/orders"
              className="block px-3 py-2  hover:bg-emerald-100 text-emerald-800 font-medium border-b border-slate-400"
            >
              My Orders
            </Link>
          </li>
        </ul>

      </div>

      {/* Main Content */}
      <div className="flex-1 p-4">
        <button className="bg-green-600 rounded text-white p-2 float-right" onClick={() => { navigate('/admin/dashboard') }}>Back to Product</button>
        {location.pathname === "/admin/dashboard" && <ProductTable />}
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
