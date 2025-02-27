import Image from "next/image";
import Base from "@/assets/images/base.png";
import Solana from "@/assets/images/solana.png";
import Lukso from "@/assets/images/lukso.png";

const Orgs: React.FC = () => {
  return (
    <div className="py-16 px-6 bg-[#F7F7F7] space-y-8 lg:space-y-12 xxl:py-[118px] xxl:px-16">
      <div className="text-center uppercase py-3 px-4 bg-[#ECE9FD] rounded-[12px] sm:w-[50%] lg:w-[25%] mx-auto xxl:w-fit xxl:py-4 xxl:px-6">
        <span className="text-[#1E1E1E] font-fira-mono text-lg font-medium leading-7 tracking-wide uppercase xxl:text-[24px] xxl:leading-9">
          ORGANIZATIONS I SUPPORT
        </span>
      </div>

      <div className="gap-8 w-[342px] mx-auto flex flex-col items-center justify-center lg:flex-row lg:gap-12 lg:w-[80%]">
        <Image src={Base} alt="base" width={200} height={51} className="lg:w-[145px] xxl:w-[200px] xxl:h-[51px]" />
        <Image src={Solana} alt="solana" width={300} height={44} className="lg:w-[158px] xxl:w-[300px] xxl:h-[44px]" />
        <Image src={Lukso} alt="lukso" width={200} height={45} className="lg:w-[145px] xxl:w-[200px] xxl:h-[45px]" />
      </div>
    </div>
  );
};

export default Orgs;
