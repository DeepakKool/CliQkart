import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productDetailsReducer , productsReducer , newReviewReducer , newProductReducer , productReducer } from './reducers/productReducer'
import { userReducer , profileReducer , forgotPasswordReducer , allUsersReducer , userDetailsReducer } from './reducers/userReducer'
import { cartReducer } from './reducers/cartReducer'
import { orderReducer , newOrderReducer, myOrdersReducer , orderDetailsReducer , allOrdersReducer } from './reducers/orderReducer'
const reducer = combineReducers({
  products:productsReducer,
  productDetails:productDetailsReducer, 
  user: userReducer,
  cart: cartReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  order: orderReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
  newReview: newReviewReducer,
  newProduct: newProductReducer,
  product: productReducer,
  allOrders: allOrdersReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
})
let initialState = {
  cart: {
    cartItems: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [],
  }
}
const middleware = [thunk]
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)
))

export default store  








