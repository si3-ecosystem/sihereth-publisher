import { useEffect, useRef } from "react";
import anime from "animejs";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const AnimationHome = () => {
  const title = useSelector((state: RootState) => state.content.landing.title) || "";
  const headline = useSelector((state: RootState) => state.content.landing.headline) || "\u00A0";
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
  }, []); // Run only on first render

  return (
    <div
      ref={containerRef}
      className="font-clash-display text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-semibold leading-10 md:leading-[5rem] lg:leading-[5.5rem] 2xl:leading-[6rem] tracking-wider ml1"
    >
      <span className="letter">I'm </span>
      <span className="text-blue-primary letter">{title ?? ""}</span>
      <span className="letter">,</span>
      <span className="letter"> </span>
      <span className="letter">{headline ?? ""}</span>
    </div>
  );
};

export default AnimationHome;
