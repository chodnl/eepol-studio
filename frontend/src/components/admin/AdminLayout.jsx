import { Outlet } from 'react-router-dom'
import './AdminLayout.css'

function AdminLayout() {
    return (
        <div className="admin-layout">
            <header className="admin-header">
                <h1>EEPOL STUDIO</h1>

                <button
                    type="button"
                    onClick={() => {
                        localStorage.removeItem('adminToken')
                        window.location.href = '/admin/login'
                    }}
                >
                    로그아웃
                </button>
            </header>

            <nav className="admin-nav">
                <a href="/admin">대시보드</a>
                <a href="/admin/gallery">갤러리</a>
                <a href="/admin/booking">예약</a>
                <a href="/admin/pricing">가격</a>
                <a href="/admin/qna">Q&A</a>
                <a href="/admin/notice">공지사항</a>
            </nav>

            <main className="admin-content">
                <Outlet />
            </main>
        </div>
    )
}

export default AdminLayout