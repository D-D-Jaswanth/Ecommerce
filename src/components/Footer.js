import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <>
            <footer>
                <button>Back to top</button>
                <div className='footer'>

                    <div className='container'>
                        <div className='get'>
                            <h5>Get to Know Us</h5>
                            <Link className='link' to='/aboutus'>About Us</Link>
                        </div>
                        <div className='connect'>
                            <h5>Connect with Us</h5>
                            <Link className='link'>Facebook</Link>
                        </div>
                        <div className='help'>
                            <h5>Let Us Help You</h5>
                            <Link className='link'>Help</Link>
                            <Link className='link' to='/contactus'>Contact Us</Link>
                        </div>
                    </div>

                </div>
                <div className='footer-middle'>
                    <center><h5>Ecommerce</h5></center>
                </div>
                <div className='footer-bottom'>
                    <center>
                        <Link className='link'>Privacy Notice</Link>
                        |
                        <Link className='link'>Conditions of Use</Link>
                    </center>
                    <center>
                        <p>&copy; 2024 All rights reserved</p>
                    </center>
                </div>
            </footer>
        </>
    )
}

export default Footer