import Image from "next/image";
import TimeLineLogo from "@/assets/images/runes1.png";
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

      {data.map((item, index) => (
        <div
          key={item.title}
          className={`w-full py-5 flex gap-6 font-bold tracking-wide ${
            index !== data.length - 1 ? "border-b border-gray-300" : ""
          }`}
        >
          <p className="font-dm-sans text-[#3E21F3] flex items-center text-3xl uppercase">
            {item.from}
            {item.to ? ` - ${item.to}` : ""}
          </p>
          <span className="font-clash-display text-4xl font-medium">{item.title}</span>
        </div>
      ))}
    </div>
  );
};

export default TimeLine;
