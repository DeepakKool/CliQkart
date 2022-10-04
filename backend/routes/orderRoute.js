const express = require('express')
const router = express.Router()
const [ newOrder , getSingleOrder , myOrders , allOrders , updateOrder , deleteOrder ] = require('../controllers/orderController')
const [isAuthenticatedUser , authorizedRoles] = require('../middleware/authentication')

router.route('/order/new').post(isAuthenticatedUser , newOrder)

router.route('/order/:id').get(isAuthenticatedUser , authorizedRoles('admin'), getSingleOrder)

router.route('/admin/order/:id').put(isAuthenticatedUser , authorizedRoles('admin'), updateOrder)  
                                .delete(isAuthenticatedUser , authorizedRoles('admin'), deleteOrder )  

router.route('/orders/me').get(isAuthenticatedUser , myOrders)

router.route('/admin/orders').get(isAuthenticatedUser , authorizedRoles('admin') , allOrders)






module.exports = router