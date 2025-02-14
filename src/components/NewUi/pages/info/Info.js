import Hashtag from "../../Hashtags/Hashtag";
import Information from "../../Info/Info";
import profile from "../../images/girl.png";
import upLogo from "../../images/up-logo.png";
import AnimationHome from "../home/animationHome";

const Info = () => {
  const SI = "SI<3>";
  const hashtags = ["COLLABORATION", "EQUITY", "IMPACT", "DECENTRALIZATION", "EDUCATION"];
  const information = [
    { value: "Latin America", property: "Based in:", id: 1 },
    { property: "Organization Affilations:", value: "SI<3>", id: 3 },
    {
      property: "Community Affiliations:",
      value: ["#OnChain Dreamers", "Cosmos Cartel", "The Phoenix Guild"],
      id: 2,
    },
    {
      value: ["Empathy", "Focus", "Empathy", "Leaps of Fait"],
      property: "SUPERPOWERS:",
      id: 4,
    },
  ];

  return (
    <div className="flex flex-col px-6 pt-10 pb-20 lg:flex-row">
      {/* left side  */}
      <div className="w-1/2">
        <AnimationHome />
        {/* hashtags */}
        <div className="space-y-6 list">
          <div className="py-2 space-y-6 animate__animated animate__fadeInUp">
            <p className="font-fira-mono text-2xl font-medium leading-6 tracking-wide text-[#3E21F3]">
              WHAT I STAND FOR
            </p>
            <div className="flex flex-wrap gap-4">
              {hashtags.map((hashtag) => (
                <Hashtag key={hashtag} hashtag={hashtag} />
              ))}
            </div>
          </div>
          {/* information */}
          <div className="information p-[18px] border- border-[#ECECEC] space-y-3 bg-[#F7F7F7] mf:w-fit lg:w-[90%] xxl:w-full animate__animated animate__fadeInUp overflow-x-hidden ">
            {information.map((info) => (
              <Information key={info.id} property={info.property} value={info.value} />
            ))}
          </div>
        </div>
      </div>

      {/* profile- right side*/}
      <div className="w-1/2">
        <div className="profile relative w-[85%] sm:w-[80%] mx-auto xxl:-translate-y-11 animate__animated animate__fadeInUp">
          <img
            className="w-[95%] h-[65%] sm:w-[70%] mf:w-[100%] mf:h-[80%] mt-12 mx-auto rounded-[12px] xxl:w-[474px]"
            src={profile}
            alt="profile"
          />
          <div className="flex flex-col justify-center items-center gap-2 mf:gap-4 p-4 mf:p-8 rounded-[6px] bg-[#ECE9FD] border border-[#C8BAFD] w-[45%] h-[30%] sm:w-[35%] absolute top-[65%] left-[-5%] mf:left-[-25%] mf:top-[65%] mf:w-[45%] mf:h-[25%] xxl:w-[141px] xxl:h-[116px] xxl:p-5 xxl:left-[-15%]">
            <span className="font-fira-mono text-base font-medium leading-[21px] text[#1E1E1E] xl:leading-6 sm:text-md">
              @{SI}#4196
            </span>
            <div className="flex w-[40%] justify-center ">
              <img alt="universal profile" className="w-6 h-6 xxl:w-9 xxl:h-9" src={upLogo} />
              <span className="font-apax font-medium text-[11px] leading-[11.3px] xxl:leading-[14px] text-[#646EA0]">
                UNIVERSAL PROFILES
              </span>
            </div>
          </div>

          <div className="w-[51%] h-[30%] sm:w-[40%] mf:h-[25%] mf:w-[45%] rounded-[12px] border border-[#C8BAFD] p-4 flex flex-col justify-center items-center gap-2 bg-[#ECE9FD] top-[86%] sm:top-[80%] sm:right-[-5%] mf:top-[85%] mf:right-[10%] absolute right-[-10%] xxl:w-[225px] xxl:h-[114px] xxl:gap-4 xxl:right-[23%] xxl:top-[88%]">
            <span className="font-fira-mono font-medium text-[20px] xxl:text-[28px] xxl:leading-[42px] leading-[30px] text-[#000000] sm:text-lg">
              Kara Howard
            </span>
            <span className="font-dm-sans text-[12px] tracking-wide text-[#333333] sm:text-[14px] xxl:text-base font-normal xxl:leading-6">
              (SHE/HER)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
