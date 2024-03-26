import React, { useEffect, useState } from 'react'
import UserNavbar from '../../screens/UserNavbar'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'

function UserOrderInfo() {
    const { id } = useParams()

    const [orders, setOrders] = useState([])

    useEffect(() => {
        axios.get('http://localhost:5000/orderinfo/' + id)
            .then(orders => {
                setOrders(orders.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <>
            <UserNavbar />
            <div className='user-order-info'>
                <div className='container-fluid'>
                    <div className='card p-2'>
                        {
                            orders?.Products?.map((p, i) => (
                                <div className='row row-cols-4'>
                                    <div className='col-2' style={{ height: '150px', width: "200px" }}>
                                        <img src={`/uploads/${p?.images}`} className='h-100' alt={orders?.Products?.title} />
                                    </div>
                                    <div className='col-3'>
                                        <h5>{p?.title}</h5>
                                        <h6><span class="WebRupee">&#x20B9;</span> {p?.price}</h6>
                                    </div>
                                    <div className='col-3'>
                                        <h6>{orders?.Users?.fullname}</h6><br />
                                    </div>
                                    <div className='col-3'>
                                        <h6>{orders?.status}</h6>
                                        <p>Order Date: {moment(orders?.createdAt).add(0, 'days').format('DD-MM-YYYY')}</p>
                                        <p>Update Date: {moment(orders?.updatedAt).add(0, 'days').format('DD-MM-YYYY')}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserOrderInfo