"use client";
import type { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import Heading from "../ui/Heading";

function Value() {
  const data = useSelector((state: RootState) => state.content.value);
  return (
    <div className="p-4">
      <div className="max-w-[90rem] mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Values */}
        <section className="flex flex-col items-center sm:items-start w-full p-4 space-y-2">
          <Heading label="MY JOURNEY" />
          <p className="font-dm-sans font-medium text-xl tracking-wide text-justify">{data.experience}</p>
        </section>
        {/* Experience */}
        <section className="flex flex-col items-center sm:items-start w-full p-4 space-y-2">
          <Heading label="MY VALUE" />
          <div className="font-medium text-2xl tracking-wide font-clash-display text-justify">
            {data.values}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Value;
