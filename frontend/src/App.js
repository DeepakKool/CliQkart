import axios from 'axios'
import { useEffect , useState } from 'react'
import { BrowserRouter as Router , Route, Switch } from 'react-router-dom'
import { loadUser } from './actions/userAction'
import { useSelector } from 'react-redux'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import Header from './component/layout/Header/Header'
import Footer from './component/layout/Footer/Footer'
import Home from './component/Home/Home'
import ProductDetails from './component/Product/ProductDetails'
import Products from './component/Product/Products'
import Search from './component/Product/Search'
import LoginSignUp from './component/User/LoginSignUp'
import store from './store'
import UserOptions from './component/layout/Header/UserOptions'
import Profile from './component/User/Profile'
import UpdateProfile from './component/User/UpdateProfile'
import ProtectedRoute from './component/Route/ProtectedRoute'
import UpdatePassword from './component/User/UpdatePassword'
import ForgotPassword from './component/User/ForgotPassword'
import ResetPassword from './component/User/ResetPassword'
import Cart from './component/Cart/Cart'
import Shipping from './component/Cart/Shipping'
import ConfirmOrder from './component/Cart/ConfirmOrder'
import Payment from './component/Cart/Payment'
import OrderSuccess from './component/Cart/OrderSuccess'
import MyOrders from './component/Order/MyOrders'
import OrderDetails from './component/Order/OrderDetails'
import Dashboard from './component/Admin/Dashboard'
import ProductList from './component/Admin/ProductList'
import NewProduct from './component/Admin/NewProduct'
import UpdateProduct from './component/Admin/UpdateProduct'
import OrderList from './component/Admin/OrderList'
import ProcessOrder from './component/Admin/ProcessOrder'
import UsersList from './component/Admin/UsersList'
import UpdateUser from './component/Admin/UpdateUser'
import ProductReviews from './component/Admin/ProductReviews'
import About from './component/layout/About/About'
import Contact from './component/layout/Contact/Contact'
import NotFound from './component/layout/Not Found/NotFound'
import './App.css'

const App = () => {
  const [ stripeApiKey , setStripeApiKey ] = useState('')

  async function getStripeApiKey() {
    const data = await axios.get('/stripeApiKey')
    setStripeApiKey(data.data.stripeApiKey)
  }

  const {isAuthenticated , user} = useSelector(state=> state.user)
  
  useEffect(()=>{
    store.dispatch(loadUser())
    getStripeApiKey()
  },[])
  
  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      { stripeApiKey &&  (
        <Elements stripe={loadStripe(stripeApiKey)} >
          <Route path="/process/payment" component={Payment} />
        </Elements>  
      )}
      <Switch>
      <Route exact path="/" component={Home} />
      <ProtectedRoute isAdmin={true} exact path="/admin/dashboard" component={Dashboard} />
      <ProtectedRoute isAdmin={true} exact path="/admin/products" component={ProductList} />
      <ProtectedRoute isAdmin={true} exact path="/admin/orders" component={OrderList} />
      <ProtectedRoute isAdmin={true} exact path="/admin/order/:id" component={ProcessOrder} />
      <ProtectedRoute isAdmin={true} exact path="/admin/product" component={NewProduct} />
      <ProtectedRoute isAdmin={true} exact path="/admin/product/:id" component={UpdateProduct} />
      <ProtectedRoute isAdmin={true} exact path="/admin/users" component={UsersList} />
      <ProtectedRoute isAdmin={true} exact path="/admin/user/:id" component={UpdateUser} />
      <ProtectedRoute isAdmin={true} exact path="/admin/reviews" component={ProductReviews} />
      <Route exact path="/login" component={LoginSignUp} />
      <Route exact path="/products" component={Products} />
      <Route exact path="/about" component={About} />
      <Route exact path="/contact" component={Contact} />
      <Route exact path="/product/:id" component={ProductDetails} />
      <Route exact path="/Search" component={Search} />
      <ProtectedRoute exact path="/account" component={Profile} />
      <ProtectedRoute exact path="/me/update" component={UpdateProfile} />
      <ProtectedRoute exact path="/password/update" component={UpdatePassword} />
      <Route exact path="/password/forgot" component={ForgotPassword} />
      <Route exact path="/password/reset/:token" component={ResetPassword} />
      <Route path="/products/:keyword" component={Products} />
      <Route exact path="/Cart" component={Cart} />
      <Route exact path="/shipping" component={Shipping} />
      <Route exact path="/success" component={OrderSuccess} />
      <ProtectedRoute exact path="/orders/me" component={MyOrders} />
      <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder} />
      <ProtectedRoute exact path="/order/:id" component={OrderDetails} />
      <Route component={ window.location.pathname === "/process/payment" ? null : NotFound } />
      </Switch>
      <Footer />
    </Router>
  )
}
export default App
