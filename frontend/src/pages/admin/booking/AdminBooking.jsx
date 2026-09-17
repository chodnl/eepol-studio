import { useState } from 'react'

import useBookings from '../../../components/admin/booking/useBookings'

import {
    filterBookingsByMonth,
    getPaginatedBookings,
    getTotalPages,
} from '../../../components/admin/booking/bookingUtils'

import BookingList from '../../../components/admin/booking/BookingList'
import BookingEditor from '../../../components/admin/booking/BookingEditor'
import BookingCalendar from '../../../components/admin/booking/BookingCalendar'

const ITEMS_PER_PAGE = 10

function AdminBooking() {
    const {
        bookings,
        editingBooking,
        isCreateOpen,
        message,
        handleCreate,
        handleUpdate,
        handleDelete,
        handleEdit,
        handleOpenCreate,
        handleCancelCreate,
        handleCancelEdit,
    } = useBookings()

    const [selectedMonth, setSelectedMonth] = useState(
        new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            1
        )
    )

    const [currentPage, setCurrentPage] = useState(1)



    const handleMonthChange = (date) => {
        setSelectedMonth(date)
        setCurrentPage(1)
    }

    const filteredBookings = filterBookingsByMonth(
        bookings,
        selectedMonth
    )

    const totalPages = getTotalPages(
        filteredBookings,
        ITEMS_PER_PAGE
    )

    const paginatedBookings = getPaginatedBookings(
        filteredBookings,
        currentPage,
        ITEMS_PER_PAGE
    )

    const handleSelectCalendarBooking = (booking) => {
        const bookingIndex = filteredBookings.findIndex(
            (item) => item._id === booking._id
        )

        if (bookingIndex === -1) {
            return
        }

        const targetPage =
            Math.floor(bookingIndex / ITEMS_PER_PAGE) + 1

        setCurrentPage(targetPage)

        setTimeout(() => {
            const element = document.getElementById(
                `booking-${booking._id}`
            )

            element?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            })
        }, 100)
    }

    return (
        <div>
            <h1>예약 관리</h1>

            <button
                type="button"
                onClick={handleOpenCreate}
            >
                예약 등록
            </button>

            {message && <p>{message}</p>}

            {isCreateOpen && (
                <BookingEditor
                    booking={null}
                    onSave={handleCreate}
                    onCancel={handleCancelCreate}
                />
            )}

            <BookingCalendar
                bookings={bookings}
                onSelectBooking={handleSelectCalendarBooking}
                onMonthChange={handleMonthChange}
            />

            <BookingList
                bookings={paginatedBookings}
                editingBookingId={editingBooking?._id}
                onEdit={handleEdit}
                onDelete={handleDelete}
                renderEditor={(booking) => (
                    <BookingEditor
                        booking={booking}
                        onSave={handleUpdate}
                        onCancel={handleCancelEdit}
                    />
                )}
            />

            {totalPages > 1 && (
                <div>
                    <button
                        type="button"
                        disabled={currentPage === 1}
                        onClick={() =>
                            setCurrentPage((prev) => prev - 1)
                        }
                    >
                        이전
                    </button>

                    {Array.from(
                        { length: totalPages },
                        (_, index) => index + 1
                    ).map((page) => (
                        <button
                            key={page}
                            type="button"
                            onClick={() => setCurrentPage(page)}
                        >
                            {page}
                        </button>
                    ))}

                    <button
                        type="button"
                        disabled={currentPage === totalPages}
                        onClick={() =>
                            setCurrentPage((prev) => prev + 1)
                        }
                    >
                        다음
                    </button>
                </div>
            )}
        </div>
    )
}

export default AdminBooking