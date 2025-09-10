import Image from "next/image";
import React from "react";
import { Akshar } from "next/font/google";
import BurgerRating from "./BurgerRatingUI";

const akshar = Akshar({ subsets: ["latin"], weight: ["400", "700"] });

const HomePageMain = () => {
  return (
    <div className="flex items-center gap-20 px-20 w-full h-full">
      {/* Background blurred circles */}
      <div className="absolute right-0 bg-[#FF7A00] w-[7rem] h-[7rem] blur-[10rem]" />
      <div className="absolute right-[30rem] bg-[#FF7A00] w-[7rem] h-[7rem] blur-[10rem]" />

      <div className="w-full h-full flex items-center">
        <h1 className={`${akshar.className} text-7xl text-white font-semibold`}>
          Make Your <br />
          <span className="text-[#FF7A00]">Dream</span>
          <br /> Food With Us
        </h1>
      </div>
      <div className="relative flex justify-center items-center w-full h-full">
        <Image
          className="absolute left-0 top-0"
          src="/images/burger.svg"
          width={150}
          height={150}
          alt="burger"
        />
        <Image src="/images/main.png" width={400} height={400} alt="main" />
        <Image
          className="absolute right-10 top-0"
          src="/images/arrow.svg"
          width={150}
          height={150}
          alt="arrow"
        />
        <BurgerRating />
      </div>
    </div>
  );
};

export default HomePageMain;
