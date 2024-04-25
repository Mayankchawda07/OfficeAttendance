const mongoose = require('mongoose')
const loginSchema = new mongoose.Schema({
    username: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String,
    },
    phone: {
        type: String,
    },
    loginType: {
        type: String,
    },
    isblocked: {
        type: String,
    },
    permission: [
        {
            type: String,
            default: [
                1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
                21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
            ],
        },
    ],

}, { timestamps: true });

const adminLogin = mongoose.model('adminLogin', loginSchema)
module.exports = adminLogin;