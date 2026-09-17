import { useState } from 'react'

function QnaEditor({ qna, onSave, onCancel }) {
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
        <form onSubmit={handleSubmit}>
            <h3>답변 작성</h3>

            <textarea
                value={answer}
                onChange={(event) =>
                    setAnswer(event.target.value)
                }
                placeholder="답변을 입력하세요."
                rows="6"
                required
            />

            <div>
                <button type="submit">
                    {qna.answer ? '답변 수정' : '답변 등록'}
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

export default QnaEditor