import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Layout/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import LoginSignup from './components/User/LoginSignUp'
import WebFont from 'webfontloader'
import { useDispatch } from 'react-redux'
import { loadUser } from './redux/slices/userAuthSlice'
import ForgotPassword from './components/User/ForgotPassword'
import ResetPassword from './components/User/ResetPassword'
import Home from './components/Home/Home'
import Footer from './components/Layout/Footer/Footer'
import About from "./components/Layout/About/About"
import Contact from './components/Layout/Contact/Contact'
import NotFound from './components/Layout/Not Found/NotFound'
import Products from './components/Product/Products'
import ProductDetails from "./components/Product/ProductDetails"
import Cart from './components/Cart/Cart'
import Shipping from "./components/Cart/Shipping"
import ConfirmOrder from './components/Cart/ConfirmOrder'
import { Elements } from '@stripe/react-stripe-js'
import Payment from './components/Cart/Payment'
import {loadStripe} from "@stripe/stripe-js"
import Profile from './components/User/Profile'
import UpdateProfile from './components/User/UpdateProfile'
import ProtectedRoute from './components/Route/ProtectedRoute'
import UpdatePassword from './components/User/UpdatePassword'
import OrderSuccess from './components/Cart/OrderSuccess'
import MyOrders from './components/Order/MyOrders'
import OrderDetails from './components/Order/OrderDetails'
import Dashboard from './components/Admin/Dashboard'
import ProductList from './components/Admin/ProductList'
import NewProduct from './components/Admin/NewProduct'
import UpdateProduct from './components/Admin/UpdateProduct'
import OrderList from './components/Admin/OrderList'
import ProcessOrder from './components/Admin/ProcessOrder'
import UsersList from './components/Admin/UsersList'
import UpdateUser from './components/Admin/UpdateUser'



function App() {

  const dispatch = useDispatch();

  useEffect(() => {

    WebFont.load({
      google:{
        families:["Roboto" , "Droid Sans" , "Chilanka"],
      },
      
    });

    dispatch(loadUser());
  },[]);


  const STRIPE_API_KEY = "pk_test_51NoRPSSHHDUFNxoC1GAADKmr2N6JxgYpKahro7lzN5r3tOqiDXM4ca4voH9X44tc8hYt9tui0qhsiKVkw8vA50pk00n8KeOUj9";

  return (


    <div>

      <Navbar/>

      <Routes>

        <Route exact path='/' element = {<Home/>} />
        <Route exact path='/about' element = { <About/>} />
        <Route exact path='/contact' element = {<Contact/>} />
        <Route path='/login' element ={<LoginSignup/>} />
        <Route exact path='/password/forgot' element={<ForgotPassword/>}/>
        <Route exact path='/password/reset/:token' element={<ResetPassword/>}/>
        <Route exact path='/products' element = {<Products/>} />
        <Route exact path='/product/:id' element = {<ProductDetails/>} />
        <Route exact path='/cart' element={<Cart/>}/>
        <Route exact path='/login/shipping' element={ <ProtectedRoute component={Shipping} />}/>   
        <Route exact path='/order/confirm' element={<ProtectedRoute component={ConfirmOrder} />}/> 

        {/* Payment Route */} 
        <Route exact path='/process/payment' element={

            <Elements stripe={loadStripe(STRIPE_API_KEY)}>
              <ProtectedRoute component={Payment}/>
            </Elements>

        }/>


        <Route exact path='/account' element={<ProtectedRoute component={Profile} />} />
        <Route exact path='/me/update' element={ <ProtectedRoute component={UpdateProfile} /> }/> 
        <Route exact path='/password/update' element={<ProtectedRoute component = {UpdatePassword} />}/>

        <Route exact path='/success' element={<ProtectedRoute component = {OrderSuccess} />}/> 
        <Route exact path='/orders' element={<ProtectedRoute component = {MyOrders} />}/> 
        <Route exact path='/order/:id' element={<ProtectedRoute component = {OrderDetails} />}/> 


        
        
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

    </div>
  )
}

export default App
