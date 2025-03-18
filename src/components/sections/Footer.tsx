import { useState, useRef, useEffect } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { FaXTwitter, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { languagesByRegion } from "@/utils/data";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

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
    <div className="bg-gray-800 px-6 md:px-16 py-8 space-y-6">
      {/* Social & Controls */}
      <section className="flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Social Channels */}
        <div className="flex justify-center md:justify-start gap-4 sm:gap-6">
          {socialChannels.map((channel) => {
            const Icon = iconMap[channel.text.toLowerCase()] || FaGithub;
            return (
              <div key={channel.text} className="bg-[#C8BAFD] rounded-xl py-3 px-4 flex items-center gap-2">
                <Icon className="text-xl" />
                <span className="font-fira-mono text-xs sm:text-sm md:text-base font-medium">
                  {channel.text.toUpperCase()}
                </span>
              </div>
            );
          })}
        </div>

        {/* Controls */}
        <section className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          {/* Language Dropdown */}
          <div className="relative bg-[#C8BAFD] rounded-xl w-fit flex items-center gap-2" ref={dropdownRef}>
            <button
              ref={buttonRef}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="bg-[#C8BAFD] text-[#1E1E1E] px-4 sm:px-6 py-3 rounded-xl font-medium hover:bg-[#b0a0f5] transition-all text-sm sm:text-base"
            >
              Select Language
            </button>
            {isDropdownOpen && (
              <div
                className={`absolute left-1/2 transform -translate-x-1/2 ${
                  dropdownDirection === "up" ? "bottom-full mb-2" : "top-full mt-2"
                } w-60 bg-white rounded-lg shadow-lg z-10 p-2`}
              >
                {selectedRegion === null ? (
                  <div className="flex flex-col space-y-1">
                    {Object.keys(languagesByRegion).map((region) => (
                      <div
                        key={region}
                        onClick={() => setSelectedRegion(region)}
                        className="cursor-pointer px-4 py-2 hover:bg-gray-200 rounded transition-all text-black text-sm font-medium flex justify-between"
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
                      className="flex items-center text-sm font-medium px-4 py-2 hover:bg-gray-200 rounded transition-all"
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
                        className="cursor-pointer px-4 py-2 hover:bg-gray-200 rounded transition-all text-sm font-medium"
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
          <div className="flex rounded-xl w-full sm:w-fit items-center bg-white gap-4 h-fit px-3 py-2">
            <MdEmail className="size-6 sm:size-7 ml-2 sm:ml-4" />
            <input
              type="email"
              placeholder="Subscribe to our newsletter..."
              className="flex-grow text-sm sm:text-base py-1 sm:py-2 focus:outline-none font-dm-sans w-full"
            />
            <button type="submit" className="bg-[#C8BAFD] rounded-xl p-2 sm:p-3">
              <IoIosArrowForward className="size-5 sm:size-6" />
            </button>
          </div>
        </section>
      </section>

      {/* Footer Text */}
      <section className="font-dm-sans text-sm sm:text-base font-normal leading-6 text-center text-white max-w-md mx-auto">
        {"@2025, SI<3> is a collaborative Web3 Ecosystem powered by global voices."}
      </section>
    </div>
  );
};

export default Footer;
