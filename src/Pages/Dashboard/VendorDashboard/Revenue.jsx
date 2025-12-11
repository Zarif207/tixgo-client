import React from "react";

const Revenue = () => {
  return (
    <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-semibold mb-4">Revenue Overview</h2>

      {/* Top Summary Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 bg-white rounded-lg shadow">
          <h3 className="text-xl font-semibold">Total Revenue</h3>
          <p className="text-3xl font-bold text-green-600">$0</p>
        </div>

        <div className="p-5 bg-white rounded-lg shadow">
          <h3 className="text-xl font-semibold">Tickets Sold</h3>
          <p className="text-3xl font-bold text-blue-600">0</p>
        </div>

        <div className="p-5 bg-white rounded-lg shadow">
          <h3 className="text-xl font-semibold">Tickets Added</h3>
          <p className="text-3xl font-bold text-purple-600">0</p>
        </div>
      </div>

      {/* Placeholder for charts */}
      <div className="bg-white rounded-lg p-5 shadow h-64 flex items-center justify-center text-gray-500">
        Line Chart Placeholder
      </div>

      <div className="bg-white rounded-lg p-5 shadow h-64 flex items-center justify-center text-gray-500">
        Bar Chart Placeholder
      </div>
    </div>
  );
};

export default Revenue;