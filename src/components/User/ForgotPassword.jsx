import React ,{ Fragment,useState,useEffect} from 'react'
import "./ForgotPassword.css"
import Loader from "../Layout/Loader/Loader";
import MetaData from '../Layout/MetaData'
import { MailOutline } from '@mui/icons-material';
import { useDispatch , useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import toast from 'react-hot-toast';
import { forgotPassword } from '../../redux/slices/userAuthSlice';


const ForgotPassword = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {error , message , loading} = useSelector((state) => state.userAuth);
  const [email, setEmail] = useState(""); 

  // Submit Handler
  const forgotPasswordSubmit = (event) => {
    event.preventDefault();
    const myForm = new FormData();
    myForm.set("email" , email);
    dispatch(forgotPassword(myForm));
  };

  useEffect(() => {
    if(error){
      toast.error(error);
      dispatch(clearErrors());
    }
    if(message){
      toast.success(message);
    }
  }, [dispatch , error , toast , message]);
  

  return (
    
    <Fragment>
        {loading ? <Loader/> : 
        <Fragment>

            <MetaData title="Forgot Password" />
            <div className="forgotPasswordContainer">
                <div className="forgotPasswordBox">

                    <h2 className='forgotPasswordHeading'>Forgot Password</h2>
                            <form 
                                className='forgotPasswordForm'
                                onSubmit={forgotPasswordSubmit}
                            >
                                <div className="forgotPasswordEmail">
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
                                <input 
                                type="submit" 
                                value= "Send"
                                className='forgotPasswordBtn'
                                />

                            </form>
                </div>
            </div>
        </Fragment>
        }
    </Fragment>
  )
}
export default ForgotPassword