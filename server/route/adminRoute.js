const express = require('express');
const { register_admin, login_admin } = require('../controller/adminController')
const adminRoute = express.Router()

adminRoute.post('/adminregister', register_admin);
adminRoute.post('/login_admin', login_admin);




module.exports = adminRoute;

