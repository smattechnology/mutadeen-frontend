"use client";
import { Banknote, CircleUser, Search, Menu, X } from "lucide-react";
import React, { useState } from "react";
import Marquee from "react-fast-marquee";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    "হোম",
    "আপডেট নিউজ",
    "বিষয়ভিত্তিক লেখা (Blog)",
    "বই ও PDF",
    "কুইজ খেলুন",
    "Seeking Solution",
    "আমাদের সম্পর্কে",
  ];

  return (
    <header className="w-full bg-gray-900 text-gray-100 shadow-lg">
      {/* Top Bar */}
      <div className="w-full lg:max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 p-4  px-4 md:px-0 md:space-y-0">
        <div className="w-full md:w-auto flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-3 text-xl font-bold cursor-pointer">
            <img src="/logo.png" alt="Logo" className="h-10 w-10" />
            <span>Mutadeen</span>
          </div>
          {/* Mobile menu button */}
          <button
            className="md:hidden flex items-center p-2 bg-gray-800 rounded-full hover:bg-indigo-600 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Search Bar */}
        <div className="flex items-center w-full md:w-2/4 bg-gray-800 rounded-full border border-gray-700 overflow-hidden">
          <span className="p-3 flex items-center justify-center bg-gray-700">
            <Search size={18} />
          </span>
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 bg-transparent outline-none text-gray-100 placeholder-gray-400"
          />
        </div>

        {/* User Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          <button className="flex items-center space-x-2 bg-gray-800 hover:bg-indigo-600 transition-colors px-4 py-2 rounded-full font-medium shadow-sm">
            <CircleUser />
            <span>Login</span>
          </button>
          <button className="flex items-center space-x-2 bg-gray-800 hover:bg-indigo-600 transition-colors px-4 py-2 rounded-full font-medium shadow-sm">
            <Banknote />
            <span>Donation</span>
          </button>
        </div>
      </div>

      {/* Marquee */}
      <div className="w-full bg-gray-800 py-2">
        <Marquee gradient={false} speed={80}>
          <span className="px-4 text-sm md:text-base">
            This is a smooth scrolling text!
          </span>
        </Marquee>
      </div>

      {/* Navigation */}
      <nav
        className={`w-full lg:max-w-7xl mx-auto px-4 md:px-0 py-4 transition-all duration-300 ${
          isMenuOpen
            ? "max-h-96"
            : "max-h-0 md:max-h-full overflow-hidden md:overflow-visible"
        }`}
      >
        <div className="w-full max-w-7xl mx-auto p-4 bg-gray-800 rounded-xl shadow-lg flex flex-wrap justify-center items-center gap-4 border border-gray-700">
          <ul className="flex flex-col md:flex-row justify-center md:justify-start gap-3">
            {navLinks.map((link, index) => (
              <li
                key={index}
                className="px-5 py-3 bg-gray-700 border border-gray-700 rounded-xl hover:bg-indigo-600 hover:text-white transition-colors cursor-pointer text-center font-medium shadow-sm"
              >
                {link}
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile login/donation buttons */}
        {isMenuOpen && (
          <div className="flex flex-col md:hidden mt-4 gap-2">
            <button className="flex items-center justify-center space-x-2 bg-gray-800 hover:bg-indigo-600 transition-colors px-4 py-2 rounded-full font-medium shadow-sm">
              <CircleUser />
              <span>Login</span>
            </button>
            <button className="flex items-center justify-center space-x-2 bg-gray-800 hover:bg-indigo-600 transition-colors px-4 py-2 rounded-full font-medium shadow-sm">
              <Banknote />
              <span>Donation</span>
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
