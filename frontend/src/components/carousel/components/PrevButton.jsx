import { ChevronLeft } from "lucide-react";
import React from "react";

const PrevButton = ({onHandlePrev}) => {
  return (
    <button
      onClick={onHandlePrev}
      className="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full cursor-pointer transition-all duration-300 shadow-lg hover:scale-110 z-30 group"
      aria-label="Previous slide"
    >
      <ChevronLeft className="w-6 h-6 text-gray-800 group-hover:text-black" />
    </button>
  );
};

export default PrevButton;
