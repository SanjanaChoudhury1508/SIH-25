import React from "react";
import { Link } from "react-router-dom";

export default function Navbar(){
  return (
    <header className="bg-white shadow">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 text-white rounded flex items-center justify-center font-bold">PM</div>
          <div>
            <h1 className="text-lg font-bold">PM Internship Scheme</h1>
            <div className="text-sm text-gray-500">Unlock opportunities · Gain experience</div>
          </div>
        </div>

        <nav className="flex items-center gap-4">
          <Link to="/login" className="text-blue-600 font-medium">Login</Link>
          <Link to="/register" className="px-3 py-1 bg-blue-600 text-white rounded">Create Account</Link>
        </nav>
      </div>
    </header>
  );
}
