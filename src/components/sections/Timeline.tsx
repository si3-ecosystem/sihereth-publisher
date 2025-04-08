"use client";
import Image from "next/image";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import Heading from "../ui/Heading";

const TimeLine = () => {
  const data = useSelector((state: RootState) => state.content.timeline ?? []);
  if (data.length === 0) return null;

  return (
    <div className="p-4">
      <section className="max-w-[90rem] mx-auto">
        <div className="flex justify-between items-center">
          <Heading label="TIMELINE" />
          <Image src={"/images/runes.png"} alt="" width={70} height={70} />
        </div>
        {data.map((item, index) => (
          <div
            key={item.title}
            className={`w-full py-4 flex font-bold justify-between items-start tracking-wide ${
              index !== data.length - 1 ? "border-b border-gray-300" : ""
            }`}
          >
            <p className="font-dm-sans w-44 text-lg md:text-xl font-semibold whitespace-nowrap text-[#3E21F3] flex items-center uppercase">
              {item.from}
              {item.to ? ` - ${item.to}` : ""}
            </p>
            <span className="w-72 md:w-full uppercase text-xl md:text-2xl leading-6 font-clash-display font-medium">
              {item.title}
            </span>
          </div>
        ))}
      </section>
    </div>
  );
};

export default TimeLine;
