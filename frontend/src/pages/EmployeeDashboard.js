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

  const [activeMenu, setActiveMenu] = useState("dashboard");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await fetch(Summaryapi.myprofile.url, {
          method: Summaryapi.myprofile.method,
          credentials: "include",
        });
        const userData = await userRes.json();
        setUser(userData);

        const taskRes = await fetch(Summaryapi.mytasks.url, {
          method: Summaryapi.mytasks.method,
          credentials: "include",
        });
        const taskData = await taskRes.json();
        setMyTasks(taskData?.tasks || []);

        const attRes = await fetch(Summaryapi.attendance.url, {
          method: Summaryapi.attendance.method,
          credentials: "include",
        });
        const attData = await attRes.json();
        setAttendance(attData?.percent || 0);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const totalTasks = myTasks.length;
  const completedTasks = myTasks.filter((t) => t.status === "DONE").length;
  const pendingTasks = myTasks.filter((t) => t.status !== "DONE").length;

  // 🔥 FILTERS BASED ON MENU
  const filteredTasks =
    activeMenu === "completed"
      ? myTasks.filter((t) => t.status === "DONE")
      : activeMenu === "pending"
      ? myTasks.filter((t) => t.status !== "DONE")
      : myTasks;

  return (
    <div className="flex min-h-screen bg-slate-100">

      {/* ================= SIDEBAR ================= */}
      <div className="w-64 bg-gray-800 text-white flex flex-col">

        <div className="p-6 text-2xl font-bold border-b border-gray-700">
          EMS
        </div>

        <ul className="flex-1">

          <li
            onClick={() => setActiveMenu("dashboard")}
            className={`p-4 cursor-pointer hover:bg-gray-700 ${
              activeMenu === "dashboard" ? "bg-gray-700" : ""
            }`}
          >
            Dashboard
          </li>

          <li
            onClick={() => setActiveMenu("attendance")}
            className={`p-4 cursor-pointer hover:bg-gray-700 ${
              activeMenu === "attendance" ? "bg-gray-700" : ""
            }`}
          >
            Attendance
          </li>

          <li
            onClick={() => setActiveMenu("completed")}
            className={`p-4 cursor-pointer hover:bg-gray-700 ${
              activeMenu === "completed" ? "bg-gray-700" : ""
            }`}
          >
            Completed Tasks
          </li>

          <li
            onClick={() => setActiveMenu("pending")}
            className={`p-4 cursor-pointer hover:bg-gray-700 ${
              activeMenu === "pending" ? "bg-gray-700" : ""
            }`}
          >
            Pending Tasks
          </li>
        </ul>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="flex-1 p-6">

        {/* HEADER */}
        <div className="bg-white p-5 rounded-xl shadow-md mb-6 flex justify-between">
          <div>
            <h1 className="text-2xl font-bold">Employee Dashboard</h1>
            <p className="text-gray-500">
            Welcome {userDetails?.name || "Employee"}
            </p>
          </div>

          <div className="text-right">
            <p className="font-semibold">{user?.role}</p>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>
        </div>

        {/* ================= DASHBOARD ================= */}
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

              <div className="bg-purple-600 text-white p-5 rounded-xl">
                <h3>Attendance</h3>
                <p className="text-3xl font-bold">{attendance}%</p>
              </div>

            </div>

            {/* TASK TABLE */}
            <TaskTable tasks={filteredTasks} />
          </>
        )}

        {/* ================= ATTENDANCE ================= */}
        {activeMenu === "attendance" && (
  <AttendanceCalendar />
)}

        {/* ================= COMPLETED ================= */}
        {activeMenu === "completed" && (
          <TaskTable tasks={filteredTasks} />
        )}

        {/* ================= PENDING ================= */}
        {activeMenu === "pending" && (
          <TaskTable tasks={filteredTasks} />
        )}

      </div>
    </div>
  );
}

/* 🔥 REUSABLE TASK TABLE */
function TaskTable({ tasks }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-md mt-6">
      <h2 className="text-xl font-bold mb-4">Tasks</h2>

      {tasks.length > 0 ? (
        <table className="w-full">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="p-3">Title</th>
              <th className="p-3">Status</th>
              <th className="p-3">Deadline</th>
            </tr>
          </thead>

          <tbody>
            {tasks.map((task, i) => (
              <tr key={i} className="border-b">
                <td className="p-3">{task.title}</td>
                <td className="p-3">{task.status}</td>
                <td className="p-3">{task.deadline}</td>
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