import { useState } from "react";
import { IoMenu, IoClose } from "react-icons/io5";
import eyeLogo from "@/assets/images/si3.svg";
import Image from "next/image";

const Navbar = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState<boolean>(false);
  const [hasPadding, setHasPadding] = useState<boolean>(false);

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
    setHasPadding(!hasPadding);
  };

  return (
    <nav className="flex justify-between items-center border-b border-gray-800 relative p-6">
      {/* Logo */}
      <Image src={eyeLogo} alt="logo" className="w-64" />
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
      <button className="h-16 bg-light-purple text-blue-primary rounded-xl transition-all ease-out duration-300 hover:bg-[#7E5BFF] hover:text-white text-[1.35rem] font-fira-mono font-medium tracking-widest px-5">
        CONNECT WALLET
      </button>

      {/* Responsive Navbar */}
      <button className="absolute left-0 w-full sm:hidden" onClick={toggleMobileNav}>
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
      </button>
    </nav>
  );
};

export default Navbar;
