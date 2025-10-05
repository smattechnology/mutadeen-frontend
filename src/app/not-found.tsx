"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-50 dark:bg-gray-900">
      <h1 className="text-7xl font-bold text-blue-600">404</h1>
      <h2 className="text-2xl font-semibold mt-4 text-gray-800 dark:text-gray-200">
        পৃষ্ঠা খুঁজে পাওয়া যায়নি
      </h2>
      <p className="text-gray-500 mt-2">
        আপনি যে পৃষ্ঠাটি খুঁজছেন, তা হয়তো মুছে ফেলা হয়েছে বা সরিয়ে নেওয়া হয়েছে।
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        হোমে ফিরে যান
      </Link>
    </div>
  );
}
