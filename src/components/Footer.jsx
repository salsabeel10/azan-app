import React from "react";

const Footer = () => {
  return (
    <footer className="text-white/95 border-t border-gray-300 py-4">
      <div className="max-w-6xl mx-auto     flex flex-col sm:flex-row justify-between items-center text-sm">
        
        {/* Left: Copyright */}
        <div className="mb-2 sm:mb-0">
          &copy; {new Date().getFullYear()} Azan Times
        </div>

        {/* Center: Tagline */}
        <div className="mb-2 sm:mb-0 text-center">
          Prayer. Peace. Precision.
        </div>

        {/* Right: Links */}
        <div className="flex space-x-4">
          <a href="#" className="hover:text-cyan-500 transition">Github</a>
          <a href="#" className="hover:text-cyan-500 transition">Contact</a>
          <a href="#" className="hover:text-cyan-500 transition">About</a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
