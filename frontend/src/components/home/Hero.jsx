import { useEffect, useState } from 'react'
import './Hero.css'

const API_URL = 'http://localhost:3000/api/gallery'

const fallbackImage =
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85'

function Hero() {
    const [heroImages, setHeroImages] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [nextIndex, setNextIndex] = useState(null)
    const [isFading, setIsFading] = useState(false)

    useEffect(() => {
        const loadHeroImages = async () => {
            try {
                const response = await fetch(API_URL)
                const result = await response.json()

                if (!response.ok || !result.success) {
                    throw new Error(
                        result.message ||
                        'Hero 이미지를 불러오지 못했습니다.',
                    )
                }

                const images = result.data
                    .filter((item) => item.isHero)
                    .sort((a, b) => a.order - b.order)

                setHeroImages(images)
            } catch (error) {
                console.error(
                    'Hero image fetch error:',
                    error,
                )
            }
        }

        loadHeroImages()
    }, [])

    useEffect(() => {
        if (heroImages.length <= 1) {
            return
        }

        const interval = setInterval(() => {
            const next =
                (currentIndex + 1) % heroImages.length

            setNextIndex(next)
            setIsFading(true)

            setTimeout(() => {
                setCurrentIndex(next)
                setIsFading(false)
                setNextIndex(null)
            }, 1200)
        }, 4000)

        return () => clearInterval(interval)
    }, [heroImages, currentIndex])

    const currentImage =
        heroImages[currentIndex]?.imageUrl ||
        fallbackImage

    const nextImage =
        nextIndex !== null
            ? heroImages[nextIndex]?.imageUrl
            : currentImage

    return (
        <section className="hero-section">
            <div className="hero-content">
                <p className="hero-eyebrow">
                    EPOL STUDIO
                </p>

                <h1>
                    YOUR MOMENT,
                    <br />
                    <em>YOUR STORY.</em>
                </h1>

                <p className="hero-description">
                    당신의 가장 자연스러운 순간을
                    <br />
                    오래 기억할 수 있는 사진으로 담아냅니다.
                </p>

                <a
                    href="#booking"
                    className="hero-button"
                >
                    예약 문의
                    <span>→</span>
                </a>
            </div>

            <div className="hero-image">
                <div className="hero-image-frame">
                    <img
                        className="hero-image-current"
                        src={currentImage}
                        alt="EPOL Studio portrait"
                    />

                    <img
                        className={`hero-image-next ${isFading ? 'is-visible' : ''
                            }`}
                        src={nextImage}
                        alt=""
                    />
                </div>

                <div className="hero-caption">
                    <span>PORTRAIT</span>
                    <span>EPOL STUDIO</span>
                </div>
            </div>
        </section>
    )
}

export default Hero