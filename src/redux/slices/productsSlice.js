import { createSlice } from "@reduxjs/toolkit";
import { apiConnector } from "../apiconnector";
import toast from "react-hot-toast";
import axios from "axios";



const initialState = {

    loading: false,
    products: [],
    productsCount: null,
    resultPerPage: null,
    filteredProductsCount: null,
    error: null,
    product: {},
    success: null,
    isUpdated: null,
    isDeleted: null,

};

const productsSlice = createSlice({

  name: "products",
  initialState: initialState,
  reducers: {

    // all product 
    allProductStart: (state) => {
        state.loading = true,
        state.products = []
    },

    allProductSuccess: (state,action) => {
        state.loading = false,
        state.products  = action.payload.products,
        state.productsCount  = action.payload.productsCount,
        state.resultPerPage  = action.payload.resultPerPage,
        state.filteredProductsCount = action.payload.filteredProductsCount
    },

    allProductFail: (state,action) => {
        state.loading = false,
        state.error = action.payload
    },

// -------------------------------------------------------------------------------------------------

    // product details
    productDetailsStart: (state) => {
        state.loading = true
    },

    productDetailsSuccess: (state,action) => {
        state.loading = false,
        state.product = action.payload
    },

    productDetailsFail: (state,action) => {
        state.loading = false,
        state.error = action.payload
    },

// -------------------------------------------------------------------------------------------------

    // new review
    newReviewStart: (state,action) => {
        state.loading = true
    },


    newReviewSuccess: (state,action) => {
        state.loading = false,
        state.success = action.payload
    },


    newReviewFali: (state,action) => {
        state.loading = false,
        state.error  = action.payload
    },

    newReviewReset: (state,action) => {
        state.success = false
    },

// ------------------------------------------------------------------------------------------------------

    // admin product 
    adminProductStart: (state,action) => {
        state.loading = true,
        state.products  = []
    },

    adminProductSuccess: (state,action) => {
        state.loading  = false,
        state.products  =  action.payload
    },

    adminProductFail: (state,action) => {
        state.loading =  false,
        state.error  =  action.payload
    },

// -----------------------------------------------------------------------------------------------------

    // new product
    newProductStart: (state,action) => {
        state.loading = true
    },

    newProductSuccess: (state,action) => {
        state.loading = false,
        state.success  = action.payload.success,
        state.product = action.payload.product
    },

    newProductFail: (state,action) => {
        state.loading = false,
        state.error  = action.payload
    },

    newProductReset: (state) => {
        state.success = false
    },

    clearError:(state,) => {
        state.error = null
    },

// --------------------------------------------------------------------------------------------------------

    // delete product
    deleteProductStart: (state,action) => {
        state.loading = true
    },

    deleteProductSuccess: (state,action) => {
        state.loading = false,
        state.isDeleted  = action.payload
    },

    deleteProductFail: (state,action) => {
        state.loading = false,
        state.error  = action.payload
    },

    deleteProductReset: (state,action) => {
        state.isDeleted= false
    },


// --------------------------------------------------------------------------------------------------

    // update product
    updateProductStart: (state,action) => {
        state.loading = true
    },

    updateProductSuccess: (state,action) => {
        state.loading = false,
        state.isUpdated  = action.payload
    },

    updateProductFail: (state,action) => {
        state.loading = false,
        state.error  = action.payload
    },

    updateProductReset: (state,action) => {
        state.isUpdated = false
    }

  },
});

export const {

    allProductStart,
    allProductSuccess,
    allProductFail,
    productDetailsStart,
    productDetailsSuccess,
    productDetailsFail,
    newReviewStart,
    newReviewSuccess,
    newReviewFali,
    newReviewReset,
    adminProductStart,
    adminProductSuccess,
    adminProductFail,
    newProductStart,
    newProductSuccess,
    newProductFail,
    newProductReset,
    clearError,
    deleteProductStart,
    deleteProductSuccess,
    deleteProductFail,
    deleteProductReset,
    updateProductStart,
    updateProductSuccess,
    updateProductFail,
    updateProductReset


} = productsSlice.actions;

export default productsSlice.reducer;







const apiUrl = "http://localhost:4000/api/v1/";




// ACTIONS

export const getProduct = 
    
    (keyword = "" , currentPage = 1 ,price=[0,25000] , category = "" ,ratings =0) => 
    async (dispatch) => {

    try{

        dispatch(allProductStart());

        let link = apiUrl + `products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

        if(category !== ""){
            link = apiUrl + `products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
        }

        const {data} = await axios.get(link);


        dispatch(allProductSuccess(data))

    }catch(error){
        console.log(error);
        dispatch(allProductFail(error?.response?.data?.message))
    }

};




// Create Product
export const createProduct = (productData) => async (dispatch) => {

    try{

        dispatch(newProductStart());

        const config = {
            headers: {"Content-Type": "application/json"},
            withCredentials: true
        }

        const {data} = await axios.post(apiUrl + `admin/product/new` , productData , config);

        dispatch(newProductSuccess(data));

    }catch(error){
        dispatch(newProductFail(error.response.data.message))
    }
};



// Get Product Details
export const getProductDetails = (id) => async (dispatch) => {

    try{

        dispatch(productDetailsStart());

        const {data} = await axios.get(apiUrl + `product/${id}`);

        dispatch(productDetailsSuccess(data.product));

    }catch(error){
        console.log(error)
        dispatch(productDetailsFail(error?.response?.data?.message))
    }
};




// Get all prodcuts for admin
export const getAdminProduct = () => async(dispatch) => {
    try{

        dispatch(adminProductStart());

        const {data} = await apiConnector("GET", apiUrl +"admin/products");
        
        dispatch(adminProductSuccess(data.products));

    }catch(error){
        dispatch(adminProductFail(error.response.data.message))
    }
}



// newReview
export const newReview = (reviewData) => async (dispatch) => {

    try{

        dispatch(newReviewStart());

        const config = {
            headers: {"Content-Type": "application/json"}
        }

        const {data} = await apiConnector("PUT" , apiUrl + "review" , reviewData);

        dispatch(newReviewSuccess(data.success));

    }catch(error){
        dispatch(newReviewFali(error.response.data.message))
    }
};



// Delete Product
export const deleteProduct = (id) => async (dispatch) => {

    try{

        dispatch(deleteProductStart());

        const {data} = await apiConnector("DELETE" , apiUrl + `admin/product/${id}`);


        dispatch(deleteProductSuccess(data.success));

    }catch(error){
        dispatch(deleteProductFail(error.response.data.message))
    }
};




// Update Product
export const updateProduct = (id , productData) => async (dispatch) => {

    try{

        dispatch(updateProductStart());

        const config = {
            headers: {"Content-Type": "application/json"},
            withCredentials: true
        }

        const {data} = await axios.put( apiUrl +`admin/product/${id}` , productData , config);

        dispatch(updateProductSuccess(data.success));

    }catch(error){
        dispatch(updateProductFail(error.response.data.message))
    }
};




// Clearing Errors
export const clearErrors = () => async (dispatch) => {

    dispatch(clearError());

};









