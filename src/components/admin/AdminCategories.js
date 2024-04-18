import React, { useState, useEffect } from 'react'
import AdminNavbar from '../../screens/AdminNavbar'
import axios from 'axios'
import { Link } from 'react-router-dom'

function AdminCategories() {

    const [categories, setCategories] = useState({
        category: ''
    })

    const [cat, setCat] = useState([])

    const [search, setSearch] = useState('')

    const handleChange = (e) => {
        setCategories({ ...categories, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(categories)
        await axios.post(`${BACKEND_URL}/admincategories`, categories)
            .then(res => {
                alert(res.data)
                window.location.reload()
            })
            .catch(err => {
                console.log(err)
            })
    }
    
    const handleDelete = (id) => {
        axios.delete(`${BACKEND_URL}/admincategories/` + id)
            .then(res => {
                window.location.reload()
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        axios.get(`${BACKEND_URL}/admincategories`)
            .then(cat => {
                setCat(cat.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <>
            <AdminNavbar />
            <div className='admin-categories'>
                <center><h4>Categories</h4></center>
                <div className='container'>

                    <div className='row row-cols-2'>
                        <div className='col-11'>
                            <form className='searchform w-100' role='Search'>
                                <input class="form-control border" type="search" onChange={(e) => setSearch(e.target.value)} placeholder="Search" />
                            </form>
                        </div>
                        <div className='col-1'>
                            <button type="button" class="btn btn-primary w-100 h-100" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                Add
                            </button>
                        </div>
                    </div>

                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="exampleModalLabel">Add Category</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <form onSubmit={handleSubmit} autoComplete='off'>
                                        <div class="row">
                                            <div class="col">
                                                <input type="text" onChange={handleChange} name='category' class="form-control" placeholder="category" aria-label="category" />
                                            </div>
                                        </div>
                                        <button className='btn btn-primary'>Submit</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Category</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cat?.filter(c => {
                                    return search.toLowerCase() === ''
                                        ? c
                                        : c.category.toLowerCase().includes(search);
                                }).map((c, i) => (
                                    <tr>
                                        <th scope="row">{i + 1}</th>
                                        <td>{c.category}</td>
                                        <td>
                                            <Link className='btn btn-danger' onClick={() => handleDelete(c._id)}>Delete</Link>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>

                </div>

            </div>
        </>
    )
}

export default AdminCategories