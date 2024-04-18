import React, { useEffect, useState } from 'react'
import AdminNavbar from '../../screens/AdminNavbar'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { BACKEND_URL } from '../helper'

function AdminEditTransactions() {
    const { id } = useParams()

    const [orders, setOrders] = useState({
        status: ''
    })

    const [changeStatus, setChangeStatus] = useState(["Order Processing", "Order Accepted", "Packed", "Shipped", "Out For Delivery", "Delivered", "cancel"])

    const handleChange = (e) => {
        setOrders({ ...orders, [e.target.name]: e.target.value })
    }

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put(`${BACKEND_URL}/adminupdatetrans/` + id, orders)
            .then(orders => {
                setOrders(orders.data)
                alert('Order Updated Successfully')
                navigate('/admintrans')
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        axios.get(`${BACKEND_URL}/adminedittrans/` + id)
            .then(orders => {
                setOrders(orders.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [id])

    return (
        <>
            <AdminNavbar />
            <div className='admin-edit-transaction'>
                <div className='container-fluid'>
                    <div className='card p-2 mt-3'>
                        {
                            orders?.Products?.map((p, i) => (
                                <div className='row row-cols-4'>
                                    <div className='col-2' style={{ height: "150px", width: "150px" }}>
                                        <img src={`/uploads/${p.images}`} className='h-100' />
                                    </div>
                                    <div className='col-4'>
                                        <h6>{p?.title}</h6>
                                        <h6><span class="WebRupee">&#x20B9;</span> {p.price}</h6>
                                    </div>
                                    <div className='col-3'>
                                        <h6>{orders?.Users?.fullname}</h6><br />
                                    </div>
                                    <div className='col-3'>
                                        <h6>{orders.status}</h6>
                                        <p>Order Date: {moment(orders.createdAt).add(0, 'days').format('DD-MM-YYYY')}</p>
                                        <Link className='d-flex text-decoration-none' style={{ gap: "5px" }}>
                                            <span class="material-symbols-outlined">
                                                star
                                            </span>
                                            <p>Rate & Review Product</p>
                                        </Link>
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                    <div className='mt-3'>
                        <form onSubmit={handleSubmit}>
                            <select class="form-select" aria-label="Default select example"
                                onChange={handleChange} name='status'
                            >
                                <option selected='' disabled=''>Select the status</option>
                                {
                                    changeStatus.map((c, i) => (
                                        <option value={c} key={i}>{c}</option>
                                    ))
                                }
                            </select>
                            <button className='btn btn-primary mt-3 w-100 p-2'>Update</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminEditTransactions