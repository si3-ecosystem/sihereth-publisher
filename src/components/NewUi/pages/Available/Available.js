import PageNameBtn from "../../pageNameBtn/pageNameBtn";
import availableBorder from "../../images/Group 2.png";
import availableImg from "../../images/availableImg.png";
import background from "../../images/pleca+donut.png";
// import "animate.css";
import { useState } from "react";

function Available() {
  // State to manage hover for each div
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const items = ["COLLABORATION", "ADVISING", "SPEAKING"];
  const SI = "SI<3>";
  const spanStyles = {
    fontFamily: "clash-display",
    fontSize: "42px",
    fontWeight: 500,
    lineHeight: "50.4px",
    textAlign: "center",
    transition: "all 0.3s ease-in-out",
  };
  return (
    <>
      <div className="available py-16 px-6 space-y-12 bg-white lg:flex flex-row-reverse justify-between lg:w-[80%] mx-auto xxl:py-[118px] xxl:px-16">
        <div className="flex flex-col justify-center items-center space-y-8 lg:space-y-10 xxl:space-y-12">
          <PageNameBtn pageName={"AVAILABLE FOR"} />
          <div className="flex flex-col gap-6 lg:gap-8">
            {items.map((item, index) => (
              <div
                key={index}
                style={spanStyles}
                className={`hover:text-[48px] hover:font-semibold hover:leading-[57.6px] hover:scale-150 transform transition-all duration-300 hover:text-[#3E21F3] inline-block xxl:text-[56px] xxl:leading-[67px] ${
                  hoveredIndex === index ? "animate__animated animate__bounceIn" : ""
                }`}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6 items-center">
          <div className="relative w-[347px] h-[345px]">
            <img
              src={availableBorder}
              alt="border"
              className="absolute top-0 right-0 w-[347px] h-[345px] z-0 xxl:w-[425.38px] xxl:h-[458.89px]"
            />
            <img
              src={background}
              alt="background"
              className="absolute right-2 w-[330px] h-[340px] z-1  xxl:w-[400px] xxl:h-[400px] xxl:bottom-[-90px]"
            />
            <img
              src={availableImg}
              alt="girl"
              className="w-[334px] h-[334px] p-2 z-2 absolute right-2 xxl:w-[406px] xxl:h-[406px]"
            />
          </div>

          <div className="w-[200px] py-[13px] px-4 rounded-[162.5px] bg-[#3E21F31A] border border-[#3E21F3] text-center z-3 lg:w-[55%] xxl:mt-28">
            <span className="font-segoe-ui text-xl font-semibold leading-7 text-[#3E21F3]">
              Join {SI}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-[#ECE9FD] py-16 px-6 sm:px-10 space-y-6 xxl:py-[118px] xxl:px-16 xxl:space-y-8">
        <p className="font-dm-sans text-base font-normal leading-6 text-center text-[#1E1E1E] lg:w-[75%] mx-auto xxl:text-[18px] xxl:leading-25.5px ">
          You are viewing an ENS domain, which is a distributed and open naming system based on the
          Ethereum blockchain. This website is hosted with Pinata on the IPFS, or InterPlanetary
          File System, which is a peer-to-peer file sharing network. The .limo domain extension is a
          privacy-preserving ENS gateway for resolving/accessing ENS records/domains & IPFS/internet
          3.0 content. For a complete web3 experience, we recommend viewing this site with a
          Metamask extension or Brave browser.{" "}
        </p>

        <p className="font-fira-mono text-base font-medium leading-6 text-center text-[#1E1E1E] uppercase lg:w-[65%] mx-auto xxl:text-[21px] xxl:leading-[25.2px] xxl:w-full">
          This site has been built by {SI} in support of the decentralized and democratized web.
        </p>

        {/* just for laptop and desktop  */}
        <p className="hidden lg:block font-fira-mono text-base font-medium leading-6 text-center text-[#1E1E1E] uppercase lg:w-[65%] mx-auto xxl:text-[21px] xxl:leading-[25.2px] xxl:w-full">
          Claim your free membership NFT and begin to discover the {SI}
          ecosystem.
        </p>
      </div>
    </>
  );
}

export default Available;
