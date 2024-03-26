import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import AdminNavbar from '../../screens/AdminNavbar'
import { Link } from 'react-router-dom';
import moment from 'moment';

function AdminTransactions() {

    const [orders, setOrders] = useState([])

    const [search, setSearch] = useState('')

    useEffect(() => {
        axios.get('http://localhost:5000/admintrans')
            .then(orders => {
                setOrders(orders.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <>
            <AdminNavbar />
            <div className='admin-transactions-container'>
                <div className='container-fluid'>
                    <div class="row">
                        <div class="col-12">
                            <div className='card'>
                                <form className='searchform w-100' role='Search'>
                                    <input class="form-control me-1" type="search" onChange={(e) => setSearch(e.target.value)} placeholder="Search" />
                                </form>
                            </div>
                            {
                                orders?.filter(o => {
                                    return search.toLowerCase() === ''
                                    ? o
                                    : o?.Users?.fullname.toLowerCase().includes(search);
                                }).map((o, i) => (
                                    <div>
                                        <div className='mt-3'>
                                            <table class="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">#</th>
                                                        <th scope="col">User</th>
                                                        <th scope="col">Mobile Number</th>
                                                        <th scope="col">Products Length</th>
                                                        <th scope="col">Status</th>
                                                        <th scope="col">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th scope="row">{i + 1}</th>
                                                        <td>{o?.Users?.fullname}</td>
                                                        <td>{o?.Users?.mobilenumber}</td>
                                                        <td>{o?.Products?.length}</td>
                                                        <td>{o?.status}</td>
                                                        <td>
                                                            <Link className='btn btn-danger' to={`/adminedittrans/${o?._id}`}>Edit</Link>
                                                            {/* <Link className='btn btn-danger' to={`/adminedittrans/${o._id}`}>Edit</Link> */}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        {
                                            o.Products.map((p, i) => (
                                                <div className='card p-2 mt-3'>
                                                    <div className='row row-cols-4'>
                                                        <div className='col-2' style={{ width: "120px" }}>
                                                            <img src={`/uploads/${p.images}`} alt={p.title} style={{ width: "120px" }} />
                                                        </div>
                                                        <div className='col-4'>
                                                            <h6>{p.title}</h6><br />
                                                            <h6><span class="WebRupee">&#x20B9;</span> {p.price}</h6>
                                                        </div>
                                                        <div className='col-3'>
                                                            <h6>{o?.Users?.fullname}</h6><br />
                                                        </div>
                                                        <div className='col-3'>
                                                            <h6>{o.status}</h6>
                                                            <p>Order Date: {moment(o.createdAt).add(0, 'days').format('DD-MM-YYYY')}</p>
                                                            <p>Update Date: {moment(o.updatedAt).add(0, 'days').format('DD-MM-YYYY')}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminTransactions