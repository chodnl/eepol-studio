import { useState } from 'react'

function QnaEditor({
    qna,
    onSave,
    onCancel,
}) {
    const [answer, setAnswer] = useState(
        qna.answer || ''
    )

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!answer.trim()) {
            return
        }

        await onSave(answer)
    }

    return (
        <form
            className="admin-qna-editor"
            onSubmit={handleSubmit}
        >
            <div className="admin-qna-editor-header">
                <div>
                    <span>
                        REPLY
                    </span>

                    <h3>
                        {qna.answer
                            ? '답변 수정'
                            : '답변 작성'}
                    </h3>
                </div>
            </div>

            <textarea
                value={answer}
                onChange={(event) =>
                    setAnswer(
                        event.target.value
                    )
                }
                placeholder="고객 문의에 대한 답변을 입력하세요."
                rows="7"
                required
            />

            <div className="admin-qna-editor-actions">
                <button
                    type="button"
                    className="admin-qna-editor-cancel"
                    onClick={onCancel}
                >
                    취소
                </button>

                <button
                    type="submit"
                    className="admin-qna-editor-submit"
                >
                    {qna.answer
                        ? '답변 수정'
                        : '답변 등록'}
                </button>
            </div>
        </form>
    )
}

export default QnaEditor