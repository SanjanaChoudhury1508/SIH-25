import React from "react";

export default function RoleTabs({ onSelect }) {
  return (
    <div className="bg-white rounded p-4 shadow flex gap-3">
      <button onClick={() => onSelect("student")} className="px-4 py-2 rounded border hover:bg-gray-50">Student</button>
      <button onClick={() => onSelect("supervisor")} className="px-4 py-2 rounded border hover:bg-gray-50">Supervisor</button>
      <button onClick={() => onSelect("admin")} className="px-4 py-2 rounded border hover:bg-gray-50">Admin</button>
    </div>
  );
}
