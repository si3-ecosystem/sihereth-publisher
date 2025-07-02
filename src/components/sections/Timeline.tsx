"use client";
import Image from "next/image";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import Heading from "../ui/Heading";

const TimeLine = () => {
  const data = useSelector((state: RootState) => state.content.timeline ?? []);

  // Sort data based on 'from' value in descending order (newest first)
  const sortedData = [...data].sort((a, b) => {
    // If one has 'from' and the other doesn't, prioritize the one with 'from'
    if (a.from.trim() && !b.from.trim()) return -1;
    if (!a.from.trim() && b.from.trim()) return 1;

    // If both have 'from', sort by the value
    if (a.from.trim() && b.from.trim()) {
      const dateA = Number.parseInt(a.from.replace(/\D/g, "")) || 0;
      const dateB = Number.parseInt(b.from.replace(/\D/g, "")) || 0;
      return dateB - dateA;
    }

    // If neither has 'from', maintain original order
    return 0;
  });

  // Filter out entries where all fields are empty
  const filteredData = sortedData.filter(
    (item) => item.title.trim() !== "" || item.from.trim() !== "" || item.to.trim() !== ""
  );

  if (filteredData.length === 0) return null;

  return (
    <div className="p-4 py-10">
      <section className="max-w-[90rem] mx-auto">
        <div className="flex justify-between items-center">
          <Heading label="TIMELINE" />
          <Image
            src={"https://res.cloudinary.com/dv52zu7pu/image/upload/v1751386800/runes_ppyc4o.png"}
            alt=""
            width={70}
            height={70}
          />
        </div>
        {filteredData.map((item, index) => (
          <div
            key={item.title}
            className={`w-full py-4 flex font-bold justify-between items-center tracking-wide ${
              index !== filteredData.length - 1 ? "border-b border-gray-300" : ""
            }`}
          >
            <p className="font-dm-sans w-56 text-sm sm:text-lg font-semibold whitespace-nowrap text-[#3E21F3] flex items-center uppercase">
              {item.from}
              {item.to ? ` - ${item.to}` : ""}
            </p>
            <span className="w-72 md:w-full uppercase text-sm sm:text-lg leading-6 font-sora font-medium">
              {item.title}
            </span>
          </div>
        ))}
      </section>
    </div>
  );
};

export default TimeLine;
