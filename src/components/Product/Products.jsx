import React, { Fragment, useEffect, useState } from 'react'
import "./Products.css";
import { useSelector , useDispatch } from 'react-redux';
import Loader from '../Layout/Loader/Loader';
import ProductCard from '../Home/ProductCard';
import Pagination from "react-js-pagination"
import { useParams } from 'react-router';
import Slider from "@mui/material/Slider"
import {Typography} from '@mui/material';
import MetaData from '../Layout/MetaData';
import { clearErrors, getProduct } from '../../redux/slices/productsSlice';
import toast from 'react-hot-toast';
import { debounce } from 'lodash'; 


const categories = [
  "All",
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



const Products = () => {

  // for fetching parameters from URL
  const params = useParams();

  const dispatch = useDispatch();

  // state for Category
  const [category, setCategory] = useState("");

  // state for price filter
  const [price, setprice] = useState([0,25000]);



  // debounce price request
  const debouncedPriceHandler = debounce((event, newPrice) => {
    setprice(newPrice); // Set the price after debounce
    // Call the API here with the updated price
    dispatch(getProduct(keyword, currentPage, newPrice, category, ratings));
  }, 500); // Adjust the delay time as needed

  const priceHandler = (newPrice) => {
    debouncedPriceHandler(null, newPrice); // Call the debounced function
  };
  



  // state for pagination
  const [currentPage , setCurrentPage] = useState(1);

  const setCurrentPageNo = (event) => {
    setCurrentPage(event);
  }

  // State for rating
  const [ratings, setRatings] = useState(0);

  // fetching values from a state from store reducers
  const {
    products , 
    loading , 
    error , 
    productsCount ,
    resultPerPage} = useSelector((state) => state.products)
  
  //fetch if any keyword named value available in URL
  const keyword = params.keyword;


  // fetching products
  useEffect(() =>  {

    if(error){
      toast.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProduct(keyword,currentPage,price,category,ratings));

  },[dispatch,keyword,currentPage,price,category,ratings,alert,error])



  return (
    <div className="fragment">

      {loading ? <Loader/> : 
        
        <Fragment>

          <MetaData title="Products - GemHaven"/>

          <h2 className="productsHeading">Products</h2>

          <div className="products">

            {products.length >= 1 ? 
                products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))
            
            :

            <div className='noProduct'>No Products Found</div>
            }

          </div>


          <div>


            <div className="filterBox">

              {/* Price Filter */}
                <Typography>Price</Typography>

                <Slider
                  value={price}
                  onChange={(event, newPrice) => priceHandler(newPrice)}
                  valueLabelDisplay='auto'
                  aria-labelledby='range-slider'
                  min={0}
                  max={25000}
                />


                {/* Categories */}

                <Typography>Categories</Typography>

                  <ul className="categoryBox">

                    {categories.map((category) => (
                      
                      <li
                      className='category-link'
                      key={category}
                      onClick={() => category == "All" ? setCategory("") : setCategory(category)}
                      >

                      {category}
                      </li>

                    ))}

                  </ul>
                  
                  {/* Ratings */}

                  {/* <fieldset>
                    <Typography component="legend">Ratings Above</Typography>
                  
                    <Slider
                      value={ratings}
                      onChange={(event,newRating) => {
                        setRatings(newRating);
                      }}
                      valueLabelDisplay='auto'
                      aria-labelledby='continuous-slider'
                      min={0}
                      max = {5} 
                    />
                  </fieldset> */}
            </div>
          </div>
          {/* Pagination */}
          {resultPerPage < productsCount && products.length >= 1 ?
            <div className="paginationBox">
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={resultPerPage}
              totalItemsCount={productsCount}
              onChange={setCurrentPageNo}
              nextPageText="Next"
              prevPageText= "Prev"
              firstPageText= "1st"
              lastPageText= "Last"
              itemClass='page-item'
              linkClass='page-link'
              activeClass='pageItemActive'
              activeLinkClass='pageLinkActive'
            />
          </div>
          :
          null
          }
        </Fragment>
      }
    </div>
  )
}

export default Products