import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiHome, FiUser, FiFileText, FiClipboard, FiLogOut } from "react-icons/fi";

const SupervisorDashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("dashboard");

  // Dummy data for internships and applications
  const internships = [
    { id: 1, title: "Web Development Internship", students: 10 },
    { id: 2, title: "AI/ML Internship", students: 7 },
    { id: 3, title: "Cybersecurity Internship", students: 5 },
  ];

  const applications = [
    { id: 1, student: "Arifa Khan", internship: "Web Development", status: "Pending" },
    { id: 2, student: "Rahul Singh", internship: "AI/ML", status: "Approved" },
    { id: 3, student: "Aria Sehgal", internship: "Cybersecurity", status: "Rejected" },
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
  const handleLogin = (e) => {
    e.preventDefault(); // prevent full page reload
    // For now, skip validation & directly go to dashboard
    navigate("/supervisor-dashboard");
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-purple-700 to-purple-900 text-white p-6 flex flex-col">
        <h1 className="text-2xl font-bold mb-10 text-center">Supervisor Portal</h1>
        <nav className="space-y-4">
          <button
            onClick={() => setActiveSection("dashboard")}
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-purple-800 transition w-full text-left"
          >
            <FiHome /> Dashboard
          </button>
          <button
            onClick={() => setActiveSection("profile")}
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-purple-800 transition w-full text-left"
          >
            <FiUser /> Profile
          </button>
          <button
            onClick={() => setActiveSection("internships")}
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-purple-800 transition w-full text-left"
          >
            <FiClipboard /> Manage Internships
          </button>
          <button
            onClick={() => setActiveSection("applications")}
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-purple-800 transition w-full text-left"
          >
            <FiFileText /> Applications Review
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-red-700 transition mt-auto w-full text-left"
          >
            <FiLogOut /> Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Dashboard Section */}
        {activeSection === "dashboard" && (
          <div>
            <h2 className="text-3xl font-bold mb-4">Welcome Supervisor!</h2>
            <p className="text-gray-600 mb-6">Here’s an overview of your internships and student applications.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {internships.map((intern) => (
                <div
                  key={intern.id}
                  className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition duration-300"
                >
                  <h3 className="text-lg font-semibold">{intern.title}</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    {intern.students} Students Enrolled
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Profile Section */}
        {activeSection === "profile" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Profile</h2>
            <p><strong>Name:</strong> Supervisor</p>
            <p><strong>Email:</strong> supervisor@example.com</p>
            <p><strong>Department:</strong> Computer Science</p>
          </div>
        )}

        {/* Manage Internships */}
        {activeSection === "internships" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Manage Internships</h2>
            <ul className="space-y-3">
              {internships.map((intern) => (
                <li key={intern.id} className="bg-white p-4 shadow rounded-lg flex justify-between">
                  <span>{intern.title}</span>
                  <span className="text-sm text-gray-500">{intern.students} students</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Applications Review */}
        {activeSection === "applications" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Applications Review</h2>
            <div className="space-y-4">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="bg-white p-4 shadow rounded-lg flex justify-between items-center"
                >
                  <div>
                    <p><strong>{app.student}</strong> applied for {app.internship}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-white text-sm ${getStatusColor(app.status)}`}
                  >
                    {app.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupervisorDashboard;
