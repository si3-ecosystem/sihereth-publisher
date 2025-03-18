import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const Slider = () => {
  const sliderData = useSelector((state: RootState) => state.content.slider);
  const [data, setData] = useState<string[] | null>(null);
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setData(sliderData);
  }, [sliderData]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller || !data?.length) return;
    let animationFrame: number;
    let scrollAmount = 0;
    const animate = () => {
      if (!scroller || !data?.length) return;
      scrollAmount -= 1;
      if (Math.abs(scrollAmount) >= scroller.scrollWidth / 2) {
        scrollAmount = 0;
      }
      scroller.style.transform = `translateX(${scrollAmount}px)`;
      animationFrame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, [data?.length]);

  if (!data || data.length === 0) return null;

  return (
    <div className="relative overflow-hidden h-12 md:h-20 bg-gray-800 py-3 px-4 lg:py-auto flex items-center mt-4 sm:mt-6 lg:mt-8 xl:mt-10">
      <div className="absolute flex items-center" ref={scrollerRef} style={{ display: "flex", whiteSpace: "nowrap" }}>
        {[...data, ...data].map((slide, index) => (
          <div key={`${slide}-${index}`} className="flex items-center">
            <div className="text-center flex items-center px-2 lg:px-4 text-white tracking-wider uppercase text-md sm:text-lg lg:text-xl xl:text-2xl">
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
