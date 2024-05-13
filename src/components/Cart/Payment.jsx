import React , {Fragment , useEffect ,useRef} from 'react'
import CheckoutSteps from "./CheckoutSteps";
import { useDispatch ,useSelector } from 'react-redux';
import MetaData from '../Layout/MetaData';
import { Typography } from '@mui/material';

import{
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    useStripe,
    useElements,

} from "@stripe/react-stripe-js";

import axios from 'axios';
import "./Payment.css";
import { CreditCard } from '@mui/icons-material';
import { Event } from '@mui/icons-material';
import { VpnKey } from '@mui/icons-material';
import "./ConfirmOrder.css"
import {useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import { createOrder } from '../../redux/slices/orderSlice';


const Payment = () => {

    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const stripe = useStripe();
    const elements = useElements();
    const payBtn = useRef(null);

    const {shippingInfo , cartItems} = useSelector((state) => state.cart);
    const {user} = useSelector((state) => state.userAuth);
    const {error} = useSelector((state) => state.order);

  
    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100),
    }
    
    const order = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice: orderInfo.subtotal,
        taxPrice : orderInfo.tax,
        shippingPrice: orderInfo.shippingCharges,
        totalPrice: orderInfo.totalPrice,
    }


    const submitHandler = async (event) => {

        event.preventDefault();

        payBtn.current.disabled = true;

        try{
    
            order.paymentInfo = {
                id: Math.random(),
                status: "succeeded",
            };

            console.log("Payment successfull and now creating order")
            dispatch(createOrder(order));
            navigate("/success");


        }catch(error){
            console.log(error);
            // payBtn.current.disabled = false;
            // toast.error(error.response.data.message);
        }

    }



    // useEffect(() => {

    //     if (error) {
    //         toast.error(error);
    //         dispatch(clearErrors());
    //     }


    // },[dispatch , error , toast])


  return (
    <Fragment>
        <MetaData title="Payment" />
        <CheckoutSteps activeStep={2}/>

        <div className="paymentContainer">
            <form className='paymentForm' onSubmit={(event) => submitHandler(event)}>

                <Typography>Card Info</Typography>

                <div>
                    <CreditCard/>
                    <CardNumberElement className='paymentInput' />
                </div>

                <div>
                    <Event/>
                    <CardExpiryElement className='paymentInput' />
                </div>

                <div>
                    <VpnKey/>
                    <CardCvcElement className='paymentInput' />
                </div>

                <input type="submit" 
                    value={`Pay - ${orderInfo && orderInfo.totalPrice}`}
                    ref={payBtn}
                    className='paymentFormBtn'
                />

            </form>
        </div>
    </Fragment>
  )
}

export default Payment