import React from "react";

const statusColors = {
  accepted: "bg-green-500",
  pending: "bg-yellow-500",
  rejected: "bg-red-500",
};

const ApplicationCard = ({ application }) => {
  return (
    <div className="bg-white shadow-md rounded p-4 flex items-center justify-between">
      <h3 className="text-lg font-semibold">{application.title}</h3>
      <span
        className={`w-4 h-4 rounded-full ${statusColors[application.status]}`}
        title={application.status}
      ></span>
    </div>
  );
};

export default ApplicationCard;
