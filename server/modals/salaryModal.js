const mongoose = require('mongoose')

const salarySchema = new mongoose.Schema({
    employeeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "employee"
    },
    salary: {
        type: Number
    },
    salaryOfMonth: {
        type: String
    },
    remark: {
        type: String
    }
}, { timestamps: true })

const salary = mongoose.model('salary', salarySchema)
module.exports = salary