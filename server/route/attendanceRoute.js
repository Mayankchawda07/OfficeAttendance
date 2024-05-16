const express = require('express');
const { addAttendance, getAllAttendance, getAttendanceByEmpID,updateAttendance,getAllAttendanceCurrentDate,CroneAttendance } = require('../controller/attendanceContrller')
const attendanceRoute = express.Router()



attendanceRoute.post('/addAttendance', addAttendance);
attendanceRoute.get('/getAllAttendance', getAllAttendance);
attendanceRoute.get('/getAttendanceByEmpID/:id', getAttendanceByEmpID);
attendanceRoute.put('/updateAttendance/:id', updateAttendance);
attendanceRoute.get('/CroneAttendance', CroneAttendance);





module.exports = attendanceRoute;