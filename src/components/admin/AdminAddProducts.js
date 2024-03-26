import React, { useState, useEffect } from 'react'
import AdminNavbar from '../../screens/AdminNavbar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function AdminAddProducts() {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [discountPercentage, setDiscountPercentage] = useState('')
    const [rating, setRating] = useState('')
    const [stock, setStock] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [images, setImages] = useState('')

    const navigate = useNavigate()

    const [cat, setCat] = useState([])

    const handleChangeFile = (e) => {
        setImages(e.target.files[0])
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('title', title)
        formData.append('description', description)
        formData.append('price', price)
        formData.append('discountPercentage', discountPercentage)
        formData.append('rating', rating)
        formData.append('stock', stock)
        formData.append('brand', brand)
        formData.append('category', category)
        formData.append('images', images)

        const result = await axios.post('http://localhost:5000/adminaddproducts', formData,
            {
                headers: {
                    "contentType": "multipart/form-data"
                }
            }
        )

        if (result.data === "Added") {
            alert('Product Added Successfully')
            navigate('/adminproducts')
        }
    }

    useEffect(() => {
        axios.get('http://localhost:5000/admincategories')
            .then(cat => {
                setCat(cat.data)
            })
            .catch(err => {
                console.log(err)
            })
    },[])

    return (
        <>
            <AdminNavbar />
            <div className='admin-add-products'>
                <div className='container'>
                    <center><h4>Add Products</h4></center>
                    <form onSubmit={handleSubmit} autoComplete='off'>
                        <div class="row">
                            <div class="col">
                                <input type="text" onChange={(e) => setTitle(e.target.value)} name='title' class="form-control" placeholder="Title" aria-label="title" />
                            </div>
                            <div class="col">
                                <input type="text" onChange={(e) => setDescription(e.target.value)} name='description' class="form-control" placeholder="Description" aria-label="description" />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <input type="text" onChange={(e) => setPrice(e.target.value)} name='price' class="form-control" placeholder="Price" aria-label="price" />
                            </div>
                            <div class="col">
                                <input type="text" onChange={(e) => setDiscountPercentage(e.target.value)} name='discountPercentage' class="form-control" placeholder="DiscountPercentage" aria-label="discountPercentage" />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <input type="text" onChange={(e) => setRating(e.target.value)} name='rating' class="form-control" placeholder="Rating" aria-label="rating" />
                            </div>
                            <div class="col">
                                <input type="text" onChange={(e) => setStock(e.target.value)} name='stock' class="form-control" placeholder="Stock" aria-label="stock" />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <input type="text" onChange={(e) => setBrand(e.target.value)} name='brand' class="form-control" placeholder="Brand" aria-label="brand" />
                            </div>
                            <div class="col">
                                <select onChange={(e) => setCategory(e.target.value)} name='category' class="form-select" aria-label="Default select example">
                                    <option selected='' disabled=''>Select Category</option>
                                    {
                                        cat.map((c, i) => (
                                            <option value={c.category} key={i}>{c.category}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <input type="file" onChange={handleChangeFile} name='images' class="form-control" placeholder="Images" aria-label="images" />
                            </div>
                        </div>
                        <button className='btn btn-primary'>Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AdminAddProducts