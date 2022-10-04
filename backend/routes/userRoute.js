const express = require('express')
const [ registerUser , loginUser , getUserDetails , getSingleUser , getAllUsers , deleteUser , updateUserrole, updatePassword , updateProfile , forgotPassword , resetPassword , logout ] = require('../controllers/userController')
const [isAuthenticatedUser , authorizedRoles ] = require('../middleware/authentication')
const router = express.Router()


router.route('/register').post(registerUser)

router.route('/password/forgot').post(forgotPassword)

router.route('/password/reset/:token').put(resetPassword)

router.route('/password/update').put( isAuthenticatedUser, updatePassword)

router.route('/login').post(loginUser)

router.route('/me').get(isAuthenticatedUser , getUserDetails)

router.route('/me/update').put(isAuthenticatedUser , updateProfile)

router.route('/users/:id').get(isAuthenticatedUser, getUserDetails)

router.route('/admin/users').get(isAuthenticatedUser , authorizedRoles('admin'), getAllUsers)

router.route('/admin/user/:id').get(isAuthenticatedUser , authorizedRoles('admin'), getSingleUser)
                                .put(isAuthenticatedUser , authorizedRoles('admin'), updateUserrole)
                                .delete(isAuthenticatedUser , authorizedRoles('admin'), deleteUser)


router.route('/logout').get(logout)

module.exports = router





