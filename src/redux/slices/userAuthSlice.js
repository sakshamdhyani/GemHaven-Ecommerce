import { createSlice } from "@reduxjs/toolkit";
import { apiConnector } from "../apiconnector";
import toast from "react-hot-toast";



const initialState = {
  user: {},
  avatarUrl:"",
  loading: false,
  isAuth : false,
  error: null,
  message: "",
  success: null,
};

const userSlice = createSlice({

  name: "userAuth",
  initialState: initialState,
  reducers: {

    clearError: (state) => {
      state.error = null
    },

// --------------------------------------------------------------

      // Action to start the login process
    registerStart: (state) => {
      state.loading = true;
    },

      // Action to handle successful login
    registerSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuth = true
    },

      // Action to handle login failure
    registerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuth = false
      state.user = null
    },

// --------------------------------------------------------------

    // Action to start the login process
    loginStart: (state) => {
        state.loading = true;
    },
  
      // Action to handle successful login
    loginSuccess: (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuth = true
    },
  
      // Action to handle login failure
    loginFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuth = false
        state.user = null
    },


// --------------------------------------------------------------------

    // Action to start the load user process
    loadUserStart: (state) => {
        state.loading = true;
      },
  
      // Action to handle load user login
      loadUserSuccess: (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuth = true
      },
  
      // Action to handle load user failure
      loadUserFaliure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuth = false;
        state.user = null
      },

// -------------------------------------------------------------------------

      logoutSuccess: (state) => {
        state.loading = false;
        state.isAuth = false;
        state.user = null;
      },

      logoutFailure: (state) => {
        state.loading = false;
        state.error = action.payload;
      },


  
// --------------------------------------------------------------

    // Action to start the forget pass process
    forgetPassStart: (state) => {
        state.loading = true;
        state.error = null;
    },
  
    // Action to handle forget pass login
    forgetPassSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload
    },
  
    // Action to handle forget pass failure
    forgetPassFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },



// --------------------------------------------------------------

    // Action to start the forget pass process
    resetPassStart: (state) => {
      state.loading = true;
      state.error = null;
  },

    // Action to handle forget pass login
    resetPassSuccess: (state, action) => {
        state.loading = false;
        state.success = action.payload
    },

    // Action to handle forget pass failure
    resetPassFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },


  },
});

export const {

    registerStart,
    registerSuccess,
    registerFailure,
    loginFailure,
    loginStart,
    loginSuccess,
    loadUserFaliure,
    loadUserSuccess,
    loadUserStart,
    clearError,
    logoutSuccess,
    logoutFailure,
    forgetPassFailure,
    forgetPassStart,
    forgetPassSuccess,
    resetPassFailure,
    resetPassSuccess,
    resetPassStart

} = userSlice.actions;

export default userSlice.reducer;



const apiUrl = "http://localhost:4000/api/v1/";



// register
export const register = (userData) => async (dispatch) => {

  try{

      dispatch(registerStart());

      const response = await apiConnector("POST" , apiUrl + "/register" , userData);

      dispatch(registerSuccess(response.data.user));


  }
  catch(error){
    console.log(error);
    dispatch(registerFailure(error?.response?.data?.message || "Error while creating user"))
  }

}



// login
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch(loginStart());


        const response = await apiConnector('POST', 'http://localhost:4000/api/v1/login', { email, password }, { 'Content-Type': 'application/json' }, null);

        dispatch(loginSuccess(response.data.user));

        if (response.data.user.role === "admin") {
            localStorage.setItem("userRole", "superMan");
        }

        toast.success(response.data.message);

    } 
    catch (error) {
        dispatch(loginFailure(error.response.data.message));
    }
};



export const loadUser = () => async (dispatch) => {
  
  dispatch(loadUserStart());

  try {

    const response = await fetch(apiUrl + "me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Add any additional headers if needed
      },
      credentials: "include", // Include cookies
    });

    if (!response.ok) {
      // Handle non-successful responses
      throw new Error("Failed to load user");
    }

    const data = await response.json();
    dispatch(loadUserSuccess(data.user));
  } 
  catch (error) {
    dispatch(loadUserFaliure());
  }
};



// Logout User
export const logout = () => async (dispatch) => {

  try{

      await apiConnector("GET" , apiUrl+"logout")

      dispatch(logoutSuccess());
      
      localStorage.removeItem("userRole");

  }catch(error){
      dispatch(logoutFailure(error.response.data.message));
  }

}




// Forgot Password
export const forgotPassword = (email) => async (dispatch) => {

  try{

      dispatch(forgetPassStart());

      const response = await apiConnector("POST" , apiUrl + "password/forgot" , email );

      console.log(response);

      dispatch(forgetPassSuccess());
      toast.success(response.data.message);

  }catch(error){
      dispatch(forgetPassFailure(error.response.data.message))
  }
};



// Reset Password
export const resetPassword = (token , passwords) => async (dispatch) => {

  try{

      dispatch(resetPassStart());

      const response = await apiConnector("PUT" , apiUrl + `password/reset/${token}` , passwords)

      dispatch(resetPassSuccess(response.data.success));

  }catch(error){
      dispatch(resetPassFailure(error.response.data.message));
  }
};





