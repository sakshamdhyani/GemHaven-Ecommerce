import { useEffect } from 'react';
import './App.css';
import Navbar from './component/layout/Header/Navbar.js';
import { BrowserRouter as Router , Route , Routes } from 'react-router-dom';
import WebFont from "webfontloader";
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/Home/Home.js"

import ProductDetails from "./component/Product/ProductDetails.js"
import Products from "./component/Product/Products.js"
import LoginSignUp from './component/User/LoginSignUp';
import store from "./store";
import { getUserAvatar, loadUser } from './actions/userAction';
import Profile from "./component/User/Profile.js"
import ProtectedRoute from './component/Route/ProtectedRoute';
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import Payment from "./component/Cart/Payment"
import OrderSuccess from "./component/Cart/OrderSuccess"
import MyOrders from "./component/Order/MyOrders.js"
import OrderDetails from "./component/Order/OrderDetails.js"

import Dashboard from "./component/Admin/Dashboard.js"
import ProductList from "./component/Admin/ProductList.js"

import { Elements } from '@stripe/react-stripe-js';
import {loadStripe} from "@stripe/stripe-js"
import NewProduct from './component/Admin/NewProduct';
import UpdateProduct from './component/Admin/UpdateProduct';
import OrderList from './component/Admin/OrderList';
import ProcessOrder from './component/Admin/ProcessOrder';
import UsersList from './component/Admin/UsersList';
import UpdateUser from './component/Admin/UpdateUser';
import About from './component/layout/About/About';
import Contact from "./component/layout/Contact/Contact"
import NotFound from "./component/layout/Not Found/NotFound"




function App() {

  const STRIPE_API_KEY = "pk_test_51NoRPSSHHDUFNxoC1GAADKmr2N6JxgYpKahro7lzN5r3tOqiDXM4ca4voH9X44tc8hYt9tui0qhsiKVkw8vA50pk00n8KeOUj9";

  useEffect(() => {

    WebFont.load({
      google:{
        families:["Roboto" , "Droid Sans" , "Chilanka"],
      },
      
    });

    store.dispatch(loadUser());
  },[]);

  // Disabling rightclick in website
  // window.addEventListener("contextmenu" , (event) => event.preventDefault());

  return (

    <Router>

      <Navbar/>

      <Routes>

          {/* USER ROUTES */}

          {/* <Route exact path='/' element = {<Home/>} />
          <Route exact path='/about' element = {<About/>} />
          <Route exact path='/contact' element = {<Contact/>} /> */}
          {/* <Route exact path='/product/:id' element = {<ProductDetails/>} /> */}
          {/* <Route exact path='/products' element = {<Products/>} /> */}
          {/* <Route  path='/products/:keyword' element = {<Products/>} /> */}
          
          {/* <Route exact path='/login' element={<LoginSignUp/>}/> */}

          {/* <Route exact path='/account' element={<ProtectedRoute component = {Profile} />}/> */}

          {/* <Route exact path='/me/update' element={<ProtectedRoute component = {UpdateProfile} />}/> */}

          {/* <Route exact path='/password/update' element={<ProtectedRoute component = {UpdatePassword} />}/> */}
          
          {/* <Route exact path='/password/forgot' element={<ForgotPassword/>}/> */}
          
          {/* <Route exact path='/password/reset/:token' element={<ResetPassword/>}/> */}
      
          {/* <Route exact path='/cart' element={<Cart/>}/> */}

          {/* <Route exact path='/login/shipping' element={<ProtectedRoute component = {Shipping} />}/> */}

          {/* <Route exact path='/order/confirm' element={<ProtectedRoute component = {ConfirmOrder} />}/>  */}


          {/* Payment Route */}
          {/* <Route exact path='/process/payment' element={

              <Elements stripe={loadStripe(STRIPE_API_KEY)}>
                <ProtectedRoute component = {Payment} />
              </Elements>

          }/> */}


          {/* <Route exact path='/success' element={<ProtectedRoute component = {OrderSuccess} />}/>  */}
          
          {/* <Route exact path='/orders' element={<ProtectedRoute component = {MyOrders} />}/>  */}
          
          {/* <Route exact path='/order/:id' element={<ProtectedRoute component = {OrderDetails} />}/>  */}



          {/* ADMIN ROUTES */}

          <Route exact path='/admin/dashboard' element={<ProtectedRoute isAdmin={true} component = {Dashboard} />}/> 
          
          <Route exact path='/admin/products' element={<ProtectedRoute isAdmin={true} component = {ProductList} />}/> 
          
          <Route exact path='/admin/product' element={<ProtectedRoute isAdmin={true} component = {NewProduct} />}/> 
          
          <Route exact path='/admin/product/:id' element={<ProtectedRoute isAdmin={true} component = {UpdateProduct} />}/> 
          
          <Route exact path='/admin/orders' element={<ProtectedRoute isAdmin={true} component = {OrderList} />}/> 
          
          <Route exact path='/admin/order/:id' element={<ProtectedRoute isAdmin={true} component = {ProcessOrder} />}/> 
          
          <Route exact path='/admin/users' element={<ProtectedRoute isAdmin={true} component = {UsersList} />}/> 

          <Route exact path='/admin/user/:id' element={<ProtectedRoute isAdmin={true} component = {UpdateUser} />}/> 
        

          <Route path='*' element = {window.location.pathname === "/process/payment" ? null : <NotFound/>} />

        </Routes>
      

      <Footer/>
    </Router>

  );
}

export default App;


