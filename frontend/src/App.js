import ProtectedRoute from "./common/ProtectedRoute";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import VerifyOtp from "./components/VerifyOtp";

import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <ToastContainer
          position="top-right"
          autoClose={3000}
        />

        <Routes>
          <Route path="/" element={<Login />} />

          <Route
            path="/signup"
            element={<Signup />}
          />
         <Route
          path="/verify-otp"
          element={<VerifyOtp />}
               />
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="ADMIN">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/employee"
            element={
              <ProtectedRoute role="USER">
                <EmployeeDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;