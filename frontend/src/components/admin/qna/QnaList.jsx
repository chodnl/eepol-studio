import QnaItem from './QnaItem'

function QnaList({
    qnas,
    editingQnaId,
    onAnswer,
    onCancelAnswer,
    onDelete,
    onStatusChange,
}) {
    if (qnas.length === 0) {
        return (
            <p>
                등록된 Q&A가 없습니다.
            </p>
        )
    }

    return (
        <div>
            {qnas.map((qna) => (
                <QnaItem
                    key={qna._id}
                    qna={qna}
                    editingQnaId={editingQnaId}
                    onAnswer={onAnswer}
                    onCancelAnswer={onCancelAnswer}
                    onDelete={onDelete}
                    onStatusChange={onStatusChange}
                />
            ))}
        </div>
    )
}

export default QnaList