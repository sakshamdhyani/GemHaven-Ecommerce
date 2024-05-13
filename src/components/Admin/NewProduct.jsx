import React , {Fragment , useEffect , useState} from 'react'
import "./NewProduct.css"
import { useDispatch , useSelector } from 'react-redux'
import Button from '@mui/material/Button';
import MetaData from '../Layout/MetaData'
import { AccountTree } from '@mui/icons-material';
import { Description } from '@mui/icons-material';
import { Storage } from '@mui/icons-material';
import { Spellcheck } from '@mui/icons-material';
import { AttachMoney } from '@mui/icons-material';
import Sidebar from './Sidebar'
import { useNavigate } from 'react-router'
import { clearErrors, createProduct, newProductReset } from '../../redux/slices/productsSlice'
import toast from 'react-hot-toast';


const NewProduct = () => {
    
    const categories = [
        "Laptop",
        "Footwear",
        "Bottom",
        "Tops",
        "Attire",
        "Camera",
        "Mobile",
        "Watch",
        "TV"
      ]


      const navigate = useNavigate();
      const dispatch = useDispatch();
      const {loading , error , success} = useSelector((state) => state.products);
      const [name,setName] = useState("");
      const [price,setPrice] = useState("");
      const [description,setDescription] = useState("");
      const [category,setCategory] = useState("");
      const [stock,setStock] = useState("");
      const [images,setImages] = useState([]);
      const [imagesPreview,setImagesPreview] = useState([]);


    useEffect(() => {
        if(error){
            toast.error(error);
            dispatch(clearErrors());
        }
        if(success){
            toast.success("Product Created Successfully");
            navigate("/admin/dashboard");
            dispatch(newProductReset());
        }
    },[dispatch , toast , error , navigate , success]);
    
 
    const createProductSubmitHandler = (event) => {
        event.preventDefault();

        const myForm = new FormData();

        myForm.set("name" , name);
        myForm.set("price" , price);
        myForm.set("description" , description);
        myForm.set("category" , category);
        myForm.set("stock" , stock);

        images.forEach((image) => {
            myForm.append("images" , image);
        })
        dispatch(createProduct(myForm));
    }

    const createProductImagesChange = (event) => {

        const files = Array.from(event.target.files);
        setImages([]);
        setImagesPreview([]);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if(reader.readyState === 2){
                    setImagesPreview((old) => [...old , reader.result]);
                    setImages((old) => [...old , reader.result]);
                }
            };
            reader.readAsDataURL(file);
        });
};


  return (
    <Fragment>
        <MetaData title="Create Product" />

        <div className="dashboard">
            <Sidebar/>

            <div className="newProductContainer">

                <form 
                    className='createProductForm'
                    encType='multipart/form-data'
                    onSubmit={createProductSubmitHandler}
                >
                    <h1>Create Product</h1>
                    <div>
                        <Spellcheck/>
                        <input 
                        type="text" 
                        placeholder='Product Name'
                        required
                        value={name}
                        onChange={(event) => setName(event.target.value)}    
                        />
                    </div>
                    <div>
                        <AttachMoney/>
                        <input 
                        type="number" 
                        placeholder='Price'
                        required
                        onChange={(event) => setPrice(event.target.value)}    
                        />
                    </div>
                    <div>
                        <Description/>
                        <textarea
                         placeholder='Product Description'
                         value={description}
                         onChange={(event) => setDescription(event.target.value)}
                         cols = "30"
                         rows = "1"
                        >

                         </textarea>
                    </div>
                    <div>
                        <AccountTree/>
                        <select 
                        onChange={(event) => setCategory(event.target.value)}
                        >

                            <option value="" > Choose Category </option>

                            {categories.map((category) => (
                                <option key={category} value={category} >
                                    {category}
                                </option>
                            ))}

                        </select>
                    </div>
                    <div>
                        <Storage/>
                        <input 
                        type="number"
                        placeholder='Stock'
                        required
                        onChange={(event) => setStock(event.target.value)}
                        />
                    </div>
                    <div id='createProductFormFile'>
                        <input type="file"
                        name='avatar'
                        onChange={createProductImagesChange}
                        accept='image/*'
                        multiple
                         />
                    </div>             
                    <div id='createProductFormImage'>
                        {imagesPreview.map((image,index) => (
                            <img key={index} src={image} alt="Product Preview" />
                        ))}
                    </div>

                    <Button id='createProductBtn'
                    type='submit'
                    // disabled= {loading ? true : false}
                    >
                    Create     
                    </Button>

                </form>
            </div>
        </div>
    </Fragment>
  )
}

export default NewProduct