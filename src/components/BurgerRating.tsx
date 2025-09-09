import Image from "next/image";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const BurgerRating = () => {
  return (
    <div className="absolute left-[-3rem] bottom-4 flex items-center gap-4 bg-gradient-to-r from-gray-500/20 to-gray-700/30 backdrop-blur-lg rounded-full p-2 shadow-lg">
      {/* Product Image */}
      <div className="flex-shrink-0">
        <Image
          src="/images/burger-rating.png"
          alt="burger-rating"
          width={50}
          height={50}
          className="rounded-full"
        />
      </div>

      {/* Text + Rating */}
      <div className="flex flex-col pr-4">
        <span className="text-md font-semibold text-white">Burger</span>

        <div className="flex items-center gap-1 text-orange-400 text-sm">
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStarHalfAlt />
          <span className="ml-2 text-white">4.2</span>
        </div>
      </div>
    </div>
  );
};

export default BurgerRating;
