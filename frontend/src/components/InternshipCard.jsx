import React from "react";

export default function InternshipCard({ internship, onApply }) {
  return (
    <div className="bg-white p-4 rounded shadow flex justify-between items-start gap-4">
      <div>
        <h3 className="text-lg font-semibold">{internship.role_title || internship.title || "Untitled"}</h3>
        <p className="text-sm text-gray-600">{internship.description}</p>
        <div className="text-sm text-gray-500 mt-2">
          <span className="mr-3">Type: {internship.internship_type || "—"}</span>
          <span className="mr-3">Location: {internship.location || "Remote"}</span>
          <span>Stipend: {internship.stipend || "—"}</span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <button
          onClick={() => onApply(internship._id)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Apply
        </button>
        <button className="border px-3 py-1 rounded text-sm">Details</button>
      </div>
    </div>
  );
}
