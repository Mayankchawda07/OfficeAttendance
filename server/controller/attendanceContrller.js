const attendance = require('../modals/attendanceModal')

exports.addAttendance = async (req, res) => {

    const { employeeID, attend } = req.body;
    const mDate = new Date()
    const currentDate = new Date();
    const startOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    const endOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 23, 59, 59, 999);


    try {
        const existingAttendance = await attendance.findOne({
            employeeID: employeeID,
            createdAt: { $gte: startOfDay, $lte: endOfDay }
        });

        if (existingAttendance) {
            res.status(400).json({
                status: 'True',
                message: 'Attendance Already Marked'
            })
        } else {
            const addAttendanc = await attendance.create({
                employeeID, attend, login: mDate
            });
            res.status(200).json({
                status: 'True',
                message: 'Attendance Marked'
            })
        }
    } catch (error) {
        res.status(500).json({
            status: 'True',
            message: 'Attendance Marked fail'
        })
    }
}

// exports.addAttendance = async (req, res) => {
//     try {
//         const { employeeID } = req.body;
//         const mDate = new Date()
//         const addAttendanc = await attendance.create({
//             employeeID, attend: 1, login: mDate
//         });
//         res.status(200).json({
//             status: 'True',
//             message: 'Attendance Marked'
//         })
//     } catch (error) {
//         res.status(500).json({
//             status: 'False',
//             message: 'Attendance Marked fail'
//         })
//     }
// }

// exports.updateAttendance = async (req, res) => {
//     try {
//         const employeeID = req.params.id;
//         const currentDate = new Date();
//         const logout = currentDate;

//         // Assuming attendance is a mongoose model
//         const todayAttendance = await attendance.findOneAndUpdate(
//             {
//                 $and: [
//                     { employeeID: employeeID },
//                     { createdAt: { $gte: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()), $lt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1) } }
//                 ]
//             },
//             { logout },
//             { new: true }
//         );

//         if (todayAttendance) {
//             res.status(200).json({
//                 status: 'True',
//                 message: 'Attendance Updated'
//             });
//         } else {
//             res.status(404).json({
//                 status: 'False',
//                 message: 'No attendance record found for today'
//             });
//         }
//     } catch (error) {
//         res.status(500).json({
//             status: 'False',
//             message: 'Attendance Marked fail'
//         })
//     }
// }

exports.updateAttendance = async (req, res) => {
    try {
        const employeeID = req.params.id;
        const currentDate = new Date();
        const logout = currentDate;

        // Calculate start and end of the current day
        const startOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
        const endOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1);

        // Check if attendance for today already exists
        const existingAttendance = await attendance.findOne({
            $and: [
                { employeeID: employeeID },
                { createdAt: { $gte: startOfDay, $lt: endOfDay } }
            ]
        });

        if (existingAttendance) {
            res.status(400).json({
                status: 'False',
                message: 'Attendance already updated for today'
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
                message: 'Attendance Updated'
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

        }).populate('employeeID')
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