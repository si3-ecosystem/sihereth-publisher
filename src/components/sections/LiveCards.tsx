import { LiveTypes } from "@/utils/types";

const Cards = ({ title, heading, body }: LiveTypes["details"][0]) => {
  return (
    <div className="bg-white space-y-4 p-8 w-[20rem] sm:w-[30rem] rounded-2xl border border-light-purple flex flex-col items-center group text-center shadow-md hover:shadow-lg">
      {/* Title */}
      <div className="tag w-32 py-3 px-4 rounded-[12px] bg-primary group-hover:bg-gray-800 group-hover:text-white capitalize transition-all ease-in-out duration-600">
        {title}
      </div>
      {/* Heading */}
      <span className="font-clash-display text-2xl font-medium">{heading}</span>
      {/* Body */}
      <p className="font-dm-sans text-base hidden group-hover:block">{body}</p>
    </div>
  );
};

export default Cards;
