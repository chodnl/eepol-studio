const adminService = require("./admin.service");
const jwt = require("jsonwebtoken");

const loginAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: "Username and password are required",
            });
        }

        const admin = await adminService.findAdminByUsername(username);

        if (!admin) {
            return res.status(401).json({
                success: false,
                message: "Invalid username or password",
            });
        }

        const isMatch = await adminService.verifyAdminPassword(
            admin,
            password
        );

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid username or password",
            });
        }

        const token = jwt.sign(
            {
                id: admin._id,
                username: admin.username,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "30d",
            }
        );

        res.json({
            success: true,
            message: "Admin login successful",
            data: {
                id: admin._id,
                username: admin.username,
                token,
            },
        });
    } catch (error) {
        console.error("Admin login error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to login",
        });
    }
};

module.exports = {
    loginAdmin,
};