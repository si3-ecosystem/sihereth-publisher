"use client";
import Image from "next/image";
import AnimationHome from "./LandingAnim";
import { LandingTypes } from "@/utils/types";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEffect, useRef } from "react";

const Marquee = ({ items = [] }: { items?: string[] }) => {
  const marqueeRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!marqueeRef.current || items.length < 3) return;
    const marquee = marqueeRef.current;
    let scrollAmount = 0;
    let animationFrame: number;
    const animate = () => {
      scrollAmount -= 0.3;
      if (Math.abs(scrollAmount) >= marquee.scrollWidth / 2 + 50) {
        scrollAmount = 0;
      }
      marquee.style.transform = `translateX(${scrollAmount}px)`;
      animationFrame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, [items.join(",")]);
  if (!items.length) return null;
  return (
    <div className="overflow-hidden w-[48rem] whitespace-nowrap">
      <div className="flex" ref={marqueeRef}>
        {[...items, ...items].map((item, index) => (
          <span key={index} className="mx-2 flex items-center">
            {item}
            <div className="size-2 bg-gray-800 rounded-full ml-4"></div>
          </span>
        ))}
      </div>
    </div>
  );
};

const Landing = () => {
  const data: LandingTypes = useSelector((state: RootState) => state.content.landing) ?? {};

  const {
    hashTags = [],
    region = "",
    organizationAffiliations = [],
    communityAffiliations = [],
    superPowers = [],
    image = "",
    name = "",
    pronoun = ""
  } = data;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 p-6 w-full text-sm md:text-base lg:text-lg gap-4">
      {/* Left Side */}
      <div className="w-full lg:pl-20 space-y-6 flex flex-col justify-center items-start">
        <AnimationHome />
        {/* Hashtags */}
        <section className="flex flex-wrap gap-2 md:gap-4 lg:gap-6">
          {hashTags.map((hashtag) => (
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
          <InfoRow title="Title:" value="Si<3> Founder" />
          <InfoRow title="Based in:" value={region} />
          <InfoRow
            title="Organization Affiliations:"
            value={
              organizationAffiliations.length < 3 ? (
                organizationAffiliations
              ) : (
                <Marquee items={organizationAffiliations} />
              )
            }
          />
          <InfoRow
            title="Community Affiliations:"
            value={communityAffiliations.length < 3 ? communityAffiliations : <Marquee items={communityAffiliations} />}
          />
          <InfoRow
            title="Superpowers:"
            value={superPowers.length < 3 ? superPowers : <Marquee items={superPowers} />}
          />
        </section>
      </div>
      {/* Profile */}
      <div className="w-full flex justify-center items-center text-md md:text-lg xl:text-xl">
        <ProfileCard image={image} name={name} pronoun={pronoun} />
      </div>
    </div>
  );
};

const InfoRow = ({ title, value }: { title: string; value: React.ReactNode }) => (
  <div className="flex gap-6 font-medium">
    <p className="text-blue-primary tracking-tight sm:tracking-wide font-medium w-56 md:w-72 whitespace-nowrap">
      {title}
    </p>
    <p className="cursor-default">{value}</p>
  </div>
);

const ProfileCard = ({ image, name, pronoun }: { image: string; name: string; pronoun: string }) => {
  return (
    <section className="relative">
      {image && <Image className="rounded-2xl" src={image} alt="profile" width={450} height={450} />}
      <div className="rounded-2xl -bottom-4 -right-4 md:-bottom-8 md:-right-8 xl:-bottom-10 xl:-right-10 border border-light-purple p-6 flex flex-col justify-center items-center gap-2 bg-primary absolute shadow-md">
        <span className="font-medium whitespace-nowrap">{name}</span>
        <span className="font-dm-sans tracking-wider text-sm md:text-base xl:text-lg">
          {pronoun ? `(${pronoun.toUpperCase()})` : ""}
        </span>
      </div>
    </section>
  );
};

export default Landing;
