import QnaEditor from './QnaEditor'

function QnaItem({
    qna,
    editingQnaId,
    onAnswer,
    onCancelAnswer,
    onDelete,
}) {
    return (
        <div>
            <h2>{qna.title}</h2>

            <p>작성자: {qna.author}</p>

            <p>
                작성일:{' '}
                {new Date(qna.createdAt).toLocaleString()}
            </p>

            <p>
                상태:{' '}
                {qna.status === 'answered'
                    ? '답변 완료'
                    : '답변 대기'}
            </p>

            <p>{qna.content}</p>

            {qna.answer && (
                <div>
                    <strong>답변</strong>
                    <p>{qna.answer}</p>
                </div>
            )}

            {editingQnaId === qna._id ? (
                <QnaEditor
                    qna={qna}
                    onSave={(answer) =>
                        onAnswer(qna._id, answer)
                    }
                    onCancel={onCancelAnswer}
                />
            ) : (
                <button
                    type="button"
                    onClick={() =>
                        onAnswer(qna._id, null)
                    }
                >
                    {qna.answer
                        ? '답변 수정'
                        : '답변 등록'}
                </button>
            )}

            <button
                type="button"
                onClick={() =>
                    onDelete(qna._id)
                }
            >
                삭제
            </button>
        </div>
    )
}

export default QnaItem