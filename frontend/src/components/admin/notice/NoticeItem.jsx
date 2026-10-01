import './NoticeItem.css'

function NoticeItem({
    notice,
    editingNoticeId,
    onEdit,
    onDelete,
    renderEditor,
}) {
    return (
        <article
            className={`admin-notice-item ${editingNoticeId === notice._id
                    ? 'is-editing'
                    : ''
                }`}
        >
            {editingNoticeId === notice._id ? (
                renderEditor(notice)
            ) : (
                <>
                    <div className="admin-notice-item-header">
                        <div>
                            <span className="admin-notice-item-label">
                                NOTICE
                            </span>

                            <h2>
                                {notice.title}
                            </h2>
                        </div>

                        <div className="admin-notice-badges">
                            {notice.isPinned && (
                                <span className="admin-notice-badge pinned">
                                    상단 고정
                                </span>
                            )}

                            {notice.isPopup && (
                                <span className="admin-notice-badge popup">
                                    팝업 표시
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="admin-notice-content">
                        {notice.content}
                    </div>

                    <div className="admin-notice-meta">
                        <span>
                            작성일&nbsp;
                            {new Date(
                                notice.createdAt
                            ).toLocaleDateString(
                                'ko-KR'
                            )}
                        </span>
                    </div>

                    <div className="admin-notice-actions">
                        <button
                            type="button"
                            className="admin-notice-edit-button"
                            onClick={() =>
                                onEdit(
                                    notice._id
                                )
                            }
                        >
                            수정
                        </button>

                        <button
                            type="button"
                            className="admin-notice-delete-button"
                            onClick={() =>
                                onDelete(
                                    notice._id
                                )
                            }
                        >
                            삭제
                        </button>
                    </div>
                </>
            )}
        </article>
    )
}

export default NoticeItem