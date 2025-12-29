import React, { useEffect, useRef, useState } from "react";
import NextButton from "./components/NextButton";
import PrevButton from "./components/PrevButton";
import { Stepper } from "./components/Stepper";
import RenderResponsiveImage from "./components/RenderResponsiveImage";

const Carousel = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(0);

  function getTotalSlides() {
    return React.Children.count(children);
  }

  useEffect(() => {
    startSlider();
    return () => clearInterval(intervalRef.current);
  }, []);

  function startSlider() {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        const totalSlides = getTotalSlides();
        return prev === totalSlides - 1 ? 0 : prev + 1;
      });
    }, 4000);
  }

  function handleNext() {
    clearInterval(intervalRef.current);
    const totalSlides = getTotalSlides();
    const newIndex = currentIndex === totalSlides - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    startSlider();
  }

  function handlePrev() {
    clearInterval(intervalRef.current);
    const totalSlides = getTotalSlides();
    const newIndex = currentIndex === 0 ? totalSlides - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    startSlider();
  }

  function handleStepperClick(newIndex) {
    return () => {
      clearInterval(intervalRef.current);
      setCurrentIndex(newIndex);
      startSlider();
    };
  }

  function handleMouseEnter() {
    clearInterval(intervalRef.current);
  }

  function handleMouseLeave() {
    startSlider();
  }

  return (
    <div className="relative">
      <div
        className="relative border-box w-full aspect-10/9 md:aspect-15/6 mx-auto overflow-hidden shadow-2xl cursor-pointer z-10"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {React.Children.map(children, (child, index) => {
          const isActive = index === currentIndex;
          const isPrev =
            index === currentIndex - 1 ||
            (currentIndex === 0 && index === getTotalSlides() - 1);
          const isNext =
            index === currentIndex + 1 ||
            (currentIndex === getTotalSlides() - 1 && index === 0);

          let transformClass = "";
          if (isActive) {
            transformClass = "translate-x-0 opacity-100 z-20";
          } else if (isPrev) {
            transformClass = "-translate-x-full opacity-0 z-10";
          } else if (isNext) {
            transformClass = "translate-x-full opacity-0 z-10";
          } else {
            transformClass = "translate-x-full opacity-0 z-0";
          }

          return (
            <>
              <div
                key={index}
                className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out ${transformClass}`}
                style={{
                  opacity: index === currentIndex ? "1" : "0",
                }}
              >
                <RenderResponsiveImage 
                  imageProps={child.props.src} 
                  index={index} 
                />
              </div>
              <div className="absolute right-10 bottom-5 z-30">
                <Stepper
                  currentIndex={currentIndex}
                  getTotalSlides={getTotalSlides}
                  onHandleStepperClick={handleStepperClick}
                />
              </div>
            </>
          );
        })}

        {/* Navigation Buttons */}
        <PrevButton onHandlePrev={handlePrev} />
        <NextButton onHandleNext={handleNext} />
      </div>
    </div>
  );
};

export default Carousel;