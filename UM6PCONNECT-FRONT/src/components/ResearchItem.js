import React from "react";

const ResearchItem = ({ title, type, date, author, imageUrl }) => {
  return (
    <div className="border p-4 rounded-lg flex items-start">
      <div className="flex-grow">
        <h3 className="font-semibold text-lg">{title}</h3>
        <div className="flex items-center space-x-2 mt-2">
          <span className="bg-green-700 text-white px-2 py-1 text-xs rounded">
            New
          </span>
          <span className="bg-green-200 text-green-800 px-2 py-1 text-xs rounded">
            {type}
          </span>
          <span className="border border-green-500 text-green-700 px-2 py-1 text-xs rounded">
            File available
          </span>
        </div>
        <p className="text-gray-600 text-sm mt-2">{date}</p>
        <p className="text-gray-800 font-medium">{author}</p>
        <button className="mt-2 text-blue-600 hover:underline">
          Add supplementary resources
        </button>
      </div>
      <div className="w-20 h-28 ml-4">
        <img
          src={imageUrl}
          alt="Research"
          className="w-full h-full object-cover border"
        />
        <p className="text-xs text-gray-600 text-center mt-1">Source</p>
      </div>
    </div>
  );
};

export default ResearchItem;
