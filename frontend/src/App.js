// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Login from './pages/Login';
// import Signup from './pages/Signup';
// import AdminDashboard from './pages/AdminDashboard';
// import EmployeeDashboard from './pages/EmployeeDashboard';

// function App() {
//   return (
//     <BrowserRouter>
//       <ToastContainer
//         position="top-right"
//         autoClose={3000}
//       />
//       <Routes>
//         <Route path='/' element={<Login />} />
//         <Route path='/Signup' element={<Signup />} />
//         <Route path='/admin' element={<AdminDashboard />} />
//         <Route path='/employee' element={<EmployeeDashboard />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;


import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";

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
          <Route path="/Signup" element={<Signup />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/employee" element={<EmployeeDashboard />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;