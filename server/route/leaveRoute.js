const express = require('express')
const { addleaves,getAllLeaves,getLeaveByEmpID,updateLeave } = require('../controller/leaveController')
const leavesRoute = express.Router()

leavesRoute.post('/addleaves', addleaves);
leavesRoute.get('/getAllLeaves', getAllLeaves);
leavesRoute.get('/getLeaveByEmpID/:id', getLeaveByEmpID);
leavesRoute.put('/updateLeave/:id', updateLeave);





module.exports = leavesRoute;