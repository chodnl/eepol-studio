import PricingItem from './PricingItem'

function PricingList({
    pricings,
    editingPricingId,
    onEdit,
    onDelete,
    renderEditor,
}) {
    if (pricings.length === 0) {
        return <p>등록된 가격 정보가 없습니다.</p>
    }

    const sortedPricings = [...pricings].sort(
        (a, b) => a.order - b.order
    )

    return (
        <div>
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