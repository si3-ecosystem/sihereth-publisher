"use client";
import Image from "next/image";
import availableBorder from "@/assets/images/group.png";
import availableImg from "@/assets/images/avatar.png";
import background from "@/assets/images/donut.png";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const Available = () => {
  const data = useSelector((state: RootState) => state.content.available ?? []);

  return (
    <>
      <div className="p-2 md:p-10 grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        {/* Reverse Order on Mobile: Text First, Image Below */}
        <section className="flex flex-col justify-center items-center order-1 lg:order-2 space-y-8 lg:space-y-10 xxl:space-y-12 w-full">
          <p className="py-3 md:py-4 px-5 bg-primary border border-light-purple rounded-xl text-md md:text-lg xl:text-xl font-fira-mono font-medium tracking-widest w-fit flex items-center justify-center">
            AVAILABLE FOR
          </p>
          <div className="flex flex-col gap-6 text-xl md:text-2xl xl:text-3xl justify-center items-center">
            {data.length > 0 &&
              data.map((item, index) => (
                <div
                  key={`${item}-${index}`}
                  className="transform transition-all duration-300 hover:text-[#3E21F3] hover:text-4xl hover:font-semibold uppercase hover:tracking-widest"
                >
                  {item}
                </div>
              ))}
          </div>
        </section>

        {/* Image Section */}
        <section className="flex flex-col gap-6 items-center w-full order-2 lg:order-1">
          <div className="relative w-[80%] max-w-[350px] md:max-w-[400px] lg:max-w-[450px] xl:max-w-[500px] aspect-square">
            <Image
              src={availableBorder}
              alt="border"
              layout="fill"
              objectFit="cover"
              className="absolute top-0 right-0 z-0"
            />
            <Image src={background} alt="background" layout="fill" objectFit="cover" className="absolute right-2 z-1" />
            <Image src={availableImg} alt="girl" layout="fill" objectFit="cover" className="p-2 z-2 absolute right-2" />
          </div>

          <span className="font-segoe-ui rounded-xl text-sm md:text-base lg:text-lg border border-[#3E21F3] bg-[#3E21F31A] xl:text-xl font-semibold text-[#3E21F3] px-4 py-2 lg:px-6 lg:py-3">
            Join SI&lt;3&gt;
          </span>
        </section>
      </div>

      {/* Text Section */}
      <div className="bg-primary p-10 space-y-6">
        <p className="font-dm-sans text-base font-normal leading-6 text-center text-[#1E1E1E] lg:w-[75%] mx-auto xxl:text-[18px] xxl:leading-25.5px">
          You are viewing an ENS domain, which is a distributed and open naming system based on the Ethereum blockchain.
          This website is hosted with Pinata on the IPFS, or InterPlanetary File System, which is a peer-to-peer file
          sharing network. The .link domain extension is a privacy-preserving ENS gateway for resolving/accessing ENS
          records/domains & IPFS/internet 3.0 content. For a complete web3 experience, we recommend viewing this site
          with a Metamask extension or Brave browser.
        </p>

        <p className="text-base font-medium leading-6 text-center text-[#1E1E1E] uppercase lg:w-[65%] mx-auto xxl:text-[21px] xxl:leading-[25.2px] xxl:w-full">
          This site has been built by SI&lt;3&gt; in support of the decentralized and democratized web.
        </p>

        <p className="hidden lg:block font-fira-mono text-base font-medium leading-6 text-center text-[#1E1E1E] uppercase lg:w-[65%] mx-auto xxl:text-[21px] xxl:leading-[25.2px] xxl:w-full">
          Claim your free membership NFT and begin to discover the SI&lt;3&gt; ecosystem.
        </p>
      </div>
    </>
  );
};

export default Available;
