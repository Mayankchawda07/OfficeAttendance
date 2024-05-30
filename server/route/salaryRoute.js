const express = require('express')
const { addsalary, getSalaryByEmpID } = require('../controller/salaryController')
const salaryRoutes = express.Router();

salaryRoutes.post('/addsalary', addsalary);
salaryRoutes.get('/getSalaryByEmpID/:id', getSalaryByEmpID);




module.exports = salaryRoutes