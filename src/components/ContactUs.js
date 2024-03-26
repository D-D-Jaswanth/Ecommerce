import React from 'react'
import Navbar from '../screens/Navbar'
import Footer from './Footer'

function ContactUs() {
    return (
        <>
            <Navbar />
            <div className='contactus'>
                <h3><center>Contact Us</center></h3>
                <div className='container'>
                    <div className='left'>
                        <h4>Web Support</h4>
                        <h6>ADDRESS</h6>
                        <p>Blue Bottle Coffee</p>
                        <p>476 9th St.</p>
                        <p>Oakland, CA 94607</p>
                        <br />
                        <h6>OFFICE PHONE</h6>
                        <p>+91 0000000000</p>
                        <br />
                        <h6>OFFICE EMAIL</h6>
                        <p>officeemail@gmail.com</p>
                    </div>
                    <div className='right'>
                        <h4><center>GET IN TOUCH</center></h4>
                        <form>
                            <div class="mb-3">
                                <label for="name" class="form-label">Name <prefix style={{ color: "red" }}>*</prefix></label>
                                <input type="text" class="form-control" id="name" placeholder="" required />
                            </div>
                            <div class="mb-3">
                                <label for="email" class="form-label">Email <prefix style={{ color: "red" }}>*</prefix></label>
                                <input type="email" class="form-control" id="email" placeholder="" required />
                            </div>
                            <div class="mb-3">
                                <label for="subject" class="form-label">Subject <prefix style={{ color: "red" }}>*</prefix></label>
                                <input type="text" class="form-control" id="subject" placeholder="" required />
                            </div>
                            <div class="mb-3">
                                <label for="message" class="form-label">Message <prefix style={{ color: "red" }}>*</prefix></label>
                                <textarea class="form-control" id="message" rows="3"></textarea>
                            </div>
                            <button className='btn btn-primary'>Get in Touch</button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default ContactUs