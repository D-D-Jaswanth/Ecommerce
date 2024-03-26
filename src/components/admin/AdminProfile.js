import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import AdminNavbar from '../../screens/AdminNavbar'
import { useNavigate } from 'react-router-dom'
import { store } from '../../App'

function AdminProfile() {

    const [data, setData] = useState(null)

    const [token, setToken] = useContext(store)

    useEffect(() => {
        axios.get('http://localhost:5000/adminprofile', {
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

    if (!token) {
        navigate('/')
    }

    return (
        <>
            <AdminNavbar />
            <div className='user-profile-container'>
                <div className='container'>
                    <center><h2>Profile</h2></center>
                    {
                        data &&

                        <form>
                            <div class="mb-3">
                                <input type="email" name='email' class="form-control" value={data.email} placeholder="Email@gmail.com" />
                            </div>
                            <div className='mb-3'>
                                <input type="password" name='password' class="form-control" value={data.password} placeholder='Enter Password' aria-describedby="passwordHelpBlock" />
                            </div>
                            <button className='btn btn-primary'>Update Profile</button>
                        </form>

                    }
                </div>
            </div>
        </>
    )
}

export default AdminProfile