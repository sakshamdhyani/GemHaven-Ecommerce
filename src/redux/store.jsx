import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userAuthSlice from "./slices/userAuthSlice";
import productsSlice from "./slices/productsSlice";
import cartSlice from "./slices/cartSlice";
import orderSlice from "./slices/orderSlice";
import profileSlice from "./slices/profileSlice";
import adminSlice from "./slices/adminSlice";



const rootReducer = combineReducers({

  userAuth : userAuthSlice,
  products: productsSlice,
  cart: cartSlice,
  order: orderSlice,
  profile: profileSlice,
  admin: adminSlice
});


const store = configureStore({
  reducer: rootReducer,
});

export default store;
