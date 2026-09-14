const bcrypt = require("bcryptjs");
const Admin = require("./admin.model");

const findAdminByUsername = async (username) => {
    return await Admin.findOne({ username });
};

const createAdmin = async (username, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    return await Admin.create({
        username,
        password: hashedPassword,
    });
};

const verifyAdminPassword = async (admin, password) => {
    return await bcrypt.compare(password, admin.password);
};

module.exports = {
    findAdminByUsername,
    createAdmin,
    verifyAdminPassword,
};