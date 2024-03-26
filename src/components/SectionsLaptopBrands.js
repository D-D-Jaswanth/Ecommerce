import React from 'react'
import ImgI from '../images/apple.png'
import Dell from '../images/dell.jpg'
import razer from '../images/razer.png'
import Hp from '../images/hp.png'
import Acer from '../images/acer.png'
import ImgL from '../images/lenovo.png'

function SectionsLaptopBrands() {
  return (
    <>
    <div className='section-brands'>
                <center><h2>Top Brands in Laptops</h2></center>
                <div className='container'>
                    <div className='row row-col-6'>
                        <div class="col">
                            <img src={ImgI} />
                        </div>
                        <div class="col">
                            <img src={Dell} />
                        </div>
                        <div class='col'>
                            <img src={razer} />
                        </div>
                        <div class="col">
                            <img src={Hp} />
                        </div>
                        <div class="col">
                            <img src={Acer} />
                        </div>
                        <div class="col">
                            <img src={ImgL} />
                        </div>
                    </div>
                </div>
            </div>
    </>
  )
}

export default SectionsLaptopBrands