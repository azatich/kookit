import Image from "next/image";
import React from "react";

const HomePageFooter = () => {
  return (
    <div className="grid grid-cols-3 gap-10 items-center text-white bg-[#222222] px-20 py-5">
      {/* Background blurred circles */}
      <div className="absolute left-0 bg-[#FF7A00] w-[9rem] h-[9rem] blur-[10rem]" />


      {/* Left Section */}
      <div className="grid grid-cols-2 items-center">
        <div className="flex items-center gap-6">
          <div className="flex flex-col gap-6">
            <div>
              <span className="block text-2xl font-semibold">5k</span>
              <span className="text-white/50">Review</span>
            </div>
            <div>
              <span className="block text-2xl font-semibold">100+</span>
              <span className="text-white/50 text-nowrap">New Daily Recipes</span>
            </div>
          </div>
          <Image src="/images/chef.svg" alt="chef" width={150} height={150} />
        </div>
      </div>

      {/* Middle Section */}
      <div className="flex flex-col gap-2 justify-center">
        <Image src="/images/users.svg" alt="users" width={120} height={120} />
        <span className="font-semibold">5000+ Happy Customers</span>
        <span className="text-white/50 text-sm">4.8 Rating (5000+ Review)</span>
      </div>

      {/* Right Section */}
      <div className="grid grid-cols-2 items-center gap-6">
        <div className="flex justify-center">
          <Image
            src="/images/footer-burgers.png"
            alt="burgers"
            width={150}
            height={150}
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-semibold text-lg">Best Delicious Food</span>
          <span className="text-white/70">
            We Have Best Collection’s Of Food Recipes
          </span>
        </div>
      </div>
    </div>
  );
};

export default HomePageFooter;
