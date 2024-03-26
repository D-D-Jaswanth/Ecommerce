const jwt = require('jsonwebtoken')

const RegisterModel = require('../Models/RegisterModelSchema')
const ProductModel = require('../Models/ProductModelSchema')
const AddressModel = require('../Models/AddressModelSchema')
const OrderModel = require('../Models/OrderModelSchema')
const RatingModel = require('../Models/RatingModelSchema')

// User Registration

const RegisterController = async (req, res) => {

    try {

        const { fullname, mobilenumber, email, password, cpassword } = req.body;

        const exist = await RegisterModel.findOne({ email, mobilenumber })

        if (password !== cpassword) {
            return res.status(401).send('Password Not Matched !')
        }

        if (exist) {
            return res.status(404).send('User already Exist')
        }

        let newUser = new RegisterModel({
            fullname, mobilenumber,
            email, password,
            cpassword
        })

        await newUser.save()
        return res.status(200).send('Register Successfully')

    }
    catch (err) {
        return res.status(500).send('Error in Registration ! Try Again After Some time')
    }

}

// User Login

const LoginController = async (req, res) => {

    try {

        const { email, password } = req.body;

        const exist = await RegisterModel.findOne({ email })

        if (!exist) {
            return res.status(404).send('Invalid Email and Password')
        }
        if (exist.password !== password) {
            return res.status(404).send('Invalid Password')
        }

        let payload = {
            user: {
                id: exist.id
            }
        }

        jwt.sign(payload, 'jwtSecret', { expiresIn: "7d" },

            (err, token) => {
                if (err) throw err
                return res.json({ token })
            }
        )

    }
    catch (err) {
        return res.status(500).send('Error in Login !')
    }
}

// User Product Filter

const UserProductFilterController = async (req, res) => {
    try {
        const { checked, radio } = req.body
        let args = {}
        if (checked.length > 0) args.category = checked
        if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] }
        const products = await ProductModel.find(args)
        res.status(200).send({
            products
        })
    } catch (error) {
        console.log(error)
        res.status(500).send('Error in Filtering Products !')
    }
}

// User Profile

const UserProfileController = async (req, res) => {
    try {
        let exist = await RegisterModel.findById(req.user.id)
        if (!exist) {
            res.status(401).send('User Not Found')
        }
        res.json(exist)
    }
    catch (err) {
        res.status(500).send('Internal Server Error')
    }
}

// User Address Page

const UserAddressPageController = async (req, res) => {
    try {
        let exist = await RegisterModel.findById(req.user.id)
        if (!exist) {
            res.status(401).send('User Not Found')
        }
        res.json(exist)
    }
    catch (err) {
        res.status(500).send('Internal Server Error')
    }
}

// User Address Page

const UserAddressController = async (req, res) => {
    try {

        const { data } = req.body
        const newAddress = new AddressModel({
            ...req?.body?.address,
            user: req.body.data?._id
        })

        await newAddress.save()
        return res.status(200).send('Successfully Added New Address')

    }
    catch (err) {
        // throw err;
        return res.status(500).send(err)
    }
}


const UserAddressViewController = (req, res) => {
    AddressModel.find()
        .populate('user', 'fullname')
        .then(add => {
            res.json(add)
        })
        .catch(err => {
            res.json(err)
        })
}

// User Address Page Display

const UserAddressDisplayController = (req, res) => {
    AddressModel.find()
        .populate('user', 'fullname')
        .then(address => {
            res.json(address)
        })
        .catch(err => {
            res.json(err)
        })
}

// User Address Delete

const UserAddressDeleteController = (req, res) => {
    const id = req.params.id
    AddressModel.findByIdAndDelete({ _id: id })
        .then(res => {
            res.json(res)
        })
        .catch(err => {
            res.json(err)
        })
}


// User Home Page

const UserHomePageController = (req, res) => {
    ProductModel.find()
        .then(products => {
            res.json(products)
        })
        .catch(err => {
            res.json(err)
        })
}

