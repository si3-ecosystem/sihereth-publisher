"use client";
import Livepeer from "@/assets/images/livepeer.png";
// import border from "@/assets/images/graphic.png";
import border1 from "@/assets/images/graphic1.png";
// import liveImg from "@/assets/images/liveImg.png";
import liveLogo from "@/assets/images/courage.png";
import huddle from "@/assets/images/huddle1.png";
import Cards from "./LiveCards";
import Image from "next/image";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { LiveTypes } from "@/utils/types";

const Live = () => {
  const data: LiveTypes = useSelector((state: RootState) => state.content.live);
  const name = useSelector((state: RootState) => state.content.landing.title);

  return (
    <div className="bg-primary p-4 sm:p-6 lg:p-8">
      {/* Logo and title */}
      <section className="relative py-6 md:py-10">
        <div className="hidden md:block">
          <Image src={liveLogo} alt="live-logo" width={90} />
        </div>
        <div className="md:absolute md:top-0 md:left-1/2 md:-translate-x-1/2 flex flex-col items-center justify-center gap-3 md:gap-5">
          <span className="font-clash-display text-2xl sm:text-3xl md:text-4xl font-medium">Si Her TV</span>
          <span className="font-dm-sans text-base sm:text-lg md:text-xl">powered by</span>
          <span className="flex gap-4 sm:gap-6 md:gap-10">
            <Image src={Livepeer} width={100} height={40} className="w-24 sm:w-32 md:w-[150px]" alt="Livepeer logo" />
            <Image src={huddle} width={90} height={40} className="w-20 sm:w-28 md:w-[140px]" alt="Huddle logo" />
          </span>
        </div>
      </section>
      {/* Live video */}
      <div className="bg-white rounded-lg sm:rounded-xl md:rounded-2xl mx-2 sm:mx-5 md:mx-10 p-4 sm:p-6">
        <section className="relative">
          {/* <Image src={border} alt="border" className="block lg:hidden w-full sm:h-[50%] mx-auto" /> */}
          <Image src={border1} alt="Border graphic" className="absolute top-0 left-0 mx-auto w-full" />
          {/* <Image
            src={liveImg}
            alt=""
            className="lg:hidden w-[304px] h-[280px] py-4 px-2 mx-auto absolute -top-[96] sm:h-[330px] sm:top-[-120%]"
          /> */}
          {/* Live image and video */}
          <div className="w-full top-0 px-2 sm:px-6 md:px-12 py-4 sm:py-8 md:py-20">
            <section className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
              {data?.image && (
                <div className="w-full aspect-video bg-[#06b4d5] rounded-md sm:rounded-lg md:rounded-xl">
                  <Image
                    src={data.image}
                    alt="Live stream image"
                    className="w-full h-full object-cover rounded-md sm:rounded-lg md:rounded-xl"
                    width={500}
                    height={280}
                  />
                </div>
              )}
              <div className="w-full aspect-video mt-3 md:mt-0">
                {data?.video && (
                  <video
                    src={data.video}
                    className="w-full h-full object-cover rounded-md sm:rounded-lg md:rounded-xl"
                    playsInline
                    muted
                    autoPlay
                    loop
                  >
                    {/* <track kind="captions" src="" label="English" srcLang="en" default /> */}
                  </video>
                )}
              </div>
            </section>
          </div>
        </section>
      </div>
      {/* Buttons */}
      <div className="flex flex-col sm:flex-row w-full justify-center gap-3 sm:gap-6 mt-8">
        <button className="bg-light-purple text-blue-primary rounded-full transition-all ease-out duration-300 hover:bg-[#7E5BFF] hover:text-white text-sm sm:text-base md:text-lg font-fira-mono font-medium tracking-wide px-4 py-2 sm:px-5 sm:py-3 hover:shadow-md cursor-pointer mx-auto sm:mx-0">
          CREATE YOUR ZERION WALLET
        </button>
        <button className="bg-light-purple text-blue-primary rounded-full transition-all ease-out duration-300 hover:bg-[#7E5BFF] hover:text-white text-sm sm:text-base md:text-lg font-fira-mono font-medium tracking-wide px-4 py-2 sm:px-5 sm:py-3 hover:shadow-md cursor-pointer mx-auto sm:mx-0 uppercase">
          TIP {name ?? "KARA"} IN CRYPTO
        </button>
      </div>
      {/* Live Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-8 sm:mt-10 gap-4">
        {data.details.map((item) => (
          <div key={item.title} className="mx-auto">
            <Cards {...item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Live;
