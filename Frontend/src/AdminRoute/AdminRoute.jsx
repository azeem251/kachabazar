// components/PrivateRouteAdmin.jsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated || user.user?.role !== "admin") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <>{children}</>; // Wrap children in Fragment just to be safe
};

export default AdminRoute;
