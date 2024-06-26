import React from 'react'
import Navbar from '../screens/Navbar'
import ImgEcommerce from '../images/ecommerce.jpg'
import Footer from './Footer'

function AboutUs() {
    return (
        <>
            <Navbar />
            <div className='aboutus'>
                <h3><center>About Us</center></h3>
                <div className='container'>
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and scrambled it to make a type
                        specimen book. It has survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged. It was popularised in
                        the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                        and more recently with desktop publishing software like Aldus PageMaker
                        including versions of Lorem Ipsum.
                    </p>
                    <img src={ImgEcommerce} />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default AboutUs