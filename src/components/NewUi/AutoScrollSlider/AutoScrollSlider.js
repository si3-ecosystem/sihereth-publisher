import React, { useState, useEffect, useRef } from "react";

const slides = [
  "INCLUSIVE PLATFORMS",
  "decentralizing currencies & technologies",
  "ECOSYSTEM GROWTH",
  "cOLLABORATE WITH WEB3-4",]

const AutoScrollSlider = ( ) => {
  const [hovered, setHovered] = useState(false);
  const scrollerRef = useRef(null);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (scroller) {
      if (hovered) {
        scroller.classList.remove("leave-animate");
        scroller.classList.add("hover-animate");
      } else {
        scroller.classList.remove("hover-animate");
        scroller.classList.add("leave-animate");
      }
    }
  }, [hovered]);

  return (
    <div
      className="relative overflow-hidden h-[50px] md:h-[80px] bg-black py-3 px-[18px] lg:py-auto flex items-center mt-4"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="absolute flex gap-6 items-center transition-all duration-700 bg-black w-[895px] sm:w-[650px] lg:w-[550px] xxl:w-[450px]"
        ref={scrollerRef}
        style={{ whiteSpace: "nowrap" }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="inline-block flex-shrink-0 text-center flex items-center px-2 lg:px-4 text-white font-mono text-lg font-medium leading-[36px] tracking-[0.1em] uppercase md:text-xl lg:text-2xl"
          >
            {slide}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AutoScrollSlider;
