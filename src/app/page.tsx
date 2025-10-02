import Carousel from "@/components/Carousol";
import { CircleSmall } from "lucide-react";

export default function Home() {
  const slides = ["Slide 1", "Slide 2", "Slide 3"];

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-full p-4">
        <Carousel slides={slides} />
      </div>
      <div className="w-full lg:max-w-7xl mx-auto p-4 bg-gray-800 text-white flex flex-wrap justify-center items-center space-x-6 border-y-4 border-gray-700">
        <span className="p-4 rounded-full border bg-gray-700">
          হিজরি ক্যালেন্ডার ও মাসিক আমল
        </span>
        <span className="p-4 rounded-full border bg-gray-700">Youtube</span>
        <span className="p-4 rounded-full border bg-gray-700">Donate Us!</span>
        <span className="p-4 rounded-full border bg-gray-700">Facebook</span>
        <span className="p-4 rounded-full border bg-gray-700">
          সালাতের সময়সূচি
        </span>
      </div>

      <div className="w-full lg:max-w-7xl mx-auto p-4 flex justify-between items-center space-x-4 border-y-4 border-gray-700 text-white">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="w-full flex flex-col justify-start items-start rounded-lg overflow-hidden"
          >
            <div className="w-full p-2 bg-gray-700">
              <h2>আজকের আপডেট নিউজ</h2>
              <p>২০ জুলাই,২০২৫ (রবিবার)</p>
            </div>
            <div className="w-full p-2 flex flex-col justify-between items-center space-y-2 bg-gray-600">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="w-full flex justify-start items-center space-x-2"
                >
                  <CircleSmall />
                  <p className="text-nowrap">
                    দ্বীনি বউ খুঁজে খুঁজে হয়রান জলঢাকার তাজমিরুল ভাই...
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
