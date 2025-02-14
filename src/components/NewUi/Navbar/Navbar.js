import { useState } from "react";
import { IoMenu, IoClose } from "react-icons/io5";
import ConnectUs from "../Connect-us/ConnectUs";
import eyeLogo from "../images/eye_logo.png";
import mdEyeLogo from "../images/md-eyeLogo.png";

function Navbar() {
  const [imfobileNavOpen, setImfobileNavOpen] = useState(false);
  const [hasPadding, sethasPadding] = useState(false);
  const toggleMobileNav = () => {
    setImfobileNavOpen(!imfobileNavOpen);
    sethasPadding(!hasPadding);
  };

  return (
    <nav className="flex justify-between items-center border-b border-[#1E1E1E] p-6 sm:px-16 sm:py-4 md:px-10 md:py-2 lg:py-6 relative xl:py-10 xl:px-16">
      {/* logo for mini laptop */}
      <img
        src={mdEyeLogo}
        alt="logo"
        className="h-10 w-10 sm:w-12 md:h-16 md:w-24 lg:h-16 lg:w-22 xl:w-[156px] xl:h-[90px] hidden md:block"
      />

      {/* nav list for mini laptop */}
      <div className="md:flex justify-between gap-28 items-center hidden xl:gap-[96px]">
        <div className="flex items-center space-x-4 lg:space-x-6 xl:space-x-8">
          <a
            href="#value"
            className="text-lg font-medium font-clash-display lg:text-2xl lg:leading-9"
          >
            Value
          </a>
          <a
            href="#live"
            className="text-lg font-medium font-clash-display lg:text-2xl lg:leading-9"
          >
            Live
          </a>
          <a
            href="#timeline"
            className="text-lg font-medium font-clash-display lg:text-2xl lg:leading-9"
          >
            Timeline
          </a>
          <a
            href="#connect"
            className="text-lg font-medium font-clash-display lg:text-2xl lg:leading-9"
          >
            Connect
          </a>
        </div>
      </div>

      {/* mobile nav  */}
      <div className={hasPadding ? "absolute top-0 left-0 w-full md:hidden" : "md:hidden"}>
        <div
          id="menu"
          className={hasPadding ? "absolute left-0 w-full" : "w-full"}
          onClick={toggleMobileNav}
        >
          {imfobileNavOpen ? (
            <IoMenu className="text-2xl text-gray-800" height="5em" width="5em" /> && (
              <div
                id="mobile-nav"
                className="p-4 w-full duration-500 ease-in-out text-gray bg-black/30 backdrop-blur-mf"
              >
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
                  </a>{" "}
                  <a href="#connect" className="w-full font-semibold text-center nav">
                    contact
                  </a>
                </div>
              </div>
            )
          ) : (
            <IoMenu className="text-2xl text-gray-800" />
          )}
        </div>
      </div>

      {/* logo for mobile size  */}
      <img src={eyeLogo} alt="logo" className="h-[60px] w-[90.13px] md:hidden" />

      <ConnectUs />
    </nav>
  );
}

export default Navbar;
