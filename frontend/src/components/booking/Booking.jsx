import { useState } from 'react'
import './Booking.css'

const defaultBooking = {
    name: '',
    phone: '',
    date: '',
    packageName: '프리미엄',
    note: '',
}

function Booking() {
    const [booking, setBooking] = useState(defaultBooking)
    const [message, setMessage] = useState(
        '예약 신청 후 관리자 확인을 거쳐 안내드립니다.'
    )
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleChange = (event) => {
        const { name, value } = event.target

        setBooking((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!booking.name || !booking.phone || !booking.date) {
            setMessage('이름, 연락처, 촬영 날짜를 모두 입력해 주세요.')
            return
        }

        try {
            setIsSubmitting(true)
            setMessage('예약 신청을 등록하고 있습니다.')

            const response = await fetch(
                'http://localhost:3000/api/bookings',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        customerName: booking.name,
                        phone: booking.phone,
                        date: booking.date,
                        time: '미정',
                        type: booking.packageName,
                        channel: 'manual',
                        memo: booking.note,
                    }),
                }
            )

            const result = await response.json()

            if (!response.ok || !result.success) {
                throw new Error(
                    result.message || '예약 신청에 실패했습니다.'
                )
            }

            setBooking(defaultBooking)

            setMessage(
                `${booking.name}님, 예약 신청이 접수되었습니다.`
            )
        } catch (error) {
            console.error('Booking submit error:', error)

            setMessage(
                '예약 신청에 실패했습니다. 잠시 후 다시 시도해 주세요.'
            )
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleKakaoClick = () => {
        window.open(
            'https://pf.kakao.com',
            '_blank',
            'noopener,noreferrer'
        )
    }

    return (
        <section className="section booking-layout" id="booking">
            <div className="booking-form-box">
                <div className="section-header left-align">
                    <p className="eyebrow">reservation</p>
                    <h2>촬영 예약하기</h2>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="booking-form"
                >
                    <div className="field-row two-col">
                        <label>
                            이름

                            <input
                                type="text"
                                name="name"
                                value={booking.name}
                                onChange={handleChange}
                                placeholder="예약자 이름"
                            />
                        </label>

                        <label>
                            연락처

                            <input
                                type="tel"
                                name="phone"
                                value={booking.phone}
                                onChange={handleChange}
                                placeholder="010-0000-0000"
                            />
                        </label>
                    </div>

                    <div className="field-row two-col">
                        <label>
                            촬영 날짜

                            <input
                                type="date"
                                name="date"
                                value={booking.date}
                                onChange={handleChange}
                            />
                        </label>

                        <label>
                            패키지

                            <select
                                name="packageName"
                                value={booking.packageName}
                                onChange={handleChange}
                            >
                                <option value="베이직">
                                    베이직
                                </option>

                                <option value="프리미엄">
                                    프리미엄
                                </option>

                                <option value="브라이덜">
                                    브라이덜
                                </option>
                            </select>
                        </label>
                    </div>

                    <label>
                        요청사항

                        <textarea
                            name="note"
                            value={booking.note}
                            onChange={handleChange}
                            rows="4"
                            placeholder="촬영 스타일, 장소, 의상, 추가 요청사항을 적어 주세요."
                        />
                    </label>

                    <div className="booking-actions">
                        <button
                            type="submit"
                            className="primary-btn"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? '예약 신청 중...' : '예약 신청'}
                        </button>

                        <button
                            type="button"
                            className="secondary-btn"
                            onClick={handleKakaoClick}
                        >
                            카카오톡 예약
                        </button>
                    </div>

                    <p className="system-message">
                        {message}
                    </p>
                </form>
            </div>

            <aside className="booking-side">
                <div className="info-box">
                    <h3>예약 프로세스</h3>

                    <ul>
                        <li>1. 예약 신청</li>
                        <li>2. 관리자 확인</li>
                        <li>3. 예약 확정</li>
                        <li>4. 촬영 안내</li>
                    </ul>
                </div>

                <div className="info-box accent-box">
                    <h3>문의 정보</h3>

                    <p>전화: 02-555-8821</p>
                    <p>카카오톡: @eepolstudio</p>
                    <p>운영시간: 평일 10:00 ~ 19:00</p>
                </div>
            </aside>
        </section>
    )
}

export default Booking