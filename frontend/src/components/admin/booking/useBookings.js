import { useEffect, useState } from 'react'

import {
    getBookings,
    createBooking,
    updateBooking,
    deleteBooking,
} from './bookingApi'

function useBookings() {
    const [bookings, setBookings] = useState([])
    const [editingBooking, setEditingBooking] = useState(null)
    const [isCreateOpen, setIsCreateOpen] = useState(false)
    const [message, setMessage] = useState('')

    const loadBookings = async () => {
        try {
            const data = await getBookings()

            setBookings(data)
        } catch (error) {
            console.error('Booking fetch error:', error)
            setMessage(error.message)
        }
    }

    useEffect(() => {
        loadBookings()
    }, [])

    const handleCreate = async (bookingData) => {
        try {
            const createdBooking = await createBooking(
                bookingData
            )

            setBookings((prev) => [
                ...prev,
                createdBooking,
            ])

            setMessage('예약이 등록되었습니다.')
            setIsCreateOpen(false)
        } catch (error) {
            console.error('Booking create error:', error)
            setMessage(error.message)
        }
    }

    const handleUpdate = async (bookingData) => {
        try {
            const updatedBooking = await updateBooking(
                editingBooking._id,
                bookingData
            )

            setBookings((prev) =>
                prev.map((booking) =>
                    booking._id === updatedBooking._id
                        ? updatedBooking
                        : booking
                )
            )

            setEditingBooking(null)
            setMessage('예약이 수정되었습니다.')
        } catch (error) {
            console.error('Booking update error:', error)
            setMessage(error.message)
        }
    }

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            '이 예약을 삭제하시겠습니까?'
        )

        if (!confirmed) {
            return
        }

        try {
            await deleteBooking(id)

            setBookings((prev) =>
                prev.filter(
                    (booking) => booking._id !== id
                )
            )

            if (editingBooking?._id === id) {
                setEditingBooking(null)
            }

            setMessage('예약이 삭제되었습니다.')
        } catch (error) {
            console.error('Booking delete error:', error)
            setMessage(error.message)
        }
    }

    const handleEdit = (booking) => {
        setEditingBooking(booking)
        setIsCreateOpen(false)
        setMessage('')
    }

    const handleOpenCreate = () => {
        setEditingBooking(null)
        setIsCreateOpen(true)
        setMessage('')
    }

    const handleCancelCreate = () => {
        setIsCreateOpen(false)
    }

    const handleCancelEdit = () => {
        setEditingBooking(null)
    }

    return {
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
    }
}

export default useBookings