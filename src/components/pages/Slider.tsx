import { useState, useEffect, useRef } from "react";

const slides = [
  "INCLUSIVE PLATFORMS",
  "decentralizing currencies & technologies",
  "ECOSYSTEM GROWTH",
  "cOLLABORATE WITH WEB3-4"
];

const AutoScrollSlider = () => {
  const [hovered, setHovered] = useState(false);
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (scroller) {
      const animation = hovered ? "moveRightLeft 2s linear 1" : "moveLeftRight 2s linear 1";
      scroller.style.animation = animation;
    }
  }, [hovered]);

  return (
    <div
      className="relative overflow-hidden h-12 md:h-20 bg-black py-3 px-4 lg:py-auto flex items-center mt-14"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="absolute flex gap-6 items-center transition-all duration-700 bg-black w-[895px] sm:w-[650px] lg:w-[550px] xxl:w-[450px]"
        ref={scrollerRef}
        style={{
          whiteSpace: "nowrap",
          animation: hovered ? "moveRightLeft 2s linear 1" : "moveLeftRight 2s linear 1"
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="flex-shrink-0 text-center flex items-center px-2 lg:px-4 text-white font-mono text-lg font-medium leading-9 tracking-wider uppercase md:text-xl lg:text-2xl"
          >
            {slide}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AutoScrollSlider;
