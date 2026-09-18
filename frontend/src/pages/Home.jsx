import './Home.css'

import { useEffect, useState } from 'react'

import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

import Hero from '../components/home/Hero'
import About from '../components/home/About'
import Gallery from '../components/gallery/Gallery'
import Pricing from '../components/pricing/Pricing'
import Booking from '../components/booking/Booking'
import Location from '../components/location/Location'
import NoticePopup from '../components/notice/NoticePopup'

function Home() {
    const [popupNotice, setPopupNotice] = useState(null)

    useEffect(() => {
        const hash = window.location.hash

        if (hash) {
            const element = document.querySelector(hash)

            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({
                        behavior: 'smooth',
                    })
                }, 0)
            }
        }
    }, [])

    useEffect(() => {
        const fetchPopupNotice = async () => {
            try {
                const response = await fetch(
                    'http://localhost:3000/api/notice'
                )

                const result = await response.json()

                if (!response.ok || !result.success) {
                    throw new Error(
                        result.message || '공지사항을 불러오지 못했습니다.'
                    )
                }

                const notice = (result.data || []).find(
                    (item) => item.isPopup
                )

                if (!notice) {
                    return
                }

                const hiddenDate = localStorage.getItem(
                    `eepolNoticePopupHidden_${notice._id}`
                )

                const today = new Date()
                    .toISOString()
                    .split('T')[0]

                if (hiddenDate === today) {
                    return
                }

                setPopupNotice(notice)
            } catch (error) {
                console.error(
                    'Popup notice fetch error:',
                    error
                )
            }
        }

        fetchPopupNotice()
    }, [])

    const handleClosePopup = () => {
        setPopupNotice(null)
    }

    const handleHidePopupToday = () => {
        if (!popupNotice) {
            return
        }

        const today = new Date()
            .toISOString()
            .split('T')[0]

        localStorage.setItem(
            `eepolNoticePopupHidden_${popupNotice._id}`,
            today
        )

        setPopupNotice(null)
    }


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

            <NoticePopup
                notice={popupNotice}
                onClose={handleClosePopup}
                onHideToday={handleHidePopupToday}
            />
        </div>
    )
}

export default Home
