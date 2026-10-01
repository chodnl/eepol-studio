import { useState } from 'react'

import './PricingEditor.css'

function PricingEditor({ pricing, onSave, onCancel }) {
    const [title, setTitle] = useState(
        pricing?.title || ''
    )

    const [basePrice, setBasePrice] = useState(
        pricing?.basePrice ?? ''
    )

    const [options, setOptions] = useState(
        pricing?.options || []
    )

    const handleAddOption = () => {
        setOptions((prev) => [
            ...prev,
            {
                title: '',
                price: '',
            },
        ])
    }

    const handleOptionChange = (
        index,
        field,
        value
    ) => {
        setOptions((prev) =>
            prev.map((option, optionIndex) =>
                optionIndex === index
                    ? {
                        ...option,
                        [field]: value,
                    }
                    : option
            )
        )
    }

    const handleRemoveOption = (index) => {
        setOptions((prev) =>
            prev.filter(
                (_, optionIndex) =>
                    optionIndex !== index
            )
        )
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!title.trim()) {
            return
        }

        if (basePrice === '') {
            return
        }

        const cleanedOptions = options
            .filter((option) =>
                option.title.trim()
            )
            .map((option) => ({
                title: option.title.trim(),
                price: Number(option.price) || 0,
            }))

        const pricingData = {
            title: title.trim(),
            basePrice: Number(basePrice),
            options: cleanedOptions,
        }

        if (pricing) {
            await onSave(
                pricing._id,
                pricingData
            )
        } else {
            await onSave(pricingData)
        }
    }

    return (
        <form
            className="pricing-editor"
            onSubmit={handleSubmit}
        >
            <div className="pricing-editor-header">
                <div>
                    <p className="pricing-editor-eyebrow">
                        {pricing
                            ? 'EDIT PACKAGE'
                            : 'NEW PACKAGE'}
                    </p>

                    <h2>
                        {pricing
                            ? '가격 수정'
                            : '가격 등록'}
                    </h2>

                    <p>
                        촬영 패키지의 기본 가격과
                        추가 옵션을 설정합니다.
                    </p>
                </div>
            </div>

            <div className="pricing-editor-fields">
                <div className="pricing-editor-field">
                    <label htmlFor="pricing-title">
                        가격 제목
                    </label>

                    <input
                        id="pricing-title"
                        type="text"
                        value={title}
                        onChange={(event) =>
                            setTitle(
                                event.target.value
                            )
                        }
                        placeholder="예: 프로필 촬영"
                        required
                    />
                </div>

                <div className="pricing-editor-field">
                    <label htmlFor="pricing-base-price">
                        기본 가격
                    </label>

                    <div className="pricing-price-input">
                        <input
                            id="pricing-base-price"
                            type="number"
                            min="0"
                            value={basePrice}
                            onChange={(event) =>
                                setBasePrice(
                                    event.target.value
                                )
                            }
                            placeholder="150000"
                            required
                        />

                        <span>원</span>
                    </div>
                </div>
            </div>

            <div className="pricing-editor-options">
                <div className="pricing-editor-options-header">
                    <div>
                        <h3>추가 옵션</h3>

                        <p>
                            촬영 패키지에 추가할
                            선택 항목입니다.
                        </p>
                    </div>

                    <button
                        type="button"
                        className="pricing-add-option-button"
                        onClick={handleAddOption}
                    >
                        + 옵션 추가
                    </button>
                </div>

                {options.length > 0 ? (
                    <div className="pricing-editor-option-list">
                        {options.map(
                            (option, index) => (
                                <div
                                    className="pricing-editor-option"
                                    key={index}
                                >
                                    <input
                                        type="text"
                                        value={
                                            option.title
                                        }
                                        onChange={(
                                            event
                                        ) =>
                                            handleOptionChange(
                                                index,
                                                'title',
                                                event
                                                    .target
                                                    .value
                                            )
                                        }
                                        placeholder="옵션 이름"
                                    />

                                    <div className="pricing-option-price">
                                        <input
                                            type="number"
                                            min="0"
                                            value={
                                                option.price
                                            }
                                            onChange={(
                                                event
                                            ) =>
                                                handleOptionChange(
                                                    index,
                                                    'price',
                                                    event
                                                        .target
                                                        .value
                                                )
                                            }
                                            placeholder="30000"
                                        />

                                        <span>
                                            원
                                        </span>
                                    </div>

                                    <button
                                        type="button"
                                        className="pricing-remove-option"
                                        onClick={() =>
                                            handleRemoveOption(
                                                index
                                            )
                                        }
                                    >
                                        삭제
                                    </button>
                                </div>
                            )
                        )}
                    </div>
                ) : (
                    <div className="pricing-no-options">
                        <span>
                            등록된 추가 옵션이 없습니다.
                        </span>
                    </div>
                )}
            </div>

            <div className="pricing-editor-footer">
                <button
                    type="button"
                    className="pricing-editor-cancel"
                    onClick={onCancel}
                >
                    취소
                </button>

                <button
                    type="submit"
                    className="pricing-editor-submit"
                >
                    {pricing
                        ? '수정 완료'
                        : '가격 등록'}
                </button>
            </div>
        </form>
    )
}

export default PricingEditor