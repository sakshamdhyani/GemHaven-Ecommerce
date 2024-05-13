import React, { Fragment , useState ,useEffect } from 'react'
import "./UpdatePassword.css"
import Loader from "../Layout/Loader/Loader";
import { useSelector , useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import MetaData from '../Layout/MetaData';
import { LockOpen } from '@mui/icons-material';
import { Lock } from '@mui/icons-material';
import { VpnKey } from '@mui/icons-material';
import toast from 'react-hot-toast';
import { clearError, updatePassword, updatePasswordReset } from '../../redux/slices/profileSlice';


const UpdatePassword = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {error , isUpdated , loading} = useSelector(state => state.profile);
    const [oldPassword , setOldPassword] = useState("");
    const [newPassword , setNewPassword] = useState("");
    const [confirmPassword , setConfirmPassword] = useState("");

    const updatePasswordSubmit = (event) => {
        event.preventDefault();
        const myForm = new FormData();
        myForm.set("oldPassword" , oldPassword);
        myForm.set("newPassword" , newPassword);
        myForm.set("confirmPassword" , confirmPassword);
        dispatch(updatePassword(myForm));
    };

    
    useEffect (() => {

        if(isUpdated){
            toast.success("Password Updated Successfully");
            navigate("/account");
            dispatch(updatePasswordReset())
        }

        if(error){
            toast.error(error);
            dispatch(clearError());
        }
                
    },[dispatch , toast , error, navigate , isUpdated])




  return (
    <Fragment>
        {loading ? <Loader/> : 
        <Fragment>

            <MetaData title="Change Password" />

            <div className="updatePasswordContainer">
                <div className="updatePasswordBox">

                    <h2 className='updatePasswordHeading'>Update Password</h2>
                            <form 
                                className='updatePasswordForm'
                                onSubmit={updatePasswordSubmit}
                            >

                                <div className="loginPassword">
                                    <VpnKey/>
                                    <input 
                                    type="password" 
                                    placeholder='Old Password'
                                    required
                                    value={oldPassword}
                                    onChange={(event) => setOldPassword(event.target.value)}
                                    />
                                </div>

                                <div className="loginPassword">
                                    <LockOpen/>
                                    <input 
                                    type="password" 
                                    placeholder='New Password'
                                    required
                                    value={newPassword}
                                    onChange={(event) => setNewPassword(event.target.value)}
                                    />
                                </div>

                                <div className="loginPassword">
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
                                value= "Change Password"
                                className='updatePasswordBtn'
                                />

                            </form>
                </div>
            </div>
        </Fragment>

        }
    </Fragment>

  )
}

export default UpdatePassword