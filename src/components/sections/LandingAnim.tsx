import { useEffect, useRef } from "react";
import anime from "animejs";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const AnimationHome = () => {
  const { name, headline } = useSelector((state: RootState) => state.content.landing);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current || !containerRef.current) return;
    hasAnimated.current = true;
    const textWrappers = containerRef.current.querySelectorAll<HTMLElement>(".letter");
    textWrappers.forEach((wrapper) => {
      if (wrapper.textContent?.trim()) {
        wrapper.innerHTML = wrapper.textContent.replace(/\S/g, "<span class='letters'>$&</span>");
      }
    });

    anime.timeline({ loop: false }).add({
      targets: ".ml1 .letters",
      scale: [0.3, 1],
      opacity: [0, 1],
      translateZ: 0,
      easing: "easeOutExpo",
      duration: 100,
      delay: (_el, i) => 50 * (i + 1)
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="font-clash-display text-[2.8rem] sm:text-[3.3rem] lg:text-[3.8rem] leading-[3.2rem] sm:leading-[3.8rem] lg:leading-[4.5rem] font-semibold tracking-wider"
    >
      <span className="letter">I'm </span>
      <span className="text-blue-primary letter">{name ?? ""}</span>
      <span className="letter">,</span>
      <span className="letter"> </span>
      <span className="letter">{headline ?? ""}</span>
    </div>
  );
};

export default AnimationHome;
