"use client";
import { Banknote, CircleUser, Menu, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import NavLink from "./ui/nav-link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { cn } from "@/lib/utils";
import Marquee from "react-fast-marquee";
import SearchBar from "./SearchBar";
import { usePathname } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

interface NavLink {
  name: string;
  path: string;
  innerItems?: InnerItem[];
}

interface InnerItem {
  title: string;
  description: string;
  path: string;
  rowSpan?: boolean;
}

function Header() {
  const [navLinks, setNavLink] = useState<NavLink[]>([
    { name: "হোম", path: "/" },
    {
      name: "আপডেট নিউজ",
      path: "/news",
      innerItems: [
        {
          title: "জাতীয় সংবাদ",
          description: "বাংলাদেশে ইসলামিক শিক্ষা ও সংস্কৃতির সর্বশেষ উন্নয়ন",
          path: "/news/national",
          rowSpan: true,
        },
        {
          title: "আন্তর্জাতিক",
          description: "বিশ্বব্যাপী মুসলিম সম্প্রদায়ের গুরুত্বপূর্ণ ঘটনাবলী",
          path: "/news/international",
          rowSpan: false,
        },
        {
          title: "স্থানীয় ইভেন্ট",
          description: "আপনার এলাকার ইসলামিক সেন্টার ও মসজিদের কার্যক্রম",
          path: "/news/local-events",
          rowSpan: false,
        },
        {
          title: "প্রোগ্রাম সূচি",
          description: "আসন্ন ধর্মীয় বক্তৃতা, সেমিনার ও বিশেষ অনুষ্ঠান",
          path: "/news/programs",
          rowSpan: false,
        },
      ],
    },
    {
      name: "বিষয়ভিত্তিক লেখা",
      path: "/blog",
      innerItems: [
        {
          title: "তাফসীর",
          description: "কুরআনের আয়াতের ব্যাখ্যা ও বিশ্লেষণ",
          path: "/blog/tafsir",
          rowSpan: false,
        },
        {
          title: "সীরাতুন্নবী",
          description: "রাসূল (সা.) এর জীবনী ও শিক্ষা",
          path: "/blog/seerah",
          rowSpan: false,
        },
        {
          title: "ইসলামিক ইতিহাস",
          description: "ইসলামের গৌরবময় ইতিহাস ও সভ্যতা",
          path: "/blog/history",
          rowSpan: false,
        },
      ],
    },
    {
      name: "বই ও PDF",
      path: "/books",
      innerItems: [
        {
          title: "PDF লাইব্রেরি",
          description: "বিনামূল্যে ডাউনলোড করার জন্য ইসলামিক PDF",
          path: "/books/pdf",
          rowSpan: false,
        },
        {
          title: "অডিও বই",
          description: "শ্রবণের জন্য ইসলামিক অডিও বই সংগ্রহ",
          path: "/books/audio",
          rowSpan: false,
        },
        {
          title: "শিশুদের বই",
          description: "ছোটদের জন্য ইসলামিক শিক্ষামূলক বই",
          path: "/books/kids",
          rowSpan: false,
        },
      ],
    },
    {
      name: "কুইজ খেলুন",
      path: "/quiz",
      innerItems: [
        {
          title: "হাদিস কুইজ",
          description: "রাসূল (সা.) এর হাদিস সম্পর্কিত প্রশ্নোত্তর",
          path: "/quiz/hadith",
          rowSpan: false,
        },
        {
          title: "ইসলামিক ইতিহাস",
          description: "ইসলামের ইতিহাস সম্পর্কিত মজাদার কুইজ",
          path: "/quiz/history",
          rowSpan: false,
        },
        {
          title: "নবী-রাসূল",
          description: "নবী-রাসূলগণের জীবনী সম্পর্কিত কুইজ",
          path: "/quiz/prophets",
          rowSpan: false,
        },
      ],
    },
    {
      name: "Seeking Solution",
      path: "/solutions",
      innerItems: [
        {
          title: "পরামর্শ",
          description: "ব্যক্তিগত ও পারিবারিক সমস্যার ইসলামিক সমাধান",
          path: "/solutions/advice",
          rowSpan: false,
        },
        {
          title: "বৈবাহিক সমস্যা",
          description: "দাম্পত্য জীবনের বিভিন্ন সমস্যার সমাধান",
          path: "/solutions/marital",
          rowSpan: false,
        },
        {
          title: "আধ্যাত্মিক পরামর্শ",
          description: "রুহানি সমস্যা ও সমাধানের নির্দেশনা",
          path: "/solutions/spiritual",
          rowSpan: false,
        },
      ],
    },
    {
      name: "আমাদের সম্পর্কে",
      path: "/about",
      innerItems: [
        {
          title: "আমাদের টিম",
          description: "আমাদের দক্ষ ও অভিজ্ঞ টিম সদস্যদের পরিচয়",
          path: "/about/team",
          rowSpan: false,
        },
        {
          title: "যোগাযোগ",
          description: "আমাদের সাথে যোগাযোগ করার বিভিন্ন উপায়",
          path: "/about/contact",
          rowSpan: false,
        },
        {
          title: "সহায়তা কেন্দ্র",
          description: "যেকোনো সমস্যায় আমাদের সহায়তা নিন",
          path: "/about/help",
          rowSpan: false,
        },
      ],
    },
  ]);

  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const pathname = usePathname();

  useEffect(() => {
    NProgress.start();
    const timer = setTimeout(() => {
      NProgress.done();
    }, 300); // simulate loading delay for smoother effect
    return () => clearTimeout(timer);
  }, [pathname]);

  const toggleExpanded = (path: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedItems(newExpanded);
  };

  const renderItems = useMemo(() => {
    return navLinks.map((item, index) => {
      if (item.innerItems && item.innerItems.length > 0) {
        const rowSpanItems = item.innerItems.filter((inner) => inner.rowSpan);
        const normalItems = item.innerItems.filter((inner) => !inner.rowSpan);

        return (
          <NavigationMenuItem key={index}>
            <NavigationMenuTrigger>{item.name}</NavigationMenuTrigger>
            <NavigationMenuContent className="z-50">
              <ul
                className={`grid gap-2 ${
                  rowSpanItems.length > 0
                    ? "md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]"
                    : "w-[300px] grid-cols-1"
                }`}
              >
                {item.innerItems.map((innerItem, innerIndex) => {
                  if (innerItem.rowSpan) {
                    return (
                      <li key={innerIndex} className="row-span-3">
                        <NavLink
                          href={innerItem.path}
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium">
                            {innerItem.title}
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            {innerItem.description}
                          </p>
                        </NavLink>
                      </li>
                    );
                  } else {
                    return (
                      <li key={innerIndex}>
                        <NavLink
                          href={innerItem.path}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">
                            {innerItem.title}
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {innerItem.description}
                          </p>
                        </NavLink>
                      </li>
                    );
                  }
                })}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        );
      } else {
        return (
          <NavigationMenuItem key={index}>
            <NavLink href={item.path}>{item.name}</NavLink>
          </NavigationMenuItem>
        );
      }
    });
  }, [navLinks]);

  return (
    <header className="w-full sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 md:flex md:flex-col md:items-center md:justify-between">
        <div className="w-full flex items-center justify-between py-1">
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
          {/* <nav className="hidden lg:flex items-center space-x-1">
            <NavigationMenu viewport={false}>
              <NavigationMenuList>{renderItems}</NavigationMenuList>
            </NavigationMenu>
          </nav> */}

          <div className="hidden w-full md:flex justify-center items-center">
            <SearchBar />
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-2">
            <Button variant="outline" size="sm" asChild>
              <NavLink
                href="/login"
                className="inline-flex items-center gap-2 no-underline hover:no-underline"
                activeClassName="bg-primary text-primary-foreground"
              >
                <CircleUser className="h-4 w-4" />
                <span>Login</span>
              </NavLink>
            </Button>
            <Button size="sm" asChild>
              <NavLink
                href="/donate"
                className="inline-flex items-center gap-2 no-underline hover:no-underline"
                activeClassName="bg-primary/90"
              >
                <Banknote className="h-4 w-4" />
                <span>Donation</span>
              </NavLink>
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[85vw] max-w-sm p-0">
                {/* Visually hidden title for accessibility */}
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

                <div className="flex flex-col h-full">
                  {/* Mobile Header */}
                  <div className="flex items-center justify-between p-4 border-b">
                    <Link href="/" className="flex items-center space-x-3">
                      <div className="relative w-28 h-8">
                        <Image
                          src="/logo.jpg"
                          alt="Mutadeen Logo"
                          width={112}
                          height={32}
                          className="object-contain"
                        />
                      </div>
                    </Link>
                    <SheetClose asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <X className="h-4 w-4" />
                        <span className="sr-only">Close menu</span>
                      </Button>
                    </SheetClose>
                  </div>

                  {/* Mobile Navigation */}
                  <div className="flex-1 overflow-y-auto">
                    <nav className="flex flex-col p-4 space-y-1">
                      {navLinks.map((link) => (
                        <div key={link.path} className="flex flex-col">
                          {link.innerItems && link.innerItems.length > 0 ? (
                            <>
                              <button
                                onClick={() => toggleExpanded(link.path)}
                                className={cn(
                                  "flex items-center justify-between w-full px-3 py-3 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground border-l-2 border-transparent",
                                  expandedItems.has(link.path) &&
                                    "bg-accent text-accent-foreground"
                                )}
                              >
                                <span>{link.name}</span>
                                <ChevronRight
                                  className={cn(
                                    "h-4 w-4 transition-transform",
                                    expandedItems.has(link.path) && "rotate-90"
                                  )}
                                />
                              </button>
                              {expandedItems.has(link.path) && (
                                <div className="ml-4 mt-1 space-y-1 border-l-2 border-muted pl-3 py-1">
                                  {link.innerItems!.map((innerItem) => (
                                    <SheetClose asChild key={innerItem.path}>
                                      <NavLink
                                        href={innerItem.path}
                                        activeClassName="text-primary bg-accent font-semibold border-l-2 border-primary"
                                        className="block px-3 py-2 rounded-md text-sm transition-colors hover:bg-accent hover:text-accent-foreground border-l-2 border-transparent"
                                      >
                                        <div className="font-medium">
                                          {innerItem.title}
                                        </div>
                                        <div className="text-xs text-muted-foreground mt-1">
                                          {innerItem.description}
                                        </div>
                                      </NavLink>
                                    </SheetClose>
                                  ))}
                                </div>
                              )}
                            </>
                          ) : (
                            <SheetClose asChild>
                              <NavLink
                                href={link.path}
                                activeClassName="text-primary bg-accent font-semibold border-l-2 border-primary"
                                className="px-3 py-3 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground border-l-2 border-transparent"
                              >
                                {link.name}
                              </NavLink>
                            </SheetClose>
                          )}
                        </div>
                      ))}
                    </nav>
                  </div>

                  {/* Mobile Actions */}
                  <div className="p-4 border-t space-y-3">
                    <SheetClose asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-center"
                        asChild
                      >
                        <NavLink
                          href="/login"
                          className="no-underline hover:no-underline"
                          activeClassName="bg-primary text-primary-foreground"
                        >
                          <CircleUser className="h-4 w-4 mr-2" />
                          <span>Login</span>
                        </NavLink>
                      </Button>
                    </SheetClose>
                    <SheetClose asChild>
                      <Button className="w-full justify-center" asChild>
                        <NavLink
                          href="/donate"
                          className="no-underline hover:no-underline"
                          activeClassName="bg-primary/90"
                        >
                          <Banknote className="h-4 w-4 mr-2" />
                          <span>Donation</span>
                        </NavLink>
                      </Button>
                    </SheetClose>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        <div className="w-full py-1">
          <nav className="hidden lg:flex items-center space-x-1">
            <NavigationMenu viewport={false}>
              <NavigationMenuList>{renderItems}</NavigationMenuList>
            </NavigationMenu>
          </nav>
          <div className="flex items-center space-x-2">
            <Marquee speed={80}>something</Marquee>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
