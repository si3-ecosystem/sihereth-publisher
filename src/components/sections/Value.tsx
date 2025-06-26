"use client";
import type { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import Heading from "../ui/Heading";

function Value() {
  const data = useSelector((state: RootState) => state.content.value);
  return (
    <div className="p-4 py-10">
      <div className="max-w-[90rem] mx-auto grid grid-cols-1 sm:grid-cols-2 gap-10">
        {/* Values */}
        <section className="flex flex-col items-center sm:items-start w-full space-y-6">
          <Heading label="MY EXPERIENCE SUMMARY" />
          <p className="font-medium text-lg font-sora text-justify">{data.experience}</p>
        </section>
        {/* Experience */}
        <section className="flex flex-col items-center sm:items-start w-full space-y-6">
          <Heading label="MY VISION" />
          <div className="font-medium text-lg font-sora text-justify">{data.values}</div>
        </section>
      </div>
    </div>
  );
}

export default Value;
