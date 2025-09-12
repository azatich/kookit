import { useTranslations } from "next-intl";
import Image from "next/image";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const BurgerRating = () => {
  const t = useTranslations('HomePage')
  return (
    <div className="absolute left-[-1.5rem] sm:left-[-2rem] lg:left-[-3rem] bottom-2 sm:bottom-3 lg:bottom-4 flex items-center gap-2 sm:gap-3 lg:gap-4 bg-gradient-to-r from-gray-500/20 to-gray-700/30 backdrop-blur-lg rounded-full p-1.5 sm:p-2 shadow-lg">
      {/* Product Image */}
      <div className="flex-shrink-0">
        <Image
          src="/images/burger-rating.png"
          alt="burger-rating"
          width={50}
          height={50}
          className="w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 xl:w-[50px] xl:h-[50px] rounded-full"
        />
      </div>

      {/* Text + Rating */}
      <div className="flex flex-col pr-2 sm:pr-3 lg:pr-4">
        <span className="text-xs sm:text-sm lg:text-md font-semibold text-white whitespace-nowrap">{t('BurgerUI')}</span>

        <div className="flex items-center gap-0.5 sm:gap-1 text-orange-400 text-xs sm:text-sm">
          <FaStar className="w-2 h-2 sm:w-3 sm:h-3 lg:w-4 lg:h-4" />
          <FaStar className="w-2 h-2 sm:w-3 sm:h-3 lg:w-4 lg:h-4" />
          <FaStar className="w-2 h-2 sm:w-3 sm:h-3 lg:w-4 lg:h-4" />
          <FaStar className="w-2 h-2 sm:w-3 sm:h-3 lg:w-4 lg:h-4" />
          <FaStarHalfAlt className="w-2 h-2 sm:w-3 sm:h-3 lg:w-4 lg:h-4" />
          <span className="ml-1 sm:ml-2 text-white text-xs sm:text-sm">4.2</span>
        </div>
      </div>
    </div>
  );
};

export default BurgerRating;
