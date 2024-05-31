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

// exports.updateAttendance = async (req, res) => {
//     try {
//         const employeeID = req.params.id;
//         const currentDate = new Date();
//         const logout = currentDate;

//         // Calculate start and end of the current day
//         const startOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
//         const endOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1);

//         // Check if attendance exists for today
//         const existingAttendance = await attendance.findOne({
//             $and: [
//                 { employeeID: employeeID },
//                 { createdAt: { $gte: startOfDay, $lt: endOfDay } }
//             ]
//         });

//         if (!existingAttendance) {
//             res.status(400).json({
//                 status: 'False',
//                 message: 'No attendance found to update for today'
//             });
//         } else {
//             // Update attendance
//             const todayAttendance = await attendance.findOneAndUpdate(
//                 {
//                     $and: [
//                         { employeeID: employeeID },
//                         { createdAt: { $gte: startOfDay, $lt: endOfDay } }
//                     ]
//                 },
//                 { logout },
//                 { new: true, upsert: true }
//             );

//             res.status(200).json({
//                 status: 'True',
//                 message: 'Attendance updated'
//             });
//         }
//     } catch (error) {
//         res.status(500).json({
//             status: 'False',
//             message: 'Failed to update attendance'
//         });
//     }
// };

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
            employeeID: employeeID,
            createdAt: { $gte: startOfDay, $lt: endOfDay }
        });

        if (!existingAttendance) {
            return res.status(400).json({
                status: 'False',
                message: 'No attendance found to update for today'
            });
        }

        if (existingAttendance.logout) {
            // If logout time is already set, it means attendance has already been updated for today
            return res.status(400).json({
                status: 'False',
                message: 'Attendance has already been updated for today'
            });
        }

        // Update attendance
        existingAttendance.logout = logout;
        await existingAttendance.save();

        res.status(200).json({
            status: 'True',
            message: 'Attendance updated successfully'
        });
    } catch (error) {
        console.error('Error updating attendance:', error);
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



// exports.getAttendanceByEmpIdDashboard = async (req, res) => {
//     try {
//         const employeeID = req.params.id;

//         // Set the time range for the current month
//         const now = new Date();
//         const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
//         const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

//         // Find attendance records for the current month
//         const attendanceRecords = await attendance.find({
//             employeeID: req.params.id,
//             createdAt: { $gte: startOfMonth, $lt: endOfMonth }
//         }).populate('employeeID').sort({ createdAt: -1 });

//         // Calculate the present and absent days count
//         let presentDaysCount = 0;
//         const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
//         const attendanceDates = attendanceRecords.map(record => record.createdAt.toISOString().split('T')[0]);
//         const uniqueAttendanceDates = [...new Set(attendanceDates)];
//         presentDaysCount = uniqueAttendanceDates.length;
//         const absentDaysCount = daysInMonth - presentDaysCount;

//         // Modify the response structure to include counts in the data array
//         const responseData = {
//             status: 'True',
//             message: 'Success',
//             data: {
//                 attendanceRecords,
//                 presentDaysCount,
//                 absentDaysCount,
//                 totalDaysCount: daysInMonth
//             }
//         };

//         res.status(200).json(responseData);
//     } catch (error) {
//         res.status(500).json({
//             status: 'False',
//             message: 'Failed',
//             error: error.message
//         });
//     }
// };


exports.getAttendanceByEmpIdDashboard = async (req, res) => {
    try {
        const employeeID = req.params.id;

        // Set the time range for the current month
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

        // Find attendance records for the current month
        const attendanceRecords = await attendance.find({
            employeeID: req.params.id,
            createdAt: { $gte: startOfMonth, $lt: endOfMonth }
        }).populate('employeeID').sort({ createdAt: -1 });

        // Calculate the present and absent days count
        const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();

        // Initialize presentDaysCount with the total number of days in the month
        let presentDaysCount = daysInMonth;

        // Iterate over each day of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const currentDate = new Date(now.getFullYear(), now.getMonth(), day);
            const dayOfWeek = currentDate.getDay();

            // Check if the current day is Saturday (6) or Sunday (0)
            if (dayOfWeek === 6 || dayOfWeek === 0) {
                // If it's a weekend, continue to the next iteration without checking attendance
                continue;
            }

            // Format the current date to match the format in the attendance records
            const formattedDate = currentDate.toISOString().split('T')[0];

            // Check if there's an attendance record for the current date
            const isPresent = attendanceRecords.some(record => record.createdAt.toISOString().split('T')[0] === formattedDate);

            // If there's no attendance record for the current date, decrement presentDaysCount
            if (!isPresent) {
                presentDaysCount--;
            }
        }

        // Calculate absentDaysCount by subtracting presentDaysCount from the total days in the month
        const absentDaysCount = daysInMonth - presentDaysCount;

        // Modify the response structure to include counts in the data array
        const responseData = {
            status: 'True',
            message: 'Success',
            data: {
                attendanceRecords,
                presentDaysCount,
                absentDaysCount,
                totalDaysCount: daysInMonth
            }
        };

        res.status(200).json(responseData);
    } catch (error) {
        res.status(500).json({
            status: 'False',
            message: 'Failed',
            error: error.message
        });
    }
};





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

