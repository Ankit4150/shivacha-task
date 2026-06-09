import React, { useEffect, useState } from "react";
import Summaryapi from "../common";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import AttendanceCalendar from "../components/AttendanceCalendar";

function EmployeeDashboard() {
  const { userDetails } = useContext(UserContext);

  const [myTasks, setMyTasks] = useState([]);
  const [attendance, setAttendance] = useState(0);
  const [user, setUser] = useState(null);

  const [selectedTask, setSelectedTask] = useState(null);
  const [activeMenu, setActiveMenu] = useState("dashboard");

  useEffect(() => {
    if (!userDetails) return;

    const fetchData = async () => {
      try {
        const taskRes = await fetch(Summaryapi.mytask.url, {
          method: Summaryapi.mytask.method,
          credentials: "include",
        });

        const taskData = await taskRes.json();
        setMyTasks(taskData?.allTask || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [userDetails]);
  const totalTasks = myTasks.length;
  const completedTasks = myTasks.filter(
    (t) => t.status === "Completed"
  ).length;

  const pendingTasks = myTasks.filter(
    (t) => t.status === "Pending"
  ).length;

  const filteredTasks =
    activeMenu === "completed"
      ? myTasks.filter((t) => t.status === "Completed")
      : activeMenu === "pending"
      ? myTasks.filter((t) => t.status === "Pending")
      : myTasks;

  // const handleTaskClick = (task) => {
  //   setSelectedTask(task);
  // };
  const closeModal = () => {
    setSelectedTask(null);
  };
  const handleTaskClick = async (taskId) => {
  try {
    const res = await fetch(
      `${Summaryapi.gettaskbyid.url}/${taskId}`,
      {
        method: Summaryapi.gettaskbyid.method,
        credentials: "include",
      }
    );

    const data = await res.json();

    console.log("Single Task", data);

    setSelectedTask(data.taskdata);

  } catch (error) {
    console.log(error);
  }
};
const handleStatusChange = async (taskId, status) => {
  try {
    const res = await fetch(
      `${Summaryapi.updateTaskStatus.url}/${taskId}`,
      {
        method: Summaryapi.updateTaskStatus.method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ status }),
      }
    );

    const data = await res.json();
       console.log("dataupdate",data);
    if (res.ok) {
      setMyTasks((prev) =>
        prev.map((task) =>
          task._id === taskId
            ? { ...task, status }
            : task
        )
      );
    }

    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

  return (
    <div className="flex min-h-screen bg-slate-100">
      <div className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-6 text-2xl font-bold border-b border-gray-700">
          EMS
        </div>

        <ul className="flex-1">
          <li onClick={() => setActiveMenu("dashboard")} className="p-4 cursor-pointer hover:bg-gray-700">Dashboard</li>
          <li onClick={() => setActiveMenu("attendance")} className="p-4 cursor-pointer hover:bg-gray-700">Attendance</li>
          <li onClick={() => setActiveMenu("completed")} className="p-4 cursor-pointer hover:bg-gray-700">Completed</li>
          <li onClick={() => setActiveMenu("pending")} className="p-4 cursor-pointer hover:bg-gray-700">Pending</li>
        </ul>
      </div>
      <div className="flex-1 p-6">
        <div className="bg-white p-5 rounded-xl shadow-md mb-6 flex justify-between">
          <div>
            <h1 className="text-2xl font-bold">Employee Dashboard</h1>
            <p className="text-gray-500">
              Welcome {userDetails?.name || "Employee"}
            </p>
          </div>
        </div>
        {activeMenu === "dashboard" && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">

              <div className="bg-blue-600 text-white p-5 rounded-xl">
                <h3>Total Tasks</h3>
                <p className="text-3xl font-bold">{totalTasks}</p>
              </div>

              <div className="bg-green-600 text-white p-5 rounded-xl">
                <h3>Completed</h3>
                <p className="text-3xl font-bold">{completedTasks}</p>
              </div>

              <div className="bg-yellow-500 text-white p-5 rounded-xl">
                <h3>Pending</h3>
                <p className="text-3xl font-bold">{pendingTasks}</p>
              </div>
            </div>
            <TaskTable
              tasks={filteredTasks}
              onTaskClick={handleTaskClick}
              onStatusChange={handleStatusChange}
               isEditable={true}
            />
          </>
        )}

        {activeMenu === "attendance" && <AttendanceCalendar />}

        {(activeMenu === "completed" || activeMenu === "pending") && (
          <TaskTable
            tasks={filteredTasks}
            onTaskClick={handleTaskClick}
            onStatusChange={handleStatusChange}
             isEditable={false}
          />
        )}

      </div>
      {selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"> 
          <div className="bg-white w-[400px] p-6 rounded-xl shadow-xl relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-3 text-gray-600 text-xl"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4">Task Details</h2>

           <p><b>Name:</b> {selectedTask.taskName}</p>
     <p><b>Description:</b> {selectedTask.taskDescription}</p>
     <p><b>Status:</b> {selectedTask.status}</p>
    <p><b>ID:</b> {selectedTask._id}</p>
  <p><b>Assigned By:</b> {selectedTask.assignBy?.name}</p>
          </div>
        </div>
      )}

    </div>
  );
}
function TaskTable({
  tasks,
  onTaskClick,
  onStatusChange,
  isEditable = false,
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md mt-6 overflow-x-auto">
      <h2 className="text-xl font-bold mb-4">Tasks</h2>

      {tasks.length > 0 ? (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-900 text-white text-left">
              <th className="p-3 whitespace-nowrap">Title</th>
              <th className="p-3 whitespace-nowrap">Status</th>
              <th className="p-3 whitespace-nowrap">Date</th>
            </tr>
          </thead>

          <tbody>
            {tasks.map((task) => (
              <tr
                key={task._id}
                onClick={() => onTaskClick(task._id)}
                className="border-b hover:bg-gray-100 cursor-pointer transition"
              >
                <td className="p-3 whitespace-nowrap font-medium text-gray-800">
                  {task.taskName}
                </td>

                <td className="p-3">
                  {isEditable ? (
                    <select
                      value={task.status}
                      onChange={(e) =>
                        onStatusChange(task._id, e.target.value)
                      }
                      onClick={(e) => e.stopPropagation()}
                      className={`px-3 py-1 rounded font-medium border-none outline-none ${
                        task.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : task.status === "Abort"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Completed">Completed</option>
                      <option value="Abort">Abort</option>
                    </select>
                  ) : (
                    <span
                      className={`px-3 py-1 rounded font-medium ${
                        task.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : task.status === "Abort"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {task.status}
                    </span>
                  )}
                </td>

                <td className="p-3 whitespace-nowrap text-gray-600">
                  {new Date(task.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500">No tasks found</p>
      )}
    </div>
  );
}

export default EmployeeDashboard;