"use client";
import { useState, useRef, useEffect } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { languagesByRegion } from "@/utils/data";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const socialChannels = useSelector((state: RootState) => state.content.socialChannels);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [dropdownDirection, setDropdownDirection] = useState<"up" | "down">("down");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
        setSelectedRegion(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isDropdownOpen && buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - buttonRect.bottom;
      const spaceAbove = buttonRect.top;

      if (spaceBelow < 250 && spaceAbove > spaceBelow) {
        setDropdownDirection("up");
      } else {
        setDropdownDirection("down");
      }
    }
  }, [isDropdownOpen]);

  return (
    <div className="bg-gray-900 p-4 text-xs">
      <div className="max-w-[90rem] mx-auto space-y-2">
        {/* Social & Controls */}
        <section className="flex flex-col md:flex-row justify-between items-center gap-3">
          {/* Social Channels */}
          {socialChannels.length > 0 && (
            <div className="flex justify-between w-full md:justify-start gap-4">
              {socialChannels.map((channel) => {
                if (!channel.url || !channel.icon) return null;
                return (
                  <Link
                    key={channel.url}
                    href={channel.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#C8BAFD] rounded-xl py-2 px-4 flex items-center justify-center font-semibold hover:bg-[#b0a0f5] transition gap-2 w-full md:w-fit"
                  >
                    <Image src={channel.icon} alt="" width={20} height={20} />
                  </Link>
                );
              })}
            </div>
          )}

          {/* Controls */}
          <section className="flex items-center justify-between md:justify-end w-full gap-4">
            <Link
              href="https://www.si3.space/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#C8BAFD] tracking-wider px-3 py-3 rounded-xl hover:bg-[#b0a0f5] whitespace-nowrap font-sora font-semibold focus:outline-none"
            >
              Join SI&lt;3&gt;
            </Link>
            {/* Language Dropdown */}
            <div className="relative bg-[#C8BAFD] rounded-xl w-fit flex items-center gap-2" ref={dropdownRef}>
              <button
                type="button"
                ref={buttonRef}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="bg-[#C8BAFD] tracking-wider px-3 py-3 rounded-xl hover:bg-[#b0a0f5] whitespace-nowrap font-sora font-semibold focus:outline-none"
              >
                Select Language
              </button>
              {isDropdownOpen && (
                <div
                  className={`absolute left-0 border bg-gray-100 border-gray-300 ${
                    dropdownDirection === "up" ? "bottom-full mb-2" : "top-full mt-2"
                  } w-60 bg-white rounded-lg shadow-lg z-10 p-2`}
                >
                  {selectedRegion === null ? (
                    <div className="flex flex-col space-y-1">
                      {Object.keys(languagesByRegion).map((region) => (
                        <div
                          key={region}
                          onClick={() => setSelectedRegion(region)}
                          className="cursor-pointer px-3 py-2 hover:bg-gray-200 rounded transition-all font-medium flex justify-between"
                        >
                          {region}
                          <IoIosArrowForward className="text-gray-500" />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-start space-y-1 max-h-96 overflow-auto">
                      <button
                        type="button"
                        onClick={() => setSelectedRegion(null)}
                        className="flex items-center font-medium px-4 py-2 hover:bg-gray-200 rounded transition-all"
                      >
                        <IoIosArrowBack className="mr-2 text-gray-500" />
                        Back
                      </button>
                      {languagesByRegion[selectedRegion as keyof typeof languagesByRegion].map((language: string) => (
                        <div
                          key={language}
                          onClick={() => {
                            setIsDropdownOpen(false);
                            setSelectedRegion(null);
                          }}
                          className="cursor-pointer px-4 py-2 hover:bg-gray-200 rounded transition-all font-medium"
                        >
                          {language}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
            {/* Newsletter Form */}
            <div className="flex rounded-xl w-full lg:w-fit h-10 items-center bg-white">
              <Image
                src="https://res.cloudinary.com/dv52zu7pu/image/upload/v1751386798/mail_ibby6d.png"
                alt=""
                width={17}
                height={17}
                className="mx-2"
              />
              <input
                type="email"
                placeholder="Subscribe to our newsletter..."
                className="focus:outline-none font-dm-sans w-full mr-3 lg:w-44"
              />
              <div className="flex justify-end h-full">
                <button type="button" className="bg-[#C8BAFD] rounded-xl w-10">
                  <IoIosArrowForward className="size-4 mx-auto" />
                </button>
              </div>
            </div>
          </section>
        </section>

        {/* Footer Text */}
        <section className="font-sora font-normal leading-4 space-y-1 tracking-wider text-center text-white max-w-md mx-auto">
          <p>@2025 Solar Intelligence, Inc.</p>
          <p>All rights reserved.</p>
        </section>
      </div>
    </div>
  );
};

export default Footer;
