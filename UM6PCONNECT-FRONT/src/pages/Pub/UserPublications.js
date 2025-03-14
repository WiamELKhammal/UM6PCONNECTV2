import React from "react";
import ResearchSidebar from "../../components/ResearchSidebar";
import ResearchItem from "../../components/ResearchItem";

const ResearchDashboard = () => {
  const researchItems = [
    {
      title: "TES TESTES TESTES TESTES TESTES TESTES TESTES TESTES TES",
      type: "Poster",
      date: "March 2025",
      author: "Wiam el Khammal",
      imageUrl: "/path/to/image.png",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 p-6">
      {/* Sidebar */}
      <ResearchSidebar />

      {/* Research Items */}
      <main className="w-3/4 bg-white shadow-lg p-6 ml-4">
        <h2 className="text-xl font-semibold mb-4">Research items</h2>
        <input
          type="text"
          placeholder="Search by publication title or keyword"
          className="w-full p-2 border rounded mb-4"
        />
        <div className="flex flex-col space-y-4">
          {researchItems.map((item, index) => (
            <ResearchItem key={index} {...item} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default ResearchDashboard;
