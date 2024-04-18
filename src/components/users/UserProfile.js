import React, { useState, useContext, useEffect } from 'react'
import UserNavbar from '../../screens/UserNavbar'
import { store } from '../../App'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import DefaultImg from '../../images/default.png'
import { BACKEND_URL } from '../helper'

function UserProfile() {

    const [data, setData] = useState(null)

    const [token, setToken] = useContext(store)

    useEffect(() => {
        axios.get(`${BACKEND_URL}/userprofile`, {
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

    const navigate = useNavigate()

    const handleClick = () => {
        setToken(null)
        localStorage.removeItem('users')
    }

    if (!token) {
        navigate('/')
    }

    return (
        <>
            <UserNavbar />
            <div className='user-profile-container'>
                <div className='container-fluid p-0'>
                    <div class="row w-100">
                        <div class="col-6 col-md-3">
                            <div className='card mb-3'>
                                <div className='row row-cols-2'>
                                    <div className='col-4'>
                                        <img className='w-100 rounded-circle' src={DefaultImg} />
                                    </div>
                                    <div className='col-8'>
                                        <p>Hello,</p>
                                        {
                                            data &&
                                            <h6>{data?.fullname}</h6>
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className='card'>
                                <div className='row m-0 w-100'>
                                    <div className='col-11 p-2 w-100' style={{ borderBottom: "1px solid #ccc" }}>
                                        <Link className='text-decoration-none m-0' to='/userorders'>
                                            <div className='row row-cols-2 pt-3'>
                                                <div className='col-2'>
                                                    <span class="material-symbols-outlined d-flex align-items-center">orders</span>
                                                </div>
                                                <div className='col-10'>
                                                    <p className=''>MY ORDERS</p>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className='col-11 p-2 w-100' style={{ borderBottom: "1px solid #ccc" }}>
                                        <div className='row row-cols-2 pt-3'>
                                            <div className='col-2'>
                                                <span class="material-symbols-outlined person-icon">person</span>
                                            </div>
                                            <div className='col-10'>
                                                <p>Account Information</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-11 p-2 w-100' style={{ borderBottom: "1px solid #ccc" }}>
                                        <Link className='text-decoration-none m-0' to='/userprofile'>
                                            <div className='row row-cols-2 pt-3'>
                                                <div className='col-2'>
                                                    <span class="material-symbols-outlined d-flex align-items-center">account_circle</span>
                                                </div>
                                                <div className='col-10'>
                                                    <p className='text'>Profile Information</p>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className='col-11 p-2 w-100' style={{ borderBottom: "1px solid #ccc" }}>
                                        <Link className='text-decoration-none m-0' to='/useraddress'>
                                            <div className='row row-cols-2 pt-3'>
                                                <div className='col-2'>
                                                    <span class="material-symbols-outlined d-flex align-items-center">account_circle</span>
                                                </div>
                                                <div className='col-10'>
                                                    <p className='text'>Manage Address</p>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className='col-11 p-2 w-100' style={{ borderBottom: "1px solid #ccc" }}>
                                        <div className='row row-cols-2 pt-3'>
                                            <div className='col-2'>
                                                <span class="material-symbols-outlined person-icon">folder_shared</span>
                                            </div>
                                            <div className='col-10'>
                                                <p>MY STUFF</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-11 p-2 w-100' style={{ borderBottom: "1px solid #ccc" }}>
                                        <Link className='text-decoration-none m-0' to='/userwishlist'>
                                            <div className='row row-cols-2 pt-3'>
                                                <div className='col-2'>
                                                    <span class="material-symbols-outlined d-flex align-items-center">favorite</span>
                                                </div>
                                                <div className='col-10'>
                                                    <p className='text'>My Wishlist</p>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className='col-11 p-2 w-100' style={{ borderBottom: "1px solid #ccc" }}>
                                        <Link className='text-decoration-none m-0' onClick={handleClick} to=''>
                                            <div className='row row-cols-2 pt-3'>
                                                <div className='col-2'>
                                                    <span class="material-symbols-outlined d-flex align-items-center">logout</span>
                                                </div>
                                                <div className='col-10'>
                                                    <p className='text'>Log Out</p>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-9">
                            <div className='card'>
                                <div className='row row-cols-2 p-2'>
                                    <div className='col-11'>
                                        <h5>Personal Information</h5>
                                    </div>
                                    {/* <div className='col-1'>
                                        <Link>Edit</Link>
                                    </div> */}
                                </div>
                                <div className='row p-2'>
                                    <div class="mb-3">
                                        <h5>Fullname</h5>
                                        <input type="text" style={{ height: "50px" }} value={data?.fullname} class="form-control" id="fullname" placeholder="Full name" readOnly />
                                    </div>
                                    <div className='row row-cols-3'>
                                        <div className='col-2'>
                                            <p>Your Gender</p>
                                        </div>
                                        <div className='col-2'>
                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" readOnly disabled />
                                                <label class="form-check-label" for="inlineCheckbox1">Male</label>
                                            </div>
                                        </div>
                                        <div className='col-2'>
                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" readOnly disabled />
                                                <label class="form-check-label" for="inlineCheckbox2">Female</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="mb-3">
                                        <h5>Email Address</h5>
                                        <input type="email" style={{ height: "50px" }} value={data?.email} class="form-control" id="fullname" placeholder="Email" readOnly />
                                    </div>
                                    <div class="mb-3">
                                        <h5>Mobile Number</h5>
                                        <input type="number" style={{ height: "50px" }} value={data?.mobilenumber} class="form-control" id="fullname" placeholder="Mobile Number" readOnly />
                                    </div>
                                    <div class="mb-3">
                                        <h5>Password</h5>
                                        <input type="password" style={{ height: "50px" }} value={data?.password} class="form-control" id="fullname" placeholder="Password" readOnly />
                                    </div>
                                </div>
                                <div className='row p-2'>
                                    <h5>FAQs</h5>
                                    <h6>What happens when I update my email address (or mobile number)?</h6>
                                    <p>Your login email id (or mobile number) changes, likewise. You'll receive all your account related communication on your updated email address (or mobile number).</p> <br />
                                    <h6>What happens to my existing Ecommerce account when I update my email address (or mobile number)?</h6>
                                    <p>Updating your email address (or mobile number) doesn't invalidate your account. Your account remains fully functional. You'll continue seeing your Order history, saved information and personal details.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default UserProfile