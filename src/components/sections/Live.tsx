"use client";
import Cards from "./LiveCards";
import Image from "next/image";
import type { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import type { LiveTypes } from "@/utils/types";
import { useMemo } from "react";

const Live = () => {
  const data: LiveTypes = useSelector((state: RootState) => state.content.live);
  const name = useSelector((state: RootState) => state.content.landing.fullName.trim().split(" ")[0]);

  // Filter out any details that are missing required fields
  const validDetails = useMemo(() => {
    return data.details.filter((item) => item.title?.trim() && item.heading?.trim() && item.body?.trim());
  }, [data.details]);

  // Check if image or video exists
  const hasImage = Boolean(data?.image);
  const hasVideo = Boolean(data?.video);

  return (
    <section className="bg-primary p-4 py-10 sm:py-16" aria-label="Live Section">
      <div className="max-w-[90rem] mx-auto space-y-8">
        {/* Live content - only show if we have image or video */}
        {(hasImage || hasVideo) && (
          <div className="relative bg-white rounded-2xl md:p-4 shadow-sm">
            <Image
              src="https://res.cloudinary.com/dq033xs8n/image/upload/v1744345807/border_cawmkx.png"
              alt=""
              width={500}
              height={500}
              className="absolute top-0 left-0 mx-auto w-full p-4"
              priority
            />

            {/* Live image and video container */}
            <div className="md:mt-6 p-4 sm:p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
              {hasImage && hasVideo ? (
                <>
                  {/* Both image and video exist - show in two columns */}
                  <div className="relative w-full md:h-[22rem] aspect-video overflow-hidden">
                    <Image src={data.image} alt="Live content image" fill className="object-cover rounded-2xl" />
                  </div>
                  <div className="w-full md:h-[22rem] aspect-video">
                    <video
                      src={data.video}
                      className="w-full h-full object-cover rounded-2xl"
                      playsInline
                      muted
                      autoPlay
                      loop
                      controls
                    ></video>
                  </div>
                </>
              ) : hasImage ? (
                // Only image exists - use full width
                <div className="relative w-full md:h-[22rem] aspect-video overflow-hidden col-span-full">
                  <Image src={data.image} alt="Live content image" fill className="object-cover rounded-2xl" />
                </div>
              ) : (
                // Only video exists - use full width
                <div className="w-full md:h-[22rem] aspect-video col-span-full">
                  <video
                    src={data.video}
                    className="w-full h-full object-cover rounded-2xl"
                    playsInline
                    muted
                    autoPlay
                    loop
                    controls
                  ></video>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-6 py-4 sm:py-6">
          <button
            type="button"
            className="bg-light-purple text-blue-primary rounded-full transition-all ease-out duration-300 hover:bg-[#7E5BFF] hover:text-white font-fira-mono font-medium tracking-wide px-4 py-2 sm:px-5 sm:py-3 hover:shadow-md cursor-pointer mx-auto sm:mx-0 text-sm sm:text-base"
            aria-label="Create your Zerion wallet"
          >
            CREATE YOUR ZERION WALLET
          </button>
          <button
            type="button"
            className="bg-light-purple text-blue-primary rounded-full transition-all ease-out duration-300 hover:bg-[#7E5BFF] hover:text-white font-fira-mono font-medium tracking-wide px-4 py-2 sm:px-5 sm:py-3 hover:shadow-md cursor-pointer mx-auto sm:mx-0 uppercase text-sm sm:text-base"
            aria-label={`Tip ${name} in crypto`}
          >
            TIP {name} IN CRYPTO
          </button>
        </div>

        {/* Live Cards - only show if we have valid details */}
        {validDetails.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {validDetails.map((item, index) => (
              <div key={`${item.title}-${index}`} className="mx-auto w-full">
                <Cards {...item} />
              </div>
            ))}
          </div>
        )}

        {/* Show empty state if no valid details */}
        {validDetails.length === 0 && data.details.length > 0 && (
          <div className="text-center py-6">
            <p className="text-gray-500 italic">
              Note: Detail cards require title, heading, and body content to display.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Live;
