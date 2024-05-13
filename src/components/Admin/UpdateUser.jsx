import React , {Fragment , useEffect , useState} from 'react'
import "./NewProduct.css"
import { useDispatch , useSelector } from 'react-redux'
import Button from '@mui/material/Button';
import MetaData from '../Layout/MetaData'
import { MailOutline } from '@mui/icons-material';
import Person from '@mui/icons-material/Person';
import { VerifiedUser } from '@mui/icons-material';
import Sidebar from './Sidebar'
import { useNavigate, useParams } from 'react-router'
import { getUserDetails, updateUser, updateUserReset } from '../../redux/slices/adminSlice';
import toast from 'react-hot-toast';



const UpdateUser = () => {

      const params = useParams(); 
      const navigate = useNavigate();
      const dispatch = useDispatch();  
      const {isUpdated, user , error , loading} = useSelector((state) => state.admin)
      const [name,setName] = useState("");
      const [email,setEmail] = useState("");
      const [role,setRole] = useState("");
      const userId = params.id;

    useEffect(() => {
        if(!user || user._id !== userId){
            console.log("first")
            dispatch(getUserDetails(userId));
            
        }
        else{
            setName(user?.name);
            setEmail(user?.email);
            setRole(user?.role);
        }
        if(error){
            toast.error(error);
            dispatch(clearErrors());
        }
        if(isUpdated){
            toast.success("User Updated Successfully");
            navigate("/admin/users");
            dispatch(updateUserReset());
        }
    },[dispatch  , error , navigate , isUpdated,user,userId]);
    
 
    const updateUserSubmitHandler = (event) => {
        event.preventDefault();

        const myForm = new FormData();

        myForm.set("name" , name);
        myForm.set("email" , email);
        myForm.set("role" , role);


        dispatch(updateUser(userId,myForm));

    }




  return (
    <Fragment>
        <MetaData title="Update User" />

        <div className="dashboard">
            <Sidebar/>

            <div className="newProductContainer">
                <form 
                    className='createProductForm'
                    encType='multipart/form-data'
                    onSubmit={updateUserSubmitHandler}
                >

                    <h1>Update User</h1>

                    <div>
                        <Person/>
                        <input 
                        type="text" 
                        placeholder='Name'
                        required
                        value={name}
                        onChange={(event) => setName(event.target.value)}    
                        />
                    </div>

                    <div>
                        <MailOutline/>
                        <input 
                        type="email" 
                        placeholder='Email'
                        required
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}    
                        />
                    </div>

                   

                    <div>
                        <VerifiedUser/>
                        <select
                        value={role} 
                        onChange={(event) => setRole(event.target.value)}
                        >

                            <option value="" > Choose Role </option>
                            <option value="admin" > Admin </option>
                            <option value="user" > User </option>

                        </select>
                    </div>
                                

                    <Button id='createProductBtn'
                    type='submit'
                    disabled= {loading ? true : false || role==="" ? true : false}
                    >
                    Update     
                    </Button>

                </form>
            </div>
        </div>
    </Fragment>
  )
}


export default UpdateUser