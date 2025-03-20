"use client";
import liveLogo from "@/assets/images/courage.png";
import Cards from "./LiveCards";
import Image from "next/image";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { LiveTypes } from "@/utils/types";

const Live = () => {
  const data: LiveTypes = useSelector((state: RootState) => state.content.live);
  const name = useSelector((state: RootState) => state.content.landing.name);

  return (
    <div className="bg-primary p-4">
      <div className="max-w-[90rem] mx-auto space-y-3">
        {/* Logo and title */}
        <section className="relative w-full">
          <Image src={liveLogo} alt="live-logo" width={60} className="absolute top-0 left-0" />
          <div className="flex flex-col items-center justify-center gap-4">
            <span className="font-clash-display font-semibold text-xl leading-4">Si Her TV</span>
            <span className="font-dm-sans text-lg font-medium">Powered By</span>
            <Image src={"/images/huddle.png"} width={130} height={30} alt="" />
          </div>
        </section>
        {/* Live video */}
        <div className="relative bg-white rounded-2xl md:p-4">
          <Image
            src={"/images/border.png"}
            alt=""
            width={500}
            height={500}
            className="absolute top-0 left-0 mx-auto w-full p-4"
          />
          {/* Live image and video */}
          <div className="md:mt-6 p-8 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
            {data?.image && (
              <div className="relative w-full md:h-[22rem] aspect-video overflow-hidden">
                <Image src={data.image} alt="" fill className="object-cover rounded-2xl" />
              </div>
            )}
            <div className="w-full md:h-[22rem] aspect-video">
              {data?.video && (
                <video
                  src={data.video}
                  className="w-full h-full object-cover rounded-2xl"
                  playsInline
                  muted
                  autoPlay
                  loop
                ></video>
              )}
            </div>
          </div>
        </div>
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-6 mt-8 text-sm py-6">
          <button className="bg-light-purple text-blue-primary rounded-full transition-all ease-out duration-300 hover:bg-[#7E5BFF] hover:text-white font-fira-mono font-medium tracking-wide px-4 py-2 sm:px-5 sm:py-3 hover:shadow-md cursor-pointer mx-auto sm:mx-0">
            CREATE YOUR ZERION WALLET
          </button>
          <button className="bg-light-purple text-blue-primary rounded-full transition-all ease-out duration-300 hover:bg-[#7E5BFF] hover:text-white font-fira-mono font-medium tracking-wide px-4 py-2 sm:px-5 sm:py-3 hover:shadow-md cursor-pointer mx-auto sm:mx-0 uppercase">
            TIP {name ?? "KARA"} IN CRYPTO
          </button>
        </div>
        {/* Live Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {data.details.map((item) => (
            <div key={item.title} className="mx-auto">
              <Cards {...item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Live;
