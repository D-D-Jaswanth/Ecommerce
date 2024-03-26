import React from 'react'
import ImgSmartPhone from '../images/smartphones.jpg'
import ImgLaptop from '../images/laptops.jpeg'
import ImgFragrances from '../images/fragrances.jpg'
import ImgSkinCare from '../images/skincare.jpg'
import ImgGroceries from '../images/groceries.jpg'
import ImgHomeDecoration from '../images/homedecoration.jpg'

function SectionCarousel() {
    return (
        <>
            <div id="carouselExample" class="carousel slide">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src={ImgSmartPhone} class="d-block w-100" />
                        <div class="carousel-caption d-none d-md-block">
                            <h3>Smart Phones</h3>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <img src={ImgLaptop} class="d-block w-100" />
                        <div class="carousel-caption d-none d-md-block">
                            <h3>Laptops</h3>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <img src={ImgFragrances} class="d-block w-100" />
                        <div class="carousel-caption d-none d-md-block">
                            <h3>Fragrances</h3>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <img src={ImgSkinCare} class="d-block w-100" />
                        <div class="carousel-caption d-none d-md-block">
                            <h3>Skincares</h3>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <img src={ImgGroceries} class="d-block w-100" />
                        <div class="carousel-caption d-none d-md-block">
                            <h3>Groceries</h3>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <img src={ImgHomeDecoration} class="d-block w-100" />
                        <div class="carousel-caption d-none d-md-block">
                            <h3>Home Decoration</h3>
                        </div>
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        </>
    )
}

export default SectionCarousel