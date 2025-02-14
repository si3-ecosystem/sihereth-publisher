import { useEffect } from "react";
import anime from "animejs";
import "./home.css";

function AnimationHome() {
  useEffect(() => {
    const textWrappers = document.querySelectorAll(".ml1 .letter");
    textWrappers.forEach((wrapper) => {
      wrapper.innerHTML = wrapper.textContent.replace(/\S/g, "<span class='letters'>$&</span>");
    });
    anime.timeline({ loop: false }).add({
      targets: ".ml1 .letters",
      scale: [0.3, 1],
      opacity: [0, 1],
      translateZ: 0,
      easing: "easeOutExpo",
      duration: 100,
      delay: (el, i) => 50 * (i + 1),
    });
  }, []);

  return (
    <div className="font-clash-display text-7xl font-medium tracking-wide leading-[57.6px] lg:leading-[76.8px] ml1">
      <span className="relative text-wrapper">
        <span className="letter">I'm </span>
        <span className="text-[#3E21F3] text-7xl letter">
          Kara
        </span>
        <span className="letter">, & I</span>
        <span className="letter"> create equitable </span>
      </span>
      <span className="text-wrapper relative leading-[57.6px] lg:leading-[76.8px] ">
        <span className="block mt-3 letter line2">platforms for the </span>
        <span className="letter line2">new economy.</span>
      </span>
    </div>
  );
}

export default AnimationHome;
