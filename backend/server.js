const express = require("express");
const galleryRoutes = require("./gallery/gallery.routes");

const app = express();
const PORT = 3000;

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

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});