import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative h-screen z-30">
      {/* Hamburger Icon */}
      <div className="fixed top-4 left-4 z-30 md:hidden">
        <button onClick={toggleSidebar} className="p-2">
          <i className="fas fa-bars text-2xl"></i>
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 p-4 bg-white shadow-lg transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 transition-transform duration-300 w-64`}
      >
        <h1 className="text-2xl font-bold mb-4">KitaBeli</h1>
        <div className="mb-4">
          <select className="w-full bg-gray-100 p-2 rounded-lg">
            <option value="Pasir Angling">Pasir Angling</option>
            <option value="Cibaduyut">Cibaduyut</option>
            <option value="Dago">Dago</option>
            <option value="Lembang">Lembang</option>
          </select>
        </div>
        <div className="space-y-2">
          <div className="flex items-center p-2 bg-gray-100 rounded-lg">
            <i className="fas fa-tachometer-alt mr-2"></i>
            <span>Dashboard</span>
          </div>
          <div className="flex items-center p-2 bg-gray-100 rounded-lg">
            <i className="fas fa-user mr-2"></i>
            <span>Tinjau Akun</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
