import './Footer.css'

function Footer() {
    return (
        <footer className="site-footer">
            <div className="footer-inner">
                {/* 1. 브랜드 영역 */}
                <div className="footer-brand">
                    <p className="footer-eyebrow">EEPOL STUDIO</p>
                    <h2>기억을 예쁘게,<br />오래 남도록</h2>
                    <p className="footer-description">
                        자연스러운 순간과 당신만의 분위기를 담아드립니다.
                    </p>
                </div>

                {/* 2. 상세 정보 영역 */}
                <div className="footer-info">
                    <div className="footer-info-group">
                        <span>ADDRESS</span>
                        <p>인천 동구 화도진로102번길 14 1층</p>
                        <small>지번: 화수동 286-42</small>
                    </div>

                    <div className="footer-info-group">
                        <span>PHONE</span>
                        <a href="tel:050713903591">0507-1390-3591</a>
                    </div>

                    <div className="footer-info-group">
                        <span>HOURS</span>
                        <p>월 - 토 11:00 - 17:00</p>
                        <small>매주 일요일 정기휴무</small>
                    </div>
                </div>

                {/* 3. 소셜/링크 영역 */}
                <div className="footer-links">
                    <span className="footer-links-title">CONNECT</span>
                    <a href="https://www.instagram.com/eepool_studio/" target="_blank" rel="noreferrer">
                        Instagram ↗
                    </a>
                    <a href="https://blog.naver.com/blanksnap" target="_blank" rel="noreferrer">
                        Naver Blog ↗
                    </a>
                    <a href="https://pf.kakao.com/_fuRKG" target="_blank" rel="noreferrer">
                        Kakao Channel ↗
                    </a>
                    <a href="https://pcmap.place.naver.com/place/2013301870" target="_blank" rel="noreferrer">
                        Naver Place ↗
                    </a>
                </div>
            </div>

            {/* 하단 카피라이트 */}
            <div className="footer-bottom">
                <p>© 2026 Eepol Studio. All rights reserved.</p>
                <a href="#hero">BACK TO TOP ↑</a>
            </div>
        </footer>
    )
}

export default Footer