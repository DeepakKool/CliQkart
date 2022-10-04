import React, { Fragment , useEffect } from 'react'
import { CgMouse } from 'react-icons/all'
import MetaData from '../layout/MetaData'
import ProductCard from './ProductCard'
import { getProduct } from '../../actions/productAction'
import { useSelector , useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import './Home.css'

const Home = () => {
  const alert = useAlert()
  const dispatch = useDispatch()
  const { products , error } = useSelector((state)=>state.products)  
  const user = useSelector(state=>state.user)    
  useEffect(()=> {
    if(error){
      return alert.error(error)
    }  
    dispatch(getProduct())
  },[ dispatch , error , alert])
  return (
    <Fragment>
    <MetaData title="CliQkart-Home" />
      <div className="banner">
        <p>Welcome to CliQkart</p>
        <h1> </h1>
        <a href="#container">
          <button>                  
            Scroll <CgMouse />
          </button>
        </a>
      </div>
      <h2 className="homeHeading">Featured Products</h2>
      <div className="container" id="container">
        {products && products.map(product=>(
          <ProductCard product={product} />
        ))}
      </div>
    </Fragment>    
  )
}

export default Home
