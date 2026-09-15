import { useEffect, useState } from 'react'

function Hero() {
    const [featuredPhoto, setFeaturedPhoto] = useState(null)

    useEffect(() => {
        const fetchFeaturedPhoto = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/gallery')
                const result = await response.json()

                if (result.success && result.data.length > 0) {
                    const firstPhoto = result.data[0]

                    setFeaturedPhoto({
                        id: firstPhoto._id,
                        title: firstPhoto.title,
                        category: firstPhoto.category,
                        src: firstPhoto.imageUrl,
                    })
                }
            } catch (error) {
                console.error('Hero gallery fetch error:', error)
            }
        }

        fetchFeaturedPhoto()
    }, [])

    return (
        <section className="hero section">
            <div className="hero-copy">
                <p className="eyebrow">
                    감성적인 순간을 남기는 스튜디오
                </p>

                <h1>
                    기억을 예쁘게 담는
                    <br />
                    Eepol Studio
                </h1>

                <p className="hero-text">
                    웨딩, 가족, 인물, 패션까지 한 공간에서 감각적인 촬영과
                    세심한 보정을 통해 당신의 특별한 순간을 완성합니다.
                </p>

                <div className="cta-row">
                    <a href="#booking" className="primary-btn">
                        예약하기
                    </a>

                    <a href="#gallery" className="secondary-btn">
                        사진보기
                    </a>
                </div>

                <div className="hero-stats">
                    <div>
                        <strong>1,200+</strong>
                        <span>누적 촬영</span>
                    </div>

                    <div>
                        <strong>4.9/5</strong>
                        <span>리뷰 평점</span>
                    </div>

                    <div>
                        <strong>48h</strong>
                        <span>사진 전달</span>
                    </div>
                </div>
            </div>

            <div className="hero-visual">
                {featuredPhoto && (
                    <img
                        src={featuredPhoto.src}
                        alt={featuredPhoto.title}
                    />
                )}

                <div className="floating-card">
                    <span>예약 진행률</span>
                    <strong>92%</strong>
                    <em>이번 주 인기 촬영</em>
                </div>
            </div>
        </section>
    )
}

export default Hero