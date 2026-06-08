import React, { useEffect, useState, useContext } from "react";
import Summaryapi from "../common";
import { UserContext } from "../context/UserContext";

function AdminDashboard() {
  const { userDetails } = useContext(UserContext);

  const [employees, setEmployees] = useState([]);
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(Summaryapi.alluser.url, {
          method: Summaryapi.alluser.method,
          credentials: "include",
        });

        const data = await response.json();

        if (Array.isArray(data)) {
          setEmployees(data);
        } else if (Array.isArray(data.data)) {
          setEmployees(data.data);
        } else if (Array.isArray(data.users)) {
          setEmployees(data.users);
        } else {
          setEmployees([]);
        }
      } catch (error) {
        console.log("Fetch Users Error:", error);
      }
    };

    fetchUsers();
  }, []);

  // ✅ LOGOUT FUNCTION
  const handleLogout = async () => {
     console.log("Logout clicked");
    try {
      await fetch(Summaryapi.logout.url, {
        method: Summaryapi.logout.method,
        credentials: "include",
      });

      // clear frontend state (optional)
      window.location.href = "/";
    } catch (error) {
      console.log("Logout Error:", error);
    }
  };

  const totalEmployees = employees.length;

  const activeCount = employees.filter(
    (emp) => emp?.status === "ACTIVE"
  ).length;

  const blockedCount = employees.filter(
    (emp) => emp?.status === "BLOCKED"
  ).length;

  const filteredEmployees = employees.filter((emp) =>
    emp?.name?.toLowerCase().includes(search.toLowerCase())
  );

  const usersPerPage = 5;

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  const currentUsers = filteredEmployees.slice(
    indexOfFirstUser,
    indexOfLastUser
  );

  const totalPages = Math.ceil(filteredEmployees.length / usersPerPage);

  const handleStatusChange = async (userId, status) => {
  setEmployees((prev) =>
    prev.map((emp) =>
      emp._id === userId
        ? { ...emp, status }
        : emp
    )
  );

  try {
    await fetch(
      `${Summaryapi.updatestatus.url}/${userId}`,
      {
        method: Summaryapi.updatestatus.method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ status }),
      }
    );
  } catch (error) {
    console.log(error);
  }
};

