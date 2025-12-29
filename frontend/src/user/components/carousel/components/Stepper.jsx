
export function Stepper({ currentIndex, getTotalSlides, onHandleStepperClick }) {
  const count = getTotalSlides();
  return (
    <div className="flex items-center justify-center z-100">
      <div className="flex gap-2">
        {[...Array(count)].map((_, index) => (
          <button
            key={index}
            onClick={() => onHandleStepperClick(index)}
            className={`
              transition-all duration-300 rounded-full cursor-pointer 
              focus:outline-none focus:ring-2 focus:ring-[#0099CC]/30
              ${currentIndex === index 
                ? "w-10 h-2 bg-linear-to-r from-[#006699] to-[#0099CC]" 
                : "w-2 h-2 bg-gray-300 hover:bg-[#006699]"
              }
            `}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
}
