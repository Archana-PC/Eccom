import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

import ProtectedRoute from "./routes/ProtectedRoute";
import Wishlist from "./pages/wishlist/Wishlist";
import CategoryLayout from "../layouts/CategoryLayout";
import CategoryPage from "./pages/category/CategoryPage";
import ProductLayout from "../layouts/ProductLayout";
import ProductDetail from "./pages/productDetail/ProductDetail";
import CheckoutLayout from "../layouts/CheckoutLayout";
import Cart from "./pages/cart/Cart";
import Payment from "./pages/checkout/Payment";
import AuthLayout from "../layouts/AuthLayout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import NotFound from "./pages/NotFound";
import Home from "./pages/home/Home";
import StyleLayout from "../layouts/StyleLayout";
import StyleProducts from "./pages/StyleProducts";

function UserRoutes() {
  return (
    <div className="App">
      <Routes>
        {/* Main Layout - Home, Account, etc. */}
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />

          <Route element={<ProtectedRoute />}>
            <Route path="wishlist" element={<Wishlist />} />
          </Route>
        </Route>

        {/* Category Layout - Shopping Pages with Filters */}
        <Route element={<CategoryLayout />}>
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route
            path="/category/:category/:subcategory"
            element={<CategoryPage />}
          />
          <Route path="/brands" element={<CategoryPage category="all" />} />
          <Route path="/sale" element={<CategoryPage category="sale" />} />
          {/* Additional category routes */}
          <Route
            path="/men"
            element={<CategoryPage category="clothing" gender="men" />}
          />
          <Route
            path="/women"
            element={<CategoryPage category="clothing" gender="women" />}
          />
          <Route
            path="/kids"
            element={<CategoryPage category="clothing" gender="kids" />}
          />
          <Route
            path="/new-arrivals"
            element={<CategoryPage category="all" filter="new" />}
          />
        </Route>

        <Route path="/styles/:slug" element={<StyleLayout />}>
          <Route index element={<StyleProducts />} />
        </Route>

        {/* Product Layout - Individual Products */}
        <Route element={<ProductLayout />}>
          <Route path="/product/:id" element={<ProductDetail />} />
        </Route>

        {/* Cart as standalone route */}
        <Route path="/cart" element={<CheckoutLayout />}>
          <Route index element={<Cart />} />
        </Route>

        {/* Checkout routes */}
        <Route path="/checkout" element={<CheckoutLayout />}>
          {/* <Route index element={<Address />} /> */}
          {/* <Route path="address" element={<Address/>} /> */}
          <Route path="payment" element={<Payment />} />
        </Route>

        {/* Auth Layout - Login, Register */}
        {/* <Route element={<AuthLayout/>}>
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
        </Route> */}

        {/* 404 - Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default UserRoutes;
