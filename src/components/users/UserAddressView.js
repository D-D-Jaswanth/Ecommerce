import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import { store } from '../../App';
import { Link } from 'react-router-dom';
import { BACKEND_URL } from '../helper';

function UserAddressView() {

    const [data, setData] = useState(null)

    const [token, setToken] = useContext(store)

    const [address, setAddress] = useState([])

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

    useEffect(() => {
        axios.get(`${BACKEND_URL}/useraddressview`)
            .then((address) => {
                setAddress(address.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const handleDelete = (id) => {
        axios.delete(`${BACKEND_URL}/useraddressview/` + id)
            .then(res => {
                window.location.reload()
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <>
            <p>{address.name}</p>
            {
                address.map((a, i) => (

                    (a?.user?.fullname === data?.fullname) ?

                        <div className='border p-2'>
                            <div className='container'>
                                <div className='row row-cols-25'>
                                    <div className='col-11'>
                                        <h6>{a.addresstype}</h6>
                                        <h6>{a.name} | {a.mobile}</h6>
                                        <h6>{a.address1} {a.address2} - {a.zipcode}</h6>
                                    </div>
                                    <div className='col'>
                                        <Link onClick={(e) => handleDelete(a._id)}>
                                            <span class="material-symbols-outlined">
                                                delete
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                    : null
                ))
            }
        </>
    )
}

export default UserAddressView