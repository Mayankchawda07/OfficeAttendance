const jwt = require("jsonwebtoken");
const employee = require('../modals/employeeModal')
const bcrypt = require("bcrypt");



exports.addEmployee = async (req, res) => {
    const { name, email, phone, password, salary, loginType, designation, isBlocked, gender, profile, DOB, role } = req.body;

    if (!name || !email || !phone || !password) {
        return res.status(422).json({ error: 'Please fill all fields properly' });
    }

    try {
        // Check if the user with the provided email already exists
        const existingEmployee = await employee.findOne({ email });

        if (existingEmployee) {
            return res.status(400).json({
                status: "False",
                message: "Employee with this email already exists"
            });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new employee
        const newEmployee = await employee.create({ name, email, phone, password: hashedPassword, salary, loginType, designation, isBlocked, gender, profile, DOB, role });

        res.status(200).json({
            status: "True",
            message: "Employee Registered Successfully",
            email: newEmployee.email // Return the registered email if needed
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "False",
            message: "Employee Registration Failed"
        });
    }
};


exports.updateEmployee = async (req, res) => {
    const { name, email, phone, password, salary, loginType, designation, isBlocked, gender, profile, DOB, role } = req.body;
    const getusername = await employee.findById(req.params.id);
    const na = getusername.name;
    const data = await employee.findByIdAndUpdate(
        req.params.id,
        { name, email, phone, password, salary, loginType, designation, isBlocked, gender, profile, DOB, role },
        { new: true }
    );
    res.status(200).json({
        status: "success",
        message: " Data Updated",
        id: req.params.id
        // data: data,
    });
};

exports.getEmployee = async (req, res) => {
    const datas = await employee.find().populate('role').sort({createdAt:-1});
    res.status(200).json({
        status: "success",
        message: "Employees found successfully",
        data: datas,
    });
};

exports.getSingleEmpolyee = async (req, res) => {
    try {
        const userFound = await employee.findById(req.params.id).populate('role');
        res.status(200).json({
            status: "success",
            message: " Data Found",
            data: userFound,
        });
    } catch (error) {
        next(appErr(error.message));
    }
};

exports.login_employee = async (req, res) => {
    try {
        const { email, password } = req.body;

        const adminFound = await employee.findOne({ email }).populate('role');
        const isMatch = bcrypt.compare(password, adminFound.password)
        if (adminFound && isMatch) {
            const id = adminFound._id;
            const token = jwt.sign({ id }, 'Verify_token@attendance', { expiresIn: "30d" })
            res.status(200).json({
                status: "success",
                message: "Logged in successfully",
                admindata: adminFound,
                adminFound: {
                    _id: adminFound?._id,
                    token,
                    email: adminFound?.email,
                    phone: adminFound?.phone,
                }

            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "False",
            message: "Login failed"
        });
    }
};