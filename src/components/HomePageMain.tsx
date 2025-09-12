import Image from "next/image";
import React from "react";
import { Akshar } from "next/font/google";
import BurgerRating from "./BurgerRatingUI";
import { useTranslations } from "next-intl";

const akshar = Akshar({ subsets: ["latin"], weight: ["400", "700"] });

const HomePageMain = () => {
  const t = useTranslations('HomePage')

  return (
    <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-20 px-4 sm:px-8 lg:px-20 w-full h-full py-8 lg:py-0">
      {/* Background blurred circles */}
      <div className="absolute right-0 bg-[#FF7A00] w-[4rem] h-[4rem] sm:w-[6rem] sm:h-[6rem] lg:w-[7rem] lg:h-[7rem] blur-[8rem] sm:blur-[10rem]" />
      <div className="absolute right-[15rem] sm:right-[25rem] lg:right-[30rem] bg-[#FF7A00] w-[4rem] h-[4rem] sm:w-[6rem] sm:h-[6rem] lg:w-[7rem] lg:h-[7rem] blur-[8rem] sm:blur-[10rem]" />

      {/* Text Section */}
      <div className="w-full lg:w-1/2 h-full flex items-center justify-center lg:justify-start order-2 lg:order-1">
        <h1 className={`${akshar.className} text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white font-semibold uppercase text-center lg:text-left leading-tight`}>
          {t('MainTitle1')} <br />
          <span className="text-[#FF7A00]">{t('MainTitle2')}</span>
          <br /> {t('MainTitle3')}
        </h1>
      </div>

      {/* Image Section */}
      <div className="relative flex justify-center items-center w-full lg:w-1/2 h-full order-1 lg:order-2">
        <Image
          className="absolute left-0 top-0 w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 xl:w-[150px] xl:h-[150px]"
          src="/images/burger.svg"
          width={150}
          height={150}
          alt="burger"
        />
        <Image
          src="/images/main.png"
          width={400}
          height={400}
          alt="main"
          className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 xl:w-[400px] xl:h-[400px]"
        />
        <Image
          className="absolute right-2 sm:right-4 lg:right-10 top-0 w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 xl:w-[150px] xl:h-[150px]"
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
