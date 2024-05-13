import { createSlice } from "@reduxjs/toolkit";
import { apiConnector } from "../apiconnector";
import toast from "react-hot-toast";
import axios from "axios";


const initialState = {
    loading: false,
    users: [],
    error: null,
    user: null,
    isUpdated: false,
    isDeleted: false,
    message: null,
};

const adminSlice = createSlice({

  name: "adminSlice",
  initialState,
  reducers: {


    // Get all users
    getAllUsersStart: (state,action) => {
        state.loading = true;
    },

    getAllUsersSuccess: (state,action) => {
        state.loading = false;
        state.users = action.payload;
    },

    getAllUsersFaliure: (state,action) => {
        state.loading = false;
        state.error = action.payload;
    },


    // Get User Details
    getUserDetailsStart: (state,action) => {
        state.loading = true;
    },

    getUserDetailsSuccess: (state,action) => {
        state.loading = false;
        state.user = action.payload;
    },

    getUserDetailsFailure: (state,action) => {
        state.loading = false;
        state.error = action.payload;
    },


    // Update User
    updateUserStart: (state,action) => {
        state.loading = true;
    },

    updateUserSuccess: (state,action) => {
        state.loading = false;
        state.isUpdated = action.payload;
    },  

    updateUserFaliure: (state,action) => {
        state.loading = false;
        state.error = action.payload;
    },

    updateUserReset: (state,action) => {
        state.isUpdated = false;
    },


    // Delete User
    deleteUserStart: (state,action) => {
        state.loading = true;
    },

    deleteUserSuccess: (state,action) => {
        state.loading = false;
        state.isDeleted = action.payload.success;
        state.message = action.payload.message;
    },

    deleteUserFaliure: (state,action) => {
        state.loading = false;
        state.error = action.payload;
    },

    deleteUserReset: (state,action) => {
        state.isDeleted = false;
    },

    clearErrors:(state,action) => {
        state.error = null
    }

  }
});

export const { 

    getAllUsersStart,
    getAllUsersSuccess,
    getAllUsersFaliure,
    getUserDetailsStart,
    getUserDetailsSuccess,
    getUserDetailsFailure,
    updateUserStart,
    updateUserSuccess,
    updateUserFaliure,
    updateUserReset,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFaliure,
    deleteUserReset,
    clearErrors

 } = adminSlice.actions;

export default adminSlice.reducer;












const apiUrl = "http://localhost:4000/api/v1/";



// Actions


// Get ALl Users 
export const getAllUsers = () => async (dispatch) => {

    try{

        dispatch(getAllUsersStart());

        const {data} = await apiConnector("GET" , apiUrl + `admin/users`);

        dispatch(getAllUsersSuccess(data?.users));


    }catch(error){
        console.log(error);
        dispatch(getAllUsersFaliure(error?.response?.data?.message))
    }

}



// Get  User Details
export const getUserDetails = (id) => async (dispatch) => {

    try{

        dispatch(getUserDetailsStart());

        const {data} = await apiConnector("GET" , apiUrl + `admin/user/${id}`);

        dispatch(getUserDetailsSuccess(data.user));

    }catch(error){
        console.log(error);
        dispatch(getUserDetailsFailure(error?.response?.data?.message));
    }

}



// Update User
export const updateUser = (id,userData) => async (dispatch) => {

    try{

        dispatch(updateUserStart());

        const config = {headers: {"Content-Type" : "application/json" } , withCredentials: true};

        const {data} = await axios.put( apiUrl + `admin/user/${id}` , userData , config);

        dispatch(updateUserSuccess(data.success));


    }catch(error){
        console.log(error);
        dispatch(updateUserFaliure(error?.response?.data?.message));
    }

}



// Delete User
export const deleteUser = (id) => async (dispatch) => {

    try{

        dispatch(deleteUserStart());

        const {data} = await apiConnector("DELETE" , apiUrl+`admin/user/${id}`);

        dispatch(deleteUserSuccess(data));


    }catch(error){
        console.log(error);
        dispatch(deleteUserFaliure(error?.response?.data?.message));
    }

}
