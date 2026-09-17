const API_URL = 'http://localhost:3000/api/qna'

const getToken = () => {
    const token = localStorage.getItem('adminToken')

    if (!token) {
        throw new Error('관리자 인증이 필요합니다.')
    }

    return token
}

export const getQnas = async () => {
    const token = getToken()

    const response = await fetch(API_URL, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    const result = await response.json()

    if (!response.ok || !result.success) {
        throw new Error(
            result.message || 'Q&A 목록을 불러오지 못했습니다.'
        )
    }

    return result.data
}

export const getQnaById = async (id) => {
    const token = getToken()

    const response = await fetch(`${API_URL}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    const result = await response.json()

    if (!response.ok || !result.success) {
        throw new Error(
            result.message || 'Q&A를 불러오지 못했습니다.'
        )
    }

    return result.data
}

export const answerQna = async (id, answer) => {
    const token = getToken()

    const response = await fetch(`${API_URL}/${id}/answer`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            answer,
        }),
    })

    const result = await response.json()

    if (!response.ok || !result.success) {
        throw new Error(
            result.message || '답변 등록에 실패했습니다.'
        )
    }

    return result.data
}

export const updateQnaStatus = async (id, status) => {
    const token = getToken()

    const response = await fetch(`${API_URL}/${id}/status`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            status,
        }),
    })

    const result = await response.json()

    if (!response.ok || !result.success) {
        throw new Error(
            result.message || '상태 변경에 실패했습니다.'
        )
    }

    return result.data
}

export const deleteQna = async (id) => {
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
            result.message || 'Q&A 삭제에 실패했습니다.'
        )
    }

    return result.data
}