import React from 'react'
import "./Sidebar.css"
import logo from "/Images/logo.png"
import { Link } from 'react-router-dom'
import { TreeItem } from '@mui/lab'
import { TreeViewProvider } from '@mui/x-tree-view/internals'
import { ExpandMore } from '@mui/icons-material'
import { PostAdd } from '@mui/icons-material'
import { Add } from '@mui/icons-material'
import { ImportExport } from '@mui/icons-material'
import ListAlt from '@mui/icons-material/ListAlt'
import Dashboard from '@mui/icons-material/Dashboard'
import { People } from '@mui/icons-material'


const Sidebar = () => {
  return (
    <div className='sidebar'>

        <Link to="/">
            <img src={logo} alt="Ecommerce" />
        </Link>

        <Link to="/admin/dashboard" >
            <p>
                <Dashboard/> Dashboard
            </p>
        </Link>

        <Link to="/admin/products" >
            <p>
                <Dashboard/> All Products
            </p>
        </Link>

        <Link to="/admin/product" >
            <p>
                <Dashboard/> Create Product
            </p>
        </Link>

        <Link to="/admin/orders" >
            <p>
                <ListAlt/>
                Orders
            </p>
        </Link>

        <Link to="/admin/users" >
            <p>
                <People/>
                Users
            </p>
        </Link>

    </div>
  )
}

export default Sidebar