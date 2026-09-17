import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { getGallery } from '../../components/admin/gallery/galleryApi'
import { getPricing } from '../../components/admin/pricing/pricingApi'
import { getNotices } from '../../components/admin/notice/noticeApi'
import { getQnas } from '../../components/admin/qna/qnaApi'
import { getBookings } from '../../components/admin/booking/bookingApi'

import './AdminDashboard.css'

function AdminDashboard() {
    const [stats, setStats] = useState({
        gallery: 0,
        pricing: 0,
        qnaWaiting: 0,
        notices: 0,
        bookings: 0,
    })

    const [message, setMessage] = useState('')

    useEffect(() => {
        const loadDashboard = async () => {
            try {
                const [
                    gallery,
                    pricing,
                    qnas,
                    notices,
                    bookings,
                ] = await Promise.all([
                    getGallery(),
                    getPricing(),
                    getQnas(),
                    getNotices(),
                    getBookings(),
                ])

                setStats({
                    gallery: gallery.length,
                    pricing: pricing.length,
                    qnaWaiting: qnas.filter(
                        (qna) => qna.status === 'waiting'
                    ).length,
                    notices: notices.length,
                    bookings: bookings.length,
                })
            } catch (error) {
                console.error(
                    'Dashboard fetch error:',
                    error
                )

                setMessage(error.message)
            }
        }

        loadDashboard()
    }, [])

    return (
        <div className="dashboard">
            <div className="dashboard-intro">
                <p className="dashboard-eyebrow">
                    EPOL STUDIO
                </p>

                <h1>관리자 대시보드</h1>

                <p>
                    스튜디오의 주요 콘텐츠와 예약 현황을
                    한눈에 확인할 수 있습니다.
                </p>
            </div>

            {message && (
                <p className="dashboard-message">
                    {message}
                </p>
            )}

            <section className="dashboard-section">
                <h2>주요 현황</h2>

                <div className="dashboard-stats">
                    <div className="dashboard-card">
                        <span>예약</span>
                        <strong>{stats.bookings}</strong>
                        <p>전체 예약</p>
                    </div>

                    <div className="dashboard-card">
                        <span>답변 대기 Q&A</span>
                        <strong>{stats.qnaWaiting}</strong>
                        <p>확인이 필요한 문의</p>
                    </div>

                    <div className="dashboard-card">
                        <span>갤러리</span>
                        <strong>{stats.gallery}</strong>
                        <p>등록된 사진</p>
                    </div>

                    <div className="dashboard-card">
                        <span>가격</span>
                        <strong>{stats.pricing}</strong>
                        <p>등록된 가격 정보</p>
                    </div>

                    <div className="dashboard-card">
                        <span>공지사항</span>
                        <strong>{stats.notices}</strong>
                        <p>등록된 공지사항</p>
                    </div>
                </div>
            </section>

            <section className="dashboard-section">
                <h2>빠른 관리</h2>

                <div className="dashboard-links">
                    <Link to="/admin/gallery">
                        <strong>갤러리 관리</strong>
                        <span>
                            사진 등록 및 순서 관리
                        </span>
                    </Link>

                    <Link to="/admin/booking">
                        <strong>예약 관리</strong>
                        <span>
                            예약 확인 및 일정 관리
                        </span>
                    </Link>

                    <Link to="/admin/pricing">
                        <strong>가격 관리</strong>
                        <span>
                            촬영 가격 및 옵션 관리
                        </span>
                    </Link>

                    <Link to="/admin/qna">
                        <strong>Q&A 관리</strong>
                        <span>
                            문의 확인 및 답변 관리
                        </span>
                    </Link>

                    <Link to="/admin/notice">
                        <strong>공지사항 관리</strong>
                        <span>
                            공지 등록 및 팝업 관리
                        </span>
                    </Link>
                </div>
            </section>
        </div>
    )
}

export default AdminDashboard