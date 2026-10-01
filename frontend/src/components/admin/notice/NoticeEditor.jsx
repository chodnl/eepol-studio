import { useState } from 'react'

import './NoticeEditor.css'

function NoticeEditor({
    notice,
    onSave,
    onCancel,
}) {
    const [title, setTitle] = useState(
        notice?.title || ''
    )

    const [content, setContent] = useState(
        notice?.content || ''
    )

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
            await onSave(
                notice._id,
                noticeData
            )
        } else {
            await onSave(noticeData)
        }
    }

    return (
        <form
            className="notice-editor"
            onSubmit={handleSubmit}
        >
            <div className="notice-editor-header">
                <div>
                    <p className="notice-editor-eyebrow">
                        {notice
                            ? 'EDIT NOTICE'
                            : 'NEW NOTICE'}
                    </p>

                    <h2>
                        {notice
                            ? '공지사항 수정'
                            : '공지사항 등록'}
                    </h2>

                    <p>
                        스튜디오의 공지사항을
                        작성하고 관리합니다.
                    </p>
                </div>
            </div>

            <div className="notice-editor-fields">
                <div className="notice-editor-field">
                    <label htmlFor="notice-title">
                        제목
                    </label>

                    <input
                        id="notice-title"
                        type="text"
                        value={title}
                        onChange={(event) =>
                            setTitle(
                                event.target.value
                            )
                        }
                        placeholder="공지사항 제목"
                        required
                    />
                </div>

                <div className="notice-editor-field">
                    <label htmlFor="notice-content">
                        내용
                    </label>

                    <textarea
                        id="notice-content"
                        value={content}
                        onChange={(event) =>
                            setContent(
                                event.target.value
                            )
                        }
                        placeholder="공지사항 내용을 입력하세요."
                        rows={10}
                        required
                    />
                </div>
            </div>

            <div className="notice-editor-options">
                <div>
                    <p className="notice-editor-options-title">
                        노출 설정
                    </p>

                    <p className="notice-editor-options-description">
                        공지사항의 노출 방식을
                        설정합니다.
                    </p>
                </div>

                <div className="notice-editor-option-list">
                    <label className="notice-editor-option">
                        <input
                            type="checkbox"
                            checked={isPinned}
                            onChange={(event) =>
                                setIsPinned(
                                    event.target
                                        .checked
                                )
                            }
                        />

                        <span>
                            <strong>
                                상단 고정
                            </strong>

                            <small>
                                공지사항 목록 상단에
                                고정합니다.
                            </small>
                        </span>
                    </label>

                    <label className="notice-editor-option">
                        <input
                            type="checkbox"
                            checked={isPopup}
                            onChange={(event) =>
                                setIsPopup(
                                    event.target
                                        .checked
                                )
                            }
                        />

                        <span>
                            <strong>
                                팝업으로 표시
                            </strong>

                            <small>
                                홈페이지에서
                                공지 팝업으로 표시합니다.
                            </small>
                        </span>
                    </label>
                </div>
            </div>

            <div className="notice-editor-footer">
                <button
                    type="button"
                    className="notice-editor-cancel"
                    onClick={onCancel}
                >
                    취소
                </button>

                <button
                    type="submit"
                    className="notice-editor-submit"
                >
                    {notice
                        ? '수정 완료'
                        : '공지사항 등록'}
                </button>
            </div>
        </form>
    )
}

export default NoticeEditor