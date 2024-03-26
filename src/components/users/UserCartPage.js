import React, { useState, useContext, useEffect } from 'react'
import { useCart } from '../../context/cart'
import { store } from '../../App'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import UserNavbar from '../../screens/UserNavbar'

function UserCartPage() {

    const [cart, setCart] = useCart()

    const [data, setData] = useState(null)

    const [token, setToken] = useContext(store)

    const navigate = useNavigate()

    const removeCartItem = (pid) => {
        try {
            const myCart = [...cart]
            let index = myCart.findIndex(item => item._id === pid)
            myCart.splice(index, 1)
            setCart(myCart);
            localStorage.setItem('cart', JSON.stringify(myCart))

        } catch (error) {
            console.log(error)
        }
    }

    const totalPrice = () => {
        try {
            let total = 0;
            cart?.map((item) => {
                return (
                    total = total + item.price
                )
            })
            return total.toLocaleString("en-US", {
                style: "currency",
                currency: "INR",
            })
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        axios.get('http://localhost:5000/usercart', {
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

    return (
        <>
            <UserNavbar />
            <div className='usercart-container'>
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-8">
                            {
                                cart.map((c, i) => (
                                    // (c?.fullname === data?.fullname) ?
                                    <div className='card mt-2 p-1'>
                                        <div className='row row-cols-1 row-cols-md-0 w-100'>
                                            <div className='col'>
                                                <div className='row row-cols-3'>
                                                    <div className='col'>
                                                        <img src={`/uploads/${c.images}`} alt={c.title} style={{ width: "200px" }} />
                                                    </div>
                                                    <div className='col-7'>
                                                        <h4>{c.title}</h4>
                                                        <h5><span class="WebRupee">&#x20B9;</span> {c.price}</h5>
                                                        <h6 style={{ color: "red" }}> - {c.discountPercentage} %</h6>
                                                        <p>{c.description.substring(0, 100)}....</p>
                                                    </div>

                                                    <div className='col-1'>
                                                        <button className='btn btn-danger' onClick={() => removeCartItem(c._id)}>
                                                            <span class="material-symbols-outlined">
                                                                delete
                                                            </span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    // : null
                                ))
                            }
                        </div>
                        <div class="col-6 col-md-4 mt-2">
                            <div className='card p-3'>
                                <div className='row row-col-1'>
                                    <div className='col text-center'>
                                        <h4>PRICE DETAILS</h4>
                                        <div className='row row-cols-2 pt-4'>
                                            <div className='col'>
                                                <p>Price ({cart.length} items) : </p>
                                                <p>Delivery Charges : </p>
                                                <h5>Total Amount : </h5>
                                            </div>
                                            <div className='col'>
                                                <p>{totalPrice()}</p>
                                                <p>Free</p>
                                                <h5>{totalPrice()}</h5>
                                            </div>
                                        </div>
                                        <div className='col'>
                                            <Link to='/placeorder' className='btn btn-primary w-100 mt-5 p-2'>Place Order</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserCartPage