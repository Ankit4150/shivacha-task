const user = require("../models/userModel");
const employee = require("../models/employeeModel");

const addEmployeeDetail = async (req, res) => {
    try {
        const { id } = req.params;

        const { position, salary, address } = req.body;

        if (!position || !salary || !address) {
            return res.status(400).json({
                message: "Position, salary and address are required"
            });
        }

        const existingUser = await User.findById(id);

        if (!existingUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const existingEmployee = await Employee.findOne({ user: id });

        if (existingEmployee) {
            return res.status(400).json({
                message: "Employee details already exist for this user"
            });
        }

        const newEmployee = await Employee.create({
            user: id,
            position,
            salary,
            address
        });

        return res.status(201).json({
            message: "Employee details added successfully",
            employee: newEmployee
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

module.exports = addEmployeeDetail;