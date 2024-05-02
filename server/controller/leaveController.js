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

exports.getLeaveByEmpID = async (req, res) => {
    try {
        const getLeaveByEmpID = await leaves.find({
            employeeID: req.params.id
        }).populate('employeeID').sort({ createdAt: -1 });
        res.status(200).json({
            status: 'True',
            message: 'Success',
            data: getLeaveByEmpID
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