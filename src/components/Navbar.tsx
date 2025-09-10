"use client";

import { logoutAction } from "@/actions/auth";
import Link from "next/link";
import React, { useState } from "react";

import { IoMdLogOut } from "react-icons/io";
import { FiBookmark } from "react-icons/fi";
import { usePathname, useRouter } from "next/navigation";
import { CircleUserRound, Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/home" },
  { name: "Recipes", href: "/recipes" },
  { name: "About us", href: "/about-us" },
  { name: "Your posts", href: "/your-posts" },
];

const Navbar = () => {
  const pathName = usePathname();
  const router = useRouter();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const closeMobile = () => setIsMobileOpen(false);

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
      <div className="hidden md:flex gap-6 justify-center items-center text-2xl">
        <Link
          className="hover:bg-white hover:text-black transition duration-300 px-4 py-1 rounded-lg"
          href="/favourites"
        >
          <FiBookmark />
        </Link>
        <Link href="/profile"><CircleUserRound /></Link>
        <button
          className="hover:bg-red-500 transition duration-300 px-4 py-1 rounded-lg"
          onClick={async () => {
            await logoutAction();
            router.push("/login");
          }}
        >
          <IoMdLogOut />
        </button>
      </div>
      {/* Mobile hamburger */}
      <button
        aria-label="Toggle menu"
        aria-expanded={isMobileOpen}
        aria-controls="mobile-menu"
        className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-white hover:text-black transition"
        onClick={() => setIsMobileOpen((prev) => !prev)}
      >
        {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Mobile menu panel */}
      {isMobileOpen && (
        <div
          id="mobile-menu"
          className="absolute top-full left-0 right-0 z-50 md:hidden"
        >
          <div className="mx-4 mb-4 rounded-xl border border-white/20 bg-black/80 backdrop-blur-sm">
            <nav className="flex flex-col divide-y divide-white/10">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={closeMobile}
                  className={` ${pathName === link.href ? "bg-white/10" : ""} px-4 py-3 text-base hover:bg-white/10 transition`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/favourites"
                onClick={closeMobile}
                className="px-4 py-3 text-base hover:bg-white/10 transition flex items-center gap-3"
              >
                <FiBookmark className="text-xl" />
                <span>Favourites</span>
              </Link>
              <Link
                href="/profile"
                onClick={closeMobile}
                className="px-4 py-3 text-base hover:bg-white/10 transition flex items-center gap-3"
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
                className="text-left px-4 py-3 text-base hover:bg-white/10 transition flex items-center gap-3"
              >
                <IoMdLogOut className="text-xl" />
                <span>Logout</span>
              </button>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
