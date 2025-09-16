import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiHome, FiUser, FiFileText, FiLogOut } from "react-icons/fi";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("dashboard");

  const applications = [
    { id: 1, title: "Internship A", status: "Approved" },
    { id: 2, title: "Internship B", status: "Pending" },
    { id: 3, title: "Internship C", status: "Rejected" },
  ];

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

  const handleLogout = () => {
    localStorage.removeItem("token"); // or whatever key you stored
    localStorage.removeItem("user");
    navigate("/login"); // redirect to login page
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-blue-700 to-blue-900 text-white p-6 flex flex-col">
        <h1 className="text-2xl font-bold mb-10 text-center">Student Portal</h1>
        <nav className="space-y-4">
          <button
            onClick={() => setActiveSection("dashboard")}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg w-full text-left ${
              activeSection === "dashboard" ? "bg-blue-800" : "hover:bg-blue-800"
            }`}
          >
            <FiHome /> Dashboard
          </button>
          <button
            onClick={() => setActiveSection("profile")}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg w-full text-left ${
              activeSection === "profile" ? "bg-blue-800" : "hover:bg-blue-800"
            }`}
          >
            <FiUser /> Profile
          </button>
          <button
            onClick={() => setActiveSection("applications")}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg w-full text-left ${
              activeSection === "applications"
                ? "bg-blue-800"
                : "hover:bg-blue-800"
            }`}
          >
            <FiFileText /> Applications
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2 rounded-lg w-full text-left mt-auto hover:bg-blue-800"
          >
            <FiLogOut /> Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {activeSection === "dashboard" && (
          <>
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold">Welcome!</h2>
                <p className="text-gray-600">
                  Quick overview of your recent applications
                </p>
              </div>
            </div>

            {/* Applications Preview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition duration-300"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">{app.title}</h3>
                    <span
                      className={`h-3 w-3 rounded-full ${getStatusColor(
                        app.status
                      )}`}
                    ></span>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">{app.status}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {activeSection === "profile" && (
          <div>
            <h2 className="text-3xl font-bold mb-6">👤 My Profile</h2>
            <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
              <p>
                <span className="font-semibold">Name:</span> Student
              </p>
              <p>
                <span className="font-semibold">Email:</span>{" "}
                student@example.com
              </p>
              <p>
                <span className="font-semibold">Course:</span> Computer Science
              </p>
              <p>
                <span className="font-semibold">Year:</span> 3rd Year
              </p>
            </div>
          </div>
        )}

        {activeSection === "applications" && (
          <div>
            <h2 className="text-3xl font-bold mb-6">📄 My Applications</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <ul className="space-y-4">
                {applications.map((app) => (
                  <li
                    key={app.id}
                    className="flex justify-between items-center border-b pb-2"
                  >
                    <span className="font-semibold">{app.title}</span>
                    <span
                      className={`px-3 py-1 rounded-full text-white text-sm ${getStatusColor(
                        app.status
                      )}`}
                    >
                      {app.status}
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

export default StudentDashboard;
