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
import toast from 'react-hot-toast'
import { clearErrors, deleteUser, deleteUserReset, getAllUsers } from '../../redux/slices/adminSlice'


const UsersList = () => {

    const dispatch = useDispatch();
    const {error , users , isDeleted , message} = useSelector((state) => state.admin);

    useEffect(() => {
        if(error){
            toast.error(error);
            dispatch(clearErrors());
        }
        if(isDeleted){
            toast.success(message);
            dispatch(deleteUserReset());
        }
        dispatch(getAllUsers());
    }, [dispatch , toast , error , isDeleted , message]);
    

    const deleteUserHandler = (id) => {
        dispatch(deleteUser(id));
    };


    const columns = [
        {field: "id" , headerName: "User ID" , minWidth: 180 , flec: 0.8},
        {
            field: "email",
            headerName: "Email",
            minWidth: 200,
            flex: 1,
        },
        {
            field: "name",
            headerName: "Name",
            minWidth: 150,
            flex: 0.5, 
        },
        {
            field: "role",
            headerName: "Role",
            minWidth: 150,
            flex: 0.3,
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
                        <Link to={`/admin/user/${params.id}`} >
                            <Edit/>
                        </Link>
                        
                        <Button onClick={() => deleteUserHandler(params.id)} >
                            <Delete/>
                        </Button>
                    </Fragment>
                );
            }
        }
    ];

    const rows = [];

    users && 
        users.forEach((item) => {
            rows.push({
                id: item._id,
                role: item.role,
                email: item.email,
                name: item.name,
            })
        })

  return (
    <Fragment>
        <MetaData title={`All Users - Admin`} />

        <div className="dashboard">
            <Sidebar/>
            <div className="productListContainer">
                <h1 id="productListHeading">ALL USERS</h1>

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

export default UsersList