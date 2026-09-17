function PricingItem({
    pricing,
    editingPricingId,
    onEdit,
    onDelete,
    renderEditor,
}) {
    return (
        <div>
            {editingPricingId === pricing._id ? (
                renderEditor(pricing)
            ) : (
                <>
                    <h2>{pricing.title}</h2>

                    <p>
                        순서: {pricing.order}
                    </p>

                    <p>
                        기본 가격:{' '}
                        {pricing.basePrice.toLocaleString()}
                        원
                    </p>

                    {pricing.options?.length > 0 && (
                        <div>
                            <h3>추가 옵션</h3>

                            {pricing.options.map(
                                (option, index) => (
                                    <div key={index}>
                                        <span>
                                            {option.title}
                                        </span>

                                        <span>
                                            {' '}
                                            {option.price.toLocaleString()}
                                            원
                                        </span>
                                    </div>
                                )
                            )}
                        </div>
                    )}

                    <button
                        type="button"
                        onClick={() =>
                            onEdit(pricing._id)
                        }
                    >
                        수정
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            onDelete(pricing._id)
                        }
                    >
                        삭제
                    </button>
                </>
            )}
        </div>
    )
}

export default PricingItem