const handleRemoveUser = async (userId) => {
  setEmployees((prev) =>
    prev.filter(
      (emp) => emp._id !== userId
    )
  );

  try {
    await fetch(
      `${Summaryapi.deleteuser.url}/${userId}`,
      {
        method: Summaryapi.deleteuser.method,
        credentials: "include",
      }
    );
  } catch (error) {
    console.log(error);
  }
};

  return (
   <div className="flex min-h-screen bg-slate-100">

      {/* SIDEBAR */}
      <div className="w-64 bg-gray-800 text-white flex flex-col min-h-screen">

        {/* TOP MENU */}
        <div>
        <div className="p-6 text-3xl font-bold text-center border-b border-gray-700">
  EMS
</div>

          <ul className="mt-5">
            <li
              onClick={() => setActiveMenu("dashboard")}
              className={`p-4 cursor-pointer hover:bg-gray-700 ${
                activeMenu === "dashboard" ? "bg-gray-700" : ""
              }`}
            >
              Dashboard
            </li>

            <li
              onClick={() => setActiveMenu("employees")}
              className={`p-4 cursor-pointer hover:bg-gray-700 ${
                activeMenu === "employees" ? "bg-gray-700" : ""
              }`}
            >
              Employees
            </li>
          </ul>
        </div>

        {/* BOTTOM LOGOUT BUTTON */}
        <div className="mt-auto p-4 border-t border-gray-700">
          <button
           
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 py-2 rounded"
          >
            
            Logout
          </button>
        </div>

      </div>

      {/* MAIN CONTENT (same as your code) */}
      <div className="flex-1">
       <div className="bg-white shadow-md px-8 py-5 flex justify-between items-center">
  <div>
    <h1 className="text-2xl font-bold">
      Admin Dashboard
    </h1>

    <p className="text-gray-500">
      Manage Employees & System
    </p>
  </div>

  <div className="flex items-center gap-3">
    <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
      {userDetails?.name?.charAt(0)}
    </div>

    <div>
      <p className="font-semibold">
        {userDetails?.name}
      </p>

      <p className="text-sm text-gray-500">
        {userDetails?.role}
      </p>
    </div>
  </div>
</div>

        <div className="p-6">

          {/* DASHBOARD */}
          {activeMenu === "dashboard" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6 rounded-xl shadow-lg">
    <h3 className="text-lg">Total Employees</h3>
    <p className="text-4xl font-bold mt-2">
      {totalEmployees}
    </p>
  </div>

  <div className="bg-gradient-to-r from-green-500 to-green-700 text-white p-6 rounded-xl shadow-lg">
    <h3 className="text-lg">Active Employees</h3>
    <p className="text-4xl font-bold mt-2">
      {activeCount}
    </p>
  </div>

  <div className="bg-gradient-to-r from-red-500 to-red-700 text-white p-6 rounded-xl shadow-lg">
    <h3 className="text-lg">Blocked Employees</h3>
    <p className="text-4xl font-bold mt-2">
      {blockedCount}
    </p>
  </div>
</div>
          )}

          {/* EMPLOYEES TABLE (your same code) */}
          {activeMenu === "employees" && (
            <div>
              <h2 className="text-2xl font-bold mb-4">
                Employee List
              </h2>

            <div className="mb-5">
  <input
    type="text"
    placeholder="🔍 Search employee..."
    value={search}
    onChange={(e) => {
      setSearch(e.target.value);
      setCurrentPage(1);
    }}
   className="w-64 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
</div>

              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <table className="w-full">
   <thead>
  <tr className="bg-gray-800 text-white">
    <th className="p-3 text-left">#</th>
    <th className="p-3 text-left">Name</th>
    <th className="p-3 text-left">Username</th>
    <th className="p-3 text-left">Role</th>
    <th className="p-3 text-left">Status</th>
    <th className="p-3 text-left">Action</th>
  </tr>
</thead>

<tbody>
  {currentUsers.length > 0 ? (
    currentUsers.map((emp, index) => (
      <tr
        key={emp._id}
        className="border-b hover:bg-gray-50"
      >
        <td className="p-3">
          {indexOfFirstUser + index + 1}
        </td>

        <td className="p-3">{emp.name}</td>
        <td className="p-3">{emp.username}</td>
        <td className="p-3">{emp.role}</td>

     <td className="p-3">
  <div className="flex gap-2">
    <button
      onClick={() =>
        handleStatusChange(emp._id, "ACTIVE")
      }
      className={`px-3 py-1 rounded-full text-sm font-semibold transition ${
        emp.status === "ACTIVE"
          ? "bg-green-500 text-white"
          : "bg-gray-200 text-gray-600"
      }`}
    >
      Active
    </button>

    <button
      onClick={() =>
        handleStatusChange(emp._id, "BLOCKED")
      }
      className={`px-3 py-1 rounded-full text-sm font-semibold transition ${
        emp.status === "BLOCKED"
          ? "bg-red-500 text-white"
          : "bg-gray-200 text-gray-600"
      }`}
    >
      Blocked
    </button>
  </div>
</td>

    <td className="p-3">
  <button
    onClick={() => {
      if (window.confirm("Are you sure you want to remove this employee?")) {
        handleRemoveUser(emp._id);
      }
    }}
    className="px-3 py-1 text-sm rounded-md
               bg-red-50 text-red-600 border border-red-200
               hover:bg-red-600 hover:text-white
               transition-all duration-200"
  >
    Remove
  </button>
</td>
      </tr>
    ))
  ) : (
    <tr>
      <td
        colSpan="6"
        className="text-center p-5 text-gray-500"
      >
        No employees found
      </td>
    </tr>
  )}
</tbody>

                 
                </table>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;