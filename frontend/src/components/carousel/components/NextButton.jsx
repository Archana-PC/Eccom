import { ChevronRight } from "lucide-react";

const NextButton = ({onHandleNext}) => {
  return (
    <button
      onClick={onHandleNext}
      className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full cursor-pointer transition-all duration-300 shadow-lg hover:scale-110 z-30 group"
      aria-label="Next slide"
    >
      <ChevronRight className="w-6 h-6 text-gray-800 group-hover:text-black" />
    </button>
  );
};

export default NextButton;