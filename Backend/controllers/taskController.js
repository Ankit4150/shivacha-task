const user = require('../models/userModel')
const task = require('../models/taskModel')

const assignTask = async (req, res) => {
    try {
        
        const { employeeId } = req.params;
        const {taskName, taskDescription } = req.body;
        // const { assignBy ,taskName, taskDescription } = req.body;

        if (!taskName || !taskDescription) {
            res.status(400).json({
                message: "Both Task name and description required"
            })
            return;
        }
        const employee = await user.findById(employeeId);

        if (!employee || employee.status === "BLOCKED") {
            res.status(400).json({
                message: "Can't assign task to BLOCKED Employee"
            })
            return
        }

        const taskAssigned = await task.create({
            employee: employee._id,
            assignBy: req.user.id,
            taskName,
            taskDescription
        })

        res.status(201).json({
            message: "Task assigned successfully",
            task: taskAssigned
        })

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: error.message
        });
    }
}

module.exports = { assignTask };