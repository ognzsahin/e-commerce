import { BrowserRouter, Route, Routes } from "react-router-dom"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../redux/store";
import { verifyToken } from "../redux/actions/clientActions";
import HomePage from "../pages/HomePage"
import Header from "../layout/Header"
import Footer from "../layout/Footer"
import PageContent from "../layout/PageContent"
import ShopPage from "../pages/ShopPage"
import SignupPage from "../pages/SignupPage"
import LoginPage from "../pages/LoginPage"
import ProductDetailPage from "../pages/ProductDetailPage"
import ScrollToTop from "../components/common/ScrollToTop";
import CartPage from "../pages/CartPage"
import ProtectedRoute from "../components/common/ProtectedRoute"
import OrderPage from "../pages/OrderPage"
import PreviousOrdersPage from "../pages/PreviousOrdersPage"
import ContactPage from "../pages/ContactPage"
import TeamPage from "../pages/TeamPage"
import AboutPage from "../pages/AboutPage"



function AppRouter() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(verifyToken());
  }, [dispatch]);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
    }
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Header />
        <Routes>
          <Route element={<PageContent />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/shop/:gender/:categoryName/:categoryId" element={<ShopPage />} />
            <Route path="/shop/:gender/:categoryName/:categoryId/:productNameSlug/:productId" element={<ProductDetailPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route
                path="/order"
                element={
                    <ProtectedRoute>
                        <OrderPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/previous-orders"
                element={
                    <ProtectedRoute>
                        <PreviousOrdersPage />
                    </ProtectedRoute>
                }
            />
          </Route>
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default AppRouter;