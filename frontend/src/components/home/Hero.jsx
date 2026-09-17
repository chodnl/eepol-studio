import './Hero.css'

function Hero() {
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
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85"
                        alt="EPOL Studio portrait"
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