const salarys = require('../modals/salaryModal')


exports.addsalary = async (req, res) => {
    const { employeeID, salary, remark } = req.body;

    if (!employeeID || !salary) {
        return res.status(422).json({ error: 'Please fill all fields properly' });
    }

    // Calculate the previous month
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    let salaryOfMonth;
    if (currentMonth === 0) {
        // If current month is January, previous month is December of the previous year
        salaryOfMonth = `12-${currentYear - 1}`;
    } else {
        // Otherwise, just subtract one month
        salaryOfMonth = `${currentMonth}-${currentYear}`;
    }

    try {
        const newRequest = await salarys.create({ employeeID, salary, salaryOfMonth, remark });

        res.status(200).json({
            status: "True",
            message: "Data stored",
            data: newRequest
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "False",
            message: "Failed"
        });
    }
};

exports.getSalaryByEmpID = async (req, res) => {
    try {
        const getSalaryByEmpID = await salarys.find({
            employeeID: req.params.id
        }).populate('employeeID').sort({ createdAt: -1 });
        res.status(200).json({
            status: 'True',
            message: 'Success',
            data: getSalaryByEmpID,
            length: getSalaryByEmpID.length

        })
    } catch (error) {
        res.status(500).json({
            status: 'False',
            message: 'Failed'
        })
    }
}



