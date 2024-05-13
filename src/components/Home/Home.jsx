import React, { Fragment, useEffect } from 'react'
import {CgMouse} from "react-icons/cg";
import "./Home.css";
import Product from "./ProductCard"
import MetaData from '../Layout/MetaData.jsx';


import {useSelector , useDispatch} from "react-redux";
import Loader from "../Layout/Loader/Loader.jsx"

import Carousel from 'react-material-ui-carousel'

import logo from "/Images/homeCarousel1.jpg"
import logo2 from "/Images/homeCarousel2.jpg"
import logo3 from "/Images/homeCarousel3.jpg"
import logo4 from "/Images/homeCarousel4.jpg"
import toast from 'react-hot-toast';
import { clearErrors, getProduct } from '../../redux/slices/productsSlice.js';

 
const Home = () => {

    const dispatch = useDispatch();
    const {loading , error , products} = useSelector(
        (state) => state.products
    );
    window.scrollTo(0, 0);

    useEffect(() => {

        if(error){
            toast.error(error);
            dispatch(clearErrors());
        }

        dispatch(getProduct());

    },[dispatch , error , alert]);

  return (
   
    <Fragment>

        {loading ? 
        
        <Loader/> : 
        
        <Fragment>

            <MetaData title = "GemHaven" />

            <div className="banner">

                <div className="leftSide">

                    <Carousel>
                        <img src={logo} alt="" className='carouselImages' />
                        <img src={logo2} alt="" className='carouselImages'/>
                        <img src={logo3} alt="" className='carouselImages'/>
                        <img src={logo4} alt="" className='carouselImages'/>
                    </Carousel>

                </div>

                {/* <div className="rightSide">
                    <p>Welcome to GemHaven</p>
                    <h1>FIND AMAZING PRODUCTS BELOW</h1>

                    <a href="#container">
                        <button>
                            Scroll <CgMouse/>
                        </button>
                    </a>
                </div> */}
            </div>

            <h2 className="homeHeading">Featured Products</h2>

            <div className="container" id="container">

                {products && products.map(product => (
                    <Product product={product} key={product._id}/>
                ))}

            </div>

            </Fragment>}

    </Fragment>


  )
}

export default Home