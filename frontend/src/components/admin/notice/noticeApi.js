const API_URL = 'http://localhost:3000/api/notice'

const getToken = () => {
    const token = localStorage.getItem('adminToken')

    if (!token) {
        throw new Error('관리자 인증이 필요합니다.')
    }

    return token
}

export const getNotices = async () => {
    const response = await fetch(API_URL)
    const result = await response.json()

    if (!response.ok || !result.success) {
        throw new Error(
            result.message || '공지사항을 불러오지 못했습니다.'
        )
    }

    return result.data
}

export const getNoticeById = async (id) => {
    const response = await fetch(`${API_URL}/${id}`)
    const result = await response.json()

    if (!response.ok || !result.success) {
        throw new Error(
            result.message || '공지사항을 불러오지 못했습니다.'
        )
    }

    return result.data
}

export const createNotice = async (noticeData) => {
    const token = getToken()

    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(noticeData),
    })

    const result = await response.json()

    if (!response.ok || !result.success) {
        throw new Error(
            result.message || '공지사항 등록에 실패했습니다.'
        )
    }

    return result.data
}

export const updateNotice = async (id, noticeData) => {
    const token = getToken()

    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(noticeData),
    })

    const result = await response.json()

    if (!response.ok || !result.success) {
        throw new Error(
            result.message || '공지사항 수정에 실패했습니다.'
        )
    }

    return result.data
}

export const deleteNotice = async (id) => {
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
            result.message || '공지사항 삭제에 실패했습니다.'
        )
    }

    return result.data
}