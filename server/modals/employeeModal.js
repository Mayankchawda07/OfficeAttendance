const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    password: { type: String },
    phone: { type: Number },
    salary: { type: Number },
    loginType: { type: String, default: "employee" },
    designation: { type: String },
    isBlocked: { type: Boolean },
    gender: { type: String },
    profile: { type: String },
    DOB: { type: Date },
    role: { type: mongoose.Schema.Types.ObjectId, ref: "roleSchema" },
    otp: { type: String, default: "" },
    joiningDate: { type: Date }
}, { timestamps: true });

const employee = mongoose.model('employee', EmployeeSchema);
module.exports = employee;
