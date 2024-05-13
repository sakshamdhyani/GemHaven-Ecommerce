import React, { Fragment , useState ,useEffect } from 'react'
import "./UpdateProfile.css"
import Loader from "../Layout/Loader/Loader";
import { MailOutline } from '@mui/icons-material';
import { Face } from '@mui/icons-material';
import { useSelector , useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import MetaData from '../Layout/MetaData';
import { clearError, updateProfile, updateProfileReset } from '../../redux/slices/profileSlice';
import { loadUser } from '../../redux/slices/userAuthSlice';
import toast from 'react-hot-toast';

const UpdateProfile = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {user} = useSelector(state => state.userAuth);
    const {error , isUpdated , loading} = useSelector(state => state.profile);
    const [name , setName] = useState("");
    const [email , setEmail] = useState("");
    const [avatar , setAvatar] = useState("");
    const [avatarPreview , setAvatarPreview] = useState(`${user?.avatar?.url ? user.avatar.url : ""}`);


    const updateProfileSubmit = (event) => {

        event.preventDefault();

        const myForm = new FormData();

        myForm.set("name" , name);
        myForm.set("email" , email);
        myForm.set("avatar" , avatar);

        dispatch(updateProfile(myForm));
    };

    const updateProfileDataChange = (event) => {

        const reader = new FileReader();

        reader.onload = () => {
            if(reader.readyState === 2){
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
            }
        };

        reader.readAsDataURL(event.target.files[0]);
    }

    
    useEffect (() => {

        if(isUpdated){

            toast.success("Profile Updated Successfully");
            
            dispatch(loadUser());

            navigate("/account");
            
            dispatch(updateProfileReset())
        }
        if(user){
            setName(user.name);
            setEmail(user.email);
        }

        if(error){
            toast.error(error);
            dispatch(clearError());
        }
        
        
    },[dispatch , toast , error, navigate , isUpdated , user])




  return (
    
    <Fragment>
        {loading ? <Loader/> : 
        <Fragment>

            <MetaData title="Update Profile" />

            <div className="updateProfileContainer">
                <div className="updateProfileBox">

                    <h2 className='updateProfileHeading'>Update Profile</h2>
                            <form 
                                className='updateProfileForm'
                                encType='multipart/form-data'
                                onSubmit={updateProfileSubmit}
                            >

                                <div className="updateProfileName" >
                                    <Face/>
                                    <input 
                                    type="text" 
                                    name="name"
                                    placeholder='Name'
                                    required
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                    />
                                </div>

                                <div className="updateProfileEmail">
                                    <MailOutline/>
                                    <input 
                                    type="email" 
                                    placeholder='Email'
                                    required
                                    name='email'
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    />
                                </div>


                                <div id="updateProfileImage">
                                    <img src={avatarPreview} alt="Avatar Preview" />
                                    <input 
                                    type="file" 
                                    name='avatar'
                                    accept='image/*'
                                    onChange={updateProfileDataChange}    
                                    />
                                </div>

                                <input 
                                type="submit" 
                                value= "Update Profile"
                                className='updateProfileBtn'
                                />

                            </form>
                </div>
            </div>
        </Fragment>

        }
    </Fragment>

  )
}

export default UpdateProfile