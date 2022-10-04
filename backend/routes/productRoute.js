const express = require('express')
const [getAllProducts , getAdminProducts , createProductReview , createProduct ,  productAllreviews , deleteReview , productDetails , updateProduct , deleteProduct] = require("../controllers/productController")
const router = express.Router()
const [isAuthenticatedUser , authorizedRoles ] = require('../middleware/authentication')

//Get product
router.route('/products').get(getAllProducts)

//Create product
router.route('/admin/product/new').post(isAuthenticatedUser , authorizedRoles("admin") , createProduct)

//Product by ID
router.route('/product/:id').get(productDetails)

//Delete or Update product
router.route('/admin/product/:id').delete(isAuthenticatedUser , authorizedRoles("admin") ,deleteProduct)
                                  .put(isAuthenticatedUser , authorizedRoles("admin") ,isAuthenticatedUser, updateProduct)

//Admin all products
router.route("/admin/products").get(isAuthenticatedUser, authorizedRoles("admin"), getAdminProducts)

//Review product
router.route('/review').put(isAuthenticatedUser , createProductReview)                             

//Product All reviews operations
router.route('/reviews').get(productAllreviews)
                        .delete(isAuthenticatedUser , deleteReview)    

                             

module.exports = router





