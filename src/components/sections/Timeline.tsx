import Image from "next/image";
import TimeLineLogo from "@/assets/images/runes1.png";
import TimeLineCard from "./TimelineCard";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const TimeLine = () => {
  const data = useSelector((state: RootState) => state.content.timeline ?? []);
  if (data.length === 0) return null;

  return (
    <div className="p-10">
      <div className="flex justify-between items-center">
        <p className="text-center py-3 px-4 whitespace-nowrap w-fit rounded-2xl border border-light-purple bg-primary text-lg font-medium tracking-wide">
          TIMELINE
        </p>
        <Image src={TimeLineLogo} alt="" width={100} />
      </div>
      {data.map((item) => (
        <TimeLineCard key={item.title} {...item} />
      ))}
    </div>
  );
};

export default TimeLine;
