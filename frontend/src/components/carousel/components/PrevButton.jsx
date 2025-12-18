
import { ChevronLeft } from "lucide-react";
import React from "react";

const PrevButton = ({ onHandlePrev }) => {
  return (
    <button
      onClick={onHandlePrev}
      className="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 
                bg-white/80 backdrop-blur-md p-3 rounded-full cursor-pointer 
                transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.04)] 
                hover:bg-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] z-30 group
                border border-white/30 hover:border-white/50"
      aria-label="Previous slide"
    >
      <ChevronLeft className="w-6 h-6 text-[#004C73] group-hover:text-[#0099CC] 
                             transition-colors duration-300" />
    </button>
  );
};

export default PrevButton;