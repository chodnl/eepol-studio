import './Header.css'

function Header() {
    return (
        <header className="site-header">
            <div className="header-inner">
                <a href="#hero" className="header-brand">
                    <span className="header-brand-name">
                        eepol
                    </span>

                    <span className="header-brand-sub">
                        studio
                    </span>
                </a>

                <nav className="header-nav">
                    <a href="#about">ABOUT</a>
                    <a href="#gallery">GALLERY</a>
                    <a href="#pricing">PRICING</a>
                    <a href="#booking">BOOKING</a>
                    <a href="#qna">Q&amp;A</a>
                    <a href="#notice">NOTICE</a>
                    <a href="#location">LOCATION</a>
                </nav>

                <div className="header-links">
                    <a
                        href="https://www.instagram.com/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Instagram
                    </a>

                    <a
                        href="https://blog.naver.com/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Naver
                    </a>

                    <a
                        href="https://pf.kakao.com/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Kakao
                    </a>
                </div>
            </div>

            <button
                type="button"
                className="mobile-menu-button"
                aria-label="메뉴 열기"
            >
                ☰
            </button>
        </header>
    )
}

export default Header