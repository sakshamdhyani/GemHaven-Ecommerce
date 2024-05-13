import React ,{Fragment , useEffect} from 'react'
import { DataGrid } from '@mui/x-data-grid';
import "./MyOrders.css"
import {useDispatch , useSelector} from "react-redux"
import Loader from "../Layout/Loader/Loader";
import { Link } from "react-router-dom";
import { Typography } from '@mui/material';
import MetaData from "../Layout/MetaData";
import { Launch } from '@mui/icons-material';
import toast from 'react-hot-toast';
import { clearErrors, myOrders } from '../../redux/slices/orderSlice';



const MyOrders = () => {

  const dispatch = useDispatch();

  const {loading , error , orders} = useSelector((state) => state.order);
  const {user} = useSelector((state) => state.userAuth);

  const columns = [
    {
      field: "id",
      headerName: "Order ID",
      minWidth: 300,
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.row.status === "Delivered" 
          ? "greenColor"
          : "redColor"
      }
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      sortable: false,
      type:"number",

      renderCell: (params) => {
            return(
              <Link to={`/order/${params.id}`}>
                  <Launch/>
              </Link>
            );
      }
    }
    
  ];


  const rows = [];

  orders &&
    orders.forEach((item,index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });

  useEffect(() => {

    if(error){
      toast.error(error);
      dispatch(clearErrors());
    }

    dispatch(myOrders());

  } , [dispatch , toast , error])



  return (
    <Fragment>
        <MetaData title={`${user ? user.name : 'Unknown' } - Orders`} />
        
        {loading ? (<Loader/>)  : 
        
        (
          
          <div className='myOrdersPage'>
            
            <DataGrid
              rows={rows}
              columns={columns}
              pageSizeOptions = {[10 , 100]}
              pagination={true}
              disableRowSelectionOnClick
              className='myOrdersTable'
              autoHeight
            />

            <Typography id="myOrderHeading">{user ? user.name : 'Unknown'}'s Orders</Typography>

          </div>


        )
        
        }
    </Fragment>
  )
}

export default MyOrders