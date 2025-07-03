"use client";
import Image from "next/image";
import AnimationHome from "./LandingAnim";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { useEffect, useRef, useMemo } from "react";

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
  }, [items]);

  if (!items.length) return null;

  const repeatedItems: React.ReactNode[] = [];
  let idx = 0;
  for (const item of [...items, ...items, ...items, ...items]) {
    repeatedItems.push(
      <span key={`${item}-${idx++}`} className="mx-2 flex items-center">
        {item}
        <div className="size-[0.3rem] bg-gray-800 rounded-full ml-4" />
      </span>
    );
  }

  return (
    <span className="overflow-hidden w-[48rem] whitespace-nowrap">
      <span className="flex" ref={marqueeRef}>
        {repeatedItems}
      </span>
    </span>
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
    <section className="relative aspect-[3/4] w-full max-w-xs rounded-2xl flex-shrink-0">
      {image && (
        <Image
          className="rounded-2xl object-cover"
          fill
          src={image}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          alt=""
          priority
        />
      )}
      <div className="rounded-2xl absolute -right-4 md:right-0 lg:-right-2 -bottom-4 xl:-right-4 border border-light-purple p-4 flex flex-col justify-center items-center gap-1 md:gap-2 bg-purple-primary shadow-md font-dmsans">
        <span className="font-medium text-base md:text-lg whitespace-nowrap">{fullName ?? ""}</span>
        <span className="tracking-wider text-xs md:text-sm">{pronoun ? `(${pronoun.toLowerCase()})` : ""}</span>
      </div>
    </section>
  );
};

const Landing = () => {
  const landingData = useSelector((state: RootState) => state.content.landing);
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
  } = useMemo(() => landingData || {}, [landingData]);

  // Ensure hashTags is always an array
  const safeHashTags = Array.isArray(hashTags) ? hashTags : [];

  return (
    <div className="px-4 py-6 text-xs">
      <div className="max-w-[90rem] mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Left Side */}
        <div className="w-full space-y-4 flex flex-col col-span-1 md:col-span-2 justify-center items-start">
          {/* Animation Component */}
          <AnimationHome />
          {/* Hashtags */}
          <section className="flex flex-wrap gap-3 font-medium pb-2">
            {(() => {
              const hashtagElements: React.ReactNode[] = [];
              let index = 0;
              if (safeHashTags.length > 0) {
                for (const hashtag of safeHashTags) {
                  hashtagElements.push(
                    <div
                      key={`hashtag-${index++}-${hashtag}`}
                      className="bg-purple-primary tracking-wider whitespace-nowrap py-2 px-3 md:py-3 md:px-4 rounded-2xl hover:text-gray-200 hover:bg-gray-800 transition-all ease-out duration-500 cursor-default hover:shadow-md"
                    >
                      #{hashtag.toUpperCase()}
                    </div>
                  );
                }
              }
              return hashtagElements;
            })()}
          </section>

          {/* Information */}
          <section className="p-3 space-y-3 md:space-y-4 overflow-hidden bg-gray-100 border border-gray-200 w-full rounded-lg">
            <InfoRow title="Title:" value={title} />
            <InfoRow title="Presently based in:" value={region} />
            <InfoRow
              title="Organization Affiliations:"
              value={
                organizationAffiliations.length < 3 ? (
                  organizationAffiliations.join(", ")
                ) : (
                  <Marquee items={organizationAffiliations} />
                )
              }
            />
            <InfoRow
              title="Community Affiliations:"
              value={
                communityAffiliations.length < 3 ? (
                  communityAffiliations.join(", ")
                ) : (
                  <Marquee items={communityAffiliations} />
                )
              }
            />
            <InfoRow
              title="Superpowers:"
              value={superPowers.length < 3 ? superPowers.join(", ") : <Marquee items={superPowers} />}
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

export default Landing;
