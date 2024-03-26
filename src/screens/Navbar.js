import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
    const style = {
        padding: "1% 1%"
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
                            <Link to='/' className="nav-link active" aria-current="page">Home</Link>
                        </div>
                        <form className='searchform' role='Search'>
                            <input class="form-control me-1" type="search" placeholder="Search" />
                            {/* <button class="btn btn-primary" type="submit">Search</button> */}
                        </form>
                        <div className='navbar-nav right'>
                            <Link to='/login' className="nav-link link">
                                <span class="material-symbols-outlined">
                                    account_circle
                                </span>
                                <p>Login</p>
                            </Link>
                            <Link to='/adminlogin' className="nav-link link">Admin</Link>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar