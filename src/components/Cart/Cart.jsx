import React, { Fragment ,  } from 'react'
import "./Cart.css";
import CartItemCard from "./CartItemCard.jsx";
import { useDispatch , useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { RemoveShoppingCart } from '@mui/icons-material';
import { Typography } from '@mui/material';
import MetaData from '../Layout/MetaData.jsx';
import { addItemsToCart, removeItemsFromCart } from '../../redux/slices/cartSlice.js';
import toast from 'react-hot-toast';


const Cart = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {cartItems} = useSelector((state) => state.cart);

    function increaseQuantity(id,quantity,stock) {

        if(stock <= quantity){
            return;
        }
        const newQty = quantity + 1;
        dispatch(addItemsToCart(id,newQty));
    } 

    function decreaseQuantity(id,quantity) {

        if(1 >= quantity){
            return;
        }
        const newQty = quantity - 1;
        dispatch(addItemsToCart(id,newQty));
    }   


    function deleteCartItems(id){
        dispatch(removeItemsFromCart(id));
        toast.success("Item Removed From Cart Successfully")
    }

    const checkoutHandler = () => {
        return navigate("/login?redirect=shipping");
    }

  return (
   <Fragment>
        <MetaData title={"Cart - GemHaven"} />
        {cartItems.length === 0  ? 

            <div className='emptyCart'>
                <RemoveShoppingCart/>

                <Typography>No Product in Your Cart</Typography>
                <Link to="/products">View Products</Link>
            </div> 
            
            :

            <Fragment>
                <div className="cartPage">
                    <div className="cartHeader">
                        <p>Product</p>
                        <p>Quanity</p>
                        <p>SubTotal</p>
                    </div>

                    {cartItems && cartItems.map((item) => (

                        <div className="cartContainer" key={item.product}>

                            <CartItemCard item ={item} deleteCartItems = {deleteCartItems}/>

                            <div className="cartInput">
                                <button onClick={() => decreaseQuantity(item.product , item.quantity)}>-</button>
                                    <p>{item.quantity}</p>
                                <button onClick={() => increaseQuantity(item.product , item.quantity , item.stock)}>+</button>
                            </div>

                            <p className="cartSubtotal">
                                {`${item.price * item.quantity}`}
                            </p>

                        </div>

                    ))}

                    <div className="cartGrossProfit">

                        <div></div>

                        <div className="cartGrossProfitBox">

                            <p>Gross Total</p>
                            <p>{`${cartItems.reduce((acc,item) => acc + (item.quantity*item.price) , 0)}`}</p>

                        </div>

                        <div></div>

                        <div className="checkOutBtn">
                            <button onClick={checkoutHandler} >Check Out</button>
                        </div>

                    </div>
                    
                </div>
            </Fragment>
        
        }

   </Fragment>
  )
}

export default Cart