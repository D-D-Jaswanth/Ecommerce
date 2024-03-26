import React, { useEffect, useContext, useState } from 'react'
import UserNavbar from '../../screens/UserNavbar'
import { useParams, useNavigate } from 'react-router-dom'
import { store } from '../../App'
import axios from 'axios'

function UserRatings() {

    const { id } = useParams()

    const [data, setData] = useState(null)

    const [token, setToken] = useContext(store)

    const [orders, setOrders] = useState([])

    const navigate = useNavigate()

    const [rating, setRating] = useState({
        ratingpoints: '',
        ratingdescription: '',
        ratingtitle: ''
    })

    useEffect(() => {
        axios.get('http://localhost:5000/userprofile', {
            headers: {
                'x-token': token
            }
        })
            .then((res) => {
                setData(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    useEffect(() => {
        axios.get('http://localhost:5000/orderinfo/' + id)
            .then(orders => {
                setOrders(orders.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const handleChange = (e) => {
        setRating({ ...rating, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await axios.post('http://localhost:5000/userrating', { data, orders, rating })
            .then(res => {
                alert(res.data)
                navigate('/userorders')
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <>
            <UserNavbar />
            <div className='user-rating-container'>
                <div className='container-fluid mt-2'>
                    <div className='card p-3'>
                        <div className='d-flex'>
                            <h5>Ratings & Reviews</h5>
                        </div>
                    </div>

                    <div className='row row-cols-2 mt-2'>
                        <div className='col-4'>
                            <div className='card'>
                                <h5 className='p-2 mt-2'>What Makes a good Review</h5>
                                <hr />
                                <div className='text p-1'>
                                    <h6>Have you used this product?</h6>
                                    <p>Your review should be about your experience with the product.</p>
                                    <hr />
                                </div>
                                <div className='text p-1'>
                                    <h6>Why review a product?</h6>
                                    <p>Your valuable feedback will help fellow shoppers decide!</p>
                                    <hr />
                                </div>
                                <div className='text p-1'>
                                    <h6>How to review a product?</h6>
                                    <p>Your review should include facts. An honest opinion is always appreciated. </p>
                                    <hr />
                                </div>
                            </div>
                        </div>
                        <div className='col-8'>
                            <div className='card'>
                                <h5 className='p-2 mt-3'>Rate this product</h5>
                                <hr />
                                <div className='text p-2'>
                                    <h5>Review this product</h5>
                                    <form onSubmit={handleSubmit}>
                                        <div class="mb-3">
                                            <input type="text" class="form-control" name='ratingpoints' onChange={handleChange} placeholder="Rating" />
                                        </div>
                                        <div class="mb-3">
                                            <textarea class="form-control" name='ratingdescription' onChange={handleChange} rows="3" placeholder='Description'></textarea>
                                        </div>
                                        <div class="mb-3">
                                            <input type="text" class="form-control" name='ratingtitle' onChange={handleChange} placeholder="title" />
                                        </div>
                                        <button className='btn btn-primary w-100'>Submit</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserRatings