import { useEffect, useState } from 'react'
import './Pricing.css'

function Pricing() {
    const [pricings, setPricings] = useState([])

    useEffect(() => {
        const fetchPricing = async () => {
            try {
                const response = await fetch(
                    'http://localhost:3000/api/pricing'
                )

                const result = await response.json()

                if (!response.ok || !result.success) {
                    throw new Error(
                        result.message ||
                        '가격 정보를 불러오지 못했습니다.'
                    )
                }

                setPricings(result.data)
            } catch (error) {
                console.error(
                    'Pricing fetch error:',
                    error
                )
            }
        }

        fetchPricing()
    }, [])

    const sortedPricings = [...pricings].sort(
        (a, b) => a.order - b.order
    )

    return (
        <section className="section" id="pricing">
            <div className="section-header">
                <p className="eyebrow">pricing</p>

                <h2>
                    촬영 목적에 맞는
                    <br />
                    패키지를 선택하세요.
                </h2>
            </div>

            <div className="pricing-grid">
                {sortedPricings.map((pricing) => (
                    <article
                        key={pricing._id}
                        className="price-card"
                    >
                        <p className="plan-name">
                            {pricing.title}
                        </p>

                        <h3>
                            {pricing.basePrice.toLocaleString()}
                            원
                        </h3>

                        {pricing.options?.length > 0 && (
                            <ul>
                                {pricing.options.map(
                                    (option, index) => (
                                        <li key={index}>
                                            {option.title}
                                            {option.price > 0 && (
                                                <>
                                                    {' '}
                                                    +
                                                    {option.price.toLocaleString()}
                                                    원
                                                </>
                                            )}
                                        </li>
                                    )
                                )}
                            </ul>
                        )}

                        <a
                            href="#booking"
                            className="price-button"
                        >
                            예약 문의
                            <span>→</span>
                        </a>
                    </article>
                ))}
            </div>

            {sortedPricings.length === 0 && (
                <p>
                    등록된 가격 정보가 없습니다.
                </p>
            )}
        </section>
    )
}

export default Pricing