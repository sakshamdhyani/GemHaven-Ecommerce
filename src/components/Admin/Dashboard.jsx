import React , {useEffect} from 'react'
import Sidebar from "./Sidebar.jsx"
import "./Dashboard.css"
import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import {Doughnut , Line} from "react-chartjs-2";
import Chart from "chart.js/auto";
import { useDispatch , useSelector } from 'react-redux'
import { getAdminProduct } from '../../redux/slices/productsSlice.js'
import { getAllOrders } from '../../redux/slices/orderSlice.js'
import { getAllUsers } from '../../redux/slices/adminSlice.js'


const Dashboard = () => {

    const {products} = useSelector((state) => state.products);
    const {orders} = useSelector((state) => state.order);
    const {users} = useSelector((state) => state.admin);
    const dispatch = useDispatch();

    let outOfStock = 0;

    products &&
        products.forEach((item) => {
            if(item.stock === 0){
                outOfStock += 1;
            }
        })

    
    useEffect(() => {
        dispatch(getAdminProduct());
        dispatch(getAllOrders());
        dispatch(getAllUsers());
    }, [dispatch]);        


    let totalAmount = 0;

    orders &&
        orders.forEach((item) => {
            totalAmount = totalAmount + item.totalPrice;
        });

    const lineState = {

        labels: ["Initial Amount" , "Amount Earned"],
        datasets : [
            {
                label: "TOTAL AMOUNT",
                backgroundColor: ["tomato"],
                hoverBackgroundColor: ["rgb(197,72,49)"],
                data: [0,totalAmount]
            },
        ],
        
    };

    const donoughtState = {
        labels: ["Out of Stock" , "InStock"],
        datasets: [
            {
                backgroundColor: ["#0BA6B4" , "#6800b4"],
                hoverBackgroundColor: ["#4B5000" , "#35014F"],
                data: [outOfStock , products.length - outOfStock],
            },
        ],
    };

  return (
    <div className='dashboard'>
        <Sidebar/>

        <div className="dashboardContainer">

            <Typography component="h1" >Dashboard</Typography>

            <div className="dashboardSummary">
                <div>
                    <p>
                        Total Amount <br /> {Math.floor(totalAmount)}
                    </p>
                </div>

                <div className="dashboardSummaryBox2">
                    <Link to="/admin/products" >
                        <p>Product</p>
                        <p>{products && products.length}</p>
                    </Link>

                    <Link to="/admin/orders" >
                        <p>Orders</p>
                        <p>{orders && orders.length}</p>
                    </Link>

                    <Link to="/admin/users" >
                        <p>Users</p>
                        <p>{users && users.length}</p>
                    </Link>
                </div>
            </div>
            
            <div className="lineChart">
                <Line data={lineState}/>
            </div>

            <div className="doughnutChart">
                <Doughnut data={donoughtState} />
            </div>
        </div>
    </div>
  )
}

export default Dashboard