import Image from "next/image";
import profile from "@/assets/images/girl.png";
import AnimationHome from "./LandingAnim";
import { LandingTypes } from "@/utils/types";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEffect, useRef } from "react";

const Marquee = ({ items }: { items: string[] }) => {
  const marqueeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;
    let scrollAmount = 0;
    let animationFrame: number;
    const gap = 50;
    const animate = () => {
      scrollAmount -= 0.3;
      if (Math.abs(scrollAmount) >= marquee.scrollWidth / 2 + gap) {
        scrollAmount = 0;
      }
      marquee.style.transform = `translateX(${scrollAmount}px)`;
      animationFrame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  if (items.length < 3) return <div className="whitespace-nowrap">{items.join(" ")}</div>;

  return (
    <div className="overflow-hidden w-[48rem] whitespace-nowrap">
      <div className="flex" ref={marqueeRef}>
        {[...items, ...items].map((item, index) => (
          <span key={`${item}-${index}`} className="mx-2 flex items-center">
            {item}
            <div className="size-2 bg-gray-800 rounded-full ml-4"></div>
          </span>
        ))}
        <span className="mx-2"></span>
      </div>
    </div>
  );
};

const Landing = () => {
  const data: LandingTypes = useSelector((state: RootState) => state.content.landing);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 p-6 w-full text-sm md:text-base lg:text-lg gap-4">
      {/* Left side  */}
      <div className="w-full lg:pl-20 space-y-6 flex flex-col justify-center items-start">
        <AnimationHome />
        {/* Hashtags */}
        <section className="flex flex-wrap gap-2 md:gap-4 lg:gap-6">
          {data.hashTags.map((hashtag) => (
            <div
              key={hashtag}
              className="bg-primary tracking-wider whitespace-nowrap text-xs md:text-sm lg:text-base py-2 px-3 md:py-3 md:px-4 rounded-2xl hover:text-gray-200 hover:bg-gray-800 transition-all ease-out duration-500 cursor-default hover:shadow-md"
            >
              #{hashtag.toUpperCase()}
            </div>
          ))}
        </section>
        {/* Information */}
        <section className="p-3 md:p-5 space-y-3 md:space-y-4 bg-gray-100 border border-gray-200 w-full rounded-lg">
          <div className="flex gap-6 font-medium">
            <p className="text-blue-primary tracking-tight sm:tracking-wide font-medium w-56 md:w-80 whitespace-nowrap">
              Title:
            </p>
            <p className="hover:text-blue-primary cursor-default">{"Si<3> Founder"}</p>
          </div>
          <div className="flex gap-6 font-medium">
            <p className="text-blue-primary tracking-tight sm:tracking-wide font-medium w-56 md:w-80 whitespace-nowrap">
              Based in:
            </p>
            <p className="hover:text-blue-primary cursor-default">{data.region}</p>
          </div>
          <div className="flex gap-6 font-medium overflow-hidden">
            <p className="text-blue-primary tracking-tight sm:tracking-wide font-medium w-56 md:w-80 bg-slate-400 whitespace-nowrap">
              Organization Affiliations:
            </p>
            <Marquee items={data.organizationAffiliations} />
          </div>
          <div className="flex gap-6 font-medium overflow-hidden">
            <p className="text-blue-primary tracking-tight sm:tracking-wide font-medium w-56 md:w-80 whitespace-nowrap">
              Community Affiliations:
            </p>
            <Marquee items={data.communityAffiliations} />
          </div>
          <div className="flex gap-6 font-medium overflow-hidden">
            <p className="text-blue-primary tracking-wide font-medium w-80 whitespace-nowrap">Superpowers:</p>
            <Marquee items={data.superPowers.map((power) => power)} />
          </div>
        </section>
      </div>
      {/* Profile */}
      <div className="w-full flex justify-center items-center text-md md:text-lg xl:text-xl">
        <section className="relative">
          <Image className="rounded-2xl" src={profile} alt="profile" width={450} />
          <div className="rounded-2xl -bottom-4 -right-4 md:-bottom-8 md:-right-8 xl:-bottom-10 xl:-right-10 border border-light-purple p-6 flex flex-col justify-center items-center gap-2 bg-primary absolute shadow-md">
            <span className="font-medium whitespace-nowrap">{data?.name}</span>
            <span className="font-dm-sans tracking-wider text-sm md:text-base xl:text-lg">
              {"(" + data?.pronoun.toUpperCase() + ")"}
            </span>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Landing;
