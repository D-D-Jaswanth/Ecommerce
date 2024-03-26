import React, { useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { store } from '../App'

function AdminNavbar() {

    const [token, setToken] = useContext(store)

    const style = {
        padding: "1% 1%"
    }

    const navigate = useNavigate()

    const handleClick = () => {
        setToken(null)
        localStorage.removeItem('admin')
    }

    if (!token) {
        navigate('/')
    }
    
    return (
        <>
            <nav style={style} class="navbar navbar-expand-lg bg-body-tertiary bg-dark border-bottom border-body" data-bs-theme="dark">
                <div class="container-fluid">
                    <Link className="navbar-brand">Ecommerce</Link>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div class="navbar-nav">
                            <Link to='/adminhomepage' className="nav-link active" aria-current="page">Home</Link>
                            <Link to='/adminprofile' className="nav-link" aria-current="page">Profile</Link>
                            <Link to='/admincategories' className="nav-link" aria-current="page">Categories</Link>
                            <Link to='/adminproducts' className="nav-link" aria-current="page">Products</Link>
                        </div>
                        {/* <form className='searchform' role='Search'>
                            <input class="form-control me-1" type="search" placeholder="Search" />
                            <button class="btn btn-primary" type="submit">Search</button>
                        </form> */}
                        <div className='navbar-nav right'>
                            <Link to='/admintrans' className="nav-link">Orders</Link>
                            <Link className="nav-link" onClick={handleClick}>Logout</Link>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default AdminNavbar