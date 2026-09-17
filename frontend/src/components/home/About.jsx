import './About.css'

function About() {
    return (
        <section className="about-section">
            <div className="about-header">
                <p className="about-eyebrow">
                    ABOUT EPOL
                </p>

                <h2>
                    사진은
                    <br />
                    <em>기억을 남기는 일.</em>
                </h2>
            </div>

            <div className="about-content">
                <div className="about-image">
                    <img
                        src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1000&q=85"
                        alt="EPOL Studio portrait"
                    />
                </div>

                <div className="about-copy">
                    <p className="about-lead">
                        가장 자연스러운 모습,
                        <br />
                        오래 남기고 싶은 순간을 담습니다.
                    </p>

                    <p>
                        EPOL STUDIO는 인물의 분위기와 개성을
                        자연스럽게 담아내는 사진 스튜디오입니다.
                    </p>

                    <p>
                        프로필부터 증명사진, 바디프로필,
                        컨셉 사진까지 촬영 목적과 원하는 분위기에
                        맞춰 함께 만들어갑니다.
                    </p>

                    <div className="about-services">
                        <div>
                            <span>01</span>
                            <strong>PORTRAIT</strong>
                            <p>개인의 분위기와 개성을 담은 인물 사진</p>
                        </div>

                        <div>
                            <span>02</span>
                            <strong>PROFILE</strong>
                            <p>프로필과 증명사진을 위한 정돈된 촬영</p>
                        </div>

                        <div>
                            <span>03</span>
                            <strong>CONCEPT</strong>
                            <p>원하는 이미지와 이야기를 담은 컨셉 촬영</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About