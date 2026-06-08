// import React, { useEffect, useState } from "react";
// import Summaryapi from "../common";

// function AttendancePage() {
//   const [attendance, setAttendance] = useState([]);

//   useEffect(() => {
//     fetchAttendance();
//   }, []);

//   const fetchAttendance = async () => {
//     const res = await fetch(Summaryapi.attendanceget.url, {
//       method: Summaryapi.attendanceget.method,
//       credentials: "include",
//     });

//     const data = await res.json();
//     setAttendance(data?.data || []);
//   };

//   const handleCheckIn = async () => {
//     await fetch(Summaryapi.attendancecheckin.url, {
//       method: Summaryapi.attendancecheckin.method,
//       credentials: "include",
//     });

//     fetchAttendance();
//   };

//   const handleCheckOut = async () => {
//     await fetch(Summaryapi.attendancecheckout.url, {
//       method:Summaryapi.attendancecheckout.method,
//       credentials: "include",
//     });

//     fetchAttendance();
//   };

//   const getColor = (status) => {
//     if (status === "FULL") return "bg-green-500";
//     if (status === "HALF") return "bg-yellow-400";
//     return "bg-red-500";
//   };

//   return (
//     <div className="p-6">

//       {/* BUTTONS */}
//       <div className="mb-6">
//         <button
//           onClick={handleCheckIn}
//           className="bg-green-600 text-white px-4 py-2 rounded mr-3"
//         >
//           Check In
//         </button>

//         <button
//           onClick={handleCheckOut}
//           className="bg-red-600 text-white px-4 py-2 rounded"
//         >
//           Check Out
//         </button>
//       </div>

//       {/* TITLE */}
//       <h2 className="text-xl font-bold mb-4">
//         My Attendance
//       </h2>

//       {/* CALENDAR GRID */}
//       <div className="grid grid-cols-7 gap-2">
//         {attendance.map((day, i) => (
//           <div
//             key={i}
//             className={`p-3 text-white rounded text-center ${getColor(day.status)}`}
//           >
//             <p className="text-sm">{day.date.slice(8, 10)}</p>
//             <p className="text-xs">{day.status}</p>
//           </div>
//         ))}
//       </div>

//     </div>
//   );
// }

// export default AttendancePage;