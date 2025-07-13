"use client";
import Image from "next/image";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import Heading from "@/components/ui/Heading";
import Link from "next/link";

const Available = () => {
  const { avatar = "", availableFor = [], ctaText } = useSelector((state: RootState) => state.content.available);

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
          <div>
            {avatar &&
            avatar !== "" &&
            avatar !== "https://res.cloudinary.com/dv52zu7pu/image/upload/v1751386807/avatar_vpdoef.png" ? (
              <Image
                src={avatar}
                alt=""
                width={260}
                height={260}
                objectFit="cover"
                className="rounded-lg border border-[#3E21F3]"
              />
            ) : (
              <Image
                src={"https://res.cloudinary.com/dv52zu7pu/image/upload/v1751741835/available_uqqfbn.svg"}
                alt=""
                width={260}
                height={260}
                objectFit="cover"
              />
            )}
          </div>
          <Link
            href="https://www.si3.space"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-light-purple border border-[#3E21F3] text-blue-primary rounded-full transition-all ease-out duration-300 hover:bg-[#7E5BFF] hover:text-white font-fira-mono font-medium tracking-wide px-4 py-2 sm:px-5 sm:py-3 hover:shadow-md cursor-pointer mx-auto sm:mx-0 uppercase text-sm sm:text-base"
          >
            {ctaText}
          </Link>
        </section>
      </div>
    </div>
  );
};

export default Available;
