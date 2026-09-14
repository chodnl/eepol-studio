const getLocation = async (req, res) => {
    try {
        res.json({
            success: true,
            data: {
                address: "",
                parking: "",
                directions: "",
                kakaoMapUrl: "",
                naverMapUrl: "",
            },
        });
    } catch (error) {
        console.error("Get location error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch location",
        });
    }
};

module.exports = {
    getLocation,
};