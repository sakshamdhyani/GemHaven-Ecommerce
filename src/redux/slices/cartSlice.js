import { createSlice } from "@reduxjs/toolkit";
import { apiConnector } from "../apiconnector";
import toast from "react-hot-toast";
import axios from "axios";


const initialState = {

  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],

  shippingInfo: localStorage.getItem("shippingInfo")
    ? JSON.parse(localStorage.getItem("shippingInfo"))
    : {}

};

const cartSlice = createSlice({

  name: "cartSlice",
  initialState,
  reducers: {

    // Add to Cart
    addToCart: (state, action) => {

      

      const item = action.payload;

      const isItemExist = state.cartItems.find((i) => i.product === item.product);

      if (isItemExist) {
        state.cartItems = state.cartItems.map((i) =>
          i.product === isItemExist.product ? item : i
        );
      } 
      else {
        state.cartItems.push(item);
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

// -------------------------------------------------------------------------------------------

    // Remove from cart
    removeFromCart : (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.product !== action.payload
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

// --------------------------------------------------------------------------------------------

    // Save shipping info
    saveShippingInfo : (state, action) => {
      state.shippingInfo = action.payload;
      localStorage.setItem("shippingInfo", JSON.stringify(state.shippingInfo));
    }

  }
});

export const { addToCart, removeFromCart, saveShippingInfo } = cartSlice.actions;

export default cartSlice.reducer;













const apiUrl = "http://localhost:4000/api/v1/";



// Actions

// Add to cart
export const addItemsToCart = (id,quantity) => async (dispatch , getState) => {

    const {data} = await axios.get( apiUrl + `product/${id}`);

    dispatch(addToCart({
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        image: data.product.images[0].url,
        stock: data.product.stock,
        quantity,
    }))

    localStorage.setItem("cartItems" , JSON.stringify(getState().cart.cartItems));

};


// Remove from cart
export const removeItemsFromCart = (id) => async (dispatch , getState) => {

    dispatch(removeFromCart(id))

    localStorage.setItem("cartItems" , JSON.stringify(getState().cart.cartItems));

}


// Save Shipping Info
export const saveShippingInformation = (data) => async (dispatch , getState) => {
    dispatch(saveShippingInfo(data))

    localStorage.setItem("cartItems" , JSON.stringify(getState().cart.cartItems));
}