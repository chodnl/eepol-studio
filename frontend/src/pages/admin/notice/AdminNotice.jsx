import { useEffect, useState } from 'react'

import {
    getNotices,
    createNotice,
    updateNotice,
    deleteNotice,
} from '../../../components/admin/notice/noticeApi'

import NoticeList from '../../../components/admin/notice/NoticeList'
import NoticeEditor from '../../../components/admin/notice/NoticeEditor'

import './AdminNotice.css'

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
        <div className="admin-notice-page">
            <section className="admin-notice-intro">
                <p className="admin-notice-eyebrow">
                    NOTICE MANAGEMENT
                </p>

                <div className="admin-notice-heading">
                    <div>
                        <h1>공지사항 관리</h1>

                        <p>
                            스튜디오의 공지사항을 등록하고
                            관리합니다.
                        </p>
                    </div>

                    {!isCreateOpen && (
                        <button
                            type="button"
                            className="admin-notice-create-button"
                            onClick={handleOpenCreate}
                        >
                            공지사항 등록
                        </button>
                    )}
                </div>
            </section>

            {message && (
                <div className="admin-notice-message">
                    {message}
                </div>
            )}

            {isCreateOpen && (
                <NoticeEditor
                    notice={null}
                    onSave={handleCreate}
                    onCancel={handleCancelCreate}
                />
            )}

            <section className="admin-notice-section">
                <div className="admin-notice-section-header">
                    <div>
                        <p>NOTICE LIST</p>
                        <h2>등록된 공지사항</h2>
                    </div>

                    <span>
                        {notices.length}건
                    </span>
                </div>

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
            </section>
        </div>
    )
}

export default AdminNotice