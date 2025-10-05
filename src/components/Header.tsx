"use client";
import { Banknote, CircleUser, Menu } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import NavLink from "./ui/nav-link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

function Header() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { name: "হোম", path: "/", exact: true },
    { name: "আপডেট নিউজ", path: "/news" },
    { name: "বিষয়ভিত্তিক লেখা", path: "/blog" },
    { name: "বই ও PDF", path: "/books" },
    { name: "কুইজ খেলুন", path: "/quiz" },
    { name: "Seeking Solution", path: "/solutions" },
    { name: "আমাদের সম্পর্কে", path: "/about" },
  ];

  return (
    <header className="w-full sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}

          <div className="relative w-32 h-10">
            <Link href="/">
              <Image
                src="/logo.jpg"
                alt="Mutadeen Logo"
                width={150}
                height={50}
                className="object-contain"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link, index) => (
              <NavLink key={index} href={link.path}>
                {link.name}
              </NavLink>
            ))}
          </nav>
        </div>
        {/* <div className="">
          <DropdownMenu open={open} onOpenChange={setOpen}>
            <div
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={() => setOpen(false)}
              className="relative inline-block"
            >
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Hover me</Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-48">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </div>
          </DropdownMenu>
        </div> */}
      </div>
    </header>
  );
}

export default Header;
