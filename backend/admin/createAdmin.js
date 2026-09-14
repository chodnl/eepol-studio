require("dotenv").config();

const connectDB = require("../config/database");
const adminService = require("./admin.service");

const createInitialAdmin = async () => {
    try {
        await connectDB();

        const username = "admin";
        const password = "admin1234";

        const existingAdmin = await adminService.findAdminByUsername(username);

        if (existingAdmin) {
            console.log("Admin already exists");
            process.exit(0);
        }

        await adminService.createAdmin(username, password);

        console.log("Initial admin created");
        process.exit(0);
    } catch (error) {
        console.error("Create admin error:", error);
        process.exit(1);
    }
};

createInitialAdmin();