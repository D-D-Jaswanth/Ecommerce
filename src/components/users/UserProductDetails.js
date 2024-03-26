import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import UserNavbar from '../../screens/UserNavbar'

function UserProductDetails() {

    const { id } = useParams()

    const [products, setProducts] = useState([])

    const [rating, setRating] = useState([])

    useEffect(() => {
        axios.get('http://localhost:5000/userproductdetails/' + id)
            .then(products => {
                setProducts(products.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    useEffect(() => {
        axios.get('http://localhost:5000/userproductdetails')
            .then(rating => {
                setRating(rating.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <>
            <UserNavbar />
            <div className='userproduct-details'>
                <div className='container-fluid'>
                    <div className='row row-cols-2'>
                        <div className='col-4' style={{ height: '400px' }}>
                            <img className='h-100' src={`/uploads/${products.images}`} />
                        </div>
                        <div className='col-7'>
                            <div className='details'>
                                <h5>{products.title}</h5>
                                <p className='d-flex rating'>
                                    {products.rating}
                                    <span class="material-symbols-outlined">grade</span>
                                </p>
                                <h4><span class="WebRupee">&#x20B9;</span> {products.price}</h4>
                                <h6>Available Offers</h6>
                                <p className='offers'>
                                    <span class="material-symbols-outlined">sell</span>
                                    <p>Special Price Get Extra {products.discountPercentage} %  discount</p>
                                </p>
                                <h5>Easy Payment Options</h5>
                                <li>No Cost EMI Starting from <span class="WebRupee">&#x20B9;</span> 2,167 / month</li>
                                <li>Cash on Delivery</li>
                                <li>Net Banking & Credit / Debit / ATM Card</li>
                                <br />
                                <h5>About this item</h5>
                                <p>{products.description}</p>
                            </div>
                        </div>
                        <div className='col-4'></div>
                        <div className='col-7'>
                            <div className='card p-4' style={{ borderRadius: "0" }}>
                                <div className='row row-cols-2'>
                                    <div className='col-4'>
                                        <h5>Ratings & Reviews</h5>
                                    </div>
                                </div>
                                <div className='row row-cols-1'>
                                    {
                                        rating?.map((r, i) => (
                                            <div className='col border mt-4'>
                                                <div className='row row-cols-2'>
                                                    <div className='col-2 text-center mt-3' style={{ height: "35px" }}>
                                                        <div className='d-flex col-7 pt-2 h-100' style={{ background: 'green', color: "#fff", borderRadius: "5px", paddingLeft: "5px" }}>
                                                            <p className=''>
                                                                {r?.ratingpoints}
                                                            </p>
                                                            <span class="material-symbols-outlined">grade</span>
                                                        </div>
                                                    </div>
                                                    <div className='col-10 mt-3'>
                                                        <p>{r?.ratingtitle}</p>
                                                    </div>
                                                    <div className='col mt-2'>
                                                        <p>{r?.ratingdescription}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default UserProductDetails