import React, { Fragment , useEffect , useState } from 'react'
import { useSelector , useDispatch } from 'react-redux'
import { clearErrors, getProduct } from '../../actions/productAction'
import ProductCard from '../Home/ProductCard'
import { useAlert } from 'react-alert'
import Pagination from 'react-js-pagination'
import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/core/Slider'
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader/Loader'
import './Products.css'

const categories = [ 'Intelligent' , 'Moron']

const Products = ( {match} ) => {
	const [currentPage , setCurrentPage] = useState(1)
	const dispatch = useDispatch()
	const [price , setPrice] = useState( [ 0, 25000] )
	const keyword = match.params.keyword
	const [ratings , setRatings ] = useState(0)
	const [category , setCategory] = useState('')
	const priceHandler = (event , newPrice) => {
	setPrice(newPrice)
	}
	const alert = useAlert()
	const { products , error , loading , resultPerPage } = useSelector((state)=>state.products)
	const setCurrentPageNo = (e) => {
		setCurrentPage(e)
	}
	useEffect(()=>{
		if(error) {
			alert.error(error)
			dispatch(clearErrors())
		}
		dispatch(getProduct(keyword , currentPage , price , category , ratings ))
	},[dispatch , keyword , currentPage , price , category , ratings , alert , error ])

return <Fragment> 
	{loading ? <Loader /> : (
	<Fragment>	
	<MetaData title='CliQkart--Products' />
  <h2 className='productsHeading'>Products</h2>
	<div className='products'>
		{products && products.map((product)=> (
			<ProductCard key={product._id} product={product} />
		))}
	</div>
	<div className='filterBox'>
		<Typography>Price</Typography>
		<Slider 
			value={price}
			onChange={priceHandler}
			valueLabelDisplay='auto'
			aria-labelledby='range-slider'
			min={0}
			max={25000}
		/>
		<Typography>Categories</Typography>
		<ul className="categoryBox">
			{categories.map((category) => (
				<li
					className="category-link"
					key={category}
					onClick={() => setCategory(category)}
				>
					{category}
				</li>
			))}
		</ul>
		<fieldset className='rating-box'>
			<Typography component="legend">Ratings</Typography>
			<Slider
				value={ratings}
				onChange={(e, newRating) => {
					setRatings(newRating)
				}}
				aria-labelledby="continuous-slider"
				valueLabelDisplay="auto"
				min={0}
				max={5}
			/>
		</fieldset>
	</div>
	<div className='paginationBox'>
		<Pagination
			activePage={currentPage}
			itemsCountPerPage={resultPerPage}
			totalItemsCount={10}
			onChange={setCurrentPageNo}
			nextPageText='Next'
			prevPageText='Prev'
			firstPageText='First'
			lastPageText='Last'
			itemClass='page-item'
			linkClass='page-link'
			activeClass='pageItemActive'
			activeLinkClass='pageLinkActive'
		/>
	</div>	
	</Fragment>
)}
</Fragment>
}


export default Products