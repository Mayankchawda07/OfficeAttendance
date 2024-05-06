const mongoose = require('mongoose')

const leaveSchema = new mongoose.Schema({
    employeeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employee'
    },
    fromDate: {
        type: Date
    },
    tooDate: {
        type: Date
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    status: {
        type: String,
        default: 'pending'
    },
    remark: {
        type: String
    }
}, { timestamps: true })

const leaves = mongoose.model('leaves', leaveSchema)
module.exports = leaves;