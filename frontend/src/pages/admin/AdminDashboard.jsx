import AdminGallery from './gallery/AdminGallery'
import './AdminDashboard.css'

function AdminDashboard() {
    return (
        <div className="admin-page">
            <header className="admin-header">
                <div>
                    <p className="eyebrow">EPOL STUDIO</p>
                    <h1>관리자 페이지</h1>
                </div>

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

            <main>
                <section className="admin-menu">
                    <button type="button">갤러리 관리</button>
                    <button type="button">가격 관리</button>
                    <button type="button">예약 관리</button>
                    <button type="button">Q&A 관리</button>
                </section>

                <AdminGallery />
            </main>
        </div>
    )
}

export default AdminDashboard