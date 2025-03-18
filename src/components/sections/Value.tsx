import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

function Value() {
  const data = useSelector((state: RootState) => state.content.value);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      {/* Values */}
      <section className="w-full p-4">
        <div className="py-3 md:py-4 px-5 bg-primary border border-light-purple rounded-xl text-md md:text-lg xl:text-xl font-fira-mono font-medium tracking-widest w-fit flex items-center justify-center mb-6">
          MY JOURNEY
        </div>
        <p className="font-dm-sans text-md md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-medium leading-6 sm:leading-7 md:leading-8 lg:leading-9 xl:leading-10 tracking-wide">
          {data.experience}
        </p>
      </section>
      {/* Experience */}
      <section className="w-full p-4">
        <div className="py-3 md:py-4 px-5 bg-primary border border-light-purple rounded-xl text-md md:text-lg xl:text-xl font-fira-mono font-medium tracking-widest w-fit flex items-center justify-center mb-6">
          MY VALUE
        </div>
        <div className="font-clash-display font-medium text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl leading-8 lg:leading-10 2xl:leading-[3.5rem] tracking-wider">
          {data.values}
        </div>
      </section>
    </div>
  );
}

export default Value;
