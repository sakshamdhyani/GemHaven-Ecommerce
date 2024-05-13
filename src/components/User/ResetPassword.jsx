import React, { Fragment , useState ,useEffect } from 'react'
import "./resetPassword.css"
import Loader from '../Layout/Loader/Loader';
import { useSelector , useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import MetaData from '../Layout/MetaData';
import { LockOpen } from '@mui/icons-material';
import { Lock } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { resetPassword } from '../../redux/slices/userAuthSlice';
import toast from 'react-hot-toast';


const ResetPassword = () => {

    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {error , success , loading} = useSelector(state => state.userAuth);

    const [password , setPassword] = useState("");
    const [confirmPassword , setConfirmPassword] = useState("");

    const resetPasswordSubmit = (event) => {

        event.preventDefault();

        const myForm = new FormData();

        myForm.set("password" , password);
        myForm.set("confirmPassword" , confirmPassword);

        dispatch(resetPassword  (params.token,myForm));
    };
    
    useEffect (() => {
        if(success){
            toast.success("Password Updated Successfully");
            navigate("/login");
        }
        if(error){
            toast.error(error);
            dispatch(clearErrors);
        }
    },[dispatch , alert , error, navigate , success])

  return (
    <Fragment>
        {loading ? <Loader/> : 
        <Fragment>

            <MetaData title="Change Password" />
            <div className="resetPasswordContainer">
                <div className="resetPasswordBox">

                    <h2 className='resetPasswordHeading'>Update Password</h2>
                            <form 
                                className='resetPasswordForm'
                                onSubmit={resetPasswordSubmit}
                            >
                                <div>
                                    <LockOpen/>
                                    <input 
                                    type="password" 
                                    placeholder='New Password'
                                    required
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    />
                                </div>
                                <div>
                                    <Lock/>
                                    <input 
                                    type="password" 
                                    placeholder='Confirm Password'
                                    required
                                    value={confirmPassword}
                                    onChange={(event) => setConfirmPassword(event.target.value)}
                                    />
                                </div>
                                <input 
                                type="submit" 
                                value= "Update"
                                className='resetPasswordBtn'
                                />
                            </form>
                </div>
            </div>
        </Fragment>
        }
    </Fragment>
  )
}
export default ResetPassword