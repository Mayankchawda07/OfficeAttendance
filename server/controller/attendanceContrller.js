const attendance = require('../modals/attendanceModal')
const Employee = require('../modals/employeeModal')


exports.addAttendance = async (req, res) => {
    const { employeeID, attend } = req.body;
    const mDate = new Date();
    const currentDate = new Date();
    const startOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    const endOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 23, 59, 59, 999);

    try {
        // Check if attendance already exists for today
        const existingAttendance = await attendance.findOne({
            employeeID: employeeID,
            createdAt: { $gte: startOfDay, $lte: endOfDay }
        });

        if (existingAttendance) {
            res.status(400).json({
                status: 'False',
                message: 'Attendance already marked for today'
            });
        } else {
            // Add new attendance
            const addAttendance = await attendance.create({
                employeeID, attend, login: mDate
            });
            res.status(200).json({
                status: 'True',
                message: 'Attendance marked'
            });
        }
    } catch (error) {
        res.status(500).json({
            status: 'False',
            message: 'Failed to mark attendance'
        });
    }
};

exports.updateAttendance = async (req, res) => {
    try {
        const employeeID = req.params.id;
        const currentDate = new Date();
        const logout = currentDate;

        // Calculate start and end of the current day
        const startOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
        const endOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1);

        // Check if attendance exists for today
        const existingAttendance = await attendance.findOne({
            $and: [
                { employeeID: employeeID },
                { createdAt: { $gte: startOfDay, $lt: endOfDay } }
            ]
        });

        if (!existingAttendance) {
            res.status(400).json({
                status: 'False',
                message: 'No attendance found to update for today'
            });
        } else {
            // Update attendance
            const todayAttendance = await attendance.findOneAndUpdate(
                {
                    $and: [
                        { employeeID: employeeID },
                        { createdAt: { $gte: startOfDay, $lt: endOfDay } }
                    ]
                },
                { logout },
                { new: true, upsert: true }
            );

            res.status(200).json({
                status: 'True',
                message: 'Attendance updated'
            });
        }
    } catch (error) {
        res.status(500).json({
            status: 'False',
            message: 'Failed to update attendance'
        });
    }
};


exports.getAllAttendance = async (req, res) => {
    try {
        const getAllAttendance = await attendance.find({

        }).populate('employeeID').sort({ createdAt: -1 });
        res.status(200).json({
            status: 'True',
            message: 'Success',
            data: getAllAttendance
        })
    } catch (error) {
        res.status(500).json({
            status: 'False',
            message: 'Failed'
        })
    }
}

exports.getAttendanceByEmpID = async (req, res) => {
    try {
        const getAttendanceByID = await attendance.find({
            employeeID: req.params.id
        }).populate('employeeID').sort({ createdAt: -1 });
        res.status(200).json({
            status: 'True',
            message: 'Success',
            data: getAttendanceByID
        })
    } catch (error) {
        res.status(500).json({
            status: 'False',
            message: 'Failed'
        })
    }
}

exports.getTodayAttendance = async (req, res) => {
    try {
        const currentDate = new Date();
        const startOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
        const endOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 23, 59, 59, 999);

        // Find attendance records for today
        const todayAttendance = await attendance.find({
            createdAt: { $gte: startOfDay, $lte: endOfDay }
        }).populate('employeeID'); // Assuming you want to populate employee details

        res.status(200).json({
            status: 'True',
            message: 'Success',
            data: todayAttendance
        });
    } catch (error) {
        res.status(500).json({
            status: 'False',
            message: 'Failed to fetch today\'s attendance'
        });
    }
};




exports.CroneAttendance = async (req, res) => {
    try {
        const presentEmployeesIds = [];
        const allEmployeesIds = [];
        const absentemployeeIds = [];

        // Retrieve all employees
        const allEmployee = await Employee.find({});

        // Set the time range for today
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);

        const todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999);

        // Find employees who are present today
        const presentEmployees = await attendance.find({
            attend: 1,
            createdAt: { $gte: todayStart, $lt: todayEnd }
        });

        // Collect IDs of present employees
        for (let i = 0; i < presentEmployees.length; i++) {
            presentEmployeesIds.push(presentEmployees[i].employeeID.toString());
        }

        // Collect IDs of all employees
        for (let i = 0; i < allEmployee.length; i++) {
            allEmployeesIds.push(allEmployee[i]._id.toString());
        }

        // Determine absent employees
        for (let i = 0; i < allEmployeesIds.length; i++) {
            if (!presentEmployeesIds.includes(allEmployeesIds[i])) {
                absentemployeeIds.push(allEmployeesIds[i]);
            }
        }

        // Send the response
        res.status(200).json({
            status: 'True',
            message: 'Success',
            allEmployee: allEmployee.length,
            allEmployeesIds,
            presentEmployees: presentEmployees.length,
            presentEmployeesIds,
            absentEmployeesCount: absentemployeeIds.length,
            absentemployeeIds
        });
    } catch (error) {
        res.status(500).json({
            status: 'False',
            message: 'An error occurred',
            error: error.message
        });
    }
};


// exports.markAbsentEmployees = async (req,res )=> {
//     try {
//         const presentEmployees = await attendance.find({
//             login: { $gte: new Date().setHours(0, 0, 0, 0), $lt: new Date().setHours(17, 0, 0, 0) }
//         }).distinct('employeeID');

//         const allEmployees = await getAllEmployees();
//         const presentEmployeeIds = presentEmployees.map(emp => emp.toString());

//         const absentEmployees = allEmployees.filter(emp => !presentEmployeeIds.includes(emp._id.toString()));

//         const currentTime = new Date();
//         const ISTcurrentTime = new Date(currentTime.toLocaleString("en-US", {timeZone: "Asia/Kolkata"}));

//         const endOfDayIST = new Date(ISTcurrentTime.getFullYear(), ISTcurrentTime.getMonth(), ISTcurrentTime.getDate(), 17, 0, 0, 0);

//         const attendancePromises = absentEmployees.map(async (employee) => {
//             const addAttendance = await attendance.create({
//                 employeeID: employee._id,
//                 attend: 0,
//                 login: endOfDayIST
//             });
//             // return addAttendance;
//         });
//         console.log(attendancePromises)
//         await Promise.all(attendancePromises);
//     } catch (error) {
//         throw new Error('Error marking absent employees: ' + error.message);
//     }
//     // Call markAbsentEmployees function to mark absent employees after 17:00 IST
// // markAbsentEmployees().then(() => {
// //     console.log('Absent employees marked successfully.');
// // }).catch(err => {
// //     console.error('Error marking absent employees:', err.message);
// // });
// }



// exports.CroneAddAttendance = async (req, res) => {
   
   
   
//     const employeeID = ''
//     const attend = 0;
//     const mDate = new Date();
//     const currentDate = new Date();
//     const startOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
//     const endOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 23, 59, 59, 999);

   
        
      
//             // Add new attendance
//             const addAttendance = await attendance.create({
//                 employeeID, attend, login: mDate
//             });
//             res.status(200).json({
//                 status: 'True',
//                 message: 'Attendance marked'
//             });
       
  
// };
