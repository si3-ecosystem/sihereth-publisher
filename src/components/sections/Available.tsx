"use client";
import Image from "next/image";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import Heading from "@/components/ui/Heading";
import Link from "next/link";

const Available = () => {
  const {
    avatar = "",
    availableFor = [],
    ctaText = "Join SI<3>",
    ctaUrl = "https://www.si3.space"
  } = useSelector((state: RootState) => state.content.available);

  return (
    <div className="p-4 py-10">
      <div className="p-2 max-w-[90rem] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        <section className="flex flex-col justify-center items-center order-1 lg:order-2 space-y-6 lg:space-y-10 xxl:space-y-12 w-full">
          <Heading label="I'M AVAILABLE FOR" />
          <div className="flex flex-col gap-4 justify-center items-center">
            {availableFor
              .filter((item) => item.trim() !== "")
              .map((item) => (
                <div
                  key={item}
                  className="fade-in-up transform transition-all text-[1.4rem] h-8 duration-300 hover:text-[#3E21F3] hover:text-[1.7rem] hover:font-semibold uppercase hover:tracking-wider flex justify-center items-center cursor-default"
                >
                  {item}
                </div>
              ))}
          </div>
        </section>

        {/* Image Section */}
        <section className="flex flex-col gap-6 items-center w-full order-2 lg:order-1">
          <div className="relative">
            <Image
              src={"https://res.cloudinary.com/dv52zu7pu/image/upload/v1751386807/border_available_ykxocj.png"}
              alt=""
              width={260}
              height={100}
            />
            <Image
              src={"https://res.cloudinary.com/dv52zu7pu/image/upload/v1751386813/donut_jmhyk6.png"}
              alt=""
              layout="fill"
              objectFit="cover"
            />
            {avatar && <Image src={avatar} alt="" layout="fill" objectFit="cover" className="p-4" />}
          </div>
          <Link
            href={ctaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-sora tracking-wider rounded-xl text-sm border border-[#3E21F3] bg-purple-primary font-semibold text-[#3E21F3] px-4 py-2 lg:px-6 lg:py-3"
          >
            {ctaText}
          </Link>
        </section>
      </div>
    </div>
  );
};

export default Available;
