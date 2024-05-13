import { createSlice } from "@reduxjs/toolkit";
import { apiConnector } from "../apiconnector";
import toast from "react-hot-toast";
import axios from "axios";


const initialState = {
  loading: false,
  isUpdated: null,
  error: null
};

const profileSlice = createSlice({

  name: "profileSlice",
  initialState,
  reducers: {

    // Update Profile
    updateProfileStart: (state) => {
        state.loading = true;
    },

    updateProfileSuccess: (state, action) => {
      state.loading = false;
      state.isUpdated = action.payload;
    },

    updateProfileFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateProfileReset: (state) => {
      state.isUpdated = false;
    },

    
    // Update password
    updatePasswordStart: (state) => {
      state.loading = true;
    },

    updatePasswordSuccess: (state, action) => {
      state.loading = false;
      state.isUpdated = action.payload;
    },

    updatePasswordFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updatePasswordReset: (state) => {
      state.isUpdated = false;
    },


    // Update User
    updateUserStart: (state) => {
      state.loading = true;
    },

    updateUserSuccess: (state, action) => {
      state.loading = false;
      state.isUpdated = action.payload;
    },

    updateUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateUserReset: (state) => {
      state.isUpdated = false;
    },


    clearError: (state) => {
      state.error = null;
    }
  }
});

export const { 
  updateProfileStart,
  updateProfileSuccess,
  updateProfileFailure,
  updatePasswordStart,
  updatePasswordSuccess,
  updatePasswordFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  updateProfileReset,
  updatePasswordReset,
  updateUserReset,
  clearError
 } = profileSlice.actions;

export default profileSlice.reducer;













const apiUrl = "http://localhost:4000/api/v1/";



// Actions

// update profile
export const updateProfile = (userData) => async (dispatch) => {

  try {
    dispatch(updateProfileStart());

    const config = {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      withCredentials: true // Include credentials (cookies) in the request
    };

    const { data } = await axios.put(apiUrl + "me/update", userData, config);

    dispatch(updateProfileSuccess(data.success));
  } catch (error) {
    console.log(error);
    dispatch(updateProfileFailure(error?.response?.data?.message));
  }
}





// update password
export const updatePassword = (passwords) => async (dispatch) => {

  try{

      dispatch(updatePasswordStart());

      const config = {headers: {"Content-Type" : "application/json" } , withCredentials: true };

      const {data} = await axios.put(apiUrl+"password/update" , passwords , config);

      dispatch(updatePasswordSuccess(data.success));


  }catch(error){
    console.log(error)
    dispatch(updatePasswordFailure(error?.response?.data?.message));
  }

}





// update user
export const updateUser = (id,userData) => async (dispatch) => {

  try{

      dispatch(updateUserStart());

      const config = {headers: {"Content-Type" : "application/json" },withCredentials: true };

      const {data} = await axios.put(apiUrl + `admin/user/${id}` , userData , config);

      dispatch(updateUserSuccess(data.success));


  }catch(error){
    console.log(error)
    dispatch(updateUserFailure(error?.response?.data?.message));
  }

}