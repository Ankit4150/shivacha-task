import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import    Signup from './pages/Signup';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/Signup' element={<Signup />} />
        <Route path='/admin' element={<AdminDashboard />} />
        <Route path='/employee' element={<EmployeeDashboard />} />
      </Routes>
    </BrowserRouter>
  );}

export default App;