import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

const HomePageFooter = () => {
  const t = useTranslations('HomePage')
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 items-center text-white bg-[#222222] px-4 sm:px-8 lg:px-20 py-8 lg:py-5">
      {/* Background blurred circles */}
      <div className="absolute left-0 bg-[#FF7A00] w-[6rem] h-[6rem] sm:w-[8rem] sm:h-[8rem] lg:w-[9rem] lg:h-[9rem] blur-[8rem] sm:blur-[10rem]" />

      {/* Left Section */}
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 order-1">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 text-center sm:text-left">
          <div>
            <span className="block text-xl sm:text-2xl font-semibold">5k</span>
            <span className="text-white/50 text-sm sm:text-base">{t('Footer.Review')}</span>
          </div>
          <div>
            <span className="block text-xl sm:text-2xl font-semibold">100+</span>
            <span className="text-white/50 text-sm sm:text-base">{t('Footer.NewDailyRecipes')}</span>
          </div>
        </div>
        <Image
          src="/images/chef.svg"
          alt="chef"
          width={150}
          height={150}
          className="w-20 h-20 sm:w-24 sm:h-24 lg:w-[150px] lg:h-[150px]"
        />
      </div>

      {/* Middle Section */}
      <div className="flex flex-col justify-center items-center text-center order-3 lg:order-2">
        <Image
          src="/images/users.svg"
          alt="users"
          width={120}
          height={120}
          className="w-16 h-16 sm:w-20 sm:h-20 lg:w-[120px] lg:h-[120px]"
        />
        <span className="font-semibold text-sm sm:text-base">5000+ {t('Footer.HappyCustomers')}</span>
        <span className="text-white/50 text-xs sm:text-sm">4.8 {t('Footer.Rating')} (5000+ {t('Footer.Review')})</span>
      </div>

      {/* Right Section */}
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 order-2 lg:order-3">
        <div className="flex justify-center">
          <Image
            src="/images/footer-burgers.png"
            alt="burgers"
            width={200}
            height={130}
            className="w-20 h-20 sm:w-24 sm:h-24 lg:w-[200px] lg:h-[130px]"
          />
        </div>
        <div className="flex flex-col gap-2 text-center sm:text-left">
          <span className="font-semibold text-base sm:text-lg">{t('Footer.BestDeliciousFood')}</span>
          <span className="text-white/70 text-sm sm:text-base">
            {t('Footer.WeHaveBestRecipes')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default HomePageFooter;
