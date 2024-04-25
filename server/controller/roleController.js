const role = require('../modals/roleModal')
const bcrypt = require("bcrypt");


exports.addRoles = async (req, res) => {
    try {
        const { name, permission } = req.body;
        await role.create({
            name,
            permission,
        });
        res.status(200).json({
            status: "success",
            message: "Created Successfully",
        });
    } catch (error) {
        res.status(500).json({
            status: 'False',
            message: 'Role not Created'
        })
    }
};

exports.getAllRoles = async (req, res) => {
    try {
        const data = await role.find({});
        res.status(200).json({
            status: "success",
            message: "Data Found",
            data,
        });
    } catch (error) {
        res.status(500).json({
            status: 'False',
            message: 'no data found'
        })
    }
};


exports.getSingleRoles = async (req, res) => {
    try {
        const data = await role.findById(req.params.id);
        res.status(200).json({
            status: "success",
            message: "Data Found",
            data,
        });
    } catch (error) {
        res.status(500).json({
            status: 'False',
            message: 'no data found'
        })
    }
};


exports.updateRolesById = async (req, res) => {
    try {
        const { name, permission } = req.body;

        const data = await role.findOneAndUpdate(
            { _id: req.params.id },
            {
                name,
                permission,
            },
            { new: true }
        );
        res.status(200).json({
            status: "success",
            message: " Data update successfully",
            data: data,
        });
    } catch (error) {
        res.status(500).json({
            status: 'False',
            message: 'Role not updated'
        })
    }
};