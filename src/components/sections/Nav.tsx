"use client";
import { useState } from "react";
import { IoMenu, IoClose } from "react-icons/io5";
import Image from "next/image";

const Navbar = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const toggleMobileNav = () => {
    setIsMobileNavOpen((prev) => !prev);
  };

  return (
    <section className="border-b border-gray-500 bg-[linear-gradient(90deg,_#FFF_0%,_#D5D5F7_59%,_#F1EFFF_100%)] p-4 relative text-md">
      <div className="flex justify-between items-center mx-auto max-w-[90rem]">
        {/* Logo */}
        <Image
          src="https://res.cloudinary.com/dv52zu7pu/image/upload/v1751386801/si3_ykl61i.svg"
          width={100}
          height={80}
          alt="logo"
        />
        {/* Desktop Navigation */}
        <div className="flex-1 md:flex justify-center items-center leading-4 gap-7">
          <div className="flex items-center gap-7">
            {["Value", "Media", "Timeline", "Connect"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="font-semibold font-sora transition-all duration-300 hover:text-light-purple"
              >
                {item}
              </a>
            ))}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={toggleMobileNav}
          className="md:hidden focus:outline-none z-50 relative"
          aria-label="Toggle menu"
        >
          {isMobileNavOpen ? <IoClose /> : <IoMenu />}
        </button>
        {/* Mobile Navigation */}
        <div
          className={`fixed inset-0 bg-black/80 backdrop-blur-md transform ${
            isMobileNavOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 ease-in-out md:hidden flex flex-col items-center justify-center space-y-6 z-40`}
        >
          <button
            type="button"
            onClick={toggleMobileNav}
            className="absolute top-10 right-10 text-white md:hidden focus:outline-none z-50"
            aria-label="Toggle menu"
          >
            {isMobileNavOpen ? <IoClose /> : <IoMenu />}
          </button>
          {["Value", "Live", "Timeline", "Connect"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="font-semibold text-white transition-all hover:text-light-purple"
              onClick={toggleMobileNav}
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Navbar;
