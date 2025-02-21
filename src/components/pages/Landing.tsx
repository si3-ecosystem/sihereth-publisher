import Image from "next/image";
import profile from "@/assets/images/girl.png";
import AnimationHome from "./LandingAnim";
import { LandingTypes } from "@/utils/types";

const Landing = ({ data }: { data: LandingTypes }) => {
  const SI = "SI<3>";

  return (
    <div className="flex flex-col p-10 w-full lg:flex-row">
      {/* left side  */}
      <div className="w-1/2">
        <AnimationHome title={data.title} headline={data.headline} />
        {/* hashtags */}
        <p className="tracking-wider text-2xl font-medium text-[#3E21F3]">{data.brandPilars.toUpperCase()}</p>
        <section className="flex flex-wrap gap-4">
          {data.hashTags.map((hashtag) => (
            <div className="bg-[#ECE9FD] text-gray-800 text-base tracking-wide w-fit py-3 px-4 rounded-lg text-center hover:text-gray-200 hover:bg-gray-800 transition-all ease-out duration-500 cursor-default hover:shadow-md">
              #{hashtag}
            </div>
          ))}
        </section>
        {/* information */}
        <section className="p-5 space-y-3 bg-gray-100 mf:w-fit w-[90%]">
          {/* {information.map((info) => (
            <Information key={info.id} property={info.property} value={info.value} />
          ))} */}
          <div className="flex gap-6 font-medium">
            <p className="text-[#3E21F3] tracking-wider font-medium w-52">Based in:</p>
            <p className="hover:text-[#3E21F3] cursor-default">{data.region}</p>
          </div>
          <div className="flex gap-6 font-medium">
            <p className="text-[#3E21F3] tracking-wider font-medium w-52">Organization Affiliations:</p>
            <p className="hover:text-[#3E21F3] cursor-default flex gap-6">
              {data.organizationAffiliations.map((affiliation) => (
                <span key={affiliation}>{affiliation}</span>
              ))}
            </p>
          </div>
          <div className="flex gap-6 font-medium">
            <p className="text-[#3E21F3] tracking-wider font-medium w-52">Community Affiliations:</p>
            <p className="hover:text-[#3E21F3] cursor-default flex gap-6">
              {data.communityAffiliations.map((affiliation) => (
                <span key={affiliation}>{affiliation}</span>
              ))}
            </p>
          </div>
          <div className="flex gap-6 font-medium">
            <p className="text-[#3E21F3] tracking-wider font-medium w-52">Superpowers:</p>
            <p className="hover:text-[#3E21F3] cursor-default flex gap-6">
              {data.superPowers.map((power) => (
                <span key={power}>#{power}</span>
              ))}
            </p>
          </div>
        </section>
      </div>

      {/* profile- right side*/}
      <div className="w-1/2 bg-green-500">
        <div className="profile relative w-[85%] sm:w-[80%] mx-auto xxl:-translate-y-11 animate__animated animate__fadeInUp">
          <Image
            className="w-[95%] h-[65%] sm:w-[70%] mf:w-[100%] mf:h-[80%] mt-12 mx-auto rounded-[12px] xxl:w-[474px]"
            src={profile}
            alt="profile"
            layout="responsive"
            width={474}
            height={316} // Adjust height to maintain aspect ratio
          />
          <div className="flex flex-col justify-center items-center gap-2 mf:gap-4 p-4 mf:p-8 rounded-[6px] bg-[#ECE9FD] border border-[#C8BAFD] w-[45%] h-[30%] sm:w-[35%] absolute top-[65%] left-[-5%] mf:left-[-25%] mf:top-[65%] mf:w-[45%] mf:h-[25%] xxl:w-[141px] xxl:h-[116px] xxl:p-5 xxl:left-[-15%]">
            <span className="font-fira-mono text-base font-medium leading-[21px] text[#1E1E1E] xl:leading-6 sm:text-md">
              @{SI}#4196
            </span>
            <div className="flex w-[40%] justify-center">
              {/* <Image alt="universal profile" className="w-6 h-6 xxl:w-9 xxl:h-9" src={upLogo} width={24} height={24} /> */}
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

export default Landing;
