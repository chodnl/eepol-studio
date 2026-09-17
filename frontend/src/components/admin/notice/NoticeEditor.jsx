import { useState } from 'react'

function NoticeEditor({ notice, onSave, onCancel }) {
    const [title, setTitle] = useState(notice?.title || '')
    const [content, setContent] = useState(notice?.content || '')
    const [isPinned, setIsPinned] = useState(
        notice?.isPinned || false
    )
    const [isPopup, setIsPopup] = useState(
        notice?.isPopup || false
    )

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!title.trim()) {
            return
        }

        if (!content.trim()) {
            return
        }

        const noticeData = {
            title: title.trim(),
            content: content.trim(),
            isPinned,
            isPopup,
        }

        if (notice) {
            await onSave(notice._id, noticeData)
        } else {
            await onSave(noticeData)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>
                {notice ? '공지사항 수정' : '공지사항 등록'}
            </h2>

            <div>
                <label htmlFor="notice-title">
                    제목
                </label>

                <input
                    id="notice-title"
                    type="text"
                    value={title}
                    onChange={(event) =>
                        setTitle(event.target.value)
                    }
                    placeholder="공지사항 제목"
                    required
                />
            </div>

            <div>
                <label htmlFor="notice-content">
                    내용
                </label>

                <textarea
                    id="notice-content"
                    value={content}
                    onChange={(event) =>
                        setContent(event.target.value)
                    }
                    placeholder="공지사항 내용을 입력하세요."
                    rows="10"
                    required
                />
            </div>

            <div>
                <label>
                    <input
                        type="checkbox"
                        checked={isPinned}
                        onChange={(event) =>
                            setIsPinned(event.target.checked)
                        }
                    />

                    상단 고정
                </label>
            </div>

            <div>
                <label>
                    <input
                        type="checkbox"
                        checked={isPopup}
                        onChange={(event) =>
                            setIsPopup(event.target.checked)
                        }
                    />

                    팝업으로 표시
                </label>
            </div>

            <div>
                <button type="submit">
                    {notice ? '수정' : '등록'}
                </button>

                <button
                    type="button"
                    onClick={onCancel}
                >
                    취소
                </button>
            </div>
        </form>
    )
}

export default NoticeEditor