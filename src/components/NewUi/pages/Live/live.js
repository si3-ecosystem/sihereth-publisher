import Livepeer from "../../images/livepeer.png";
import border from "../../images/graphic.png";
import border1 from "../../images/graphic (1).png";
import liveImg from "../../images/liveImg.png";
import liveImg1 from "../../images/liveImg (1).png";
import liveLogo from "../../images/courage.png";
import Cards from "../../Cards/Cards";

function Live() {
  const data = [
    {
      id: 1,
      tag: "website",
      site: "SI<3> and the Si Her Co-Active",
      text: "A community focused on building the next era of Web3.",
    },
    {
      id: 2,
      tag: "youtube",
      site: "Unlocking NFT's For Meta Impact",
      text: "My participation at NFT NYC in 2023.",
    },
    {
      id: 3,
      tag: "PODCAST",
      site: "Diversity in the New Economy",
      text: "My participation in W3B Talks where I talk about diversity.",
    },
  ];

  return (
    <div className="py-16 px-6 lg:px-10 bg-[#ECE9FD] space-y-12 xxl:py-[118px] xxl:px-16">
      <div className="flex justify-between lg:w-[90%] items-center space-y-8">
        <img src={liveLogo} alt="live-logo" className="w-[13%] hidden lg:block xxl:w-[16%]" />
        <div className="mx-auto space-y-4 text-center title">
          <span className="font-clash-display text-4xl font-medium leading-[43.2px] xxl:text-[48px] xxl:leading-[57.6px]">
            Si Her TV
          </span>
          <div className="space-y-2">
            <span className="font-dm-sans font-normal text-[14px] leading-[21px] text-[#000000]">
              powered by
            </span>
            <img src={Livepeer} className="w-[144.63px] h-[40px] mx-auto" alt="livepeer" />
          </div>
        </div>
      </div>
      <div className="bg-white space-y-8 w-[342px] lg:w-[80%] mx-auto rounded-[12px] py-12 px-6 border border-[#ECECEC] shadow-custom lg:space-y-12 xxl:space-y-48">
        <div className="relative">
          <img src={border} alt="border" className="block lg:hidden w-full sm:h-[50%] mx-auto" />
          <img src={border1} alt="border" className="hidden mx-auto lg:block lg:w-full" />

          <img
            src={liveImg}
            alt="live-image"
            className="lg:hidden w-[304px] h-[280px] py-4 px-2 mx-auto absolute top-[-70%] sm:h-[330px] sm:top-[-120%] "
          />
          <img
            src={liveImg1}
            alt="live-image"
            className="absolute -top-[70%] w-[60%] left-[3%]"
          />
        </div>

        <div className="btns flex flex-col justify-between items-center gap-6 pt-20 lg:flex-row lg:justify-center lg:gap-16 lg:pt-[150px]">
          <div className="w-fit py-3 px-5 gap-2 rounded-[100px] border border-[#8674F7] bg-[#ECE9FD] uppercase font-fira-mono font-medium text-[14px] leading-[21px] tracking-wide text-[#3E21F3] hover:bg-[#C8BAFD] xxl:text-[18px] xxl:leading-[27px]">
            BUY CRYPTO
          </div>

          <div className="w-fit py-3 px-5 gap-2 rounded-[12px] bg-[#C8BAFD] font-fira-mono text-sm font-medium leading-[21px] tracking-wide text-[#3E21F3] hover:bg-[#7E5BFF] hover:text-white  xxl:text-[18px] xxl:leading-[27px]">
            TIP KARA IN CRYPTO
          </div>
        </div>
      </div>
      <div className="lg:flex items-end justify-between space-y-8 lg:h-[250px]">
        {data.map((item) => {
          return <Cards key={item.id} {...item} />;
        })}
      </div>
    </div>
  );
}

export default Live;
