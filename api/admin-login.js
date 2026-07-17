const connectDB = require("../config/db");
const Admin = require("../models/Admin");
const verifyAdmin = require("../middleware/auth");

module.exports = async (req, res) => {

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET,PUT,DELETE,OPTIONS"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
    );

    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    try {

        await connectDB();

        // Check Admin Token
        if (!verifyAdmin(req)) {
            return res.status(401).json({
                message: "Unauthorized Access"
            });
        }

        // Get Admin Details
        if (req.method === "GET") {

            const admins = await Admin.find({}, "-password");

            return res.status(200).json(admins);

        }

        // Update Admin
        if (req.method === "PUT") {

            const {
                id,
                username,
                email,
                role
            } = req.body;

            const admin = await Admin.findByIdAndUpdate(
                id,
                {
                    username,
                    email,
                    role
                },
                {
                    new: true
                }
            ).select("-password");

            return res.status(200).json({
                message: "Admin Updated Successfully",
                admin
            });

        }

        // Delete Admin
        if (req.method === "DELETE") {

            const { id } = req.body;

            await Admin.findByIdAndDelete(id);

            return res.status(200).json({
                message: "Admin Deleted Successfully"
            });

        }

        return res.status(405).json({
            message: "Method Not Allowed"
        });

    }
    catch (error) {

        console.log(error);

        return res.status(500).json({
            message: error.message
        });

    }

};