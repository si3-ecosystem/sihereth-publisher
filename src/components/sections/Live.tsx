"use client";
import { useMemo, useState, useEffect, useRef, lazy, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import type { LiveTypes } from "@/utils/types";
const Cards = lazy(() => import("./LiveCards"));

interface AudioVisualizerProps {
  isPlaying: boolean;
}

const AudioVisualizer = ({ isPlaying }: AudioVisualizerProps) => {
  const visualizerRef = useRef<HTMLDivElement>(null);
  const bars = useMemo(() => Array(5).fill(0), []);

  useEffect(() => {
    if (!isPlaying || !visualizerRef.current) return;
    const barElements = visualizerRef.current.childNodes;
    let animationId: number;
    const animate = () => {
      for (const bar of barElements) {
        if (bar instanceof HTMLElement) {
          bar.style.height = `${Math.floor(Math.random() * 50) + 20}px`;
        }
      }
      animationId = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isPlaying]);

  return (
    <div className="flex items-center justify-center h-full w-full rounded-2xl bg-gray-100">
      <div ref={visualizerRef} className="flex items-end space-x-2 h-20">
        {bars.map((_, i) => (
          <div
            key={`bar-${i}`}
            className={`w-3 bg-blue-primary rounded-t-md ${isPlaying ? "animate-pulse" : ""}`}
            style={{
              height: "10px",
              animationDelay: `${i * 0.1}s`,
              transition: "height 0.3s ease"
            }}
          />
        ))}
      </div>
    </div>
  );
};

interface MediaComponentProps {
  url: string;
  mediaType: "video" | "audio" | null;
  onPlayStateChange: (isPlaying: boolean) => void;
}

const MediaComponent = ({ url, mediaType, onPlayStateChange }: MediaComponentProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  if (!url) return null;
  if (mediaType === "video") {
    return <video src={url} className="w-full h-full object-cover rounded-2xl" playsInline muted loop autoPlay />;
  }
  if (mediaType === "audio") {
    const handlePlay = () => {
      if (audioRef.current) {
        audioRef.current.play();
        setIsPlaying(true);
        onPlayStateChange(true);
      }
    };
    return (
      <div className="w-full h-full flex flex-col rounded-2xl bg-gray-100 p-4 relative">
        <audio
          ref={audioRef}
          src={url}
          className="hidden"
          onEnded={() => {
            setIsPlaying(false);
            onPlayStateChange(false);
          }}
        />
        {isPlaying ? (
          <AudioVisualizer isPlaying={isPlaying} />
        ) : (
          <button
            type="button"
            onClick={handlePlay}
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 hover:bg-opacity-30 transition-all rounded-2xl"
            aria-label="Play audio"
          >
            <div className="w-16 h-16 bg-blue-primary rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </button>
        )}
      </div>
    );
  }
  return null;
};

const Live = () => {
  const data: LiveTypes = useSelector((state: RootState) => state.content.live);
  const name: string = useSelector((state: RootState) => state.content.landing.fullName.trim().split(" ")[0]);
  const [mediaType, setMediaType] = useState<"video" | "audio" | null>(null);
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const validDetails = useMemo(() => {
    return data?.details?.filter((item) => item?.title?.trim() && item?.heading?.trim()) ?? [];
  }, [data?.details]);
  const hasImage: boolean = Boolean(data?.image);
  const hasMedia: boolean = Boolean(data?.url);

  useEffect(() => {
    if (data?.url) {
      const isAudio: boolean = /\.(mp3|wav|ogg|aac|flac)$/i.test(data.url);
      setMediaType(isAudio ? "audio" : "video");
    } else {
      setMediaType(null);
    }
  }, [data?.url]);

  return (
    <section className="bg-purple-primary p-4 py-10 sm:py-16" aria-label="Live Section">
      <div className="max-w-[90rem] mx-auto space-y-8">
        {/* Live content */}
        {(hasImage || hasMedia) && (
          <div className="relative bg-white rounded-2xl md:p-4 shadow-sm">
            <Image
              src="https://res.cloudinary.com/dv52zu7pu/image/upload/v1751386807/border_qpdezn.png"
              alt=""
              width={500}
              height={500}
              className="absolute top-0 left-0 mx-auto w-full p-4"
              priority
            />
            {/* Live image and media container */}
            <div className="md:mt-6 p-4 sm:p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
              {hasImage && hasMedia ? (
                <>
                  {/* Image */}
                  <div className="relative w-full aspect-video overflow-hidden">
                    {!isImageLoaded && <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-2xl" />}
                    <Image
                      src={data.image}
                      alt="Live content image"
                      fill
                      className={`object-cover rounded-2xl transition-opacity duration-300 ${
                        isImageLoaded ? "opacity-100" : "opacity-0"
                      }`}
                      onLoadingComplete={() => setIsImageLoaded(true)}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  {/* Media */}
                  <div className="w-full aspect-video">
                    <MediaComponent url={data.url} mediaType={mediaType} onPlayStateChange={setIsPlaying} />
                  </div>
                </>
              ) : hasImage ? (
                <div className="relative w-full aspect-video overflow-hidden col-span-full">
                  {!isImageLoaded && <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-2xl" />}
                  <Image
                    src={data.image}
                    alt="Live content image"
                    fill
                    className={`object-cover rounded-2xl transition-opacity duration-300 ${
                      isImageLoaded ? "opacity-100" : "opacity-0"
                    }`}
                    onLoadingComplete={() => setIsImageLoaded(true)}
                    sizes="(max-width: 1024px) 100vw, 90rem"
                  />
                </div>
              ) : (
                <div className="w-full aspect-video col-span-full">
                  <MediaComponent url={data.url} mediaType={mediaType} onPlayStateChange={setIsPlaying} />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Crypto button */}
        <div className="flex justify-center">
          {data.walletUrl && (
            <Link
              href={data.walletUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-light-purple border border-[#3E21F3] text-blue-primary rounded-full transition-all ease-out duration-300 hover:bg-[#7E5BFF] hover:text-white font-fira-mono font-medium tracking-wide px-4 py-2 sm:px-5 sm:py-3 hover:shadow-md cursor-pointer mx-auto sm:mx-0 uppercase text-sm sm:text-base"
              aria-label={`Tip ${name} in crypto`}
            >
              TIP {name} IN CRYPTO
            </Link>
          )}
        </div>

        {/* Live Cards */}
        {validDetails.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <Suspense>
              {validDetails.map((item, index) => (
                <div key={`${item.title}-${index}`} className="w-full">
                  <Cards {...item} />
                </div>
              ))}
            </Suspense>
          </div>
        )}

        {/* Show empty state if no valid details */}
        {validDetails.length === 0 && data?.details?.length > 0 && (
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
