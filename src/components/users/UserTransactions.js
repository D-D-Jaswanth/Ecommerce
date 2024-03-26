import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import UserNavbar from '../../screens/UserNavbar'
import { Link, useNavigate } from 'react-router-dom'
import { store } from '../../App'
import moment from 'moment'

function UserTransactions() {

    const [orders, setOrders] = useState([])

    const [data, setData] = useState(null)

    const [token, setToken] = useContext(store)

    const [search, setSearch] = useState('')

    const navigate = useNavigate()

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
        axios.get('http://localhost:5000/userorders')
            .then(orders => {
                setOrders(orders.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    if (!token) {
        navigate('/')
    }

    return (
        <>
            <UserNavbar />
            <div className='user-transactions-container'>
                <div className='container-fluid'>
                    <div class="row">
                        <div class="col-12">
                            <div className='card'>
                                <form className='searchform w-100'>
                                    <input class="form-control me-1" type="search" onChange={(e) => setSearch(e.target.value)} placeholder="Search" />
                                </form>
                            </div>
                            {
                                orders?.filter(o => {
                                    return search.toLowerCase() === ''
                                        ? o
                                        : o.status.toLowerCase().includes(search.toLowerCase());
                                }).map((o, i) => (
                                    (o.Users?.fullname === data?.fullname) ?
                                        <Link to={`/orderinfo/${o._id}`} className='card text-decoration-none p-2 mt-3'>
                                            {
                                                o.Products.map((p, i) => (
                                                    <div className='row row-cols-3'>
                                                        <div className='col-2' style={{ width: "120px" }}>
                                                            <img src={`/uploads/${p.images}`} alt={p.title} style={{ width: "120px" }} />
                                                        </div>
                                                        <div className='col-6'>
                                                            <h6>{p.title}</h6><br />
                                                            <h6><span class="WebRupee">&#x20B9;</span> {p.price}</h6>
                                                        </div>
                                                        <div className='col-4'>
                                                            <h6>{o.status}</h6>
                                                            <p>Order Date: {moment(o.createdAt).add(0, 'days').format('DD-MM-YYYY')}</p>
                                                            <Link to={`/userrating/${o._id}`} className='d-flex text-decoration-none' style={{ gap: "5px" }}>
                                                                <span class="material-symbols-outlined">
                                                                    star
                                                                </span>
                                                                <p>Rate & Review Product</p>
                                                            </Link>
                                                            <p>Update Date: {moment(o.updatedAt).add(0, 'days').format('DD-MM-YYYY')}</p>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </Link>
                                        : null
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserTransactions