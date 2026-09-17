import { useEffect, useState } from 'react'

import {
    getNotices,
    createNotice,
    updateNotice,
    deleteNotice,
} from '../../../components/admin/notice/noticeApi'

import NoticeList from '../../../components/admin/notice/NoticeList'
import NoticeEditor from '../../../components/admin/notice/NoticeEditor'

function AdminNotice() {
    const [notices, setNotices] = useState([])
    const [editingNoticeId, setEditingNoticeId] = useState(null)
    const [isCreateOpen, setIsCreateOpen] = useState(false)
    const [message, setMessage] = useState('')

    useEffect(() => {
        const loadNotices = async () => {
            try {
                const data = await getNotices()
                setNotices(data)
            } catch (error) {
                console.error('Notice fetch error:', error)
                setMessage(error.message)
            }
        }

        loadNotices()
    }, [])

    const handleOpenCreate = () => {
        setIsCreateOpen(true)
        setEditingNoticeId(null)
        setMessage('')
    }

    const handleCancelCreate = () => {
        setIsCreateOpen(false)
    }

    const handleCreate = async (noticeData) => {
        try {
            const createdNotice =
                await createNotice(noticeData)

            setNotices((prev) => [
                createdNotice,
                ...prev,
            ])

            setIsCreateOpen(false)
            setMessage('공지사항이 등록되었습니다.')
        } catch (error) {
            console.error('Notice create error:', error)
            setMessage(error.message)
        }
    }

    const handleEdit = (id) => {
        setEditingNoticeId(id)
        setIsCreateOpen(false)
        setMessage('')
    }

    const handleCancelEdit = () => {
        setEditingNoticeId(null)
    }

    const handleUpdate = async (id, noticeData) => {
        try {
            const updatedNotice =
                await updateNotice(id, noticeData)

            setNotices((prev) =>
                prev.map((notice) =>
                    notice._id === updatedNotice._id
                        ? updatedNotice
                        : notice
                )
            )

            setEditingNoticeId(null)
            setMessage('공지사항이 수정되었습니다.')
        } catch (error) {
            console.error('Notice update error:', error)
            setMessage(error.message)
        }
    }

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            '이 공지사항을 삭제하시겠습니까?'
        )

        if (!confirmed) {
            return
        }

        try {
            await deleteNotice(id)

            setNotices((prev) =>
                prev.filter(
                    (notice) => notice._id !== id
                )
            )

            if (editingNoticeId === id) {
                setEditingNoticeId(null)
            }

            setMessage('공지사항이 삭제되었습니다.')
        } catch (error) {
            console.error('Notice delete error:', error)
            setMessage(error.message)
        }
    }

    return (
        <div>
            <h1>공지사항 관리</h1>

            <button
                type="button"
                onClick={handleOpenCreate}
            >
                공지사항 등록
            </button>

            {message && <p>{message}</p>}

            {isCreateOpen && (
                <NoticeEditor
                    notice={null}
                    onSave={handleCreate}
                    onCancel={handleCancelCreate}
                />
            )}

            <NoticeList
                notices={notices}
                editingNoticeId={editingNoticeId}
                onEdit={handleEdit}
                onDelete={handleDelete}
                renderEditor={(notice) => (
                    <NoticeEditor
                        notice={notice}
                        onSave={handleUpdate}
                        onCancel={handleCancelEdit}
                    />
                )}
            />
        </div>
    )
}

export default AdminNotice