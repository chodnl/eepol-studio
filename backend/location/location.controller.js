const getLocation = async (req, res) => {
    try {
        res.json({
            success: true,
            data: {
                address: "서울특별시 강남구 테헤란로 123",
                parking: "건물 지하 2층 무료 주차 가능",
                directions: "강남역 5번 출구 도보 5분",
                kakaoMapUrl: "https://map.kakao.com/",
                naverMapUrl: "https://map.naver.com/",
            },
        })
    } catch (error) {
        console.error("Get location error:", error)

        res.status(500).json({
            success: false,
            message: "Failed to fetch location",
        })
    }
}

module.exports = {
    getLocation,
}