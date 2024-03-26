import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

function Register() {
    const [data, setData] = useState({
        fullname: '',
        mobilenumber: '',
        email: '',
        password: '',
        cpassword: ''
    })

    const navigate = useNavigate()

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/register', data)
            .then(response => {
                alert(response.data)
                navigate('/login')
            })
            .catch(err => {
                alert(err.response.data)
            })
    }
    return (
        <>
            <div className='login-container'>
                <div className='container'>
                    <center><h2>Register</h2></center>
                    <form onSubmit={handleSubmit}>
                        <div class="mb-3">
                            <input type="text" name='fullname' onChange={handleChange} class="form-control" placeholder="Enter Full Name" />
                        </div>
                        <div class="mb-3">
                            <input type="number" name='mobilenumber' onChange={handleChange} class="form-control" placeholder="Enter Mobile Number" />
                        </div>
                        <div class="mb-3">
                            <input type="email" name='email' onChange={handleChange} class="form-control" placeholder="Email@gmail.com" />
                        </div>
                        <div className='mb-3'>
                            <input type="password" name='password' onChange={handleChange} class="form-control" placeholder='Enter Password' aria-describedby="passwordHelpBlock" />
                        </div>
                        <div className='mb-3'>
                            <input type="password" name='cpassword' onChange={handleChange} class="form-control" placeholder='Confirm Password' aria-describedby="passwordHelpBlock" />
                        </div>
                        <button className='btn btn-primary'>Register</button>
                        <p>Already have an account ? <Link to='/login'>Login</Link></p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register