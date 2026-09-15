function Header() {
    return (
        <header className="topbar">
            <div className="brand-wrap">
                <div className="brand-mark">E</div>

                <div>
                    <p className="brand-name">eepol studio</p>
                    <span className="brand-tag">
                        Portrait • Wedding • Brand
                    </span>
                </div>
            </div>

            <nav className="main-nav">
                <a href="#gallery">Portfolio</a>
                <a href="#about">About</a>
                <a href="#pricing">Pricing</a>
                <a href="#booking">Booking</a>
                <a href="#location">Location</a>
            </nav>

            <button
                className="nav-button"
                onClick={() =>
                    window.open(
                        'https://pf.kakao.com',
                        '_blank',
                        'noopener,noreferrer'
                    )
                }
            >
                카카오톡 예약
            </button>
        </header>
    )
}

export default Header