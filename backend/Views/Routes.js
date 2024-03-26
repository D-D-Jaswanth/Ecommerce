const express = require('express')
const router = express.Router()

const { AdminLoginController, AdminRegisterController, AdminProfileController, AdminAddCategoryController,
     AdminAllCategoryController, AdminViewProductsController,
    AdminHomePageController, AdminProductFilterController, AdminCategoryDeleteController, AdminViewAllOrdersController, 
    AdminEditTransactionController, AdminUpdateOrderStatusController,  }
    = require('../Controllers/authControllers')

const { requireSignIn } = require('../Middlewares/middleware')

// Admin Register

router.post('/adminregister', AdminRegisterController)

// Admin Login

router.post('/adminlogin', AdminLoginController)

// Admin Home Page

router.get('/adminhomepage', AdminHomePageController)

// // Admin Home Page Profile

// router.get('/adminhomepage', AdminHomePageProfileController)

router.get('/admineditrans/:id', AdminEditTransactionController)

// Admin Products Filter

router.post('/adminhomepage', AdminProductFilterController)

// Admin Profile

router.get('/adminprofile', requireSignIn, AdminProfileController)

// Admin Categories

router.post('/admincategories', AdminAddCategoryController)

// Admin View Categories

router.get('/admincategories', AdminAllCategoryController)

// Admin Delete Categories

router.delete('/admincategories/:id', AdminCategoryDeleteController)

// Admin View Products

router.get('/adminproducts', AdminViewProductsController)

// Admin View All Orders

router.get('/admintrans', AdminViewAllOrdersController)

// Admin View Edit Order

router.get('/adminedittrans/:id', AdminEditTransactionController)

// Admin Update Order Status

router.put('/adminupdatetrans/:id', AdminUpdateOrderStatusController)

// // User Registration

// router.post('/register', RegisterController)

// // User Login

// router.post('/login', LoginController)

// // User Profile

// router.get('/userprofile', requireSignIn, UserProfileController)

// // User Home Page

// router.get('/userhomepage', UserHomePageController)

// // User Products Filter

// router.post('/userhomepage', UserProductFilterController)

// // User Home Page Profile

// router.get('/userhomepage', UserHomePageProfileController)

// // User Address Page

// router.get('/useraddress',requireSignIn, UserAddressPageController)

// // User Address

// router.post('/useraddress', UserAddressController)

// // User Address Display

// router.get('/useraddressview', UserAddressDisplayController)

// // User Address Delete

// router.delete('/useraddressview/:id', UserAddressDeleteController)

// // User Product Details View

// router.get('/userproductdetails/:id', UserProductDetailsController)

// // User Cart Page

// router.get('/usercart', requireSignIn, UserCartPageController)

// // User Place Order

// router.get('/placeorder', requireSignIn, UserPlaceOrderController)

// // User Place Order

// router.post('/placeorder', UserPlaceOrder)

// // User Order Details

// router.get('/userorders', GetUserOrderController)

// // User Get Order Details

// router.get('/orderinfo/:id', UserGetOrderDetailsController)

module.exports = router