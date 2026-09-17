import './Home.css'

import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

import Hero from '../components/home/Hero'
import About from '../components/home/About'
import Gallery from '../components/gallery/Gallery'
import Pricing from '../components/pricing/Pricing'
import Booking from '../components/booking/Booking'
import Location from '../components/location/Location'

function Home() {
    return (
        <div className="app-shell">
            <Header />

            <main>
                <section id="hero">
                    <Hero />
                </section>

                <section id="about">
                    <About />
                </section>

                <section id="gallery">
                    <Gallery />
                </section>

                <section id="pricing">
                    <Pricing />
                </section>

                <section id="booking">
                    <Booking />
                </section>

                <section id="location">
                    <Location />
                </section>
            </main>

            <Footer />
        </div>
    )
}

export default Home