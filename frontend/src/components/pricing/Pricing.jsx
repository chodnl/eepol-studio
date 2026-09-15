const pricePackages = [
    {
        name: '베이직',
        price: '290,000원',
        description: '1인 촬영 1시간 + 보정 10컷',
        features: [
            '1시간 촬영',
            '기본 보정 10컷',
            '기본 액자 1개',
        ],
    },
    {
        name: '프리미엄',
        price: '590,000원',
        description: '1인/커플 촬영 2시간 + 스타일링',
        features: [
            '2시간 촬영',
            '드레스/정장 스타일링',
            '보정 20컷',
            '원본 이미지 제공',
        ],
    },
    {
        name: '브라이덜',
        price: '990,000원',
        description: '웨딩/가족 스토리 전용 패키지',
        features: [
            '전문 촬영팀',
            '촬영장소 섭외',
            '예식장 연계 편집',
            '스토리북 제작',
        ],
    },
]

function Pricing({ onSelectPackage }) {
    return (
        <section className="section" id="pricing">
            <div className="section-header">
                <p className="eyebrow">pricing</p>
                <h2>합리적인 패키지 가격</h2>
            </div>

            <div className="pricing-grid">
                {pricePackages.map((item) => (
                    <article key={item.name} className="price-card">
                        <p className="plan-name">{item.name}</p>

                        <h3>{item.price}</h3>

                        <p className="plan-description">
                            {item.description}
                        </p>

                        <ul>
                            {item.features.map((feature) => (
                                <li key={feature}>{feature}</li>
                            ))}
                        </ul>

                        <button
                            type="button"
                            onClick={() => onSelectPackage(item.name)}
                        >
                            선택하기
                        </button>
                    </article>
                ))}
            </div>
        </section>
    )
}

export default Pricing