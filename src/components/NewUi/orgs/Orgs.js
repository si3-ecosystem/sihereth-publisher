import Base from "../images/base-logo.png";
import Solana from "../images/solana_logo.png";
import lukso from "../images/lukso_logo.png";
const Orgs = () => {
  return (
    <div className="py-16 px-6 bg-[#F7F7F7] space-y-8 lg:space-y-12 xxl:py-[118px] xxl:px-16">
      <div className="text-center uppercase py-3 px-4 bg-[#ECE9FD] rounded-[12px] sm:w-[50%] lg:w-[25%] mx-auto xxl:w-fit xxl:py-4 xxl:px-6">
        <span className="text-[#1E1E1E] font-fira-mono text-lg font-medium leading-7 tracking-wide uppercase xxl:text-[24px] xxl:leading-9">
          ORGANIZATIONS I SUPPORT
        </span>
      </div>

      <div className="gap-8 w-[342px] mx-auto flex flex-col items-center justify-center lg:flex-row lg:gap-12 lg:w-[80%]">
        <img
          src={Base}
          alt="base"
          className="w-[156.49px] h-[40px] lg:w-[145px] xxl:w-[200px] xxl:h-[51px]"
        />
        <img
          src={Solana}
          alt="solana"
          className="w-[268px] h-[40px] lg:w-[158px] xxl:w-[300px] xxl:h-[44px]"
        />
        <img
          src={lukso}
          alt="lukso"
          className="w-[176.44px] h-[40px] lg:w-[145px] xxl:w-[200px] xxl:h-[45px]"
        />
      </div>
    </div>
  );
};

export default Orgs;
