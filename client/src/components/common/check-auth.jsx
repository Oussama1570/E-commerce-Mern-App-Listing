// CheckAuth.jsx (Protected Route Wrapper)
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const CheckAuth = ({ children }) => {
  const { user, isAuthenticated, isLoading } = useSelector((state) => state.auth);
  const location = useLocation();

  if (isLoading) {
    return <div>Loading...</div>; // ✅ Ensures we wait for auth state
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  if (location.pathname.startsWith("/admin")) {
    if (!user.role || user.role !== "admin") {
      return <Navigate to="/unauth-page" replace />;
    }
  }

  return children;
};

export default CheckAuth;
