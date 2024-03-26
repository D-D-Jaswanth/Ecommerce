import React, { useState, useContext } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { store } from '../App'

function Login() {

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
        await axios.post('http://localhost:5000/login', data)
            .then(res => {
                setToken(res.data.token)
                localStorage.setItem("users", JSON.stringify(res.data))
                alert('Login Successfully')
            })
            .catch(err => {
                alert(err.response.data)
            })
    }

    if (token) {
        return navigate('/userhomepage')
    }
    
    return (
        <>
            <div className='login-container'>
                <div className='container'>
                    <center><h2>Login</h2></center>
                    <form onSubmit={handleSubmit}>
                        <div class="mb-3">
                            <label for="formGroupExampleInput" class="form-label">Email</label>
                            <input type="email" onChange={handleChange} name='email' class="form-control" id="formGroupExampleInput" placeholder="Email@gmail.com" />
                        </div>
                        <div className='mb-3'>
                            <label for="inputPassword5" class="form-label">Password</label>
                            <input type="password" onChange={handleChange} name='password' id="inputPassword5" class="form-control" placeholder='Enter Password' aria-describedby="passwordHelpBlock" />
                        </div>
                        <button className='btn btn-primary'>Login</button>
                        <p>Don't have an account ? <Link to='/register'>Register</Link></p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login