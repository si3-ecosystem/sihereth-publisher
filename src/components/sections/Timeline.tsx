"use client";
import Image from "next/image";
import TimeLineLogo from "@/assets/images/runes1.png";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const TimeLine = () => {
  const data = useSelector((state: RootState) => state.content.timeline ?? []);
  if (data.length === 0) return null;

  return (
    <div className="p-2 md:p-10">
      <div className="flex justify-between items-center">
        <p className="py-3 md:py-4 px-5 bg-primary border border-light-purple rounded-xl text-md md:text-lg xl:text-xl font-fira-mono font-medium tracking-widest w-fit flex items-center justify-center">
          TIMELINE
        </p>
        <Image src={TimeLineLogo} alt="" width={100} />
      </div>

      {data.map((item, index) => (
        <div
          key={item.title}
          className={`w-full py-5 flex font-bold justify-between items-start tracking-wide ${
            index !== data.length - 1 ? "border-b border-gray-300" : ""
          }`}
        >
          <p className="font-dm-sans w-28 lg:w-48 xl:w-64 whitespace-nowrap text-[#3E21F3] flex items-center text-lg md:text-xl lg:text-2xl xl:text-3xl uppercase">
            {item.from}
            {item.to ? ` - ${item.to}` : ""}
          </p>
          <span className="w-72 md:w-full font-clash-display text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-medium">
            {item.title}
          </span>
        </div>
      ))}
    </div>
  );
};

export default TimeLine;
