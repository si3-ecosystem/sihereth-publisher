import { useState } from "react";
import { IoMenu, IoClose } from "react-icons/io5";
import eyeLogo from "@/assets/images/eye_logo.png";
import Image from "next/image";

const Navbar = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState<boolean>(false);
  const [hasPadding, setHasPadding] = useState<boolean>(false);

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
    setHasPadding(!hasPadding);
  };

  return (
    <nav className="flex justify-between items-center border-b border-[#1E1E1E] p-6 sm:px-16 sm:py-4 md:px-10 md:py-2 lg:py-6 relative xl:py-6 xl:px-12">
      {/* Logo */}
      <Image
        src={eyeLogo}
        alt="logo"
        className="h-10 w-10 sm:w-12 md:h-16 md:w-24 lg:h-16 lg:w-22 xl:w-[156px] xl:h-[90px] hidden md:block"
      />
      {/* Nav List */}
      <div className="md:flex justify-between gap-28 items-center hidden xl:gap-[96px]">
        <div className="flex items-center space-x-4 lg:space-x-6 xl:space-x-8">
          <a href="#value" className="text-lg font-medium font-clash-display lg:text-2xl lg:leading-9">
            Value
          </a>
          <a href="#live" className="text-lg font-medium font-clash-display lg:text-2xl lg:leading-9">
            Live
          </a>
          <a href="#timeline" className="text-lg font-medium font-clash-display lg:text-2xl lg:leading-9">
            Timeline
          </a>
          <a href="#connect" className="text-lg font-medium font-clash-display lg:text-2xl lg:leading-9">
            Connect
          </a>
        </div>
      </div>
      {/* Subscribe Button */}
      <button className="h-[45px] w-[171px] bg-[#C8BAFD] text-[#3E21F3] lg:w-[160px] lg:h-[59px] rounded-[12px] py:3 px-4 md:px-6 md:py-4 md:w-[25%] flex gap-[14px] items-center justify-center transition-all ease-out duration-300 hover:bg-[#7E5BFF] hover:text-white font-fira-mono text-md font-semibold leading-6 sm:text-lg sm:leading-7 tracking-wide text-left sm:w-[30%]">
        SUBSCRIBE
      </button>

      <div className={hasPadding ? "absolute top-0 left-0 w-full md:hidden" : "md:hidden"}>
        <div id="menu" className={hasPadding ? "absolute left-0 w-full" : "w-full"} onClick={toggleMobileNav}>
          {isMobileNavOpen ? (
            <div id="mobile-nav" className="p-4 w-full duration-500 ease-in-out text-gray bg-black/30 backdrop-blur-mf">
              <span
                id="close"
                onClick={toggleMobileNav}
                className="top-12 text-2xl text-gray-800 duration-500 hover:rotate-90"
              >
                <IoClose className="text-2xl duration-500 hover:rotate-90" />
              </span>
              <div className="flex flex-col gap-6 justify-center items-center mob-nav">
                <a href="#value" className="w-full font-semibold text-center nav">
                  Value
                </a>
                <a href="#live" className="w-full font-semibold text-center nav">
                  Live
                </a>
                <a href="#timeline" className="w-full font-semibold text-center nav">
                  Timeline
                </a>
                <a href="#connect" className="w-full font-semibold text-center nav">
                  Connect
                </a>
              </div>
            </div>
          ) : (
            <IoMenu className="text-2xl text-gray-800" />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
