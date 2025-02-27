import React from "react";

interface CardProps {
  tag: string;
  site: string;
  text: string;
}

const Cards: React.FC<CardProps> = ({ tag, site, text }) => {
  return (
    <div className="lg:flex items-center justify-center">
      <div className="bg-white space-y-4 sm:space-y-6 w-[342px] mx-auto rounded-[12px] p-8 border border-[#ECECEC] shadow-custom text-center flex flex-col items-center group xxl:w-[421.33px]">
        <div className="tag w-[100px] py-3 px-4 rounded-[12px] bg-[#ECE9FD] group-hover:bg-[#1E1E1E] transition-all ease-in-out duration-600 xxl:py-4 xxl:px-6 xxl:w-fit animate-fade">
          <span className="font-fira-mono text-base font-normal leading-6 tracking-wide text-[#1E1E1E] uppercase group-hover:text-white xxl:text-[18px]">
            {tag}
          </span>
        </div>
        <span className="font-clash-display text-2xl font-medium leading-12 text-[#1E1E1E] xxl:text-[36px] xxl:leading-[54px]">
          {site}
        </span>

        <p className="font-dm-sans text-base font-normal leading-[30px] text-center text-[#000000] hidden ease-in-out duration-600 group-hover:animate-fade-down group-hover:block">
          {text}
        </p>
      </div>
    </div>
  );
};

export default Cards;
