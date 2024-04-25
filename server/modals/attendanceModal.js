const mongoose = require('mongoose')

const AttendanceSchema = new mongoose.Schema({
    employeeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employee'
    },
    attend: {
        type: Number,
        default: 0
    },
    login: {
        type: Date
    },
    logout: {
        type: Date
    }
},
    { timestamps: true });

const attendance = mongoose.model('attendance', AttendanceSchema)
module.exports = attendance;