import React from 'react'
import Navbar from '../screens/Navbar'
import SectionCarousel from './SectionCarousel'
import Footer from './Footer'
import Section from './Section'
import SectionBrands from './SectionBrands'
import SectionsLaptopBrands from './SectionsLaptopBrands'

function Home() {
    return (
        <>
            <Navbar />
            <SectionCarousel />
            <Section />
            <SectionBrands />
            <SectionsLaptopBrands />
            <Footer />
        </>
    )
}

export default Home