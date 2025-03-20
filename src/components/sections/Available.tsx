"use client";
import Image from "next/image";
import availableBorder from "@/assets/images/group.png";
import availableImg from "@/assets/images/avatar.png";
import background from "@/assets/images/donut.png";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Heading from "@/components/ui/Heading";
import Link from "next/link";

const Available = () => {
  const data = useSelector((state: RootState) => state.content.available ?? []);

  return (
    <div className="p-4">
      <div className="p-2 max-w-[90rem] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        {/* Reverse Order on Mobile: Text First, Image Below */}
        <section className="flex flex-col justify-center items-center order-1 lg:order-2 space-y-8 lg:space-y-10 xxl:space-y-12 w-full">
          <Heading label="AVAILABLE FOR" />
          <div className="flex flex-col gap-4 justify-center items-center">
            {data.length > 0 &&
              data.map((item, index) => (
                <div
                  key={`${item}-${index}`}
                  className="transform transition-all text-xl duration-300 hover:text-[#3E21F3] hover:text-2xl hover:font-semibold uppercase hover:tracking-widest"
                >
                  {item}
                </div>
              ))}
          </div>
        </section>

        {/* Image Section */}
        <section className="flex flex-col gap-6 items-center w-full order-2 lg:order-1">
          <div className="relative">
            <Image src={availableBorder} alt="border" width={260} height={100} className="" />
            <Image src={background} alt="background" layout="fill" objectFit="cover" className="absolute right-2 z-1" />
            <Image src={availableImg} alt="girl" layout="fill" objectFit="cover" className="p-2 z-2 absolute right-2" />
          </div>
          <Link
            href="https://www.si3.space/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-segoe-ui rounded-xl text-sm border border-[#3E21F3] bg-primary font-semibold text-[#3E21F3] px-4 py-2 lg:px-6 lg:py-3"
          >
            Join SI&lt;3&gt;
          </Link>
        </section>
      </div>
    </div>
  );
};

export default Available;
