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
        <form onSubmit={handleSubmit}>
            <h2>
                {booking ? '예약 수정' : '예약 등록'}
            </h2>

            <input
                type="text"
                name="customerName"
                value={form.customerName}
                onChange={handleChange}
                placeholder="고객명"
                required
            />

            <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="전화번호"
                required
            />

            <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
            />

            <input
                type="time"
                name="time"
                value={form.time}
                onChange={handleChange}
                required
            />

            <input
                type="text"
                name="type"
                value={form.type}
                onChange={handleChange}
                placeholder="촬영 유형"
                required
            />

            <select
                name="channel"
                value={form.channel}
                onChange={handleChange}
            >
                <option value="naver">네이버</option>
                <option value="kakao">카카오</option>
                <option value="sms">문자</option>
                <option value="manual">수동 등록</option>
            </select>

            <select
                name="status"
                value={form.status}
                onChange={handleChange}
            >
                <option value="pending">대기</option>
                <option value="confirmed">확정</option>
                <option value="completed">완료</option>
                <option value="cancelled">취소</option>
            </select>

            <textarea
                name="memo"
                value={form.memo}
                onChange={handleChange}
                placeholder="메모"
                rows="4"
            />

            <div>
                <button type="submit">
                    {booking ? '수정 저장' : '예약 등록'}
                </button>

                {onCancel && (
                    <button
                        type="button"
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