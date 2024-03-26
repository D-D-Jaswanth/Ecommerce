const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const routes = require('./Views/Routes')
const userroutes = require('./Views/UserRoutes')
const multer = require('multer')

const ProductModel = require('./Models/ProductModelSchema')
const RatingModel = require('./Models/RatingModelSchema')

const app = express()

app.use(cors({ origin: "*" }))
app.use(express.json())
app.use(routes)
app.use(userroutes)

const port = 5000

app.listen(port, () => {
    console.log(`Server is listening on ${port}`)
})

mongoose.connect('mongodb://127.0.0.1:27017/ecommerce')
    .then(res => {
        console.log('Connected to Database')
    })
    .catch(err => {
        console.log('Error connecting to the Database' + err)
    })

// Admin Add Products

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, '../public/uploads/')
    },
    filename: (req, file, callback) => {
        const uniqueSuffix = Date.now()
        callback(null, uniqueSuffix + file.originalname);
    }
})

const upload = multer({ storage: storage })

app.post('/adminaddproducts', upload.single('images'), async(req, res) => {

    const title = req.body.title
    const description = req.body.description
    const price = req.body.price
    const discountPercentage = req.body.discountPercentage
    const rating = req.body.rating
    const stock = req.body.stock
    const brand = req.body.brand
    const category = req.body.category
    const images = req.file.filename

    try{

        await ProductModel.create({
            title: title, description: description,
            price: price, discountPercentage: discountPercentage,
            rating: rating, stock: stock, brand: brand,
            category: category, images: images
        })
        res.status(200).send('Added')

    }
    catch(err){
        res.status(500).send('Error in Adding Products !')
    }
})