// User Home Page Profile

const UserHomePageProfileController = async (req, res) => {
    try {
        let exist = await RegisterModel.findById(req.user.id)
        if (!exist) {
            res.status(401).send('User Not Found')
        }
        res.json(exist)
    }
    catch (err) {
        res.status(500).send('Internal Server Error')
    }
}

// User Product Details 

const UserProductDetailsController = (req, res) => {
    const id = req.params.id
    ProductModel.findById({ _id: id })
        .then(products => {
            res.json(products)
        })
        .catch(err => {
            res.json(err)
        })
}

// User Cart Page Profile Controller

const UserCartPageController = async (req, res) => {
    try {
        let exist = await RegisterModel.findById(req.user.id)
        if (!exist) {
            res.status(401).send('User Not Found')
        }
        res.json(exist)
    }
    catch (err) {
        res.status(500).send('Internal Server Error')
    }
}

// User Place Order Page Profile Controller

const UserPlaceOrderController = async (req, res) => {
    try {
        let exist = await RegisterModel.findById(req.user.id)
        if (!exist) {
            res.status(401).send('User Not Found')
        }
        res.json(exist)
    }
    catch (err) {
        res.status(500).send('Internal Server Error')
    }
}

// User Place Order

const UserPlaceOrder = async (req, res) => {
    try {

        const { data } = req.body
        const { cart } = req.body

        let total = 0;
        cart.map((i) => {
            total += i.Price;
        });

        const order = new OrderModel({
            Users: data._id,
            Products: cart,
        })

        await order.save()
        return res.status(200).send('Order Placed Successfully')

    } catch (error) {
        return res.status(500).send('Internal Server Error')
    }
}

// User Order Details

const GetUserOrderController = (req, res) => {
    OrderModel.find()
        .populate('Users', 'fullname')
        .populate('Products', '-photo')
        .populate('address', 'user')
        .then(orders => {
            res.json(orders)
        })
        .catch(err => {
            res.json(err)
        })
}

// User Get Order Details

const UserGetOrderDetailsController = (req, res) => {
    const id = req.params.id
    OrderModel.findById({ _id: id })
        .populate('Users', 'fullname')
        .populate('Products', '-photo')
        .then(orders => {
            res.json(orders)
        })
        .catch(err => {
            res.json(err)
        })
}

// User Order Filter

const UserOrderFilterController = async (req, res) => {
    try {
        const { checked } = req.body
        let args = {}
        if (checked.length > 0) args.status = checked
        const orders = await OrderModel.find(args)
        res.status(200).send({
            orders
        })
    } catch (error) {
        console.log(error)
        res.status(500).send('Error in Filtering Products !')
    }
}

// User Rating 

const UserRatingController = async (req, res) => {
    try {

        const { data } = req.body
        let newRating = RatingModel({
            User: req.body?.data._id,
            Product: req.body?.orders?._id,
            ...req?.body?.rating,
        })

        await newRating.save()
        return res.status(200).send('Successfully rated !')

    } catch (error) {
        return res.status(500).send('Error While Saving Rating')
    }
}

// User Product Rating

const UserProductRatingsDisplayController = (req, res) => {
    // const id = req.params.id
    RatingModel.find()
        .populate('User', 'fullname')
        .populate('Product')
        .then(rating => {
            res.json(rating)
        })
        .catch(err => {
            res.json(err)
        })
}

module.exports = {
    RegisterController, LoginController, UserProductFilterController, UserProfileController, UserAddressPageController,
    UserAddressController, UserAddressViewController, UserAddressDisplayController, UserAddressDeleteController,
    UserHomePageController, UserHomePageProfileController, UserProductDetailsController, UserCartPageController,
    UserPlaceOrderController, UserPlaceOrder, GetUserOrderController, UserGetOrderDetailsController, UserRatingController,
    UserProductRatingsDisplayController, UserOrderFilterController
}