exports.croneServer = async (req, res) => {
    try {
        const currentDate = new Date();
        const startOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
        const endOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 23, 59, 59, 999);

        // Retrieve all employees
        const allEmployees = await Employee.find({});
        const allEmployeesIds = allEmployees.map(employee => employee._id.toString());

        // Find attendance records for today
        const todayAttendance = await attendance.find({
            createdAt: { $gte: startOfDay, $lte: endOfDay }
        }).populate('employeeID');

        // Collect IDs of present employees
        const presentEmployeesIds = todayAttendance.map(record => record.employeeID._id.toString());

        // Determine absent employees
        const absentEmployeeIds = allEmployeesIds.filter(id => !presentEmployeesIds.includes(id));

        // Create attendance records for absent employees
        const absentEmployeesRecords = await Promise.all(
            absentEmployeeIds.map(async (id) => {
                let absentRecord = await attendance.findOne({ employeeID: id, createdAt: { $gte: startOfDay, $lte: endOfDay } });
                if (!absentRecord) {
                    absentRecord = new attendance({
                        employeeID: id,
                        attend: 0,
                        createdAt: currentDate
                    });
                    await absentRecord.save();
                }
                return absentRecord.populate('employeeID');
            })
        );

        // Combine present and absent attendance records
        const completeAttendanceRecords = [...todayAttendance, ...absentEmployeesRecords];

        res.status(200).json({
            status: 'True',
            message: 'Success',
            totalEmployees: allEmployees.length,
            presentEmployees: todayAttendance.length,
            absentEmployees: absentEmployeeIds.length,
            data: completeAttendanceRecords
        });
    } catch (error) {
        res.status(500).json({
            status: 'False',
            message: 'Failed to fetch today\'s attendance',
            error: error.message
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


const isWorkingDay = (date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6; // 0 is Sunday and 6 is Saturday
};

// Mock function to get all working days between two dates (inclusive)
const getWorkingDaysInRange = (startDate, endDate) => {
    let workingDays = [];
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
        if (isWorkingDay(currentDate)) {
            workingDays.push(new Date(currentDate));
        }
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return workingDays;
};


exports.getAttendanceDaysByEmpID = async (req, res) => {
    try {
        const { id } = req.params;

        const employee = await Employee.findById(id);
        if (!employee) {
            return res.status(404).json({
                status: 'False',
                message: 'Employee not found'
            });
        }

        const getAttendanceByID = await attendance.find({
            employeeID: id
        }).populate('employeeID').sort({ createdAt: -1 });

        // Define the start and end date for the range you are interested in
        // For this example, let's assume you want the current month's attendance
        const startDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
        const endDate = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);

        const workingDays = getWorkingDaysInRange(startDate, endDate);
        const presentDays = getAttendanceByID.filter(record => record.login && record.logout);
        const presentDates = presentDays.map(record => record.login.toDateString());

        const absentDays = workingDays.filter(day => !presentDates.includes(day.toDateString()));

        // Assuming leaves are marked differently, e.g., with a specific status
        const leaves = getAttendanceByID.filter(record => record.status === 'leave');

        res.status(200).json({
            status: 'True',
            message: 'Success',
            data: {
                totalWorkingDays: workingDays.length,
                presentDays: presentDays.length,
                absentDays: absentDays.length,
                leaves: leaves.length
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'False',
            message: 'Failed',
            error: error.message
        });
    }
};

exports.calculateMonthlySalaries = async (req, res) => {
    const { employeeID, month, year } = req.body;

    if (!employeeID || !month || !year) {
        return res.status(400).send('EmployeeID, month, and year are required');
    }

    try {
        const employee = await Employee.findById(employeeID);
        if (!employee) {
            return res.status(404).send('Employee not found');
        }

        // Create date range for the query
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0); // Last day of the month
        const currentDate = new Date();

        // Ensure we do not calculate future dates
        if (endDate > currentDate) {
            endDate.setDate(currentDate.getDate());
        }

        const attendances = await attendance.find({
            employeeID: employeeID,
            attend: 1, // Assuming 1 indicates present
            login: {
                $gte: startDate,
                $lte: endDate
            }
        });

        // Extract all present days from attendance records
        const presentDaysSet = new Set(attendances.map(att => att.login.toISOString().split('T')[0]));

        // Calculate the number of past Saturdays and Sundays in the date range
        let dateIterator = new Date(startDate);
        let absentDays = [];
        while (dateIterator <= endDate) {
            const dateString = dateIterator.toISOString().split('T')[0];

            if (dateIterator.getDay() === 0 || dateIterator.getDay() === 6) { // 0 is Sunday, 6 is Saturday
                presentDaysSet.add(dateString); // Count weekends as present days
            } else if (!presentDaysSet.has(dateString)) {
                absentDays.push(dateString);
            }

            dateIterator.setDate(dateIterator.getDate() + 1);
        }

        // Calculate total present days
        const totalPresentDays = presentDaysSet.size;
        const totalAbsentDays = absentDays.length;

        const dailyWage = employee.salary / 30; // Assuming salary is monthly and based on 30 days
        const calculatedSalary = dailyWage * totalPresentDays;

        res.status(200).json({
            status: 'True',
            message: 'Success',
            data: {
                employeeID: employeeID,
                presentDays: totalPresentDays,
                absentDaysCount: totalAbsentDays,
                absentDays: absentDays,
                calculatedSalary: calculatedSalary
            }
        });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

