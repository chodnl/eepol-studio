import { useState } from 'react'

import './AdminBooking.css'
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

    const [statusFilter, setStatusFilter] = useState('all')
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)

    const handleMonthChange = (date) => {
        setSelectedMonth(date)
        setCurrentPage(1)
        setSearchTerm('')
        setStatusFilter('all')
    }

    const handleStatusFilterChange = (status) => {
        setStatusFilter(status)
        setCurrentPage(1)
    }

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value)
        setCurrentPage(1)
    }

    const monthFilteredBookings = filterBookingsByMonth(
        bookings,
        selectedMonth
    )

    const filteredBookings = monthFilteredBookings.filter(
        (booking) => {
            if (
                statusFilter !== 'all' &&
                booking.status !== statusFilter
            ) {
                return false
            }

            const keyword = searchTerm
                .trim()
                .toLowerCase()

            if (!keyword) {
                return true
            }

            const customerName =
                booking.customerName.toLowerCase()

            const phone =
                booking.phone.toLowerCase()

            return (
                customerName.includes(keyword) ||
                phone.includes(keyword)
            )
        }
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
        <div className="booking-admin">
            <div className="booking-admin-header">
                <p className="booking-admin-eyebrow">
                    RESERVATION
                </p>

                <h1>예약 관리</h1>

                <p>
                    촬영 예약과 일정을 한눈에 관리합니다.
                </p>
            </div>

            <div className="booking-admin-actions">
                <button
                    type="button"
                    className="booking-primary-btn"
                    onClick={handleOpenCreate}
                >
                    예약 등록
                </button>
            </div>

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

            <div>
                <button
                    type="button"
                    onClick={() =>
                        handleStatusFilterChange('all')
                    }
                >
                    전체
                </button>

                <button
                    type="button"
                    onClick={() =>
                        handleStatusFilterChange('pending')
                    }
                >
                    예약 대기
                </button>

                <button
                    type="button"
                    onClick={() =>
                        handleStatusFilterChange('confirmed')
                    }
                >
                    예약 확정
                </button>

                <button
                    type="button"
                    onClick={() =>
                        handleStatusFilterChange('completed')
                    }
                >
                    촬영 완료
                </button>

                <button
                    type="button"
                    onClick={() =>
                        handleStatusFilterChange('cancelled')
                    }
                >
                    예약 취소
                </button>
            </div>

            <div>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="이름 또는 전화번호 검색"
                />
            </div>

            <p>
                총 {filteredBookings.length}개의 예약
            </p>

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
                            setCurrentPage(
                                (prev) => prev - 1
                            )
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
                            onClick={() =>
                                setCurrentPage(page)
                            }
                        >
                            {page}
                        </button>
                    ))}

                    <button
                        type="button"
                        disabled={
                            currentPage === totalPages
                        }
                        onClick={() =>
                            setCurrentPage(
                                (prev) => prev + 1
                            )
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