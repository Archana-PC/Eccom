export function Stepper({ currentIndex, getTotalSlides, onHandleStepperClick }) {
  const count = getTotalSlides();
  return (
    <div className="flex items-center justify-center z-100">
      <div className="flex gap-3">
        {[...Array(count)].map((_, index) => (
          <button
            key={index}
            onClick={onHandleStepperClick(index)}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              currentIndex === index 
                ? "w-12 h-3 bg-gray-100" 
                : "w-3 h-3 bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
}