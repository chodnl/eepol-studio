import NoticeItem from './NoticeItem'

function NoticeList({
    notices,
    editingNoticeId,
    onEdit,
    onDelete,
    renderEditor,
}) {
    if (notices.length === 0) {
        return (
            <div className="admin-notice-empty">
                <p className="admin-notice-empty-label">
                    NOTICE
                </p>

                <h3>등록된 공지사항이 없습니다.</h3>

                <p>
                    새로운 공지사항을 등록하면
                    이곳에 표시됩니다.
                </p>
            </div>
        )
    }

    return (
        <div className="admin-notice-list">
            {notices.map((notice) => (
                <NoticeItem
                    key={notice._id}
                    notice={notice}
                    editingNoticeId={editingNoticeId}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    renderEditor={renderEditor}
                />
            ))}
        </div>
    )
}

export default NoticeList