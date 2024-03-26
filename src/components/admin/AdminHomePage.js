import React, { useState, useEffect, useContext } from 'react'
import AdminNavbar from '../../screens/AdminNavbar'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Checkbox } from 'antd'
import { Radio } from 'antd'
import { Price } from '../users/Price'
import { store } from '../../App'
import { useNavigate } from 'react-router-dom'

function AdminHomePage() {

    const [products, setProducts] = useState([])

    const [cat, setCat] = useState([])

    const [checked, setChecked] = useState([])
    const [radio, setRadio] = useState([])

    const [data, setData] = useState(null)

    const [token, setToken] = useContext(store)

    const [search, setSearch] = useState('')

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

    useEffect(() => {
        if (!checked.length || !radio.length) {
            axios.get('http://localhost:5000/adminhomepage')
                .then(products => {
                    setProducts(products.data)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }, [checked.length, radio.length])

    useEffect(() => {
        axios.get('http://localhost:5000/admincategories')
            .then(cat => {
                setCat(cat.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

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
            const { data } = await axios.post('http://localhost:5000/adminhomepage', { checked, radio })
            setProducts(data?.products)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <AdminNavbar />
            <div className='admin-homepage'>
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
                        <div class="col-md-10">
                            <h2>Filter By Results : </h2>
                            <div className='container text-center'>
                                <div className='row row-cols-1 row-cols-md-4 g-2'>
                                    <form className='searchform w-100 mb-2' role='Search'>
                                        <input class="form-control border" type="search" onChange={(e) => setSearch(e.target.value)} placeholder="Search" />
                                    </form>

                                    {
                                        products?.filter(p => {
                                            return search.toLowerCase() === ''
                                                ? p
                                                : p.title.toLowerCase().includes(search);
                                        }).map((p, i) => (
                                            <div className='col'>
                                                <div class="card h-100">
                                                    <img src={`/uploads/${p.images}`} class="card-img-top" alt={p.title} style={{ height: "250px" }} />
                                                    <div class="card-body" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                                                        <h5 class="card-title">{p.title.substring(0, 30)}...</h5>
                                                        <h6 class="card-text"><span class="WebRupee">&#x20B9;</span> {p.price}</h6>
                                                    </div>
                                                </div>
                                            </div>

                                        ))
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className='admin-homepage'>
                <div className='admin-homepage-category'>
                    <h4>Filter By Categories :</h4>
                    {
                        cat.map((c, i) => (
                            <div style={{ display: "flex" }}>
                                <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c.category)}>{c.category}</Checkbox>
                            </div>
                        ))
                    }
                    <br />

                    <h4>Filter By Price : </h4>
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
                <div className='admin-homepage-products'>
                    <h2>Filter By Results : </h2>
                    <div className='container text-center'>
                        <div className='row row-cols-1 row-cols-md-4 g-2'>

                            {
                                products.map((p, i) => (
                                    <div className='col'>
                                        <div class="card h-100">
                                            <img src={`/uploads/${p.images}`} class="card-img-top" alt={p.title} style={{ height: "250px" }} />
                                            <div class="card-body" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                                                <h5 class="card-title">{p.title.substring(0, 30)}...</h5>
                                                <h6 class="card-text"><span class="WebRupee">&#x20B9;</span> {p.price}</h6>
                                            </div>
                                        </div>
                                    </div>

                                ))
                            }

                        </div>
                    </div>
                </div>
            </div> */}
        </>
    )
}

export default AdminHomePage