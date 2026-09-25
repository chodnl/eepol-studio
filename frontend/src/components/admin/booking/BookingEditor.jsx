import { useState } from 'react'

function BookingEditor({
    booking,
    onSave,
    onCancel,
}) {
    const [form, setForm] = useState({
        customerName: booking?.customerName || '',
        phone: booking?.phone || '',
        date: booking?.date || '',
        time: booking?.time || '',
        type: booking?.type || '',
        channel: booking?.channel || 'manual',
        status: booking?.status || 'pending',
        memo: booking?.memo || '',
    })

    const handleChange = (event) => {
        const { name, value } = event.target

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        await onSave(form)
    }

    return (
        <form
            className="booking-editor"
            onSubmit={handleSubmit}
        >
            <div className="booking-editor-header">
                <div>
                    <p className="booking-editor-eyebrow">
                        {booking
                            ? 'EDIT RESERVATION'
                            : 'NEW RESERVATION'}
                    </p>

                    <h2>
                        {booking
                            ? '예약 수정'
                            : '예약 등록'}
                    </h2>
                </div>
            </div>

            <div className="booking-editor-fields">
                <label>
                    <span>고객명</span>

                    <input
                        type="text"
                        name="customerName"
                        value={form.customerName}
                        onChange={handleChange}
                        placeholder="고객명을 입력하세요"
                        required
                    />
                </label>

                <label>
                    <span>전화번호</span>

                    <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="010-0000-0000"
                        required
                    />
                </label>

                <label>
                    <span>예약일</span>

                    <input
                        type="date"
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    <span>예약 시간</span>

                    <input
                        type="time"
                        name="time"
                        value={form.time}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    <span>촬영 유형</span>

                    <input
                        type="text"
                        name="type"
                        value={form.type}
                        onChange={handleChange}
                        placeholder="예: 프로필 촬영"
                        required
                    />
                </label>

                <label>
                    <span>예약 채널</span>

                    <select
                        name="channel"
                        value={form.channel}
                        onChange={handleChange}
                    >
                        <option value="naver">
                            네이버
                        </option>

                        <option value="kakao">
                            카카오
                        </option>

                        <option value="sms">
                            문자
                        </option>

                        <option value="manual">
                            수동 등록
                        </option>
                    </select>
                </label>

                <label>
                    <span>예약 상태</span>

                    <select
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                    >
                        <option value="pending">
                            예약 대기
                        </option>

                        <option value="confirmed">
                            예약 확정
                        </option>

                        <option value="completed">
                            촬영 완료
                        </option>
                    </select>
                </label>

                <label className="booking-editor-full">
                    <span>메모</span>

                    <textarea
                        name="memo"
                        value={form.memo}
                        onChange={handleChange}
                        placeholder="예약 관련 메모를 입력하세요"
                        rows="4"
                    />
                </label>
            </div>

            <div className="booking-editor-actions">
                <button
                    type="submit"
                    className="booking-editor-save"
                >
                    {booking
                        ? '수정 저장'
                        : '예약 등록'}
                </button>

                {onCancel && (
                    <button
                        type="button"
                        className="booking-editor-cancel"
                        onClick={onCancel}
                    >
                        취소
                    </button>
                )}
            </div>
        </form>
    )
}

export default BookingEditor