const jwt = require('jsonwebtoken')

// Model Schema

const AdminModel = require('../Models/AdminModelSchema')
const CategoryModel = require('../Models/CategoryModelSchema')
const ProductModel = require('../Models/ProductModelSchema')
const OrderModel = require('../Models/OrderModelSchema')

// Admin Register

const AdminRegisterController = async (req, res) => {

    try {

        const { email, password } = req.body;

        const exist = await AdminModel.findOne({ email })

        if (exist) {
            return res.status(404).send('Admin already Exist')
        }

        let newUser = new AdminModel({
            email, password
        })

        await newUser.save()
        return res.status(200).send('Register Successfully')

    }
    catch (err) {
        return res.status(500).send('Error in Registration ! Try Again After Some time')
    }

}

// Admin Login

const AdminLoginController = async (req, res) => {

    try {

        const { email, password } = req.body

        let exist = await AdminModel.findOne({ email })

        if (!exist) {
            return res.status(401).send('Invalid Email and Password')
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

// Admin Product Controller

const AdminProductFilterController = async (req, res) => {
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

// Admin Home Page

const AdminHomePageController = (req, res) => {
    ProductModel.find()
        .then(products => {
            res.json(products)
        })
        .catch(err => {
            res.json(err)
        })
}

// Admin Profile

const AdminProfileController = async (req, res) => {
    try {
        let exist = await AdminModel.findById(req.user.id)
        if (!exist) {
            res.status(401).send('Admin Not Found')
        }
        res.json(exist)
    }
    catch (err) {
        res.status(500).send('Internal Server Error')
    }
}

// Admin Add Categories

const AdminAddCategoryController = async (req, res) => {

    try {

        const { category } = req.body

        let exist = await CategoryModel.findOne({ category })

        if (exist) {
            return res.status(401).send('Already Added ! Please add Another Category')
        }

        let newCategory = await CategoryModel({
            category
        })
        await newCategory.save()
        return res.status(200).send('Category Added')

    }
    catch (err) {
        return res.status(500).send('Error in Adding Categories !')
    }
}

// Admin View Categories

const AdminAllCategoryController = (req, res) => {
    CategoryModel.find()
        .then(cat => {
            res.json(cat)
        })
        .catch(err => {
            res.json(err)
        })
}

// Admin Delete Category

const AdminCategoryDeleteController = (req, res) => {
    const id = req.params.id
    CategoryModel.findByIdAndDelete({ _id: id })
        .then(res => {
            res.json(res)
        })
        .catch(err => {
            res.json(err)
        })
}

// Admin View Products

const AdminViewProductsController = (req, res) => {
    ProductModel.find()
        .then(products => {
            res.json(products)
        })
        .catch(err => {
            res.json(err)
        })
}

// Admin View All Orders

const AdminViewAllOrdersController = (req, res) => {
    OrderModel.find()
        .populate('Users', 'fullname')
        .populate('Products', '-photo')
        .sort({ createdAt: -1})
        .then(orders => {
            res.json(orders)
        })
        .catch(err => {
            res.json(err)
        })
}

// Admin Edit Order Transaction

const AdminEditTransactionController = (req, res) => {
    const id = req.params.id
    OrderModel.findById({ _id: id })
    .populate('Users', 'fullname')
    .populate('Products')
    .then(orders => {
        res.json(orders)
    })
    .catch(err => {
        res.json(err)
    })
}

// Admin Update Order Status

const AdminUpdateOrderStatusController = (req, res) => {
    const id = req.params.id
    OrderModel.findByIdAndUpdate({ _id: id }, { status: req.body.status })
    .then(orders => {
        res.json(orders)
    })
    .catch(err => {
        res.json(err)
    })
}


module.exports = {
    AdminRegisterController, AdminLoginController, AdminProfileController, AdminAddCategoryController, AdminAllCategoryController,
    AdminViewProductsController, AdminHomePageController, AdminProductFilterController, AdminCategoryDeleteController, AdminViewAllOrdersController,
    AdminEditTransactionController, AdminUpdateOrderStatusController,
}