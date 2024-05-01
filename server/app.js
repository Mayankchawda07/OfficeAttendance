const express = require('express')
const app = express();
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const dbconnect = require("./connection/conn");
const cors = require("cors");


dbconnect();

const AddEmployee = require('./route/employeeRoute')
const getEmployee = require('./route/employeeRoute')
const getSingleEmpolyee = require('./route/employeeRoute')
const updateEmployee = require('./route/employeeRoute')

const Attendance = require('./route/attendanceRoute');
const adminRoute = require('./route/adminRoute')
const roleRoute = require('./route/roleRoute')
const leavesRoute = require('./route/leaveRoute')



app.use(cors());
app.use(cors({ origin: "*" }));
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE,PATCH");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});




app.use('/api/v1', AddEmployee)
app.use('/api/v1', getEmployee)
app.use('/api/v1', getSingleEmpolyee)
app.use('/api/v1', updateEmployee)

app.use('/api/v1/attendance', Attendance)
app.use('/api/v1/admin', adminRoute)
app.use('/api/v1/role', roleRoute)
app.use('/api/v1/leaves', leavesRoute)





// app.use('/api/v1/attendance', (req,res)=>{
//     res.status(200).json({
//         message:"success"
//     })
// });




app.listen(3210, () => {
    console.log('server created')
})