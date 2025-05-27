import type { LiveTypes } from "@/utils/types";

const Cards = ({ title, heading }: LiveTypes["details"][0]) => {
  return (
    <div className="bg-white space-y-3 p-4 w-full rounded-2xl border border-light-purple flex flex-col items-center group text-center shadow-md hover:shadow-lg">
      {/* Title */}
      <div className="text-sm tag min-w-24 max-w-fit py-3 px-4 rounded-xl bg-purple-primary group-hover:bg-gray-800 group-hover:text-white capitalize transition-all ease-in-out duration-600">
        {title}
      </div>
      {/* Heading */}
      <span className="font-sora text-xl font-medium">{heading}</span>
    </div>
  );
};

export default Cards;
