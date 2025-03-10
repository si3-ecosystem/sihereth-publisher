import { useState } from "react";
import Image from "next/image";
import availableBorder from "@/assets/images/group.png";
import availableImg from "@/assets/images/avatar.png";
import background from "@/assets/images/donut.png";

const Available: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const items = ["COLLABORATION", "ADVISING", "SPEAKING"];
  const SI = "SI<3>";

  return (
    <>
      <div className="available p-10 flex">
        {/* Image */}
        <section className="flex flex-col gap-6 items-center w-full">
          <div className="relative w-[347px] h-[345px]">
            <Image
              src={availableBorder}
              alt="border"
              layout="fill"
              objectFit="cover"
              className="absolute top-0 right-0 z-0 xxl:w-[425.38px] xxl:h-[458.89px]"
            />
            <Image
              src={background}
              alt="background"
              layout="fill"
              objectFit="cover"
              className="absolute right-2 z-1 xxl:w-[400px] xxl:h-[400px] xxl:bottom-[-90px]"
            />
            <Image
              src={availableImg}
              alt="girl"
              layout="fill"
              objectFit="cover"
              className="p-2 z-2 absolute right-2 xxl:w-[406px] xxl:h-[406px]"
            />
          </div>

          <div className="w-[200px] py-[13px] px-4 rounded-[162.5px] bg-[#3E21F31A] border border-[#3E21F3] text-center z-3 lg:w-[55%] xxl:mt-28">
            <span className="font-segoe-ui text-xl font-semibold leading-7 text-[#3E21F3]">Join {SI}</span>
          </div>
        </section>
        {/* Text */}
        <section className="flex flex-col justify-center items-center space-y-8 lg:space-y-10 xxl:space-y-12 w-full">
          <p className="text-center py-3 px-4 whitespace-nowrap w-fit rounded-2xl border border-light-purple bg-primary text-lg font-medium tracking-wide">
            AVAILABLE FOR
          </p>
          <div className="flex flex-col gap-6 text-3xl justify-center items-center">
            {items.map((item, index) => (
              <div
                key={index}
                className="transform transition-all duration-300 hover:text-[#3E21F3] hover:text-4xl hover:font-semibold"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                {item}
              </div>
            ))}
          </div>
        </section>
      </div>
      {/* Text */}
      <div className="bg-primary p-10 space-y-6">
        <p className="font-dm-sans text-base font-normal leading-6 text-center text-[#1E1E1E] lg:w-[75%] mx-auto xxl:text-[18px] xxl:leading-25.5px ">
          You are viewing an ENS domain, which is a distributed and open naming system based on the Ethereum blockchain.
          This website is hosted with Pinata on the IPFS, or InterPlanetary File System, which is a peer-to-peer file
          sharing network. The .limo domain extension is a privacy-preserving ENS gateway for resolving/accessing ENS
          records/domains & IPFS/internet 3.0 content. For a complete web3 experience, we recommend viewing this site
          with a Metamask extension or Brave browser.
        </p>

        <p className="text-base font-medium leading-6 text-center text-[#1E1E1E] uppercase lg:w-[65%] mx-auto xxl:text-[21px] xxl:leading-[25.2px] xxl:w-full">
          This site has been built by {SI} in support of the decentralized and democratized web.
        </p>

        <p className="hidden lg:block font-fira-mono text-base font-medium leading-6 text-center text-[#1E1E1E] uppercase lg:w-[65%] mx-auto xxl:text-[21px] xxl:leading-[25.2px] xxl:w-full">
          Claim your free membership NFT and begin to discover the {SI} ecosystem.
        </p>
      </div>
    </>
  );
};

export default Available;
