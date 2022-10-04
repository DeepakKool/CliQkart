import React from 'react'
import { Link } from 'react-router-dom'
import PostAddIcon from '@material-ui/icons/PostAdd'
import AddIcon from '@material-ui/icons/Add'
import HomeIcon from '@material-ui/icons/Home'
import ListAltIcon from '@material-ui/icons/ListAlt'
import DashboardIcon from '@material-ui/icons/Dashboard'
import PeopleIcon from '@material-ui/icons/People'
import RateReviewIcon from '@material-ui/icons/RateReview'
import './sidebar.css'

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/">
        <p>
          <HomeIcon /> Home
        </p>
      </Link>  
      <Link to="/admin/dashboard">
        <p>
          <DashboardIcon /> Dashboard
        </p>
      </Link>  
      <Link to="/admin/products">
        <p>
          <PostAddIcon /> All products
        </p>
      </Link>  
      <Link to="/admin/product">
        <p>
          <AddIcon /> Create product
        </p>
      </Link>
      <Link to="/admin/orders">
        <p>
          <ListAltIcon /> Orders
        </p>
      </Link>
      <Link to="/admin/users">
        <p>
          <PeopleIcon /> Users
        </p>
      </Link>
      <Link to="/admin/reviews">
        <p>
          <RateReviewIcon /> Reviews
        </p>
      </Link>
    </div>
  )
}

export default Sidebar
