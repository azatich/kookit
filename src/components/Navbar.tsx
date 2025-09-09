"use client";

import { logoutAction } from "@/actions/auth";
import Link from "next/link";
import React from "react";

import { IoMdLogOut } from "react-icons/io";
import { FiBookmark } from "react-icons/fi";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Home", href: "/home" },
  { name: "Recipes", href: "/recipes" },
  { name: "About us", href: "/about-us" },
];

const Navbar = () => {
  const pathName = usePathname();
  return (
    <div className="flex justify-between items-center py-6 px-20 text-white border-b border-white/20">
      {/* Background blurred circles */}
      <div className="absolute bg-white w-[7rem] h-[7rem] blur-[10rem]" />

      <div>
        <span className="uppercase text-4xl font-bold text-[#FF7A00]">
          Kook<span className="text-white">it.</span>
        </span>
      </div>
      <div className="flex gap-10">
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
      <div className="flex gap-6 justify-center items-center text-2xl">
        <Link
          className="hover:bg-white hover:text-black transition duration-300 px-4 py-1 rounded-lg"
          href="/favourites"
        >
          <FiBookmark />
        </Link>
        <button
          className="hover:bg-red-500 transition duration-300 px-4 py-1 rounded-lg"
          onClick={() => logoutAction()}
        >
          <IoMdLogOut />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
