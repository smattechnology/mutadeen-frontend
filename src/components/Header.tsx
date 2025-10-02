import { Banknote, CircleUser, Search } from "lucide-react";
import React from "react";
import Marquee from "react-fast-marquee";

function Header() {
  return (
    <header className="w-full py-4 bg-gray-800 text-white flex flex-col space-y-4">
      <div className="w-full lg:max-w-7xl mx-auto flex justify-between items-center">
        <span className="flex items-center space-x-2">
          <img src="/logo.png" alt="Logo" className="h-8 w-8" />
          <span>Mutadeen</span>
        </span>

        <div className="w-2xl flex items-center space-x-2 rounded-full border-2 border-gray-700 p-2">
          <span className="p-2 bg-gray-700 rounded-full">
            <Search size={15} />
          </span>

          <input
            type="text"
            placeholder="Search.."
            className="outline-none w-full"
          />
        </div>
        <div className="flex items-center space-x-2">
          <button className="py-2 px-2.5 bg-gray-700 rounded-full flex justify-center items-center space-x-2">
            <CircleUser />
            <span>Login</span>
          </button>
          <button className="py-2 px-2.5 bg-gray-700 rounded-full flex justify-center items-center space-x-2">
            <Banknote />
            <span>Donation</span>
          </button>
        </div>
      </div>

      <div className="w-full">
        <Marquee gradient={false} speed={100}>
          This is a smooth scrolling text using react-fast-marquee!
        </Marquee>
      </div>

      <nav className="w-full lg:max-w-7xl mx-auto p-4 flex justify-center items-center border-2 border-gray-700 rounded-full">
        <ul className="flex space-x-6">
          <li className="border border-gray-700 rounded-lg p-4 cursor-pointer">
            হোম
          </li>
          <li className="border border-gray-700 rounded-lg p-4 cursor-pointer">
            আপডেট নিউজ
          </li>
          <li className="border border-gray-700 rounded-lg p-4 cursor-pointer">
            বিষয়ভিত্তিক লেখা (Blog)
          </li>
          <li className="border border-gray-700 rounded-lg p-4 cursor-pointer">
            বই ও PDF
          </li>
          <li className="border border-gray-700 rounded-lg p-4 cursor-pointer">
            কুইজ খেলুন
          </li>
          <li className="border border-gray-700 rounded-lg p-4 cursor-pointer">
            Seeking Solution
          </li>
          <li className="border border-gray-700 rounded-lg p-4 cursor-pointer">
            আমাদের সম্পর্কে
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
