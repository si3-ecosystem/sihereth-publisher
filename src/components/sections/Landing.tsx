"use client";
import Image from "next/image";
import AnimationHome from "./LandingAnim";
import { LandingTypes } from "@/utils/types";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
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
    <span className="overflow-hidden w-[48rem] whitespace-nowrap">
      <span className="flex" ref={marqueeRef}>
        {[...items, ...items, ...items, ...items].map((item, index) => (
          <span key={index} className="mx-2 flex items-center">
            {item}
            <div className="size-[0.3rem] bg-gray-800 rounded-full ml-4"></div>
          </span>
        ))}
      </span>
    </span>
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
    pronoun = "",
    title = "",
    fullName = ""
  } = data;

  return (
    <div className="px-4 py-6 text-xs">
      <div className="max-w-[90rem] mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Left Side */}
        <div className="w-full space-y-4 flex flex-col col-span-1 md:col-span-2 justify-center items-start">
          <AnimationHome />
          {/* Hashtags */}
          <section className="flex flex-wrap gap-3 font-medium">
            {hashTags.map((hashtag) => (
              <div
                key={hashtag}
                className="bg-primary tracking-wider whitespace-nowrap py-2 px-3 md:py-3 md:px-4 rounded-2xl hover:text-gray-200 hover:bg-gray-800 transition-all ease-out duration-500 cursor-default hover:shadow-md"
              >
                #{hashtag.toUpperCase()}
              </div>
            ))}
          </section>
          {/* Information */}
          <section className="p-3 space-y-3 md:space-y-4 overflow-hidden bg-gray-100 border border-gray-200 w-full rounded-lg">
            <InfoRow title="Title:" value={title} />
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
              value={
                communityAffiliations.length < 3 ? communityAffiliations : <Marquee items={communityAffiliations} />
              }
            />
            <InfoRow
              title="Superpowers:"
              value={superPowers.length < 3 ? superPowers : <Marquee items={superPowers} />}
            />
          </section>
        </div>
        {/* Profile */}
        <div className="w-full flex md:justify-end justify-center">
          <ProfileCard image={image} fullName={fullName} pronoun={pronoun} />
        </div>
      </div>
    </div>
  );
};

const InfoRow = ({ title, value }: { title: string; value: React.ReactNode }) => (
  <div className="flex gap-2 font-medium">
    <div className="text-blue-primary tracking-tight sm:tracking-wide font-medium w-1/3 whitespace-nowrap min-w-44">
      {title}
    </div>
    <div className="cursor-default w-2/3 whitespace-nowrap overflow-hidden">{value}</div>
  </div>
);

const ProfileCard = ({ image, fullName, pronoun }: { image: string; fullName: string; pronoun: string }) => {
  return (
    <section className="relative">
      {image && <Image className="rounded-2xl" src={image} alt="profile" width={300} height={300} />}
      <div className="rounded-2xl -bottom-4 -right-4 md:-bottom-8 md:-right-8 xl:-bottom-10 xl:-right-10 border border-light-purple p-4 flex flex-col justify-center items-center gap-2 bg-primary absolute shadow-md">
        <span className="font-medium whitespace-nowrap">{fullName}</span>
        <span className="font-dm-sans tracking-wider">{pronoun ? `(${pronoun.toUpperCase()})` : ""}</span>
      </div>
    </section>
  );
};

export default Landing;
