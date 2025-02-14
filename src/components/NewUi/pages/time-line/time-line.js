import React from "react";
import TimeLineLogo from "../../images/runes (1).png";
import PageNameBtn from "../../pageNameBtn/pageNameBtn";
import TimeLineCard from "../../timeLineCard/timeLineCard";

function TimeLine() {
  const timeLineData = [
    {
      id: 1,
      from: "PRESENT",
      to: "",
      title: "Co-Creating SI<3>",
    },
    {
      id: 2,
      from: "2022",
      to: "",
      title: "Personal Development Retreat",
    },
    {
      id: 3,
      from: "2017",
      to: "2021",
      title: "Managed the Feminine Intelligence",
    },
    {
      id: 4,
      from: "2015",
      to: "2019",
      title: "VP of Growth & Partnerships at Clevertap",
    },
    {
      id: 5,
      from: "2025",
      to: "",
      title: "MBA from NYU Stern & Marketing Entreprenurship ",
    },
    {
      id: 6,
      from: "2004",
      to: "",
      title: "BSC from UW  Madison - Personal Finance ",
    },
    {
      id: 7,
      from: "2002",
      to: "2010",
      title: "Equity Research Associate /Financial Analyst",
    },
  ];
  return (
    <>
      <div className="py-16 px-6 bg-[#FFFFFF] space-y-12 w-full sm:w-[90%] sm:flex flex-row-reverse mx-auto sm:relative lg:w-full lg:block lg:px-10 xxl:py-[118px] xxl:px-16">
        <img
          src={TimeLineLogo}
          className="w-[30%] ml-auto sm:h-[5%]  sm:translate-y-24 lg:right-8 lg:w-[12%] lg:h-[8%] xxl:top-16 xxl:right-12 z-10"
          alt="Timeline"
        />

        <div className="space-y-8 title">
          <PageNameBtn pageName={"Timeline"} />

          {timeLineData.map((item) => {
            return <TimeLineCard {...item} />;
          })}
        </div>
      </div>
    </>
  );
}
export default TimeLine;
