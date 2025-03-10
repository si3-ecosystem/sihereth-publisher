import runes from "@/assets/images/runes.png";
import { RootState } from "@/redux/store";
import Image from "next/image";
import { useSelector } from "react-redux";

function Value() {
  const data = useSelector((state: RootState) => state.content.value);
  return (
    <div className="flex gap-6 p-6">
      {/* Values */}
      <section className="w-full p-4">
        <Image src={runes} width={55} alt="" className="mb-6" />
        <p className="font-dm-sans text-3xl font-medium leading-10 tracking-wide">{data.experience}</p>
      </section>
      {/* Experience */}
      <section className="w-full p-4">
        <div className="h-14 bg-primary border border-light-purple rounded-xl text-[1.35rem] font-fira-mono font-medium tracking-widest px-5 w-fit flex items-center justify-center mb-6">
          MY VALUE
        </div>
        <div className="font-clash-display text-5xl font-medium leading-[3.5rem] tracking-wider">{data.values}</div>
      </section>
    </div>
  );
}

export default Value;
