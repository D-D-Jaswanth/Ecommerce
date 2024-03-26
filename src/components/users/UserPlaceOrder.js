import React, { useState, useEffect, useContext } from 'react'
import { useCart } from '../../context/cart'
import UserNavbar from '../../screens/UserNavbar'
import axios from 'axios'
import { store } from '../../App'
import { Link, useNavigate } from 'react-router-dom'
import { Radio } from 'antd'

function UserPlaceOrder() {

    const [cart, setCart] = useCart()

    const [data, setData] = useState(null)

    const [token, setToken] = useContext(store)

    const [address, setAddress] = useState([])

    const navigate = useNavigate()

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
        axios.get('http://localhost:5000/placeorder', {
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
        axios.get('http://localhost:5000/useraddressview')
            .then(address => {
                setAddress(address.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const handlePayment = async (req, res) => {
        try {
            await axios.post('http://localhost:5000/placeorder', { cart, data, address })
            localStorage.removeItem('cart')
            setCart([])
            navigate('/success')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <UserNavbar />
            <div className='user-place-order-container'>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-md-8'>
                            <div className='row row-cols-1'>
                                <div className='card mt-2 p-2'>
                                    <h5>LOGIN</h5>
                                    <div className='d-flex w-50' style={{ gap: "10px" }}>
                                        <strong>{data?.fullname}</strong>
                                        <p>{data?.mobilenumber}</p>
                                    </div>
                                </div>
                                <div className='card mt-2 p-2'>
                                    <h5>DELIVERY ADDRESS</h5>
                                    <p style={{ color: "red" }}>Note: Please Make Sure to Select the address while placing the Order</p>
                                    {
                                        address.map(a => (

                                            (a?.user?.fullname === data?.fullname) ? 
                                            
                                            <div>
                                                <p>{a.address1}</p>
                                            </div>
                                            : null
                                        ))
                                    }
                                </div>
                                <div className='card mt-2 p-2'>
                                    <h5>ORDER SUMMARY</h5>
                                    {
                                        cart.map((c, i) => (
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
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className='card mt-2 p-2'>
                                    <h5>PAYMENT OPTIONS</h5>
                                </div>
                            </div>
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
                                            <Link className='btn btn-primary w-100 mt-5 p-2' onClick={handlePayment}>Make Payment</Link>
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

export default UserPlaceOrder