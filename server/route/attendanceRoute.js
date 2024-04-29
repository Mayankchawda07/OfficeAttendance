const express = require('express');
const { addAttendance, getAllAttendance, getAttendanceByEmpID,updateAttendance,getAllAttendanceCurrentDate } = require('../controller/attendanceContrller')
const attendanceRoute = express.Router()



attendanceRoute.post('/addAttendance', addAttendance);
attendanceRoute.get('/getAllAttendance', getAllAttendance);
attendanceRoute.get('/getAttendanceByEmpID/:id', getAttendanceByEmpID);
attendanceRoute.put('/updateAttendance/:id', updateAttendance);




module.exports = attendanceRoute;