
import "./App.css";
import Header from "./component/layout/Header/Header.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import React, { useState } from "react";
import Footer from "./component/layout/Footer/Footer";
import Home from "./component/Home/Home";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js";
import Search from "./component/Product/Search.js";
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions.js";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile.js";
// import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import axios from "axios";
import { useEffect } from "react";
// import { get } from "mongoose";
import Payment from "./component/Cart/Payment.js";
import { Element } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import MyOrders from "./component/Order/MyOrders.js";
import OrderDetails from "./component/Order/OrderDetails.js";
import Dashboard from "./component/Admin/Dashboard.js";
// import ProtectedRoute from "./component/Route/ProtectedRoute";
import ProductList from "./component/Admin/ProductList.js";
import NewProduct from "./component/Admin/NewProduct";
import UpdateProduct from "./component/Admin/UpdateProduct";
import OrderList from "./component/Admin/OrderList";
import ProcessOrder from "./component/Admin/ProcessOrder.js";
import UsersList from "./component/Admin/UsersList.js";
import UpdateUser from "./component/Admin/UpdateUser.js";
import ProductReviews from "./component/Admin/ProductReviews.js";
import Contact from "./component/layout/Contact/Contact";
import About from "./component/layout/About/About";
import NotFound from "./component/layout/Not Found/NotFound";


function App() {
  const { isAuthenticated, user, isAdmin } = useSelector((state) => state.user);
  const [stripeApikey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApikey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  // window.addEventListener("contextmenu",(e) =>e.preventDefault());

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/search" element={<Search />} />

        <Route path="/login" element={<LoginSignUp />} />

        <Route
          path="/account"
          element={isAuthenticated ? <Profile /> : <LoginSignUp />}
        />

        <Route
          path="/shipping"
          element={isAuthenticated ? <Shipping /> : <LoginSignUp />}
        />

        <Route
          path="/success"
          element={isAuthenticated ? <OrderSuccess /> : <LoginSignUp />}
        />

        <Route
          path="/orders"
          element={isAuthenticated ? <MyOrders /> : <LoginSignUp />}
        />

        


        
        <Route path="/contact" element={<Contact />} />

        <Route path="/about" element={<About />} />

        <Route path="/me/update" element={<UpdateProfile />} />

        <Route path="/password/forgot" element={<ForgotPassword />} />

        <Route path="/password/reset/:token" element={<ResetPassword />} />

        <Route path="/password/update" element={<UpdatePassword />} />

        <Route path="/cart" element={<Cart />} />

        <Route
          path="/order/confirm"
          element={isAuthenticated ? <ConfirmOrder /> : <LoginSignUp />}
        />

        <Route
          path="/order/:id"
          element={isAuthenticated ? <OrderDetails /> : <LoginSignUp />}
        />



        <Route
        path="/admin/dashboard"
        element={ isAuthenticated  ? <Dashboard /> : <LoginSignUp />}
      />

      <Route
        path="/admin/products"
        element={ isAuthenticated  ? <ProductList /> : <LoginSignUp />}
      />

      
      <Route
        path="/admin/product"
        element={ isAuthenticated  ? <NewProduct /> : <LoginSignUp />}
      />

      <Route
      path="/admin/product/:id"
      element={ isAuthenticated  ? <UpdateProduct /> : <LoginSignUp />}
    />

    <Route
      path="/admin/orders"
      element={ isAuthenticated  ? <OrderList /> : <LoginSignUp />}
    />

    <Route
      path="/admin/order/:id"
      element={ isAuthenticated  ? <ProcessOrder /> : <LoginSignUp />}
    />

    
    <Route
      path="/admin/users"
      element={ isAuthenticated  ? <UsersList /> : <LoginSignUp />}
    />

    <Route
      path="/admin/user/:id"
      element={ isAuthenticated  ? <UpdateUser /> : <LoginSignUp />}
    />

    
    <Route
      path="/admin/reviews"
      element={ isAuthenticated  ? <ProductReviews /> : <LoginSignUp />}
    />

    
<Route
path="/process/payment"
element={
  isAuthenticated ? (
    stripeApikey && (
      <Element stripe={loadStripe(stripeApikey)}>
        <Payment />
      </Element>
    )
  ) : (
    <LoginSignUp />
  )
}
/>

    <Route element={window.location.pathname === "/process/payment" ? null :NotFound}/>

    </Routes>
    
    <Footer />


      {isAuthenticated && isAdmin && <UserOptions user={user} />}
      <Routes></Routes>

    </Router>
  );
}

export default App;
