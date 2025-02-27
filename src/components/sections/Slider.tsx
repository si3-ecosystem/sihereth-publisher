import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const Slider = () => {
  const data: string[] = useSelector((state: RootState) => state.content.slider);
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    let animationFrame: number;
    let scrollAmount = 0;
    const animate = () => {
      scrollAmount -= 1;
      if (Math.abs(scrollAmount) >= scroller.scrollWidth / 2) {
        scrollAmount = 0;
      }
      scroller.style.transform = `translateX(${scrollAmount}px)`;
      animationFrame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <div className="relative overflow-hidden h-12 md:h-20 bg-gray-800 py-3 px-4 lg:py-auto flex items-center mt-14">
      <div className="absolute flex items-center" ref={scrollerRef} style={{ display: "flex", whiteSpace: "nowrap" }}>
        {[...data, ...data].map((slide, index) => (
          <div key={`${slide}-${index}`} className="flex items-center">
            <div className="text-center flex items-center px-2 lg:px-4 text-white tracking-wider uppercase text-2xl">
              {slide}
            </div>
            <div className="bg-white size-3 rounded-full mx-4"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
