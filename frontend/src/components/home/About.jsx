function About() {
    return (
        <section className="section about-section" id="about">
            <div className="section-header left-align">
                <p className="eyebrow">about</p>

                <h2>
                    사진 한 장보다
                    <br />
                    오래 남는 순간을 만듭니다.
                </h2>
            </div>

            <div className="about-content">
                <div className="about-text">
                    <p>
                        Eepol Studio는 인물과 웨딩, 브랜드 촬영을 중심으로
                        자연스러운 분위기와 개성을 담아내는 스튜디오입니다.
                    </p>

                    <p>
                        촬영 전 충분한 상담을 통해 원하는 분위기를 함께 찾고,
                        촬영부터 보정까지 세심하게 완성합니다.
                    </p>
                </div>

                <div className="about-points">
                    <div>
                        <strong>01</strong>
                        <span>자연스러운 촬영</span>
                    </div>

                    <div>
                        <strong>02</strong>
                        <span>섬세한 보정</span>
                    </div>

                    <div>
                        <strong>03</strong>
                        <span>맞춤형 상담</span>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About