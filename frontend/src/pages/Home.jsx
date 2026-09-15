import './Home.css'

import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

import Hero from '../components/home/Hero'
import Gallery from '../components/gallery/Gallery'
import About from '../components/home/About'
import Pricing from '../components/pricing/Pricing'
import Booking from '../components/booking/Booking'
import Location from '../components/location/Location'

function Home() {
    return (
        <div className="app-shell">
            <Header />

            <main>
                <Hero />
                <Gallery />
                <About />
                <Pricing />
                <Booking />
                <Location />
            </main>

            <Footer />
        </div>
    )
}

export default Home