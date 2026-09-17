import NoticeItem from './NoticeItem'

function NoticeList({
    notices,
    editingNoticeId,
    onEdit,
    onDelete,
    renderEditor,
}) {
    if (notices.length === 0) {
        return <p>등록된 공지사항이 없습니다.</p>
    }

    return (
        <div>
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