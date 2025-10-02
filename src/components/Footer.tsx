import React from "react";

function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-gray-100 mt-10">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div className="flex flex-col space-y-4">
          <img src="/logo.png" alt="Logo" className="h-10 w-10" />
          <p className="text-gray-400 text-sm">
            Mutadeen is dedicated to providing quality religious content,
            educational resources, and community support.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col space-y-2">
          <h3 className="font-semibold text-white text-lg mb-2">Quick Links</h3>
          <ul className="space-y-1 text-gray-400 text-sm">
            <li className="hover:text-indigo-500 cursor-pointer transition-colors">
              হোম
            </li>
            <li className="hover:text-indigo-500 cursor-pointer transition-colors">
              আপডেট নিউজ
            </li>
            <li className="hover:text-indigo-500 cursor-pointer transition-colors">
              বিষয়ভিত্তিক লেখা (Blog)
            </li>
            <li className="hover:text-indigo-500 cursor-pointer transition-colors">
              বই ও PDF
            </li>
            <li className="hover:text-indigo-500 cursor-pointer transition-colors">
              কুইজ খেলুন
            </li>
          </ul>
        </div>

        {/* Social / Contact */}
        <div className="flex flex-col space-y-2">
          <h3 className="font-semibold text-white text-lg mb-2">Follow Us</h3>
          <div className="flex space-x-4">
            <a
              href="#"
              className="p-2 bg-gray-700 rounded-full hover:bg-indigo-500 transition-colors"
            >
              Facebook
            </a>
            <a
              href="#"
              className="p-2 bg-gray-700 rounded-full hover:bg-indigo-500 transition-colors"
            >
              Youtube
            </a>
            <a
              href="#"
              className="p-2 bg-gray-700 rounded-full hover:bg-indigo-500 transition-colors"
            >
              Donate
            </a>
          </div>
          <p className="text-gray-400 text-sm mt-4">
            Contact: info@mutadeen.com
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="w-full border-t border-gray-700 mt-6">
        <div className="max-w-7xl mx-auto px-4 py-4 text-center text-gray-500 text-sm">
          &copy; 2025 Mutadeen. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
