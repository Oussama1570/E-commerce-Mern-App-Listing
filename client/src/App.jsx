import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import AuthLayout from './components/auth/layout.jsx';
import AuthLogin from './pages/auth/login';
import AuthRegister from './pages/auth/register';
import AdminProducts from './pages/admin-view/products';
import AdminFeatures from './pages/admin-view/features';
import Admindashboard from './pages/admin-view/dashboard';
import Adminorders from './pages/admin-view/orders';
import AdminLayout from "./components/admin-view/layout.jsx"
import ShoppingLayout from './components/shooping-view/layout';
import NotFound from './pages/not-found';
import ShoppingHome from './pages/shopping-view/home';
import ShoppingListing from './pages/shopping-view/listing';
import ShoppingCheckout from './pages/shopping-view/checkout';
import ShoppingAccount from './pages/shopping-view/account';
import CheckAuth from "./components/common/check-auth";
import UnauthPage from "./pages/unauth-page";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/auth-slice";
import { Skeleton } from "./components/ui/skeleton"


function App() {
  const { user, isAuthenticated, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) return <Skeleton className="w-[800px] bg-black h-[600px]" />; // Corrected width and height units

  console.log(isLoading, user);


  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        {/* Auth Routes */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<CheckAuth><AdminLayout/></CheckAuth>}>
          <Route path="dashboard" element={<Admindashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<Adminorders />} />
          <Route path="features" element={<AdminFeatures />} />
        </Route>

        {/* Shopping Routes */}
        <Route path="/shop" element={<ShoppingLayout />}>
          <Route path="home" element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="account" element={<ShoppingAccount />} />
        </Route>

        {/* Catch-All Route */}
        <Route path="/unauth-page" element={<UnauthPage/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
