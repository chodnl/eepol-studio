import { useEffect, useState } from 'react'

import {
    getQnas,
    answerQna,
    deleteQna,
} from '../../../components/admin/qna/qnaApi'

import QnaList from '../../../components/admin/qna/QnaList'

const ITEMS_PER_PAGE = 10

function AdminQna() {
    const [qnas, setQnas] = useState([])
    const [message, setMessage] = useState('')
    const [editingQnaId, setEditingQnaId] = useState(null)

    const [statusFilter, setStatusFilter] = useState('all')
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        const loadQnas = async () => {
            try {
                const data = await getQnas()

                setQnas(data)
            } catch (error) {
                console.error('Q&A fetch error:', error)
                setMessage(error.message)
            }
        }

        loadQnas()
    }, [])

    const handleAnswer = async (id, answer) => {
        if (!answer.trim()) {
            setMessage('답변을 입력해주세요.')
            return
        }

        try {
            const updatedQna = await answerQna(
                id,
                answer
            )

            setQnas((prev) =>
                prev.map((qna) =>
                    qna._id === updatedQna._id
                        ? updatedQna
                        : qna
                )
            )

            setEditingQnaId(null)
            setMessage('답변이 등록되었습니다.')
        } catch (error) {
            console.error('Q&A answer error:', error)
            setMessage(error.message)
        }
    }

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            '이 Q&A를 삭제하시겠습니까?'
        )

        if (!confirmed) {
            return
        }

        try {
            await deleteQna(id)

            setQnas((prev) =>
                prev.filter(
                    (qna) => qna._id !== id
                )
            )

            if (editingQnaId === id) {
                setEditingQnaId(null)
            }

            setMessage('Q&A가 삭제되었습니다.')
        } catch (error) {
            console.error('Q&A delete error:', error)
            setMessage(error.message)
        }
    }

    const handleCancelAnswer = () => {
        setEditingQnaId(null)
    }

    const handleOpenAnswer = (id) => {
        setEditingQnaId(id)
        setMessage('')
    }

    const handleFilterChange = (filter) => {
        setStatusFilter(filter)
        setCurrentPage(1)
        setEditingQnaId(null)
        setMessage('')
    }

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value)
        setCurrentPage(1)
        setEditingQnaId(null)
    }

    const filteredQnas = qnas.filter((qna) => {
        if (
            statusFilter === 'waiting' &&
            qna.status !== 'waiting'
        ) {
            return false
        }

        if (
            statusFilter === 'answered' &&
            qna.status !== 'answered'
        ) {
            return false
        }

        const keyword = searchTerm.trim().toLowerCase()

        if (!keyword) {
            return true
        }

        const title = qna.title.toLowerCase()
        const author = qna.author.toLowerCase()

        return (
            title.includes(keyword) ||
            author.includes(keyword)
        )
    })

    const totalPages = Math.ceil(
        filteredQnas.length / ITEMS_PER_PAGE
    )

    const startIndex =
        (currentPage - 1) * ITEMS_PER_PAGE

    const paginatedQnas = filteredQnas.slice(
        startIndex,
        startIndex + ITEMS_PER_PAGE
    )

    const handlePageChange = (page) => {
        setCurrentPage(page)
        setEditingQnaId(null)

        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

    return (
        <div>
            <h1>Q&A 관리</h1>

            {message && <p>{message}</p>}

            <div>
                <button
                    type="button"
                    onClick={() =>
                        handleFilterChange('all')
                    }
                >
                    전체
                </button>

                <button
                    type="button"
                    onClick={() =>
                        handleFilterChange('waiting')
                    }
                >
                    답변 대기
                </button>

                <button
                    type="button"
                    onClick={() =>
                        handleFilterChange('answered')
                    }
                >
                    답변 완료
                </button>
            </div>

            <div>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="제목 또는 작성자 검색"
                />
            </div>

            <p>
                총 {filteredQnas.length}개의 질문
            </p>

            <QnaList
                qnas={paginatedQnas}
                editingQnaId={editingQnaId}
                onAnswer={(id, answer) => {
                    if (answer === null) {
                        handleOpenAnswer(id)
                        return
                    }

                    handleAnswer(id, answer)
                }}
                onCancelAnswer={handleCancelAnswer}
                onDelete={handleDelete}
            />

            {totalPages > 1 && (
                <div>
                    <button
                        type="button"
                        disabled={currentPage === 1}
                        onClick={() =>
                            handlePageChange(
                                currentPage - 1
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
                                handlePageChange(page)
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
                            handlePageChange(
                                currentPage + 1
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

export default AdminQna