"use client";
import { useState, useRef, useEffect } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { FaXTwitter, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { languagesByRegion } from "@/utils/data";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

import EthermailSubscribe from "../ui/EthermailSubscribe";

const iconMap: Record<string, React.ElementType> = {
  linkedin: FaLinkedin,
  instagram: FaInstagram,
  twitter: FaXTwitter,
  email: FaGithub
};

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
    <div className="bg-gray-800 p-4 text-xs">
      <div className="max-w-[90rem] mx-auto space-y-2">
        {/* Social & Controls */}
        <section className="flex flex-col md:flex-row justify-between items-center gap-2">
          {/* Social Channels */}
          <div className="flex justify-between w-full md:justify-start gap-4">
            {socialChannels.map((channel) => {
              const Icon = iconMap[channel.text.toLowerCase()] || FaGithub;
              return (
                <div key={channel.text} className="bg-[#C8BAFD] rounded-xl py-3 px-4 flex items-center gap-2">
                  <Icon className="" />
                  <span className="font-fira-mono font-medium">{channel.text.toUpperCase()}</span>
                </div>
              );
            })}
          </div>

          {/* Controls */}
          <section className="flex items-center justify-between md:justify-end w-full gap-4">
            {/* Language Dropdown */}
            <div className="relative bg-[#C8BAFD] rounded-xl w-fit flex items-center gap-2" ref={dropdownRef}>
              <button
                ref={buttonRef}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="bg-[#C8BAFD] text-[#1E1E1E] px-3 py-3 rounded-xl hover:bg-[#b0a0f5] whitespace-nowrap focus:outline-none"
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
            {/* <div className="flex rounded-xl w-full sm:w-fit items-center bg-white gap-4 h-fit pl-3">
              <MdEmail className="size-6" />
              <input
                type="email"
                placeholder="Subscribe to our newsletter..."
                className="flex-grow leading-4 py-1 sm:py-2 focus:outline-none font-dm-sans w-full"
              />
              <button type="submit" className="bg-[#C8BAFD] rounded-xl p-2">
                <IoIosArrowForward className="size-5" />
              </button>
            </div> */}

            <EthermailSubscribe />
          </section>
        </section>

        {/* Footer Text */}
        <section className="font-dm-sans font-normal leading-6 text-center text-white max-w-md mx-auto">
          {"@2025, SI<3> is a collaborative Web3 Ecosystem powered by global voices."}
        </section>
      </div>
    </div>
  );
};

export default Footer;
