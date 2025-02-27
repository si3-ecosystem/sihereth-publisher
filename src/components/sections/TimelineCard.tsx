import React from "react";

interface TimeLineCardProps {
  from: string;
  to?: string;
  title: string;
}

const TimeLineCard: React.FC<TimeLineCardProps> = ({ from, to, title }) => {
  return (
    <div className="bg-white w-[342px] sm:w-full mx-auto py-6 border-b border-[#C8C8C8] flex flex-col gap-6 md:flex-row">
      <div className="font-dm-sans text-2xl font-bold leading-7 tracking-wide text-[#3E21F3] flex justify-left items-center lg:text-3xl">
        <span>{from}</span>
        <span>{to ? ` - ${to}` : ""}</span>
      </div>

      <span className="text-[#1E1E1E] font-clash-display text-4xl font-medium leading-9.5 xxl:text-[46px]">
        {title}
      </span>
    </div>
  );
};

export default TimeLineCard;
