import { useEffect, useState } from 'react'
import './Qna.css'

import Header from '../layout/Header'
import QnaWriteModal from './QnaWriteModal'
import QnaPasswordModal from './QnaPasswordModal'

function Qna() {
    const [qnaList, setQnaList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')

    const [selectedQna, setSelectedQna] = useState(null)
    const [verifiedQna, setVerifiedQna] = useState(null)

    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [isVerifying, setIsVerifying] = useState(false)

    const [isWriting, setIsWriting] = useState(false)

    // Q&A 목록 조회
    const fetchQna = async () => {
        try {
            setIsLoading(true)
            setError('')

            const response = await fetch(
                'http://localhost:3000/api/qna'
            )

            const result = await response.json()

            if (!response.ok || !result.success) {
                throw new Error(
                    result.message || 'Q&A를 불러오지 못했습니다.'
                )
            }

            setQnaList(result.data || [])
        } catch (error) {
            console.error('Q&A fetch error:', error)

            setError(
                'Q&A를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.'
            )
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchQna()
    }, [])

    // Q&A 선택
    const handleQnaClick = (qna) => {
        setSelectedQna(qna)
        setVerifiedQna(null)
        setPassword('')
        setPasswordError('')
    }

    // Q&A 상세 모달 닫기
    const handleCloseQna = () => {
        setSelectedQna(null)
        setVerifiedQna(null)
        setPassword('')
        setPasswordError('')
    }

    // 비밀번호 검증
    const handleVerifyPassword = async (event) => {
        event.preventDefault()

        if (!password) {
            setPasswordError('비밀번호를 입력해 주세요.')
            return
        }

        try {
            setIsVerifying(true)
            setPasswordError('')

            const response = await fetch(
                `http://localhost:3000/api/qna/${selectedQna._id}/verify`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        password,
                    }),
                }
            )

            const result = await response.json()

            if (!response.ok || !result.success) {
                throw new Error(
                    result.message || '비밀번호가 올바르지 않습니다.'
                )
            }

            setVerifiedQna(result.data)
            setPassword('')
        } catch (error) {
            console.error(
                'Q&A password verify error:',
                error
            )

            setPasswordError(
                '비밀번호가 올바르지 않습니다.'
            )
        } finally {
            setIsVerifying(false)
        }
    }

    // 문의 작성 모달 열기
    const handleWriteClick = () => {
        setIsWriting(true)
    }

    // 문의 작성 모달 닫기
    const handleCloseWrite = () => {
        setIsWriting(false)
    }

    return (
        <div className="qna-page">
            <Header />

            <main className="qna-main">
                <section className="qna-section">
                    <div className="qna-header">
                        <p className="eyebrow">
                            Q&amp;A
                        </p>

                        <h1>
                            궁금한 점을
                            <br />
                            <em>남겨주세요.</em>
                        </h1>

                        <p className="qna-description">
                            촬영, 예약, 이용 방법에 대해 궁금한 점을 남겨주시면
                            <br />
                            확인 후 답변드리겠습니다.
                        </p>
                    </div>

                    <div className="qna-content">
                        <div className="qna-list">
                            <div className="qna-list-header">
                                <span>NO.</span>
                                <span>SUBJECT</span>
                                <span>STATUS</span>
                                <span>DATE</span>
                            </div>

                            {isLoading && (
                                <div className="qna-empty">
                                    Q&amp;A를 불러오는 중입니다.
                                </div>
                            )}

                            {!isLoading && error && (
                                <div className="qna-empty qna-error">
                                    {error}
                                </div>
                            )}

                            {!isLoading &&
                                !error &&
                                qnaList.length === 0 && (
                                    <div className="qna-empty">
                                        등록된 문의가 없습니다.
                                    </div>
                                )}

                            {!isLoading &&
                                !error &&
                                qnaList.map((qna, index) => (
                                    <button
                                        type="button"
                                        className="qna-row"
                                        key={qna._id}
                                        onClick={() =>
                                            handleQnaClick(qna)
                                        }
                                    >
                                        <span className="qna-number">
                                            {String(index + 1).padStart(2, '0')}
                                        </span>

                                        <span className="qna-title">
                                            🔒 {qna.title}
                                        </span>

                                        <span
                                            className={`qna-status ${qna.status === 'answered'
                                                ? 'answered'
                                                : ''
                                                }`}
                                        >
                                            {qna.status === 'answered'
                                                ? '답변완료'
                                                : '답변대기'}
                                        </span>

                                        <span className="qna-date">
                                            {qna.createdAt
                                                ? new Date(
                                                    qna.createdAt
                                                ).toLocaleDateString(
                                                    'ko-KR'
                                                )
                                                : '-'}
                                        </span>
                                    </button>
                                ))}
                        </div>

                        <button
                            type="button"
                            className="qna-write-button"
                            onClick={handleWriteClick}
                        >
                            문의하기 →
                        </button>
                    </div>
                </section>
            </main>

            {/* 비밀번호 확인 */}
            {selectedQna && !verifiedQna && (
                <QnaPasswordModal
                    password={password}
                    passwordError={passwordError}
                    isVerifying={isVerifying}
                    onPasswordChange={(event) =>
                        setPassword(event.target.value)
                    }
                    onSubmit={handleVerifyPassword}
                    onClose={handleCloseQna}
                />
            )}

            {/* 문의 상세 */}
            {verifiedQna && (
                <div className="qna-modal-backdrop">
                    <div className="qna-modal">
                        <button
                            type="button"
                            className="qna-modal-close"
                            onClick={handleCloseQna}
                        >
                            ×
                        </button>

                        <p className="qna-modal-eyebrow">
                            Q&amp;A
                        </p>

                        <h2>
                            {verifiedQna.title}
                        </h2>

                        <div className="qna-detail">
                            <div className="qna-detail-meta">
                                <span>
                                    {verifiedQna.author}
                                </span>

                                <span>
                                    {verifiedQna.createdAt
                                        ? new Date(
                                            verifiedQna.createdAt
                                        ).toLocaleDateString(
                                            'ko-KR'
                                        )
                                        : '-'}
                                </span>
                            </div>

                            <div className="qna-detail-content">
                                {verifiedQna.content}
                            </div>

                            {verifiedQna.status === 'answered' && (
                                <div className="qna-detail-answer">
                                    <span>
                                        ANSWER
                                    </span>

                                    <p>
                                        {verifiedQna.answer}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* 문의 작성 */}
            {isWriting && (
                <QnaWriteModal
                    onClose={handleCloseWrite}
                    onSuccess={fetchQna}
                />
            )}
        </div>
    )
}

export default Qna

