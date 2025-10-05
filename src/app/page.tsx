import Carousel from "@/components/Carousol";
import { CircleSmall, Gamepad2, Rss } from "lucide-react";

export default function Home() {
  const slides = ["Slide 1", "Slide 2", "Slide 3"];
  const quickLinks = [
    "হিজরি ক্যালেন্ডার ও মাসিক আমল",
    "Youtube",
    "Donate Us!",
    "Facebook",
    "সালাতের সময়সূচি",
  ];

  const newsItems = [
    "দ্বীনি বউ খুঁজে খুঁজে হয়রান জলঢাকার তাজমিরুল ভাই...",
    "নতুন করে প্রকাশিত ইসলামী বই সংক্রান্ত খবর...",
    "আজকের গুরুত্বপূর্ণ ধর্মীয় সংবাদ...",
  ];

  const quizItems = [
    {
      topic: "ইমান ও আকিদা",
      reward: "টি শার্ট",
    },
    {
      topic: "সুরা আন-নূর",
      reward: "৫০ টাকা মোবাইল রিচার্জ",
    },
    {
      topic: "ইসলামের ইতিহাস",
      reward: "৫০০ টাকা সেন্ড মানি",
    },
  ];

  const blogItems = [
    {
      title: "সাকিব ভাইয়ের বিবাহ",
      topic: "দুয়া কবুলের গল্প",
    },
    {
      title: "ইসলাম কি আসলেই সত্য ধর্ম?",
      topic: "ইসলামবিদ্বেষীদের জবাব",
    },
    {
      title: "বাংলাদেশে ইসলামের আগমন",
      topic: "ইসলামের ইতিহাস",
    },
  ];

  return (
    <div className="w-full flex flex-col items-center bg-background">
      {/* Carousel Section */}
      <div className="w-full max-w-7xl p-4">
        <Carousel slides={slides} />
      </div>

      {/* Quick Links Section */}
      <div className="w-full max-w-7xl mx-auto p-4 flex flex-wrap justify-center items-center gap-4">
        {quickLinks.map((link, index) => (
          <span
            key={index}
            className="px-5 py-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors cursor-pointer text-center font-medium shadow-sm"
          >
            {link}
          </span>
        ))}
      </div>

      {/* Cards Section */}
      <div className="w-full max-w-7xl mx-auto p-4 mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* News Card */}
        <div className="bg-card rounded-xl border shadow-sm overflow-hidden hover:shadow-md transition-shadow">
          <div className="w-full p-4 bg-muted border-b">
            <h2 className="text-lg font-semibold text-card-foreground">
              আজকের আপডেট নিউজ
            </h2>
            <p className="text-sm text-muted-foreground">
              ২০ জুলাই, ২০২৫ (রবিবার)
            </p>
          </div>
          <div className="w-full p-4 flex flex-col space-y-3">
            {newsItems.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start space-x-3 hover:bg-accent rounded-lg p-2 transition-colors"
              >
                <CircleSmall className="mt-1 text-primary" />
                <p className="text-sm font-medium text-card-foreground">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Quiz Card */}
        <div className="bg-card rounded-xl border shadow-sm overflow-hidden hover:shadow-md transition-shadow">
          <div className="w-full p-4 bg-muted border-b">
            <h2 className="text-lg font-semibold text-card-foreground">
              কুইজ খেলুন
            </h2>
            <p className="text-sm text-muted-foreground">পুরস্কার জিতুন</p>
          </div>
          <div className="w-full p-4 flex flex-col space-y-3">
            {quizItems.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start space-x-3 hover:bg-accent rounded-lg p-2 transition-colors"
              >
                <Gamepad2 className="mt-1 text-primary" />
                <div className="text-sm">
                  <p className="text-sm font-medium text-card-foreground">
                    {item.topic}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <span className="text-muted-foreground/80">পুরস্কারঃ </span>
                    {item.reward}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Blog Card */}
        <div className="bg-card rounded-xl border shadow-sm overflow-hidden hover:shadow-md transition-shadow">
          <div className="w-full p-4 bg-muted border-b">
            <h2 className="text-lg font-semibold text-card-foreground">
              বিষয়ভিত্তিক লেখা
            </h2>
            <p className="text-sm text-muted-foreground">Blog</p>
          </div>
          <div className="w-full p-4 flex flex-col space-y-3">
            {blogItems.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start space-x-3 hover:bg-accent rounded-lg p-2 transition-colors"
              >
                <Rss className="mt-1 text-primary" />
                <div className="text-sm">
                  <p className="text-sm font-medium text-card-foreground">
                    {item.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <span className="text-muted-foreground/80">বিষয়ঃ </span>
                    {item.topic}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
