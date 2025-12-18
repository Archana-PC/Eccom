import React from "react";

const StylesList = ({
  styles = [],
  title = "SHOP BY STYLE",
  columns = 4,
  onStyleClick,
  className = "",
}) => {
  const gridCols = {
    3: "grid-cols-2 sm:grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4",
    5: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5",
  };

  return (
    <div className={`py-12 ${className}`}>
      
      {/* HEADER */}
      <div className="text-center mb-10">
        <h2 className="text-xl md:text-3xl font-bold tracking-tight text-gray-900">
          {title}
        </h2>
      </div>

      {/* GRID */}
      <div className={`grid ${gridCols[columns]} gap-4 md:gap-6`}>
        {styles.map((item, index) => (
          <div
            key={index}
            className="
              group relative overflow-hidden rounded-xl cursor-pointer 
              shadow-sm hover:shadow-xl transition-all duration-500
            "
            onClick={() => onStyleClick && onStyleClick(item)}
          >
            {/* IMAGE */}
            <div className="relative h-40 md:h-52 lg:h-64 overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="
                  w-full h-full object-cover 
                  transition-all duration-700 ease-out
                  group-hover:scale-110 group-hover:brightness-[0.85]
                "
              />
            </div>

            {/* OVERLAY GRADIENT */}
            <div className="
              absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent 
              opacity-80
            " />

            {/* TEXT LABEL */}
            <div className="
              absolute bottom-4 left-0 right-0 flex justify-center
              transition-all duration-500
              group-hover:bottom-6
            ">
              <h3
                className="
                  text-white text-lg md:text-xl font-semibold tracking-wide uppercase
                  drop-shadow-[0_3px_6px_rgba(0,0,0,0.8)]
                "
              >
                {item.name}
              </h3>
            </div>

            {/* BORDER HIGHLIGHT ANIMATION */}
            <div
              className="
                absolute inset-0 rounded-xl 
                border border-transparent
                group-hover:border-white/40
                transition-all duration-500
              "
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default StylesList;
