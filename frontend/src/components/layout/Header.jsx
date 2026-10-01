import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './Header.css'

function Header() {
    const location = useLocation()
    const navigate = useNavigate()

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const isHome = location.pathname === '/'

    const handleSectionClick = (sectionId) => {
        setIsMobileMenuOpen(false)

        if (isHome) {
            document.getElementById(sectionId)?.scrollIntoView({
                behavior: 'smooth',
            })

            return
        }

        navigate(`/#${sectionId}`)
    }

    const handleBrandClick = () => {
        setIsMobileMenuOpen(false)

        if (isHome) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            })

            return
        }

        navigate('/')
    }

    return (
        <header
            className={`site-header ${
                isMobileMenuOpen
                    ? 'mobile-menu-open'
                    : ''
            }`}
        >
            <div className="header-inner">
                <a
                    href="/"
                    className="header-brand"
                    onClick={(event) => {
                        event.preventDefault()
                        handleBrandClick()
                    }}
                >
                    <span className="header-brand-name">
                        eepol
                    </span>

                    <span className="header-brand-sub">
                        studio
                    </span>
                </a>

                <nav className="header-nav">
                    <a
                        href="#about"
                        onClick={(event) => {
                            event.preventDefault()
                            handleSectionClick('about')
                        }}
                    >
                        ABOUT
                    </a>

                    <a
                        href="#gallery"
                        onClick={(event) => {
                            event.preventDefault()
                            handleSectionClick('gallery')
                        }}
                    >
                        GALLERY
                    </a>

                    <a
                        href="#pricing"
                        onClick={(event) => {
                            event.preventDefault()
                            handleSectionClick('pricing')
                        }}
                    >
                        PRICING
                    </a>

                    <a
                        href="#booking"
                        onClick={(event) => {
                            event.preventDefault()
                            handleSectionClick('booking')
                        }}
                    >
                        BOOKING
                    </a>

                    <a
                        href="/qna"
                        onClick={() =>
                            setIsMobileMenuOpen(false)
                        }
                    >
                        Q&amp;A
                    </a>

                    <a
                        href="/notice"
                        onClick={() =>
                            setIsMobileMenuOpen(false)
                        }
                    >
                        NOTICE
                    </a>

                    <a
                        href="#location"
                        onClick={(event) => {
                            event.preventDefault()
                            handleSectionClick('location')
                        }}
                    >
                        LOCATION
                    </a>
                </nav>

                <div className="header-links">
                    <a
                        href="https://www.instagram.com/eepool_studio/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Instagram
                    </a>

                    <a
                        href="https://blog.naver.com/blanksnap"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Naver
                    </a>

                    <a
                        href="https://pf.kakao.com/_fuRKG"
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
                aria-label={
                    isMobileMenuOpen
                        ? '메뉴 닫기'
                        : '메뉴 열기'
                }
                aria-expanded={isMobileMenuOpen}
                onClick={() =>
                    setIsMobileMenuOpen(
                        (prev) => !prev
                    )
                }
            >
                {isMobileMenuOpen ? '×' : '☰'}
            </button>
        </header>
    )
}

export default Header