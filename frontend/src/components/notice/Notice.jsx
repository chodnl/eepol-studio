import { useEffect, useState } from 'react'
import './Notice.css'

import Header from '../layout/Header'

function Notice() {
    const [noticeList, setNoticeList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')

    const [selectedNotice, setSelectedNotice] = useState(null)
    const [isDetailLoading, setIsDetailLoading] = useState(false)

    const fetchNotices = async () => {
        try {
            setIsLoading(true)
            setError('')

            const response = await fetch(
                'http://localhost:3000/api/notice'
            )

            const result = await response.json()

            if (!response.ok || !result.success) {
                throw new Error(
                    result.message || '공지사항을 불러오지 못했습니다.'
                )
            }

            setNoticeList(result.data || [])
        } catch (error) {
            console.error('Notice fetch error:', error)

            setError(
                '공지사항을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.'
            )
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchNotices()
    }, [])

    const handleNoticeClick = async (notice) => {
        try {
            setIsDetailLoading(true)

            const response = await fetch(
                `http://localhost:3000/api/notice/${notice._id}`
            )

            const result = await response.json()

            if (!response.ok || !result.success) {
                throw new Error(
                    result.message || '공지사항을 불러오지 못했습니다.'
                )
            }

            setSelectedNotice(result.data)
        } catch (error) {
            console.error('Notice detail fetch error:', error)

            alert('공지사항을 불러오지 못했습니다.')
        } finally {
            setIsDetailLoading(false)
        }
    }

    const handleCloseNotice = () => {
        setSelectedNotice(null)
    }

    return (
        <div className="notice-page">
            <Header />

            <main className="notice-main">
                <section className="notice-section">
                    <div className="notice-header">
                        <p className="eyebrow">
                            NOTICE
                        </p>

                        <h1>
                            이풀 스튜디오의
                            <br />
                            <em>새로운 소식입니다.</em>
                        </h1>

                        <p className="notice-description">
                            스튜디오 이용과 관련된 안내사항을 확인해 주세요.
                        </p>
                    </div>

                    <div className="notice-content">
                        <div className="notice-list">
                            <div className="notice-list-header">
                                <span>NO.</span>
                                <span>SUBJECT</span>
                                <span>DATE</span>
                            </div>

                            {isLoading && (
                                <div className="notice-empty">
                                    공지사항을 불러오는 중입니다.
                                </div>
                            )}

                            {!isLoading && error && (
                                <div className="notice-empty notice-error">
                                    {error}
                                </div>
                            )}

                            {!isLoading &&
                                !error &&
                                noticeList.length === 0 && (
                                    <div className="notice-empty">
                                        등록된 공지사항이 없습니다.
                                    </div>
                                )}

                            {!isLoading &&
                                !error &&
                                noticeList.map((notice, index) => (
                                    <button
                                        type="button"
                                        className="notice-row"
                                        key={notice._id}
                                        onClick={() =>
                                            handleNoticeClick(notice)
                                        }
                                    >
                                        <span className="notice-number">
                                            {String(index + 1).padStart(2, '0')}
                                        </span>

                                        <span className="notice-title">
                                            {notice.isPinned && (
                                                <span className="notice-pin">
                                                    NOTICE
                                                </span>
                                            )}

                                            {notice.title}
                                        </span>

                                        <span className="notice-date">
                                            {notice.createdAt
                                                ? new Date(
                                                    notice.createdAt
                                                ).toLocaleDateString(
                                                    'ko-KR'
                                                )
                                                : '-'}
                                        </span>
                                    </button>
                                ))}
                        </div>
                    </div>
                </section>
            </main>

            {selectedNotice && (
                <div className="notice-modal-backdrop">
                    <div className="notice-modal">
                        <button
                            type="button"
                            className="notice-modal-close"
                            onClick={handleCloseNotice}
                        >
                            ×
                        </button>

                        <p className="notice-modal-eyebrow">
                            NOTICE
                        </p>

                        <h2>
                            {selectedNotice.title}
                        </h2>

                        <div className="notice-detail-meta">
                            <span>
                                {selectedNotice.createdAt
                                    ? new Date(
                                        selectedNotice.createdAt
                                    ).toLocaleDateString(
                                        'ko-KR'
                                    )
                                    : '-'}
                            </span>
                        </div>

                        <div className="notice-detail-content">
                            {selectedNotice.content}
                        </div>
                    </div>
                </div>
            )}

            {isDetailLoading && (
                <div className="notice-loading">
                    공지사항을 불러오는 중입니다.
                </div>
            )}
        </div>
    )
}

export default Notice

