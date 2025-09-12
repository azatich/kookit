"use client";

import { logoutAction } from "@/actions/auth";
import Link from "next/link";
import React, { useState } from "react";

import { IoMdLogOut } from "react-icons/io";
import { FiBookmark } from "react-icons/fi";
import { usePathname, useRouter } from "next/navigation";
import { CircleUserRound, UtensilsCrossed } from "lucide-react";
import SelectLanguage from "./SelectLanguage";
import { useTranslations } from "next-intl";
import Image from "next/image";

const Navbar = () => {
  const pathName = usePathname();
  const router = useRouter();
  const t = useTranslations('Navbar');
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const closeMobile = () => setIsMobileOpen(false);

  const navLinks = [
    { name: t('Home'), href: "/home" },
    { name: t('Recipes'), href: "/recipes" },
    { name: t('AboutUs'), href: "/about-us" },
    { name: t('YourPosts'), href: "/your-posts" },
  ];

  return (
    <div className=" relative flex justify-between items-center py-6 px-4 sm:px-6 md:px-10 lg:px-20 text-white border-b border-white/20">
      {/* Background blurred circles */}
      <div className="absolute bg-white w-[7rem] h-[7rem] blur-[10rem]" />

      <div>
        <span className="uppercase text-4xl font-bold text-[#FF7A00]">
          Kook<span className="text-white">it.</span>
        </span>
      </div>
      {/* Desktop navigation */}
      <div className="hidden md:flex gap-6 lg:gap-10">
        {navLinks.map((link) => {
          return (
            <Link
              href={link.href}
              key={link.name}
              className={` ${pathName === link.href && "border-white"} px-4 py-1 border border-transparent hover:border-white rounded-lg transition duration-300`}
            >
              {link.name}
            </Link>
          );
        })}
      </div>
      {/* Desktop actions */}
      <div className="hidden md:flex gap-6 justify-center items-center text-2xl" title="Saved posts">
        <Link
          className="hover:bg-white hover:text-black transition duration-300 px-4 py-1 rounded-lg"
          href="/favourites"
        >
          <FiBookmark />
        </Link>
        <Link className="inline-block px-4 py-1 hover:bg-[#FF7A00]/30 transition duration-300 rounded-lg" title="Profile" href="/profile"><CircleUserRound /></Link>
        <button
          className="hover:bg-red-500 transition duration-300 px-4 py-1 rounded-lg"
          onClick={async () => {
            await logoutAction();
            router.push("/login");
          }}
          title="Log out"
        >
          <IoMdLogOut />
        </button>
        <SelectLanguage />
      </div>
      {/* Mobile hamburger */}
      <button
        aria-label="Toggle menu"
        aria-expanded={isMobileOpen}
        aria-controls="mobile-menu"
        className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-white hover:text-black transition"
        onClick={() => setIsMobileOpen((prev) => !prev)}
      >
        {isMobileOpen ? <UtensilsCrossed className="h-6 w-6" /> : <Image src='/images/hamburger-menu.svg' alt="hamburger-menu" className="w-8 h-8" width={32} height={32} />}
      </button>

      {/* Mobile menu panel */}
      {isMobileOpen && (
        <div
          id="mobile-menu"
          className="absolute top-full left-0 right-0 z-50 md:hidden"
        >
          <div className="mx-4 mb-4 rounded-xl border border-white/20 bg-black/95 backdrop-blur-sm relative overflow-hidden">
            {/* Background cooking elements */}
            <div className="absolute inset-0 opacity-10">
              {/* Floating food icons */}
              <div className="absolute top-4 left-4 text-2xl animate-bounce" style={{ animationDelay: '0s' }}>🍳</div>
              <div className="absolute top-8 right-6 text-xl animate-bounce" style={{ animationDelay: '0.5s' }}>🥘</div>
              <div className="absolute top-16 left-8 text-lg animate-bounce" style={{ animationDelay: '1s' }}>🍲</div>
              <div className="absolute top-20 right-4 text-2xl animate-bounce" style={{ animationDelay: '1.5s' }}>🍽️</div>
              <div className="absolute top-32 left-6 text-xl animate-bounce" style={{ animationDelay: '2s' }}>🥗</div>
              <div className="absolute top-36 right-8 text-lg animate-bounce" style={{ animationDelay: '2.5s' }}>🍴</div>
              <div className="absolute top-48 left-4 text-2xl animate-bounce" style={{ animationDelay: '3s' }}>🧄</div>
              <div className="absolute top-52 right-6 text-xl animate-bounce" style={{ animationDelay: '3.5s' }}>🧅</div>
              <div className="absolute top-64 left-8 text-lg animate-bounce" style={{ animationDelay: '4s' }}>🥕</div>
              <div className="absolute top-68 right-4 text-2xl animate-bounce" style={{ animationDelay: '4.5s' }}>🌶️</div>

              {/* Kitchen utensils */}
              <div className="absolute top-12 left-12 text-lg animate-pulse" style={{ animationDelay: '1s' }}>🔪</div>
              <div className="absolute top-24 right-12 text-xl animate-pulse" style={{ animationDelay: '2s' }}>🥄</div>
              <div className="absolute top-40 left-16 text-lg animate-pulse" style={{ animationDelay: '3s' }}>🍴</div>
              <div className="absolute top-56 right-16 text-xl animate-pulse" style={{ animationDelay: '4s' }}>🥢</div>

              {/* Cooking elements */}
              <div className="absolute top-6 left-20 text-lg animate-pulse" style={{ animationDelay: '0.5s' }}>🔥</div>
              <div className="absolute top-28 right-20 text-xl animate-pulse" style={{ animationDelay: '1.5s' }}>💨</div>
              <div className="absolute top-44 left-24 text-lg animate-pulse" style={{ animationDelay: '2.5s' }}>⚡</div>
              <div className="absolute top-60 right-24 text-xl animate-pulse" style={{ animationDelay: '3.5s' }}>✨</div>
            </div>

            {/* Gradient overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-amber-500/5"></div>

            <nav className="relative z-10 flex flex-col divide-y divide-white/10">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={closeMobile}
                  className={` ${pathName === link.href ? "bg-white/10" : ""} px-4 py-3 text-base hover:bg-white/10 transition relative`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/favourites"
                onClick={closeMobile}
                className="px-4 py-3 text-base hover:bg-white/10 transition flex items-center gap-3 relative"
              >
                <FiBookmark className="text-xl" />
                <span>Favourites</span>
              </Link>
              <Link
                href="/profile"
                onClick={closeMobile}
                className="px-4 py-3 text-base hover:bg-white/10 transition flex items-center gap-3 relative"
              >
                <CircleUserRound className="text-xl" />
                <span>Profile</span>
              </Link>
              <button
                onClick={async () => {
                  closeMobile();
                  await logoutAction();
                  router.push("/login");
                }}
                className="text-left px-4 py-3 text-base hover:bg-white/10 transition flex items-center gap-3 relative"
              >
                <IoMdLogOut className="text-xl" />
                <span>Logout</span>
              </button>
              <div className="px-4 py-3 relative">
                <SelectLanguage />
              </div>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
