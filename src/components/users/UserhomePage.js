import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import UserNavbar from '../../screens/UserNavbar'
import { store } from '../../App'
import { useNavigate, Link } from 'react-router-dom'
import { useCart } from '../../context/cart'
import Checkbox from 'antd/es/checkbox/Checkbox'
import { Price } from './Price'
import { Radio } from 'antd'
import { BACKEND_URL } from '../helper'

function UserhomePage() {

    const [data, setData] = useState(null)

    const [token, setToken] = useContext(store)

    const [products, setProducts] = useState([])

    const [cat, setCat] = useState([])

    const [cart, setCart] = useCart()

    const [checked, setChecked] = useState([])
    const [radio, setRadio] = useState([])


    useEffect(() => {
        if (!checked.length || !radio.length) {
            axios.get(`${BACKEND_URL}/userhomepage`)
                .then(products => {
                    setProducts(products.data)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }, [checked.length, radio.length])

    useEffect(() => {
        axios.get(`${BACKEND_URL}/admincategories`)
            .then(cat => {
                setCat(cat.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    useEffect(() => {
        axios.get(`${BACKEND_URL}/userhomepage`, {
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

    const handleFilter = (value, category) => {
        let all = [...checked]
        if (value) {
            all.push(category)
        }
        else {
            all = all.filter(c => c !== category)
        }
        setChecked(all)
    }

    useEffect(() => {
        if (checked.length || radio.length) filterProduct()
    }, [checked, radio])

    const filterProduct = async () => {
        try {
            const { data } = await axios.post(`${BACKEND_URL}/userhomepage`, { checked, radio })
            setProducts(data?.products)
        } catch (error) {
            console.log(error)
        }
    }

    if (!token) {
        navigate('/login')
    }

    return (
        <>
            <UserNavbar />
            <div className='user-homepage'>
                <div className='container-fluid p-0'>
                    <div class="row p-3 w-100">
                        <div class="col-6 col-md-2">

                            <h5>Filter By Categories</h5>
                            {
                                cat.map((c, i) => (
                                    <div style={{ display: "flex" }}>
                                        <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c.category)}>{c.category}</Checkbox>
                                    </div>
                                ))
                            }
                            <br />
                            <h5>Filter By Price</h5>
                            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                                {
                                    Price.map((p, i) => (
                                        <div key={p._id} style={{ display: "flex" }}>
                                            <Radio value={p.array}>{p.name}</Radio>
                                        </div>
                                    ))
                                }
                                <br />

                            </Radio.Group>

                            <h4>Reset Filters : </h4>
                            <button onClick={() => window.location.reload()} className='btn btn-primary'>Reset Filters</button>
                        </div>
                        <div className='col-md-10'>

                            <h2>Filter By Results :</h2>
                            <div className='container text-center'>
                                <div className='row row-cols-1 row-cols-md-4 g-2'>

                                    {
                                        products.map((p, i) => (
                                            <div className='col'>
                                                <Link class="card h-100" to={`/userproductdetails/${p._id}`} style={{ textDecoration: "none" }}>
                                                    <img src={`/uploads/${p.images}`} class="card-img-top" alt={p.title} style={{ height: "250px" }} />
                                                    <div class="card-body" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                                                        <h5 class="card-title">{p.title.substring(0, 30)}...</h5>
                                                        <p class="card-text"><span class="WebRupee">&#x20B9;</span> {p.price}</p>
                                                        <Link className='btn btn-primary'
                                                            onClick={() => {
                                                                setCart([...cart, p])
                                                                alert('Item Added to Cart Successfully')
                                                                localStorage.setItem('cart', JSON.stringify([...cart, p]))
                                                            }}>
                                                            Add to Cart
                                                        </Link>
                                                    </div>
                                                </Link>
                                            </div>

                                        ))
                                    }

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                {/* <div className='user-homepage-products'>
                </div > */}
            </div >
        </>
    )
}

export default UserhomePage