import { useState } from "react";
import { IoMenu, IoClose } from "react-icons/io5";
import Image from "next/image";

const Navbar = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const toggleMobileNav = () => {
    setIsMobileNavOpen((prev) => !prev);
  };

  return (
    <nav className="flex justify-between items-center border-b border-gray-800 p-4 md:p-6 relative">
      {/* Logo */}
      <Image src="/images/si3.svg" width={100} height={100} alt="logo" className="w-32 sm:w-48 md:w-64" />
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-8 lg:gap-12">
        {["Value", "Live", "Timeline", "Connect"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-lg font-medium font-clash-display transition-all duration-300 hover:text-light-purple"
          >
            {item}
          </a>
        ))}
      </div>
      {/* Connect Wallet Button */}
      <button className="hidden sm:block h-12 md:h-16 bg-light-purple text-blue-primary rounded-xl px-4 md:px-6 text-lg md:text-xl font-fira-mono font-medium tracking-widest transition-all duration-300 hover:bg-[#7E5BFF] hover:text-white">
        CONNECT WALLET
      </button>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileNav}
        className="md:hidden text-2xl focus:outline-none z-50 relative"
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
          onClick={toggleMobileNav}
          className="absolute top-10 right-10 text-white md:hidden text-2xl focus:outline-none z-50"
          aria-label="Toggle menu"
        >
          {isMobileNavOpen ? <IoClose /> : <IoMenu />}
        </button>
        {["Value", "Live", "Timeline", "Connect"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-2xl font-semibold text-white transition-all hover:text-light-purple"
            onClick={toggleMobileNav}
          >
            {item}
          </a>
        ))}
        {/* Mobile Connect Wallet Button */}
        <button className="h-12 bg-light-purple text-blue-primary rounded-lg px-6 text-lg font-medium tracking-widest transition-all duration-300 hover:bg-[#7E5BFF] hover:text-white">
          CONNECT WALLET
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
