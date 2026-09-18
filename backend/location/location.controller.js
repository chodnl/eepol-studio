const getLocation = async (req, res) => {
    try {
        res.json({
            success: true,
            data: {
                address: "화도진로102번길 14 이풀스튜디오",
                addressDetail: "지번 화수동 286-42",
                phone: "0507-1390-3591",
                hours: "월 - 토 11:00 - 17:00",
                closed: "매주 일요일 정기휴무",
                parking: "주차 가능",
                directions:
                    "동인천역 4번 출구에서 약 634m / 네이버에 이풀스튜디오 검색후 cu 골목으로 올라오신후 네네치킨 옆 골목으로 좌회전 해주시면 됩니다:) 스튜디오 앞 라인에 주차 1대 가능 (주차되어있는 경우 공영주차장 및 노상주차 이용해주세요)",
                naverMapUrl:
                    "https://map.naver.com/p/entry/place/2013301870?placePath=%252Fhome%253Fentry%253Dplt&searchType=place&lng=126.6299059&lat=37.4802520",
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