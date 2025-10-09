import React from "react";

function Footer() {
  return (
    <footer className="w-full bg-background text-foreground border-t mt-10">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div className="flex flex-col space-y-4">
          <img src="/logo.jpg" alt="Logo" className="h-10 w-25" />
          <p className="text-muted-foreground text-sm">
            Mutadeen is dedicated to providing quality religious content,
            educational resources, and community support.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col space-y-2">
          <h3 className="font-semibold text-card-foreground text-lg mb-2">
            Quick Links
          </h3>
          <ul className="space-y-1 text-muted-foreground text-sm">
            <li className="hover:text-primary cursor-pointer transition-colors">
              হোম
            </li>
            <li className="hover:text-primary cursor-pointer transition-colors">
              আপডেট নিউজ
            </li>
            <li className="hover:text-primary cursor-pointer transition-colors">
              বিষয়ভিত্তিক লেখা (Blog)
            </li>
            <li className="hover:text-primary cursor-pointer transition-colors">
              বই ও PDF
            </li>
            <li className="hover:text-primary cursor-pointer transition-colors">
              কুইজ খেলুন
            </li>
          </ul>
        </div>

        {/* Social / Contact */}
        <div className="flex flex-col space-y-2">
          <h3 className="font-semibold text-card-foreground text-lg mb-2">
            Follow Us
          </h3>
          <div className="flex space-x-4">
            <a
              href="#"
              className="p-2 bg-muted text-muted-foreground rounded-full hover:bg-primary hover:text-primary-foreground transition-colors text-sm"
            >
              Facebook
            </a>
            <a
              href="#"
              className="p-2 bg-muted text-muted-foreground rounded-full hover:bg-primary hover:text-primary-foreground transition-colors text-sm"
            >
              Youtube
            </a>
            <a
              href="#"
              className="p-2 bg-muted text-muted-foreground rounded-full hover:bg-primary hover:text-primary-foreground transition-colors text-sm"
            >
              Donate
            </a>
          </div>
          <p className="text-muted-foreground text-sm mt-4">
            Contact: info@mutadeen.com
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="w-full border-t bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 py-4 text-center text-muted-foreground text-sm">
          &copy; 2025 Mutadeen. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
