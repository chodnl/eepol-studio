const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/database");

const galleryRoutes = require("./gallery/gallery.routes");
const pricingRoutes = require("./pricing/pricing.routes");
const noticeRoutes = require("./notice/notice.routes");
const qnaRoutes = require("./qna/qna.routes");
const locationRoutes = require("./location/location.routes");
const bookingRoutes = require("./bookings/booking.routes");
const adminRoutes = require("./admin/admin.routes");

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("EPOL STUDIO Backend");
});

app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "Backend server is running",
    });
});

app.use("/api/gallery", galleryRoutes);
app.use("/api/pricing", pricingRoutes);
app.use("/api/notice", noticeRoutes);
app.use("/api/qna", qnaRoutes);
app.use("/api/location", locationRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/admin", adminRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
