import React from "react";
import Maps from "../components/maps";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";

const Dashboard = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="w-64">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-grow">
        <Navbar />
        <div className="flex-grow w-full">
          <Maps />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
