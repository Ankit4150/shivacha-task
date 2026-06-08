import React, { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import Summaryapi from "../common";

function AttendanceCalendar() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [todayAttendance, setTodayAttendance] = useState(null);
  const [timer, setTimer] = useState("00:00:00");
  const [isCheckedIn, setIsCheckedIn] = useState(false);

 const handlers = useSwipeable({
  onSwipedRight: () => {
    if (todayAttendance?.checkIn && !todayAttendance?.checkOut) {
      handleCheckOut();
    } else {
      handleCheckIn();
    }
  },
  trackMouse: true,
  delta: 50,
});

  useEffect(() => {
    fetchMonthlyAttendance();
    fetchTodayAttendance();
  }, []);

  const fetchMonthlyAttendance = async () => {
    try {
      const res = await fetch(
        Summaryapi.attendanceMonthly.url,
        {
          method: Summaryapi.attendanceMonthly.method,
          credentials: "include",
        }
      );

      const data = await res.json();
      setAttendanceData(data.attendance || []);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTodayAttendance = async () => {
    try {
      const res = await fetch(
        Summaryapi.attendanceToday.url,
        {
          method: Summaryapi.attendanceToday.method,
          credentials: "include",
        }
      );

      const data = await res.json();

      if (data.attendance) {
       const att = data.attendance;

setTodayAttendance(att || null);

if (att?.checkIn && !att?.checkOut) {
  setIsCheckedIn(true);
} else {
  setIsCheckedIn(false);
}
      }
    } catch (error) {
      console.log(error);
    }
  };

useEffect(() => {
  let interval;

  const isRunning =
    todayAttendance?.checkIn && !todayAttendance?.checkOut;

  if (isRunning) {
    interval = setInterval(() => {
      const start = new Date(todayAttendance.checkIn);
      const now = new Date();
      const diff = now - start;

      const hrs = Math.floor(diff / 3600000);
      const mins = Math.floor((diff % 3600000) / 60000);
      const secs = Math.floor((diff % 60000) / 1000);

      setTimer(
        `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`
      );
    }, 1000);
  } else {
    setTimer("00:00:00");
  }

  return () => clearInterval(interval);
}, [todayAttendance]);

  const handleCheckIn = async () => {
    try {
      const res = await fetch(
        Summaryapi.attendanceCheckin.url,
        {
          method: Summaryapi.attendanceCheckin.method,
          credentials: "include",
        }
      );

      const data = await res.json();

      alert(data.message);

      fetchTodayAttendance();
      fetchMonthlyAttendance();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckOut = async () => {
    try {
      const res = await fetch(
        Summaryapi.attendanceCheckout.url,
        {
          method: Summaryapi.attendanceCheckout.method,
          credentials: "include",
        }
      );

      const data = await res.json();

      alert(data.message);

      setIsCheckedIn(false);

      fetchTodayAttendance();
      fetchMonthlyAttendance();
    } catch (error) {
      console.log(error);
    }
  };

  const getDayColor = (date) => {
    const attendance = attendanceData.find(
      (item) => item.date === date
    );

    if (!attendance) return "bg-gray-200";

    if (attendance.status === "FULL_DAY")
      return "bg-green-500 text-white";

    if (attendance.status === "HALF_DAY")
      return "bg-yellow-400";

    return "bg-red-500 text-white";
  };

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(
    year,
    month + 1,
    0
  ).getDate();

  return (
    <div className="p-5 bg-slate-100 min-h-screen">

      {/* Working Hours Card */}
      <div className="bg-blue-600 text-white rounded-3xl p-6 shadow-lg">

        <p className="text-sm">
          WORKING HOURS
        </p>

        <h1 className="text-5xl font-bold mt-3">
          {timer}
        </h1>

        <p className="mt-2">
          Hours Worked Today
        </p>

        <div className="flex justify-between mt-6">

          <div>
            <p className="text-xs">
              Check In
            </p>

            <p>
              {todayAttendance?.checkIn
                ? new Date(
                    todayAttendance.checkIn
                  ).toLocaleTimeString()
                : "--"}
            </p>
          </div>

          <div>
            <p className="text-xs">
              Check Out
            </p>

            <p>
              {todayAttendance?.checkOut
                ? new Date(
                    todayAttendance.checkOut
                  ).toLocaleTimeString()
                : "--"}
            </p>
          </div>

        </div>
      </div>

      {/* Swipe Button */}

      <div className="bg-white p-4 mt-5 rounded-2xl shadow">

      <div
  {...handlers}
  className="bg-blue-500 text-white p-5 mt-5 rounded-2xl shadow text-center font-semibold select-none cursor-pointer"
>
  {todayAttendance?.checkIn && !todayAttendance?.checkOut
  ? "👉 Swipe Right to Check Out"
  : "👉 Swipe Right to Check In"}
</div>

      </div>

      {/* Calendar */}

      <div className="bg-white mt-5 rounded-2xl p-5 shadow">

        <h2 className="font-bold text-xl mb-4">
          Monthly Attendance
        </h2>

        <div className="grid grid-cols-7 gap-3">

          {Array.from(
            { length: daysInMonth },
            (_, i) => {
              const day = i + 1;

              const fullDate =
                `${year}-${String(
                  month + 1
                ).padStart(2, "0")}-${String(
                  day
                ).padStart(2, "0")}`;

              return (
                <div
                  key={day}
                  className={`h-12 w-12 rounded-xl flex items-center justify-center font-bold ${getDayColor(
                    fullDate
                  )}`}
                >
                  {day}
                </div>
              );
            }
          )}

        </div>

        <div className="flex gap-5 mt-6">

          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-green-500"></div>
            Full Day
          </div>

          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-yellow-400"></div>
            Half Day
          </div>

          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-red-500"></div>
            Absent
          </div>

        </div>

      </div>

    </div>
  );
}

export default AttendanceCalendar;