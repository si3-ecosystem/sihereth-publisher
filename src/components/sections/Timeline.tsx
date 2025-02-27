import React from "react";
import Image from "next/image";
import TimeLineLogo from "../../images/runes (1).png";
import TimeLineCard from "./TimelineCard";

const TimeLine: React.FC = () => {
  const timeLineData = [
    {
      id: 1,
      from: "PRESENT",
      to: "",
      title: "Co-Creating SI<3>"
    },
    {
      id: 2,
      from: "2022",
      to: "",
      title: "Personal Development Retreat"
    },
    {
      id: 3,
      from: "2017",
      to: "2021",
      title: "Managed the Feminine Intelligence"
    },
    {
      id: 4,
      from: "2015",
      to: "2019",
      title: "VP of Growth & Partnerships at Clevertap"
    },
    {
      id: 5,
      from: "2025",
      to: "",
      title: "MBA from NYU Stern & Marketing Entrepreneurship"
    },
    {
      id: 6,
      from: "2004",
      to: "",
      title: "BSC from UW Madison - Personal Finance"
    },
    {
      id: 7,
      from: "2002",
      to: "2010",
      title: "Equity Research Associate / Financial Analyst"
    }
  ];

  return (
    <div className="py-16 px-6 bg-[#FFFFFF] space-y-12 w-full sm:w-[90%] sm:flex flex-row-reverse mx-auto sm:relative lg:w-full lg:block lg:px-10 xxl:py-[118px] xxl:px-16">
      <Image
        src={TimeLineLogo}
        alt="Timeline"
        width={300} // Adjust width as needed
        height={300} // Adjust height as needed
        className="w-[30%] ml-auto sm:h-[5%] sm:translate-y-24 lg:right-8 lg:w-[12%] lg:h-[8%] xxl:top-16 xxl:right-12 z-10"
      />

      <div className="space-y-8 title">
        <div className="bg-[#ECE9FD] py-3 px-4 font-fira-mono text-lg font-medium leading-[30px] tracking-wide uppercase w-fit rounded-[12px] lg:px-6 lg:py-4 lg:text-xl xxl:text-[24px] xxl:leading-9">
          Timeline
        </div>

        {timeLineData.map((item) => (
          <TimeLineCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default TimeLine;
