import React, { useContext, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { store } from '../../App'
import axios from 'axios'
import { BACKEND_URL } from '../helper'

function AdminLogin() {

    const [token, setToken] = useContext(store)

    const [data, setData] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate()

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post(`${BACKEND_URL}/adminlogin`, data)
            .then(res => {
                setToken(res.data.token)
                localStorage.setItem("admin", JSON.stringify(res.data))
                alert('Login Successfully')
            })
            .catch(err => {
                alert(err.response.data)
            })
    }

    if (token) {
        return navigate('/adminhomepage')
    }

    return (
        <>
            <div className='login-container'>
                <div className='container'>
                    <center><h2>Login</h2></center>
                    <form onSubmit={handleSubmit} autoComplete='off'>
                        <div class="mb-3">
                            <label for="formGroupExampleInput" class="form-label">Email</label>
                            <input type="email" onChange={handleChange} name='email' class="form-control" id="formGroupExampleInput" placeholder="Email@gmail.com" />
                        </div>
                        <div className='mb-3'>
                            <label for="inputPassword5" class="form-label">Password</label>
                            <input type="password" onChange={handleChange} name='password' id="inputPassword5" class="form-control" placeholder='Enter Password' aria-describedby="passwordHelpBlock" />
                        </div>
                        <button className='btn btn-primary'>Login</button>
                        {/* <p>Don't have an account ? <Link to='/adminregister'>Register</Link></p> */}
                    </form>
                </div>
            </div>
        </>
    )
}

export default AdminLogin