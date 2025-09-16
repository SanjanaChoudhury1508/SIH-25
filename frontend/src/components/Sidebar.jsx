import React from "react";

const Sidebar = ({ onSelect }) => {
  return (
    <aside className="w-64 bg-white shadow-md h-screen p-6">
      <h2 className="text-xl font-bold mb-6">Student Portal</h2>
      <nav className="space-y-4">
        <button onClick={() => onSelect("dashboard")} className="block w-full text-left hover:text-blue-500">
          Dashboard
        </button>
        <button onClick={() => onSelect("profile")} className="block w-full text-left hover:text-blue-500">
          Profile
        </button>
        <button onClick={() => onSelect("applications")} className="block w-full text-left hover:text-blue-500">
          Applications
        </button>
        <button onClick={() => onSelect("logout")} className="block w-full text-left hover:text-red-500">
          Logout
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
