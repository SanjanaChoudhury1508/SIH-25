// src/pages/admin/AdminDashboard.jsx
import React, { useState, useContext } from "react";
import { FiUsers, FiFileText, FiCheckCircle, FiLogOut } from "react-icons/fi";
import { AuthContext } from "../../context/AuthContext";  // ✅ Import AuthContext
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("applications");
  const { logout } = useContext(AuthContext);  // ✅ Get logout from context
  const navigate = useNavigate();

  // Dummy Applications Data
  const applications = [
    { id: 1, student: "Aria Sehgal", internship: "Internship A", status: "Approved" },
    { id: 2, student: "Arifa Khan", internship: "Internship B", status: "Pending" },
    { id: 3, student: "Rahul Grover", internship: "Internship C", status: "Rejected" },
  ];

  // Dummy Users Data
  const users = [
    { id: 1, name: "Student User", role: "Student" },
    { id: 2, name: "Supervisor User", role: "Supervisor" },
    { id: 3, name: "Admin User", role: "Admin" },
  ];

  // Dummy Approvals Data
  const approvals = [
    { id: 1, request: "Extension Request - Payal Jain", status: "Pending" },
    { id: 2, request: "Supervisor Approval - Jahnavi Reddy", status: "Approved" },
    { id: 3, request: "Leave Request - Aliya Bhati", status: "Rejected" },
  ];

  // Helper for status color
  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-500";
      case "Pending":
        return "bg-yellow-500";
      case "Rejected":
        return "bg-red-500";
      default:
        return "bg-gray-400";
    }
  };

  // ✅ Handle Logout
  const handleLogout = () => {
    logout();
    navigate("/login");  // Redirect to login page
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-purple-700 to-purple-900 text-white p-6 flex flex-col">
        <h1 className="text-2xl font-bold mb-10 text-center">Admin Portal</h1>
        <nav className="space-y-4">
          <button
            onClick={() => setActiveSection("users")}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
              activeSection === "users" ? "bg-purple-800" : "hover:bg-purple-800"
            }`}
          >
            <FiUsers /> Users
          </button>
          <button
            onClick={() => setActiveSection("applications")}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
              activeSection === "applications" ? "bg-purple-800" : "hover:bg-purple-800"
            }`}
          >
            <FiFileText /> Applications
          </button>
          <button
            onClick={() => setActiveSection("approvals")}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
              activeSection === "approvals" ? "bg-purple-800" : "hover:bg-purple-800"
            }`}
          >
            <FiCheckCircle /> Approvals
          </button>

          {/* ✅ Proper Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-purple-800 transition mt-auto"
          >
            <FiLogOut /> Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h2 className="text-3xl font-bold mb-6">Welcome Admin!</h2>

        {/* Applications Section */}
        {activeSection === "applications" && (
          <div className="mb-10">
            <h3 className="text-xl font-semibold mb-4">Recent Applications</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition duration-300"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">{app.internship}</h3>
                    <span
                      className={`h-3 w-3 rounded-full ${getStatusColor(app.status)}`}
                    ></span>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">Student: {app.student}</p>
                  <p className="mt-1 text-sm text-gray-500">Status: {app.status}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Users Section */}
        {activeSection === "users" && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Users</h3>
            <div className="bg-white shadow-md rounded-xl p-6">
              <ul className="divide-y divide-gray-200">
                {users.map((user) => (
                  <li key={user.id} className="py-3 flex justify-between">
                    <span className="font-medium">{user.name}</span>
                    <span className="text-gray-500">{user.role}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Approvals Section */}
        {activeSection === "approvals" && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Approvals</h3>
            <div className="bg-white shadow-md rounded-xl p-6">
              <ul className="divide-y divide-gray-200">
                {approvals.map((approval) => (
                  <li
                    key={approval.id}
                    className="py-3 flex justify-between items-center"
                  >
                    <span>{approval.request}</span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(
                        approval.status
                      )}`}
                    >
                      {approval.status}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
