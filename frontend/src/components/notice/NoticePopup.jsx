import './Notice.css'

function NoticePopup({ notice, onClose, onHideToday }) {
    if (!notice) {
        return null
    }

    return (
        <div className="notice-popup-backdrop">
            <div className="notice-popup">
                <button
                    type="button"
                    className="notice-popup-close"
                    onClick={onClose}
                >
                    ×
                </button>

                <p className="notice-popup-eyebrow">
                    NOTICE
                </p>

                <h2>
                    {notice.title}
                </h2>

                <div className="notice-popup-date">
                    {notice.createdAt
                        ? new Date(
                            notice.createdAt
                        ).toLocaleDateString('ko-KR')
                        : '-'}
                </div>

                <div className="notice-popup-content">
                    {notice.content}
                </div>

                <button
                    type="button"
                    className="notice-popup-button"
                    onClick={onClose}
                >
                    닫기
                </button>
                <button
                    type="button"
                    className="notice-popup-hide-today"
                    onClick={onHideToday}
                >
                    오늘 하루 보지 않기
                </button>
            </div>
        </div>
    )
}

export default NoticePopup

