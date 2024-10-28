import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Navbar = () => {
  return (
    <div className="relative z-20">
      {/* Search Bar */}
      <div className="fixed top-4 left-16 right-16 md:top-0 md:left-1/2 md:transform md:-translate-x-1/2 p-4 w-auto md:w-1/2 z-20">
        <div className="bg-white p-2 rounded-lg shadow-lg flex items-center">
          <input
            type="text"
            placeholder="Mau cari apa hari ini?"
            className="flex-grow p-2 rounded-lg border border-gray-300 focus:outline-none"
          />
          <i className="fas fa-search ml-2"></i>
        </div>
      </div>

      {/* Right Icons */}
      <div className="fixed top-4 right-4 flex items-center space-x-4 z-20 md:top-0 md:right-0 md:p-4">
        <img
          src="https://plus.unsplash.com/premium_photo-1706382043380-dd6953b4fd78?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8b25saW5lfGVufDB8fDB8fHww"
          alt="User"
          className="w-8 h-8 rounded-full"
        />
      </div>
    </div>
  );
};

export default Navbar;
