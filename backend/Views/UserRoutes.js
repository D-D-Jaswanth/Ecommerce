const express = require('express')

const router = express.Router()

const { requireSignIn } = require('../Middlewares/middleware')
const { RegisterController, LoginController, UserProfileController, UserHomePageController, UserProductFilterController, UserHomePageProfileController, UserAddressPageController, UserAddressController, UserAddressDisplayController, UserAddressDeleteController, UserProductDetailsController, UserCartPageController, UserPlaceOrderController, UserPlaceOrder, GetUserOrderController, UserGetOrderDetailsController, UserRatingController, UserProductRatingsDisplayController, UserOrderFilterController } = require('../Controllers/UserController')

// User Registration

router.post('/register', RegisterController)

// User Login

router.post('/login', LoginController)

// User Profile

router.get('/userprofile', requireSignIn, UserProfileController)

// User Home Page

router.get('/userhomepage', UserHomePageController)

// User Products Filter

router.post('/userhomepage', UserProductFilterController)

// User Home Page Profile

router.get('/userhomepage', UserHomePageProfileController)

// User Address Page

router.get('/useraddress',requireSignIn, UserAddressPageController)

// User Address

router.post('/useraddress', UserAddressController)

// User Address Display

router.get('/useraddressview', UserAddressDisplayController)

// User Address Delete

router.delete('/useraddressview/:id', UserAddressDeleteController)

// User Product Details View

router.get('/userproductdetails/:id', UserProductDetailsController)

// User Cart Page

router.get('/usercart', requireSignIn, UserCartPageController)

// User Place Order

router.get('/placeorder', requireSignIn, UserPlaceOrderController)

// User Place Order

router.post('/placeorder', UserPlaceOrder)

// User Order Details

router.get('/userorders', GetUserOrderController)

// User Order Filter

router.post('/userorders', UserOrderFilterController)

// User Get Order Details

router.get('/orderinfo/:id', UserGetOrderDetailsController)

// User rating

router.post('/userrating', UserRatingController)

// User Product Details Ratings

router.get('/userproductdetails', UserProductRatingsDisplayController)

module.exports = router