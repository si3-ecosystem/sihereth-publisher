import { useEffect, useRef } from "react";
import { FaUserAlt } from "react-icons/fa";

const people = [
  { id: 1, name: "Sarah Chen", domain: "Web3 Developer" },
  { id: 2, name: "Marcus Rodriguez", domain: "Blockchain Architect" },
  { id: 3, name: "Emma Thompson", domain: "DeFi Specialist" },
  { id: 4, name: "Alex Kumar", domain: "Smart Contract Dev" },
  { id: 5, name: "Lisa Wang", domain: "NFT Artist" }
];

const People = () => {
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    let animationFrame: number;
    let scrollAmount = 0;
    const scrollSpeed = 1;
    const animate = () => {
      if (!scroller) return;
      scrollAmount -= scrollSpeed;
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
    <div className="relative overflow-hidden h-12 md:h-20 bg-gray-800 py-3 px-4 lg:py-auto flex items-center">
      <div className="absolute flex items-center" ref={scrollerRef} style={{ display: "flex", whiteSpace: "nowrap" }}>
        {[...people, ...people].map((person, index) => (
          <div key={`${person.id}-${index}`} className="flex items-center">
            <div className="text-center flex items-center px-2 lg:px-4 text-white tracking-wider uppercase text-md md:text-xl xl:text-2xl">
              <FaUserAlt className="mr-2" /> {person.name} - {person.domain}
            </div>
            <div className="bg-white size-3 rounded-full mx-4"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default People;
