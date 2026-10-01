import './PricingItem.css'

function PricingItem({
    pricing,
    editingPricingId,
    onEdit,
    onDelete,
    renderEditor,
}) {
    if (editingPricingId === pricing._id) {
        return (
            <div className="pricing-item pricing-item-editing">
                {renderEditor(pricing)}
            </div>
        )
    }

    return (
        <article className="pricing-item">
            <div className="pricing-item-top">
                <span className="pricing-item-order">
                    {String(pricing.order).padStart(2, '0')}
                </span>

                <div className="pricing-item-actions">
                    <button
                        type="button"
                        className="pricing-edit-button"
                        onClick={() =>
                            onEdit(pricing._id)
                        }
                    >
                        수정
                    </button>

                    <button
                        type="button"
                        className="pricing-delete-button"
                        onClick={() =>
                            onDelete(pricing._id)
                        }
                    >
                        삭제
                    </button>
                </div>
            </div>

            <div className="pricing-item-main">
                <div className="pricing-item-title">
                    <p>PHOTO PACKAGE</p>

                    <h2>{pricing.title}</h2>
                </div>

                <div className="pricing-item-price">
                    <span>기본 가격</span>

                    <strong>
                        {pricing.basePrice.toLocaleString()}
                        <small>원</small>
                    </strong>
                </div>
            </div>

            {pricing.options?.length > 0 && (
                <div className="pricing-item-options">
                    <div className="pricing-options-header">
                        <h3>추가 옵션</h3>

                        <span>
                            {pricing.options.length} OPTIONS
                        </span>
                    </div>

                    <div className="pricing-options-list">
                        {pricing.options.map(
                            (option, index) => (
                                <div
                                    className="pricing-option"
                                    key={index}
                                >
                                    <span>
                                        {option.title}
                                    </span>

                                    <strong>
                                        +
                                        {option.price.toLocaleString()}
                                        원
                                    </strong>
                                </div>
                            )
                        )}
                    </div>
                </div>
            )}
        </article>
    )
}

export default PricingItem