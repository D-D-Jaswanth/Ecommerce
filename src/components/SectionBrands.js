import React from 'react'
import ImgI from '../images/apple.png'
import ImgOne from '../images/oneplus.png'
import ImgS from '../images/samsung.png'
import ImgM from '../images/moto.jpg'
import ImgN from '../images/nokia.png'
import ImgG from '../images/google.png'

function SectionBrands() {
    return (
        <>
            <div className='section-brands'>
                <center><h2>Top Brands in Smart Phones</h2></center>
                <div className='container'>
                    <div className='row row-col-6'>
                        <div class="col">
                            <img src={ImgI} />
                        </div>
                        <div class="col">
                            <img src={ImgOne} />
                        </div>
                        <div class='col'>
                            <img src={ImgS} />
                        </div>
                        <div class="col">
                            <img src={ImgM} />
                        </div>
                        <div class="col">
                            <img src={ImgN} />
                        </div>
                        <div class="col">
                            <img src={ImgG} />
                        </div>
                    </div>
                </div>
            </div>

            {/* <section class="pt-5 pb-5">
                <div class="container">
                    <div class="row" style={{ background: "red" }}>
                        <div class="col-6">
                            <h2 class="mb-6">Top Brands in Smart Phones </h2>
                        </div>
                        <div class="col-6 text-right">
                            <Link class="btn btn-primary mb-3 mr-2" href="#carouselExampleIndicators2" role="button" data-slide="prev">
                                <span class="material-symbols-outlined">
                                    chevron_left
                                </span>
                            </Link>
                            <Link class="btn btn-primary mb-3 " href="#carouselExampleIndicators2" role="button" data-slide="next">
                                <span class="material-symbols-outlined">
                                    chevron_right
                                </span>
                            </Link>
                        </div>
                        <div class="col-12">
                            <div id="carouselExampleIndicators2" class="carousel slide" data-ride="carousel">

                                <div class="carousel-inner">
                                    <div class="carousel-item active">
                                        <div class="row">

                                            <div class="col-md-2 mb-3">
                                                <img class="img-fluid" style={{ background: "#fff", height: "100%", borderRadius: "50%" }} src={ImgI} />
                                            </div>
                                            <div class="col-md-2 mb-3">
                                                <img class="img-fluid" style={{ background: "#fff", height: "100%", borderRadius: "50%" }} src={ImgOne} />
                                            </div>
                                            <div class="col-md-2 mb-3">
                                                <img class="img-fluid" style={{ background: "#fff", height: "100%", borderRadius: "50%" }} src={ImgS} />
                                            </div>
                                            <div class="col-md-2 mb-3">
                                                <img class="img-fluid" style={{ background: "#fff", height: "100%", borderRadius: "50%" }} src={ImgM} />
                                            </div>

                                            <div class="col-md-2 mb-3">
                                                <img class="img-fluid" style={{ background: "#fff", height: "100%", borderRadius: "50%" }} src={ImgN} />
                                            </div>
                                            <div class="col-md-2 mb-3">
                                                <img class="img-fluid" style={{ background: "#fff", height: "100%", borderRadius: "50%" }} src={ImgG} />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="carousel-item">
                                        <div class="row">

                                            <div class="col-md-2 mb-3">
                                                <img class="img-fluid" style={{ background: "#fff", height: "100%", borderRadius: "50%" }} src={ImgI} />
                                            </div>
                                            <div class="col-md-2 mb-3">
                                                <img class="img-fluid" style={{ background: "#fff", height: "100%", borderRadius: "50%" }} src={ImgOne} />
                                            </div>
                                            <div class="col-md-2 mb-3">
                                                <img class="img-fluid" style={{ background: "#fff", height: "100%", borderRadius: "50%" }} src={ImgS} />
                                            </div>
                                            <div class="col-md-2 mb-3">
                                                <img class="img-fluid" style={{ background: "#fff", height: "100%", borderRadius: "50%" }} src={ImgM} />
                                            </div>

                                            <div class="col-md-2 mb-3">
                                                <img class="img-fluid" style={{ background: "#fff", height: "100%", borderRadius: "50%" }} src={ImgN} />
                                            </div>
                                            <div class="col-md-2 mb-3">
                                                <img class="img-fluid" style={{ background: "#fff", height: "100%", borderRadius: "50%" }} src={ImgG} />
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}
        </>
    )
}

export default SectionBrands