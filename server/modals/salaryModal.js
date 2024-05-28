const mongoose = require('mongoose')

const salarySchema = new mongoose.Schema({
    employeeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "employee"
    },
    salary: {
        type: Number
    },
}, { timestamps: true })

const salary = mongoose.model('salary', salarySchema)
module.exports = salary