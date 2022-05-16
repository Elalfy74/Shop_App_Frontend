import { Fragment, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCart } from "./redux/cart_actions";

import Header from "./components/Layout/Header";
import HomePage from "./Pages/HomePage/HomePage";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import CartPage from "./Pages/CartPage/CartPage";
import AllProductsPage from "./Pages/AllProductsPage/AllProductsPage";
import ProductView from "./Pages/ProductView/ProductView";
import ContactUs from "./Pages/ContactUs/ContactUs";

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) {
      dispatch(getCart(token));
    }
  }, [dispatch, token]);

  return (
    <Fragment>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/register"
          element={!token ? <Register /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!token ? <Login /> : <Navigate to="/" />}
        />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/products/*" element={<AllProductsPage />} />
        <Route path="/product/:productId" element={<ProductView />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
    </Fragment>
  );
}

export default App;
