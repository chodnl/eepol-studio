function NoticeItem({
    notice,
    editingNoticeId,
    onEdit,
    onDelete,
    renderEditor,
}) {
    return (
        <div>
            {editingNoticeId === notice._id ? (
                renderEditor(notice)
            ) : (
                <>
                    <h2>{notice.title}</h2>

                    <p>{notice.content}</p>

                    <p>
                        {notice.isPinned
                            ? '📌 상단 고정'
                            : '상단 고정 안 함'}
                    </p>

                    <p>
                        {notice.isPopup
                            ? '🔔 팝업 표시'
                            : '팝업 표시 안 함'}
                    </p>

                    <p>
                        작성일:{' '}
                        {new Date(
                            notice.createdAt
                        ).toLocaleString()}
                    </p>

                    <button
                        type="button"
                        onClick={() => onEdit(notice._id)}
                    >
                        수정
                    </button>

                    <button
                        type="button"
                        onClick={() => onDelete(notice._id)}
                    >
                        삭제
                    </button>
                </>
            )}
        </div>
    )
}

export default NoticeItem