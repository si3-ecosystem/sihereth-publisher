import { IoIosArrowForward } from "react-icons/io";
import { FaXTwitter, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa6";
import data, { languagesByRegion } from "@/utils/data";

const iconMap: { [key: string]: any } = {
  linkedin: FaLinkedin,
  instagram: FaInstagram,
  twitter: FaXTwitter,
  email: FaGithub // You might want to use a mail icon instead
};

function Footer() {
  const socialChannels = data.available.socialChannels;

  return (
    <div className="footer bg-gray-800 py-16 px-6 space-y-8 lg:px-12 mx-auto">
      <div className="lg:flex justify-between space-y-8 items-center">
        <div className="h-[253px] sm:h-fit flex flex-col gap-6 justify-center items-center sm:flex-row lg:gap-12">
          {socialChannels.map((channel, index) => {
            const Icon = iconMap[channel.text.toLowerCase()] || FaGithub;
            return (
              <div key={index} className="bg-[#C8BAFD] rounded-[12px] py-3 px-4 w-fit flex items-center gap-2">
                <Icon className="text-[#1E1E1E] text-xl" />
                <span className="font-fira-mono text-base font-medium leading-6 text-[#1E1E1E]">
                  {channel.text.toUpperCase()}
                </span>
              </div>
            );
          })}
        </div>

        <form className="flex items-first rounded-[12px] overflow-hidden w-[85%] sm:w-[60%] mx-auto lg:mx-0 lg:w-[40%]">
          <div className="border-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="gray"
              className="w-[39px] h-[38px] bg-white p-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 8.25v-.75A2.25 2.25 0 015.25 5.25h13.5A2.25 2.25 0 0121 7.5v9a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 16.5v-.75M3 8.25l9 5.25 9-5.25M3 8.25v7.5m0-7.5L12 13.5m0 0L21 8.25m0 7.5v-.75"
              />
            </svg>
          </div>
          <input
            type="email"
            placeholder="Subscribe to our newsletter...."
            className="flex-grow py-2 text-[#1E1E1E] focus:outline-none font-fira-mono text-[11px] sm:text-[14px] font-normal w-[80%]"
          />
          <button type="submit" className="w-fit py-2 px-2 bg-[#C8BAFD]">
            <IoIosArrowForward className="text-[#1E1E1E] h-[22px] w-10" />
          </button>
        </form>
      </div>

      {/* Languages Section */}
      <div className="pr-3 font-dm-sans font-medium tracking-wide flex justify-between gap-10">
        {Object.entries(languagesByRegion).map(([region, langs]) => (
          <div key={region} className="mt-4 space-y-2">
            <p className="text-xs text-white font-semibold">{region}</p>
            <div className="grid grid-cols-3 gap-y-1 gap-x-6">
              {langs.map((language, index) => (
                <span
                  key={index}
                  className="font-mono text-[9px] xxl:text-xs xxl:font-normal xxl:leading-[13.2px] text-[#8674F7] hover:text-white cursor-pointer whitespace-nowrap"
                >
                  {language}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="font-dm-sans text-base font-normal leading-6 text-center text-[#FFFFFF] sm:w-[60%] lg:w-full mx-auto xxl:text-[16px] ">
        {"@2025, SI<3> is a collaborative Web3 Ecosystem powered by global voices."}
      </div>
    </div>
  );
}

export default Footer;
