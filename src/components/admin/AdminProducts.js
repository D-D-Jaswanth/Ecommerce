import React, { useState, useEffect } from 'react'
import AdminNavbar from '../../screens/AdminNavbar'
import { Link } from 'react-router-dom'
import axios from 'axios'

function AdminProducts() {

  const [products, setProducts] = useState([])

  const [search, setSearch] = useState('')

  useEffect(() => {
    axios.get('http://localhost:5000/adminproducts')
      .then(products => {
        setProducts(products.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <>
      <AdminNavbar />
      <div className='admin-products-container p-1'>
        <center><h4>Products</h4></center>
        <div className='container-fluid p-2'>
          <form className='searchform w-100 mb-2' role='Search'>
            <input class="form-control border" type="search" onChange={(e) => setSearch(e.target.value)} placeholder="Search" />
          </form>
          <Link className='btn btn-primary link p-2 w-100' to='/adminaddproducts'>Add Product</Link>
          {/* <div class="container text-center mt-3"> */}
          <div class="row row-cols-2 p-1">
            {
              products?.filter(p => {
                return search.toLowerCase() === ''
                ? p
                : p.title.toLowerCase().includes(search);
              }).map((p, i) => (
                <div class="col">
                  <div class="card mb-3 p-1" style={{ height: "250px" }}>
                    <div class="row g-0 align-center h-100">
                      <div class="col-md-5 h-100">
                        <img style={{ height: "100%" }} src={`/uploads/${p.images}`} class="img-fluid rounded-start" alt="..." />
                      </div>
                      <div class="col-md-7">
                        <div class="card-body">
                          <h4 class="card-title">{p.title.substring(0, 30)}...</h4>
                          <h5 class="card-text"><span class="WebRupee">&#x20B9;</span> {p.price}</h5>
                          <p class="card-text"><small class="text-body-secondary">{p.description.substring(0, 100)}...</small></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
          {/* </div> */}
          {/* <div className='row row-cols-1 row-cols-md-2 g-2'>

            {
              products.map((p, i) => (

                <div className='col'>
                  <div class="card" style={{ background: "red", height: "250px" }}>
                    <div className='row' style={{ background: "violet", display: "flex", flexDirection: "row", gap: "10px" }}>
                      <img src={`/uploads/${p.images}`} class="img-fluid rounded-start" alt={p.title} />
                      
                      <div class="card-body">
                        <h5><Link style={{ textDecoration: "none" }} class="card-title">{p.title.substring(0, 30)}...</Link></h5>
                        <p class="card-text">rating: {p.rating} / 5</p>
                        <h4 class="card-text"><span class="WebRupee">&#x20B9;</span> {p.price}</h4>
                        <p class="card-text" style={{ color: "red", fontSize: "17px" }}>- {p.discountPercentage} % Off</p>
                      </div>
                    </div>
                  </div>
                </div>

              ))
            }

          </div> */}
        </div>
      </div>
    </>
  )
}

export default AdminProducts