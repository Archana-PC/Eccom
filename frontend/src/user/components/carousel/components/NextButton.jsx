import { ChevronRight } from "lucide-react";

const NextButton = ({ onHandleNext }) => {
  return (
    <button
      onClick={onHandleNext}
      className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 
                bg-white p-3 rounded-full cursor-pointer 
                transition-all duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.08)] 
                hover:shadow-[0_4px_12px_rgba(0,102,153,0.12)] z-30 group
                border border-gray-200 hover:border-[#D2E3EC]
                hover:scale-105"
      aria-label="Next slide"
    >
      <ChevronRight className="w-6 h-6 text-[#4A6370] group-hover:text-[#006699] 
                              transition-colors duration-300" />
    </button>
  );
};

export default NextButton;