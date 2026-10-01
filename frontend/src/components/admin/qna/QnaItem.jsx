import QnaEditor from './QnaEditor'

function QnaItem({
    qna,
    editingQnaId,
    onAnswer,
    onCancelAnswer,
    onDelete,
}) {
    const isEditing =
        editingQnaId === qna._id

    const isAnswered =
        qna.status === 'answered'

    return (
        <article
            className={`admin-qna-item ${
                isEditing
                    ? 'is-editing'
                    : ''
            }`}
        >
            <div className="admin-qna-item-header">
                <div className="admin-qna-item-title">
                    <span className="admin-qna-item-label">
                        QUESTION
                    </span>

                    <h2>{qna.title}</h2>
                </div>

                <span
                    className={`admin-qna-status ${
                        isAnswered
                            ? 'answered'
                            : 'waiting'
                    }`}
                >
                    {isAnswered
                        ? '답변 완료'
                        : '답변 대기'}
                </span>
            </div>

            <div className="admin-qna-meta">
                <span>
                    작성자&nbsp; {qna.author}
                </span>

                <span>
                    {new Date(
                        qna.createdAt
                    ).toLocaleDateString('ko-KR')}
                </span>
            </div>

            <div className="admin-qna-question">
                <p>{qna.content}</p>
            </div>

            {qna.answer && !isEditing && (
                <div className="admin-qna-answer">
                    <span className="admin-qna-answer-label">
                        ANSWER
                    </span>

                    <p>{qna.answer}</p>
                </div>
            )}

            {isEditing ? (
                <QnaEditor
                    qna={qna}
                    onSave={(answer) =>
                        onAnswer(
                            qna._id,
                            answer
                        )
                    }
                    onCancel={onCancelAnswer}
                />
            ) : (
                <div className="admin-qna-actions">
                    <button
                        type="button"
                        className="admin-qna-answer-button"
                        onClick={() =>
                            onAnswer(
                                qna._id,
                                null
                            )
                        }
                    >
                        {qna.answer
                            ? '답변 수정'
                            : '답변 등록'}
                    </button>

                    <button
                        type="button"
                        className="admin-qna-delete-button"
                        onClick={() =>
                            onDelete(qna._id)
                        }
                    >
                        삭제
                    </button>
                </div>
            )}
        </article>
    )
}

export default QnaItem