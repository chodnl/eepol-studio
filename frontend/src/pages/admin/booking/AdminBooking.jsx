import { useEffect, useState } from 'react'
import { getBookings } from "../../../components/admin/booking/bookingApi";

function AdminBooking() {
    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(true)
    const [message, setMessage] = useState('')

    useEffect(() => {
        const loadBookings = async () => {
            try {
                const data = await getBookings()
                setBookings(data)
            } catch (error) {
                console.error('Booking fetch error:', error)
                setMessage(error.message)
            } finally {
                setLoading(false)
            }
        }

        loadBookings()
    }, [])

    if (loading) {
        return (
            <section className="admin-panel">
                <h2>예약 관리</h2>
                <p>예약을 불러오는 중입니다...</p>
            </section>
        )
    }

    return (
        <section className="admin-panel">
            <div className="admin-section-header">
                <div>
                    <p className="eyebrow">BOOKING</p>
                    <h2>예약 관리</h2>
                </div>

                <span>
                    총 {bookings.length}건
                </span>
            </div>

            {message && (
                <p className="system-message">
                    {message}
                </p>
            )}

            {!message && bookings.length === 0 && (
                <p>등록된 예약이 없습니다.</p>
            )}

            <div className="reservation-list">
                {bookings.map((booking) => (
                    <article
                        key={booking._id}
                        className="reservation-item"
                    >
                        <div className="reservation-top">
                            <div>
                                <strong>
                                    {booking.customerName}
                                </strong>

                                <span>
                                    {booking.date} {booking.time}
                                </span>
                            </div>

                            <span
                                className={`status ${booking.status}`}
                            >
                                {booking.status}
                            </span>
                        </div>

                        <p>
                            촬영: {booking.type}
                        </p>

                        <p>
                            연락처: {booking.phone}
                        </p>

                        <p>
                            예약 채널: {booking.channel}
                        </p>

                        {booking.memo && (
                            <small>
                                메모: {booking.memo}
                            </small>
                        )}
                    </article>
                ))}
            </div>
        </section>
    )
}

export default AdminBooking
