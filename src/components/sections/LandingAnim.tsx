"use client";

import { useEffect } from "react";
import anime from "animejs";

const AnimationHome = ({ title, headline }: { title: string; headline: string }) => {
  useEffect(() => {
    const textWrappers = document.querySelectorAll<HTMLElement>(".ml1 .letter");
    textWrappers.forEach((wrapper) => {
      wrapper.innerHTML = wrapper.textContent?.replace(/\S/g, "<span class='letters'>$&</span>") ?? "";
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
    <div className="font-clash-display text-7xl font-medium tracking-wide leading-[57.6px] lg:leading-[76.8px] ml1">
      <span className="relative">
        <span className="letter">I'm </span>
        <span className="text-[#3E21F3] text-7xl letter">{title ?? ""}</span>
        <span className="letter">, {headline ?? ""}</span>
      </span>
    </div>
  );
};

export default AnimationHome;
