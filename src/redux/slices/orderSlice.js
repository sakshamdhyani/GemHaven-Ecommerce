import { createSlice } from "@reduxjs/toolkit";
import { apiConnector } from "../apiconnector";
import toast from "react-hot-toast";
import axios from "axios";


const initialState = {
    loading: false,
    order: null,
    error: null,
    orders: [],
    isUpdated: null,
    isDeleted: null,
};

const orderSlice = createSlice({

  name: "orderSlice",
  initialState,
  reducers: {

    // Create Order
    createOrderStart: (state , action) => {
        state.loading = true
    },

    createOrderSuccess: (state , action) => {
        state.loading = false,
        state.order = action.payload
    },

    createOrderFail: (state , action) => {
        state.loading =  false,
        state.error =  action.payload
    },

// -------------------------------------------------------------------------------------

    // My Order
    myOrderStart: (state , action) => {
        state.loading = true
    },

    myOrderSuccess: (state , action) => {
        state.loading = false,
        state.orders = action.payload
    },

    myOrderFail: (state , action) => {
        state.loading = false,
        state.error = action.payload
    },

// ----------------------------------------------------------------------------------------

    // Order Details
    orderDetailsStart: (state , action) => {
        state.loading = true
    },

    orderDetailsSuccess: (state , action) => {
        state.loading = false,
        state.order = action.payload
    },

    orderDetailsFail: (state , action) => {
        state.loading = false,
        state.error = action.payload
    },


    // All Orders
    allOrdersStart: (state , action) => {
        state.loading = true
    },

    allOrdersSuccess: (state , action) => {
        state.loading = false,
        state.orders = action.payload
    },

    allOrdersFail: (state , action) => {
        state.loading = false,
        state.error = action.payload
    },


// -------------------------------------------------------------------------------------------------------

    // Update Order
    updateOrderStart: (state , action) => {
        state.loading = true
    },


    updateOrderSuccess: (state , action) => {
        state.loading = false,
        state.isUpdated = action.payload
    },


    updateOrderFail: (state , action) => {
        state.loading = false,
        state.error = action.payload
    },

    updateOrderReset:(state,action) => {
        state.isUpdated = false;
    },


// -----------------------------------------------------------------------------------------

    // Delete Order
    deleteOrderStart: (state , action) => {
        state.loading = true
    },


    deleteOrderSuccess: (state , action) => {
        state.loading = false,
        state.isDeleted = action.payload
    },


    deleteOrderFail: (state , action) => {
        state.loading = false,
        state.error = action.payload
    },

    deleteOrderReset:(state,action) => {
        state.isDeleted = false;
    },


    // Clear Error
    clearError: (state,action) => {
        state.error = null
    }


  }
});

export const { 

    createOrderStart,
    createOrderSuccess,
    createOrderFail,
    myOrderStart,
    myOrderSuccess,
    myOrderFail,
    orderDetailsStart,
    orderDetailsSuccess,
    orderDetailsFail,
    allOrdersStart,
    allOrdersSuccess,
    allOrdersFail,
    updateOrderStart,
    updateOrderSuccess,
    updateOrderFail,
    updateOrderReset,
    deleteOrderStart,
    deleteOrderSuccess,
    deleteOrderFail,
    deleteOrderReset,
    clearError

 } =  orderSlice.actions;

export default orderSlice.reducer;













const apiUrl = "http://localhost:4000/api/v1/";



// Actions

// Create Order
export const createOrder = (order) => async(dispatch) => {


    try{
 
        dispatch(createOrderStart());

        const config = {
            headers: {
                "Content-Type" : "application/json",
            },
        };

        const {data} = await apiConnector("POST" , apiUrl + "order/new" , 
        
        {      
            "shippingInfo": {
                "address": order.shippingInfo.address,
                "city": order.shippingInfo.city,
                "state": order.shippingInfo.state,
                "country": order.shippingInfo.country,
                "pincode": order.shippingInfo.pinCode,
                "phoneNo": order.shippingInfo.phoneNo
            },
        
            "itemsPrice": order.itemsPrice,
            "taxPrice" : order.taxPrice,
            "shippingPrice": order.shippingPrice,
            "totalPrice": order.totalPrice,
            "orderItems": order.orderItems,
            "paymentInfo": {
                "id": order.paymentInfo.id,
                "status": order.paymentInfo.status
            }
        });

        dispatch(createOrderSuccess(data));

    }catch(error){
        console.log("Error occured while creating order")
        dispatch(createOrderFail(error.response.data.message))
    }

};



// My Orders
export const myOrders = () => async(dispatch) => {


    try{
 
        dispatch(myOrderStart());

        const {data} = await apiConnector("GET" , apiUrl + "orders/me");
        

        dispatch(myOrderSuccess(data.orders))

    }catch(error){

        dispatch(myOrderFail(error.response.data.message))

    }

};



// Get All Orders --(Admin)
export const getAllOrders = () => async(dispatch) => {


    try{
 
        dispatch(allOrdersStart());

        const {data} = await apiConnector("GET" , apiUrl + "admin/orders");
        

        dispatch(allOrdersSuccess(data.orders))

    }catch(error){
        console.log(error)
        dispatch(allOrdersFail(error?.response?.data?.message))

    }

};



// Update Order
export const updateOrder = (id , order) => async(dispatch) => {


    try{
 
        dispatch(updateOrderStart());


        const {data} = await apiConnector("PUT" , apiUrl + `admin/order/${id}` , order)

        dispatch(updateOrderSuccess(data.success));

    }catch(error){
        console.log("Error occured while creating order")
        dispatch(updateOrderFail(error.response.data.message))

    }

};




// Delete Order
export const deleteOrder = (id) => async(dispatch) => {


    try{
 
        dispatch(deleteOrderStart());

        const {data} = await apiConnector("DELETE" , apiUrl + `admin/order/${id}`);

        dispatch(deleteOrderSuccess(data.success));

    }catch(error){
        console.log("Error occured while creating order")
        dispatch(deleteOrderFail(error.response.data.message))

    }

}



// Get Order Details
export const getOrderDetails = (id) => async(dispatch) => {


    try{
 
        dispatch(orderDetailsStart());

        const {data} = await apiConnector("GET" , apiUrl + `order/${id}` );
        

        dispatch(orderDetailsSuccess(data.order));

    }catch(error){
        console.log(error);
        dispatch(orderDetailsSuccess(error?.response?.data?.message))

    }

};



// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch(clearError());
}