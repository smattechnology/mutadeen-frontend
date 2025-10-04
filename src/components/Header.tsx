"use client";
import { Banknote, CircleUser, Search, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Marquee from "react-fast-marquee";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "হোম", path: "/" },
    { name: "আপডেট নিউজ", path: "/news" },
    { name: "বিষয়ভিত্তিক লেখা (Blog)", path: "/blog" },
    { name: "বই ও PDF", path: "/books" },
    { name: "কুইজ খেলুন", path: "/quiz" },
    { name: "Seeking Solution", path: "/solutions" },
    { name: "আমাদের সম্পর্কে", path: "/about" },
  ];

  return (
    <header className="w-full bg-gray-900 text-gray-100 shadow-lg">
      {/* Top Bar */}
      <div className="w-full lg:max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 p-4  px-4 md:px-0 md:space-y-0">
        <div className="w-full md:w-auto flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-3 text-xl font-bold cursor-pointer">
            <Image src="/logo.jpg" width={150} height={50} alt="Logo" />
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
    </header>
  );
}

export default Header;
