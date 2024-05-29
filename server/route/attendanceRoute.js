const express = require('express');
const { addAttendance, getAllAttendance, getAttendanceByEmpID,updateAttendance,getAllAttendanceCurrentDate,CroneAttendance,getTodayAttendance,getAttendanceDaysByEmpID,croneServer,calculateMonthlySalaries,getAttendanceByEmpIdDashboard } = require('../controller/attendanceContrller')
const attendanceRoute = express.Router()



attendanceRoute.post('/addAttendance', addAttendance);
attendanceRoute.get('/getAllAttendance', getAllAttendance);
attendanceRoute.get('/getAttendanceByEmpID/:id', getAttendanceByEmpID);
attendanceRoute.put('/updateAttendance/:id', updateAttendance);
attendanceRoute.get('/CroneAttendance', CroneAttendance);
attendanceRoute.get('/getTodayAttendance', getTodayAttendance);
attendanceRoute.get('/getAttendanceDaysByEmpID/:id', getAttendanceDaysByEmpID);
attendanceRoute.get('/getAttendanceByEmpIdDashboard/:id', getAttendanceByEmpIdDashboard);
attendanceRoute.get('/croneServer', croneServer);
attendanceRoute.post('/calculateMonthlySalaries', calculateMonthlySalaries);






module.exports = attendanceRoute;