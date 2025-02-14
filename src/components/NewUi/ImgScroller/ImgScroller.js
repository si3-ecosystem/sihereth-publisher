import React, { useState, useEffect, useRef } from "react";
import "./ImgScroller.css";

const slides = [
  {
    imgSrc:
      "https://s3-alpha-sig.figma.com/img/7636/492d/a9a76ad411a1f928536cfd091119cdd0?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=DwphWPo5Ubh2YvmEMY-3dRkwcv7iWGT15kOZId55bpKVqlXJOWBj0f8PZNioVJpLHxaFnDV5GkrfAPmV9j-1m-kq0VrNL-2dleR8S9X9jS2FdxbGTXlZBjQYwLAdDA8ecK7FQUDx~hWtwV8Gpvg5tlSV1qW0OgypHUCOvNxs3wxDy3qyGkQJNDy2qvwWZuPsl7Ci5uic3hniBYz9wR~UFXzliO~tlBiNYerc~DOv3PxBHgmLZo3p8M-bY949pdKLiiLqCJOQF07RkQZZKcl67LW4~DE4Y~fUDQq1TRa5V6RF-MWtQndmz~5HfuHKhuxhqFFp4j56xcrvNuvt8Q71Ag__",
    id: 0,
  },
  {
    imgSrc:
      "https://s3-alpha-sig.figma.com/img/c1a0/f9e8/9e1f6f30391e177ac16e4f888c2cece4?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=YMQH3UKb2VPN9GXEVL7XZcYpPRYJReRD99PuBSEer8rM5sIZvPQ~g2xPkpqFEM1GSkHU4KacmMitq1ut27It32ClBrAjlVL6lCqmO43sRPumViy82vg6hrRTsKyXgLOj9wJ4dw5UsygvDRjADWekCxPYQySrvmCdzTfpxDGbdzOk89OWM4B6UYzl5JGJRd0VF9BlTBdiHlu79N8lQO6lodWixZO9s-1y0wZ47dnqHmP5VGAF-TwUiBf0SnXauUCKi2kSn~8d04WJdnFeLl9XY4VGCO2FZA3COaa8mKDxhk7y8SSiLNbOL1aFyKZUaa-9EZkieT~3FoC1NTbD8BH2TQ__",
    id: 1,
  },
  {
    imgSrc:
      "https://s3-alpha-sig.figma.com/img/b98d/b966/045206f97cb3a8fc4b829aec63fba3f8?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=FSOphux4Xm6ceyT~K7d46CLAr6IpNdSpgsWAJ9evHHd46szhdNz08nwgIe85-3U2mtxKTAIibZJNaDUbnqCrcGq28EMPCNwBo4ewcWCSWAO5ZQpboGFc1hwZFOLp5GKeAwodCXoRLD7VQnSj-CbupRa248N0UiviWDwzM1r1jxq4xGy62m2ho45zC8D12I-qwdI~FrB6eYi7cmvLjkw~sSxvZVkNp7rQa7n2h7Mpaz2HjOnR5JYgMedKhOyd563ffTQdgf8s9APrzjxhSBepY4JQj3MK9JOZJjRQ8EJTFulCOM1B8czmP4CVQWz3M-tsxyArNaQoP7jVYsCwVgN0wA__",
    id: 2,
  },
  {
    imgSrc:
      "https://s3-alpha-sig.figma.com/img/5350/aede/f3110485be869387363665aa7b3c33bc?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=fSprkQt7e09Z9GIIjB9MNvaOwKKNzsxZIKHmA6h90QdfhqgR62Qnm~ozX0xc437tCtsaQEu0PkMjcRgtFlTW7iT850xDgP-p2YHrw5XF2cp-CDGgT3xLKSCY5je10wnds7DOudkub-37EKxAV0oWesQotbAeJ2Kftdl8GStPSpaFRCpGyNGBPn-TwiR3AbeVMo3XSy7laKYr-G-rCu3Q0DFCOqrT-Z5tRdER5VNQKEyl2gi~M7ut85FIzA97S6~0NTmG5dbsOLaW9QPaGUy5-RSwOgcfeawwIeCig8Yl-2c40yiKEB373uQESW0MJyyYqfhaogbQRGgq9~-1eRcGLQ__",
    id: 3,
  },
  {
    imgSrc:
      "https://s3-alpha-sig.figma.com/img/cbb2/19e4/d521086b92c0a60b6a9388f79efa8a1a?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Ky4RDAbMC3bVq9RIyTnpIndPbv2kQSSs~MdbrVTW~qd7GDqxewv7VQwUmR29ZFEEf5dqP8o2ktE-UsmCG9SOHyxAO71y8ZfKBDA-p5YJSRhqdlk-sDEfTyokpj9C91mMpmFEN2UvGEOX4JJu10hKhyp5V4Qvi3u0~n1988mmVXTmm0v7LLSMArSBBkpJ-cJB0zTx0ymQxMHzPgDgqqcMB6uolu~9J6DR54Wo6DzPBP0Y1j9jIHxubPQOBoQ1EvUwtL9PWbMWt-iZpYXNA0ElxZlZeqbc8xgB7z7ayV~mzzDQmJITof7E6ROHK2GVMYPMefeVxkPCiN8Y2p82ZgSdog__",
    id: 4,
  },
  {
    imgSrc:
      "https://s3-alpha-sig.figma.com/img/33a8/a220/132ebcdc5579e71ed26703bc3d28dc38?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=m~XEY1nCmxNvUd~MeIrdkZEBKAvxZYeA3lqAYErVrolG5w7lKYB8NOM6iHrsVXlJfRa5HF14Jj6TSLTQCYRmqeDJyLH9kP-tijc1kvHfltkklIVbchbAThC4VQFMIpDI3R32Dw408S59BuYufrzpFizByZ4yhtmdqVIZZtq40D5vzTKg9Ts53aK07-0wb7eSFd1pE5zChUEmB9o6JJ6Q~IhA915Xohm8cAlm2lNaieDUh~6sCrDmL63KboWedBA9aHGOm~nHpNvmJBw0TL2APYJ9HTIdepG~LX48i1RIqpnuOIlhUq3BoBvqFRnoY7iliG3JdlVdEAuRE3W3fQGskw__",
    id: 5,
  },
  {
    imgSrc:
      "https://s3-alpha-sig.figma.com/img/866e/776e/e8f5e3e700d80c11b1ebc184aa4a7d2f?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Oh018SRlCtgDbhb5vu7Rk2D2HCAPJt52dsWlaXiGIyFV2Fr6ebjcXAALqSYUn5TPtkDMFSERO2ELDa0tx2IGZaI6WNYH4AaeWSRTD~PKOepkxYPucGd0R0oOt192eP320i-YRv-rWvyUkaaLDmjA8IIVd4CREW0s8oZbf4YvbFzM1IkMOyWWG7qNHqAaWBpJjMtO4cAWadgzGpo0o41LJ6d7957PEOWf05JIeIJDAPYgyXILhYXzbV0rFwkx6gYfedU~YUG9lEndc9DxyVnCwHYLpLm-df~xYj~ZJXUHv3afgN3RCCWHIik4LkyDyfcFcZPscYaL5JtsYQYMQHuF7Q__",
    id: 6,
  },
  {
    imgSrc:
      "https://s3-alpha-sig.figma.com/img/1361/1503/621011b798b6ed8349278a1cf3fbeb7d?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=gloMc~1aXe1J~mxwRUBLmTlcz3OUIPzdF08WE9Zr7P2E-E9Ljj5GjdV-IyIfT~g9~-PVCX7JtwpEHuLDCmCfBHQdXE1vyQbZ9JAZphzFXJEROd6K72r4pCF3rNfxn1cQQV~XqLVxQg348uLNZuml7VJPP5rATPv7PYgEhQi--bEBy16Ta5Mx8NqnwH4g9MRELRRSB6phzuEH5lj1OIiBckdKtJkvMv0dmhmmfzXZgWGP3mlyc7Mkj6aw1nbO4ZBIywH1Q6kzDkTKrCcUvi3R-nTMfgMYQmrNiqn8Ys23chnDfcKfN~FANDx1qeV2Gjxlxp36NCk14GB06PXXslYdDQ__",
    id: 7,
  },
];

const ImgScroller = () => {
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
      className="relative overflow-hidden h-[60px] md:h-[80px] bg-black xxl:h-[96px]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="absolute top-0 flex items-center transition-all duration-700 bg-black w-[1000px] sm:w-[800px] lg:w-[500px] py-2 gap-4 lg:gap-8 md:py-4"
        ref={scrollerRef}
        style={{ whiteSpace: "nowrap" }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="inline-block flex-shrink-0 text-center flex gap-4 px-2 lg:px-4 items-center"
          >
            <img
              src={slide.imgSrc}
              alt={`Slide ${index}`}
              className="rounded-full w-12 h-12 xxl:w-16 xxl:h-16"
            />
            <div className="flex flex-col gap-[3px] px-2 xxl:gap-2">
              <span className="text-white font-fira-mono text-xs font-medium leading-4.5 tracking-wide xxl:text-[14px] xxl:font-medium">
                Nombre
              </span>
              <span className="text-[#8674F7] font-fira-mono text-xs font-normal leading-4.5 tracking-wide xxl:text-[14px] xxl:font-medium">
                Learn more
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImgScroller;
