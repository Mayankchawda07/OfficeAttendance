const express = require('express')
const { addEmployee, getEmployee, getSingleEmpolyee, updateEmployee, login_employee,forgetpassword } = require('../controller/employrrController')
const adminRoutes = express.Router();

adminRoutes.post('/LoginEmployee', login_employee)
adminRoutes.post('/AddEmployee', addEmployee)
adminRoutes.get('/getEmployee', getEmployee)
adminRoutes.get('/getEmployeeByid/:id', getSingleEmpolyee)
adminRoutes.put('/updateEmployeeByid/:id', updateEmployee)
adminRoutes.post('/forgetpassword', forgetpassword)




module.exports = adminRoutes