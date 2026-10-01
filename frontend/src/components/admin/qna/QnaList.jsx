import QnaItem from './QnaItem'

function QnaList({
    qnas,
    editingQnaId,
    onAnswer,
    onCancelAnswer,
    onDelete,
}) {
    if (qnas.length === 0) {
        return (
            <div className="admin-qna-empty">
                등록된 Q&A가 없습니다.
            </div>
        )
    }

    return (
        <div className="admin-qna-items">
            {qnas.map((qna) => (
                <QnaItem
                    key={qna._id}
                    qna={qna}
                    editingQnaId={editingQnaId}
                    onAnswer={onAnswer}
                    onCancelAnswer={onCancelAnswer}
                    onDelete={onDelete}
                />
            ))}
        </div>
    )
}

export default QnaList