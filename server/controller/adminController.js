const jwt = require("jsonwebtoken");
const adminLogin = require('../modals/adminModal')
const bcrypt = require("bcrypt");

exports.register_admin = async (req, res) => {
    try {
        const { email, password, permission,loginType } = req.body;

        // Check if the user with the provided email already exists
        const existingUser = await adminLogin.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                status: "False",
                message: "User with this email already exists"
            });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = await adminLogin.create({ email, password: hashedPassword, permission,loginType });

        res.status(200).json({
            status: "True",
            message: "Registered Successfully",
            email: newUser.email // Return the registered email if needed
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "False",
            message: "Registration failed"
        });
    }
};

exports.login_admin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const adminFound = await adminLogin.findOne({ email });
        const isMatch = bcrypt.compare(password, adminFound.password)
        if (adminFound && isMatch) {
            const id = adminFound._id;
            const token = jwt.sign({ id }, 'Verify_token@attendance', { expiresIn: "30d" })
            res.status(200).json({
                status: "success",
                message: "Logged in successfully",
                admindata: adminFound,
                token,
                adminFound: {
                    _id: adminFound?._id,
                    email: adminFound?.email,
                    phone: adminFound?.phone,
                }

            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "False",
            message: "Registration failed"
        });
    }
};