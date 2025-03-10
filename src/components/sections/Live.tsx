import Livepeer from "@/assets/images/livepeer.png";
// import border from "@/assets/images/graphic.png";
import border1 from "@/assets/images/graphic1.png";
// import liveImg from "@/assets/images/liveImg.png";
import liveImg1 from "@/assets/images/liveImg1.png";
import liveLogo from "@/assets/images/courage.png";
import Cards from "./LiveCards";
import Image from "next/image";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { LiveTypes } from "@/utils/types";

const Live = () => {
  const data: LiveTypes[] = useSelector((state: RootState) => state.content.live);

  return (
    <div className="bg-primary p-8">
      {/* Logo and title */}
      <section className="relative">
        <Image src={liveLogo} alt="live-logo" width={90} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center gap-5">
          <span className="font-clash-display text-4xl font-medium">Si Her TV</span>
          <span className="font-dm-sans text-xl">powered by</span>
          <Image src={Livepeer} width={150} alt="" />
        </div>
      </section>
      {/* Live video */}
      <div className="bg-white rounded-2xl m-10 p-10">
        <section className="relative">
          {/* <Image src={border} alt="border" className="block lg:hidden w-full sm:h-[50%] mx-auto" /> */}
          <Image src={border1} alt="" className="mx-auto w-full" />
          {/* <Image
            src={liveImg}
            alt=""
            className="lg:hidden w-[304px] h-[280px] py-4 px-2 mx-auto absolute -top-[96] sm:h-[330px] sm:top-[-120%]"
          /> */}
          {/* Live image and video */}
          <div className="w-full absolute top-0 px-12 py-20">
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
              <div className="w-full aspect-video bg-[#06b4d5] rounded-xl">
                <Image src={liveImg1} alt="" className="w-full h-full object-cover rounded-xl" />
              </div>
              <div className="w-full aspect-video">
                <video
                  src="/videos/vid.mp4"
                  className="w-full h-full object-cover rounded-xl"
                  playsInline
                  muted
                  autoPlay
                  loop
                >
                  <track kind="captions" src="" label="English" srcLang="en" default />
                </video>
              </div>
            </section>
          </div>
        </section>
      </div>
      {/* Buttons */}
      <div className="flex w-full justify-center gap-6 mt-10 md:mt-20 xl:mt-28 2xl:mt-32">
        <span className="flex justify-end w-full">
          <button className="bg-light-purple text-blue-primary rounded-full transition-all ease-out duration-300 hover:bg-[#7E5BFF] hover:text-white text-lg font-fira-mono font-medium tracking-wide px-5 py-3 whitespace-nowrap hover:shadow-md cursor-pointer">
            BUY CRYPTO
          </button>
        </span>
        <span className="flex justify-start w-full">
          <button className="bg-light-purple text-blue-primary rounded-full transition-all ease-out duration-300 hover:bg-[#7E5BFF] hover:text-white text-lg font-fira-mono font-medium tracking-wide px-5 py-3 whitespace-nowrap hover:shadow-md cursor-pointer">
            TIP KARA IN CRYPTO
          </button>
        </span>
      </div>
      {/* Live Cards */}
      <div className="relative grid grid-cols-1 md:grid-cols-3 w-[80%] mx-auto min-h-[180px] mt-10">
        {data.map((item: LiveTypes) => (
          <div key={item.title} className="mx-auto">
            <Cards {...item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Live;
