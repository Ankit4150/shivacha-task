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

     console.log("Users Response:", data);

        
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

  const totalPages = Math.ceil(
    filteredEmployees.length / usersPerPage
  );

return (
<div className="flex min-h-screen bg-gray-100">
<div className="w-64 bg-gray-800 text-white">
 <div className="p-5 text-2xl font-bold border-b border-gray-700">
    Admin Panel
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

      <div className="flex-1">
        <div className="bg-white shadow p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            Welcome, {userDetails?.name || "Admin"}
          </h2>
        </div>

        <div className="p-6">
          {activeMenu === "dashboard" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="bg-white p-5 rounded-lg shadow">
                <h3 className="text-gray-500">Total Employees</h3>
                <p className="text-3xl font-bold">
                  {totalEmployees}
                </p>
              </div>

              <div className="bg-white p-5 rounded-lg shadow">
                <h3 className="text-gray-500">Active Employees</h3>
                <p className="text-3xl font-bold text-green-600">
                  {activeCount}
                </p>
              </div>

         <div className="bg-white p-5 rounded-lg shadow">
                <h3 className="text-gray-500">Blocked Employees</h3>
                <p className="text-3xl font-bold text-red-600">
                  {blockedCount}
                </p>
              </div>
            </div>
          )}

          {activeMenu === "employees" && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">
                  Employee List
                </h2>

                <input
                  type="text"
                  placeholder="Search by name..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="border border-gray-300 rounded px-4 py-2 w-72"
                />
              </div>
              <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-800 text-white">
                      <th className="p-3 text-left">#</th>
                      <th className="p-3 text-left">Name</th>
                      <th className="p-3 text-left">Username</th>
                      <th className="p-3 text-left">Role</th>
                      <th className="p-3 text-left">Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {currentUsers.length > 0 ? (
                      currentUsers.map((emp, index) => (
                        <tr
                          key={emp._id || index}
                          className="border-b hover:bg-gray-50"
                        >
                          <td className="p-3">
                            {indexOfFirstUser + index + 1}
                          </td>

                          <td className="p-3">
                            {emp.name || "N/A"}
                          </td>

                          <td className="p-3">
                            {emp.username || "N/A"}
                          </td>

                          <td className="p-3">
                            {emp.role || "N/A"}
                          </td>

                          <td className="p-3">
                            <span
                              className={`px-3 py-1 rounded-full text-sm ${
                                emp.status === "ACTIVE"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-700"
                              }`}
                            >
                              {emp.status || "N/A"}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="5"
                          className="text-center p-5 text-gray-500"
                        >
                          No employees found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-5">
                  <button
                    disabled={currentPage === 1}
                    onClick={() =>
                      setCurrentPage((prev) => prev - 1)
                    }
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                  >
                    Previous
                  </button>

                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        setCurrentPage(index + 1)
                      }
                      className={`px-4 py-2 rounded ${
                        currentPage === index + 1
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() =>
                      setCurrentPage((prev) => prev + 1)
                    }
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
           </div>
    </div>
  );
}

export default AdminDashboard;