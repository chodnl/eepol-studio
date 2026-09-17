const API_URL = 'http://localhost:3000/api/bookings'

const getToken = () => {
    const token = localStorage.getItem('adminToken')

    if (!token) {
        throw new Error('관리자 인증이 필요합니다.')
    }

    return token
}

export const getBookings = async () => {
    const token = getToken()

    const response = await fetch(API_URL, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    const result = await response.json()

    if (!response.ok || !result.success) {
        throw new Error(
            result.message || '예약 목록을 불러오지 못했습니다.'
        )
    }

    return result.data
}

export const createBooking = async (bookingData) => {
    const token = getToken()

    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookingData),
    })

    const result = await response.json()

    if (!response.ok || !result.success) {
        throw new Error(
            result.message || '예약 등록에 실패했습니다.'
        )
    }

    return result.data
}

export const updateBooking = async (id, bookingData) => {
    const token = getToken()

    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookingData),
    })

    const result = await response.json()

    if (!response.ok || !result.success) {
        throw new Error(
            result.message || '예약 수정에 실패했습니다.'
        )
    }

    return result.data
}

export const deleteBooking = async (id) => {
    const token = getToken()

    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    const result = await response.json()

    if (!response.ok || !result.success) {
        throw new Error(
            result.message || '예약 삭제에 실패했습니다.'
        )
    }

    return result.data
}