import React, { useState ,Fragment, useEffect } from 'react'
import { useSelector , useDispatch } from 'react-redux'
import { clearErrors, getProductDetails , newReview } from '../../actions/productAction'
import { useAlert } from 'react-alert'
import { addItemsToCart } from '../../actions/cartAction'
import { Dialog, DialogActions , DialogContent , DialogTitle , Button } from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import Loader from '../layout/Loader/Loader'
import Carousel from 'react-material-ui-carousel'
import ReviewCard from '../Product/ReviewCard'
import MetaData from '../layout/MetaData'
import './ProductDetails.css'

const ProductDetails = ({match}) => {
  const dispatch = useDispatch()
  const alert = useAlert()
  const [open , setOpen] = useState(false)
  const { product , error, loading } = useSelector(state=>state.productDetails)
  const [ quantity , setQuantity ] = useState(1)
  const [ rating , setRating ] = useState(0)
  const [ comment , setComment ] = useState('')
  const options = {
    readOnly: true,
    precision: 0.5,
    value: product.avgRating,
  }
  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true)
  }
  const addToCartHandler = () => {
    dispatch(addItemsToCart( match.params.id , quantity ))
    alert.success('Item added to cart')
  }
  const increaseQuantity = () => {
    if(product.stock <= quantity)
    return
    setQuantity(quantity+1)
  }
  const decreaseQuantity = () => {
    if(quantity <= 1)
    return
    setQuantity(quantity-1)
  }
  const reviewSubmitHandler = () => {
    const myForm = new FormData()
    myForm.set("rating", rating)
    myForm.set("comment", comment)
    myForm.set("productId", match.params.id)
    dispatch(newReview(myForm))
    setOpen(false)
  }
  useEffect(()=>{
    if(error) {
       alert.error(error)
       dispatch(clearErrors())
    }
    dispatch(getProductDetails(match.params.id))
  },[dispatch , match.params.id , error , alert])
  
  return(
    <Fragment>
      {loading ? <Loader /> : 
        <Fragment>
        <MetaData title={product.name+' -- Cliqkart'} />
        <div className="ProductDetails" >
          <div>
            <Carousel>
              { product.images && product.images.map((item , i) => (
                <img
                className='CarouselImage'
                key={item.url}
                src={item.url}
                alt={i+'slide'} 
                /> 
              ))}
            </Carousel>        
          </div>  
          <div>
            <div className="detailsBlock-1" >
              <h2>{product.name}</h2>
              <p>{product._id}</p>
            </div>
            <div className="detailsBlock-2" >
              <Rating {...options} />
              <span> ({product.numofReviews})  Reviews</span>
            </div>
            <div className="detailsBlock-3" >
              <h1>₹{product.price}</h1>
              <div className="detailsBlock-3-1" >
                <div className="detailsBlock-3-1-1" >
                  <button onClick={decreaseQuantity}>-</button>
                  <input readOnly value={quantity} type='number' />
                  <button onClick={increaseQuantity}>+</button>  
                </div>
                {product.stock>=1 && <button onClick={addToCartHandler}>Add to cart</button> }
              </div>
              <p>
                Status:
                <b className={product.stock < 1 ? 'redColor' : 'greenColor'} >
                  {product.stock < 1 ? 'Out of stock' : 'In stock'}
                </b>
              </p>
            </div>
            <div className="detailsBlock-4" >
              Description: <p>{product.description}</p>
            </div>
            <button className="submitReview" onClick={submitReviewToggle}>Submit Review</button>
          </div>
        </div>
        <h3 className="reviewsHeading">REVIEWS</h3>
        <Dialog
          aria-labelledby="simple-dialog-title"
          open={open}
          onClose={submitReviewToggle}
        >
          <DialogTitle>Submit Review</DialogTitle>
          <DialogContent className="submitDialog">
            <Rating
              onChange={(e) => setRating(e.target.value)}
              value={rating}
              size="large"
            />
            <textarea
              className="submitDialogTextArea"
              cols="30"
              rows="5"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </DialogContent>
          <DialogActions>
            <Button onClick={submitReviewToggle} color="secondary">
              Cancel
            </Button>
            <Button onClick={reviewSubmitHandler} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
        {product.reviews && product.reviews[0] ? (
          <div className='reviews'>
          { product.reviews && product.reviews.map((review) => <ReviewCard review={review} />)}
          </div>
        ) : (
        <p className='noReviews'>No reviews yet.</p>
      )}
    </Fragment>
    }
  </Fragment>
)
}




export default ProductDetails