import React , {Fragment , useEffect} from 'react'
import { DataGrid } from '@mui/x-data-grid'
import "./ProductList.css"
import { useDispatch , useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';
import MetaData from '../Layout/MetaData'
import { Edit } from '@mui/icons-material'
import { Delete } from '@mui/icons-material'
import Sidebar from './Sidebar'
import { clearErrors, deleteProduct, deleteProductReset, getAdminProduct } 
from '../../redux/slices/productsSlice'
import toast from 'react-hot-toast'


const ProductList = () => {

    const dispatch = useDispatch();
    const {error , products , isDeleted} = useSelector((state) => state.products);

    useEffect(() => {      
        if(error){
            toast.error(error);
            dispatch(clearErrors());
        }
        if(isDeleted){
            toast.success("Product Deleted Successfully");
            dispatch(deleteProductReset());
        }
        dispatch(getAdminProduct());
    }, [dispatch , toast , error , isDeleted]);
    

    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id));
    };

    const columns = [

        {field: "id" , headerName: "Product ID" , minWidth: 200 , flec: 0.5},
        {
            field: "name",
            headerName: "Name",
            minWidth: 350,
            flex: 1,
        },
        {
            field: "stock",
            headerName: "Stock",
            minWidth: 150,
            flex: 0.3, 
        },
        {
            field: "price",
            headerName: "Price",
            minWidth: 270,
            flex: 0.5,
        },
        {
            field: "actions",
            flex:0.3,
            headerName: "Actions",
            minWidth: 150,
            sortable: false,
            renderCell: (params) => {
                return(
                    <Fragment>
                        <Link to={`/admin/product/${params.id}`} >
                            <Edit/>
                        </Link>
                        
                        <Button onClick={() => deleteProductHandler(params.id)} >
                            <Delete/>
                        </Button>
                    </Fragment>
                );
            }
        }

    ];

    const rows = [];

    products && 
        products.forEach((item) => {
            rows.push({
                id: item._id,
                name: item.name,
                stock: item.stock,
                price: item.price,
            })
        })

  return (
    <Fragment>
        <MetaData title={`All Products - Admin`} />

        <div className="dashboard">
            <Sidebar/>
            <div className="productListContainer">
                <h1 id="productListHeading">ALL PRODUCTS</h1>

                <DataGrid
                rows={rows}
                columns={columns} 
                disableRowSelectionOnClick
                pageSizeOptions={[10,100]}
                className='productListTable'
                autoHeight
                />
            </div>
        </div>

    </Fragment>
  )
}

export default ProductList