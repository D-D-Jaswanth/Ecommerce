import React from 'react'
import Imgs from '../images/s.jpg'
import Imgl from '../images/l.jpg'
import Imgf from '../images/f.jpg'
import ImgSk from '../images/sk.png'
import Imgg from '../images/g.jpeg'
import Imgh from '../images/h.jpg'

function Section() {
    return (
        <>
            <div className='section-category'>
                <h2>Categories</h2>
                <div className='row row-cols-6' style={{marginTop: "10px", paddingLeft: "120px", height: "200px"}}>
                    <div className='row'>
                        <img src={Imgs} />
                    </div>
                    <div className='row'>
                        <img src={Imgl} />
                    </div>
                    <div className='row'>
                        <img src={Imgf} />
                    </div>
                    <div className='row'>
                        <img src={ImgSk} />
                    </div>
                    <div className='row'>
                        <img src={Imgg} />
                    </div>
                    <div className='row'>
                        <img src={Imgh} />
                    </div>
                </div>
                <div className='container'>
                </div>
            </div>
        </>
    )
}

export default Section