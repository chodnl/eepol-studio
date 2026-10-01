import PricingItem from './PricingItem'

function PricingList({
    pricings,
    editingPricingId,
    onEdit,
    onDelete,
    renderEditor,
}) {
    if (pricings.length === 0) {
        return (
            <div className="pricing-empty">
                <p>등록된 가격 정보가 없습니다.</p>
                <span>
                    새로운 촬영 패키지를 등록해주세요.
                </span>
            </div>
        )
    }

    const sortedPricings = [...pricings].sort(
        (a, b) => a.order - b.order
    )

    return (
        <div className="pricing-list">
            {sortedPricings.map((pricing) => (
                <PricingItem
                    key={pricing._id}
                    pricing={pricing}
                    editingPricingId={editingPricingId}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    renderEditor={renderEditor}
                />
            ))}
        </div>
    )
}

export default PricingList