import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import StudentDashboard from "./pages/student/StudentDashboard";
import Home from "./pages/Home";
import SupervisorDashboard from "./pages/supervisor/SupervisorDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
function App() {
  return (
    <Routes>
      {/* Auth Pages */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Home />} />
      {/* Student Dashboard */}
      <Route path="/student-dashboard" element={<StudentDashboard />} />
      <Route path="/" element={<Login />} />
  
      <Route path="/supervisor-dashboard" element={<SupervisorDashboard />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      {/* Default Route */}
      <Route path="*" element={<Login />} />
    </Routes>
  );
}

export default App;
