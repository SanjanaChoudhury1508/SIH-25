import React from "react";
import { Link } from "react-router-dom";

export default function QuickLinks(){
  return (
    <div className="bg-white p-4 rounded shadow flex gap-4">
      <Link to="/internships" className="text-sm font-medium text-blue-600">Internships</Link>
      <Link to="/student/dashboard" className="text-sm font-medium text-gray-700">My Matches</Link>
      <Link to="/notifications" className="text-sm font-medium text-gray-700">Notifications</Link>
    </div>
  );
}
