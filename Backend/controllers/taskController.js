const user = require('../models/userModel')
const task = require('../models/taskModel');
// const taskModel = require('../models/taskModel');

const assignTask = async (req, res) => {
    try {

        const { employeeId } = req.params;
        const { taskName, taskDescription } = req.body;
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

const getAllTask = async (req, res) => {
    try {
        const allTask = await task.find({
            employee: req.user.id
        })

        res.status(201).json({
            message: "all tasks assigned to the employee",
            allTask
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Internal server error'
        })
    }
}

const getTask = async (req, res) => {

    try {
        const { taskid } = req.params;
        

        if (!taskid) {
            res.status(400).json({
                message: "Invalid task id"
            })
            return
        }

        const taskdata = await task.findById(taskid).populate("assignBy", "name");
       
       console.log("taskdata",taskdata)
   
       res.status(201).json({
            taskdata
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Internal server error'
        })
    }
}
const updateTask = async (req, res) => {
    try {

    const { taskid} = req.params;    
    const {status} = req.body;
    console.log("id ",taskid);
    console.log("status",status)

    if(!taskid || !status){
        res.status(400).json({
            message: "both task id and updated status needed"
        })
    }

    const taskData = await task.findByIdAndUpdate(
        taskid,
        {status}
    )    
    console.log("updatedtata",taskData)
    res.status(201).json({
        message: "task updated",
        taskData

    })
    
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Internal server error'
        })
    }

}

module.exports = { assignTask, getAllTask, getTask,updateTask };