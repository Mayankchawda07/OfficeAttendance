const leaves = require('../modals/leaveModal')

exports.addleaves = async (req, res) => {
    const { employeeID, fromDate, tooDate, title, description } = req.body;

    if (!employeeID || !fromDate || !tooDate || !title || !description) {
        return res.status(422).json({ error: 'Please fill all fields properly' });
    }

    try {

        const newRequest = await leaves.create({ employeeID, fromDate, tooDate, title, description });

        res.status(200).json({
            status: "True",
            message: "leave requested Successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "False",
            message: "leave requested Failed"
        });
    }
};

exports.getAllLeaves = async (req, res) => {
    try {
        const getAllLeaves = await leaves.find({

        }).populate('employeeID').sort({ createdAt: -1 });
        res.status(200).json({
            status: 'True',
            message: 'Success',
            data: getAllLeaves
        })
    } catch (error) {
        res.status(500).json({
            status: 'False',
            message: 'Failed'
        })
    }
}

// exports.getLeaveByEmpID = async (req, res) => {
//     try {
//         const getLeaveByEmpID = await leaves.find({
//             employeeID: req.params.id
//         }).populate('employeeID').sort({ createdAt: -1 });
//         res.status(200).json({
//             status: 'True',
//             message: 'Success',
//             data: getLeaveByEmpID,
//             length: getLeaveByEmpID.length

//         })
//     } catch (error) {
//         res.status(500).json({
//             status: 'False',
//             message: 'Failed'
//         })
//     }
// }

exports.getLeaveByEmpID = async (req, res) => {
    try {
        const today = new Date(); // Get today's date
        const currentYear = today.getFullYear();
        const currentMonth = today.getMonth();

        // Calculate the first day of the current month
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1);

        // Calculate the last day of the current month
        // To get the last day of the current month, go to the first day of the next month and subtract one day
        const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);

        // Format the dates as "DD/MM/YYYY"
        const formatDate = (date) => {
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        };

        // Format first day and last day of the current month
        const formattedFirstDayOfMonth = formatDate(firstDayOfMonth); // "01/05/2024"
        const formattedLastDayOfMonth = formatDate(lastDayOfMonth); // "31/05/2024"

        // If you want the last day to be one day less for "29/05/2024"
        lastDayOfMonth.setDate(lastDayOfMonth.getDate() - 2);

        // Query events within the current month date range
        const getLeaveByEmpID = await leaves.find({
            createdAt: {
                $gte: firstDayOfMonth,
                $lte: lastDayOfMonth
            }
        })
            .populate('employeeID').sort({ createdAt: -1 })
        res.status(200).json({
            status: 'True',
            message: 'Success',
            data: getLeaveByEmpID,
            length: getLeaveByEmpID.length

        })
    } catch (error) {
        res.status(500).json({
            status: 'False',
            message: 'Failed'
        })
    }
}



exports.updateLeave = async (req, res) => {
    const { status, remark } = req.body;

    const data = await leaves.findOneAndUpdate({ _id: req.params.id }
        ,
        { status, remark },
        { new: true }
    );
    res.status(200).json({
        status: "success",
        message: " Data Updated",
        id: req.params.id,

        // data: data,
    });
};