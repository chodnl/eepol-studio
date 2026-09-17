import { useState } from 'react'

function PricingEditor({ pricing, onSave, onCancel }) {
    const [title, setTitle] = useState(pricing?.title || '')
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

    const handleOptionChange = (index, field, value) => {
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
            .filter((option) => option.title.trim())
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
            await onSave(pricing._id, pricingData)
        } else {
            await onSave(pricingData)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>
                {pricing
                    ? '가격 수정'
                    : '가격 등록'}
            </h2>

            <div>
                <label htmlFor="pricing-title">
                    가격 제목
                </label>

                <input
                    id="pricing-title"
                    type="text"
                    value={title}
                    onChange={(event) =>
                        setTitle(event.target.value)
                    }
                    placeholder="예: 프로필 촬영"
                    required
                />
            </div>

            <div>
                <label htmlFor="pricing-base-price">
                    기본 가격
                </label>

                <input
                    id="pricing-base-price"
                    type="number"
                    min="0"
                    value={basePrice}
                    onChange={(event) =>
                        setBasePrice(event.target.value)
                    }
                    placeholder="50000"
                    required
                />
            </div>

            <div>
                <h3>추가 옵션</h3>

                {options.map((option, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            value={option.title}
                            onChange={(event) =>
                                handleOptionChange(
                                    index,
                                    'title',
                                    event.target.value
                                )
                            }
                            placeholder="옵션 이름"
                        />

                        <input
                            type="number"
                            min="0"
                            value={option.price}
                            onChange={(event) =>
                                handleOptionChange(
                                    index,
                                    'price',
                                    event.target.value
                                )
                            }
                            placeholder="20000"
                        />

                        <button
                            type="button"
                            onClick={() =>
                                handleRemoveOption(index)
                            }
                        >
                            옵션 삭제
                        </button>
                    </div>
                ))}

                <button
                    type="button"
                    onClick={handleAddOption}
                >
                    옵션 추가
                </button>
            </div>

            <div>
                <button type="submit">
                    {pricing
                        ? '수정'
                        : '등록'}
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

export default PricingEditor