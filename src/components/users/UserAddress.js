import React, { useState, useEffect, useContext } from 'react'
import UserNavbar from '../../screens/UserNavbar'
import axios from 'axios'
import { store } from '../../App'
import { Link, useNavigate } from 'react-router-dom'
import UserAddressView from './UserAddressView'
import { BACKEND_URL } from '../helper'

function UserAddress() {

  const [address, setAddress] = useState({
    name: '',
    mobile: '',
    address1: '',
    city: '',
    state: '',
    zipcode: '',
    addresstype: ''
  })

  const [data, setData] = useState(null)

  const [token, setToken] = useContext(store)

  useEffect(() => {
    axios.get(`${BACKEND_URL}/useraddress`, {
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


  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${BACKEND_URL}/useraddress`, { address, data })
      alert('Your Address is Added Successfully')
      window.location.reload()
    }
    catch (err) {
      console.log(err)
    }
  }

  if (!token) {
    navigate('/')
  }

  return (
    <>
      <UserNavbar />
      <div className='user-address-container'>
        <div className='container-fluid'>
          <div className='row row-cols-2'>
            <div class="card col-6 col-md-5">
              <h5>New Address</h5>
              <form className='row p-2' onSubmit={handleSubmit} autoComplete='off'>
                <div class="col-md-6 pb-2">
                  <label for="Name" class="form-label">Name</label>
                  <input type="text" name='name' onChange={handleChange} placeholder='Name' class="form-control" id="Name" />
                </div>
                <div class="col-md-6 pb-2">
                  <label for="mobile" class="form-label">Mobile Number</label>
                  <input type="number" name='mobile' onChange={handleChange} placeholder='10-digit mobile number' class="form-control" id="mobile" />
                </div>
                <div class="col-12 pb-2">
                  <label for="inputAddress" class="form-label">Address</label>
                  <input type="text" name='address1' onChange={handleChange} class="form-control" id="inputAddress" placeholder="1234 Main St" />
                </div>
                <div class="col-md-6 pb-2">
                  <label for="inputCity" class="form-label">City</label>
                  <input type="text" name='city' onChange={handleChange} placeholder='City' class="form-control" id="inputCity" />
                </div>
                <div class="col-md-6 pb-2">
                  <label for="inputState" class="form-label">State</label>
                  <select id="inputState" name='state' onChange={handleChange} class="form-select">
                    <option selected>Choose State</option>
                    <option value='Andhra Pradesh'>Andhra Pradesh</option>
                    <option value='Telangana'>Telangana</option>
                  </select>
                </div>
                <div class="col-md-6 pb-2">
                  <label for="inputZip" class="form-label">Zip</label>
                  <input type="number" name='zipcode' placeholder='zipcode' onChange={handleChange} class="form-control" id="inputZip" />
                </div>
                <div class="col-md-6 pb-2">
                  <label for="inputState" class="form-label">Address Type</label>
                  <select id="inputState" name='addresstype' onChange={handleChange} class="form-select">
                    <option selected>Choose Type</option>
                    <option value='Home'>Home</option>
                    <option value='Office'>Office</option>
                  </select>
                </div>
                <div className='col-md-12'>
                  <button type="submit" class="btn btn-primary w-100">Add</button>
                </div>
              </form>
            </div>
            <div class="col-md-7">
              <div className='card p-3'>
                <div className='container'>
                  <h5>Manage Address</h5>
                  <UserAddressView />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserAddress