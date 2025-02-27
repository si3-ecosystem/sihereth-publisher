import Image from "next/image";
import profile from "@/assets/images/girl.png";
import AnimationHome from "./LandingAnim";
import { LandingTypes } from "@/utils/types";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const Landing = () => {
  const data: LandingTypes = useSelector((state: RootState) => state.content.landing);
  return (
    <div className="flex flex-col p-6 w-full lg:flex-row text-lg font-fira-mono">
      {/* Left side  */}
      <div className="w-1/2 pl-20 space-y-6 flex flex-col justify-center items-start">
        <AnimationHome title={data?.title} headline={data?.headline} />
        {/* Hashtags */}
        <p className="tracking-wider text-2xl leading-4 font-medium text-blue-primary">
          {data.brandPilars.toUpperCase()}
        </p>
        <section className="flex flex-wrap gap-6 justify-between">
          {data.hashTags.map((hashtag) => (
            <div
              key={hashtag}
              className="bg-primary text-gray-800 tracking-wider whitespace-nowrap py-3 px-4 rounded-lg hover:text-gray-200 hover:bg-gray-800 transition-all ease-out duration-500 cursor-default hover:shadow-md"
            >
              #{hashtag.toUpperCase()}
            </div>
          ))}
        </section>
        {/* Information */}
        <section className="p-5 space-y-4 bg-gray-100 border border-gray-200 w-full rounded-lg">
          <div className="flex gap-6 font-medium">
            <p className="text-blue-primary tracking-wide font-medium w-80">Based in:</p>
            <p className="hover:text-blue-primary cursor-default">{data.region}</p>
          </div>
          <div className="flex gap-6 font-medium">
            <p className="text-blue-primary tracking-wide font-medium w-80">Organization Affiliations:</p>
            <p className="flex gap-6">
              {data.organizationAffiliations.map((affiliation) => (
                <span key={affiliation} className="hover:text-blue-primary cursor-default ">
                  {affiliation}
                </span>
              ))}
            </p>
          </div>
          <div className="flex gap-6 font-medium">
            <p className="text-blue-primary tracking-wide font-medium w-80">Community Affiliations:</p>
            <p className="hover:text-blue-primary cursor-default flex gap-6">
              {data.communityAffiliations.map((affiliation) => (
                <span key={affiliation}>{affiliation}</span>
              ))}
            </p>
          </div>
          <div className="flex gap-6 font-medium">
            <p className="text-blue-primary tracking-wide font-medium w-80">Superpowers:</p>
            <p className="hover:text-blue-primary cursor-default flex gap-6">
              {data.superPowers.map((power) => (
                <span key={power}>#{power}</span>
              ))}
            </p>
          </div>
        </section>
      </div>

      {/* Profile */}
      <div className="w-1/2 flex justify-center items-center relative text-2xl">
        <section className="relative">
          <Image className="rounded-2xl" src={profile} alt="profile" width={450} />
          <div className="rounded-2xl -bottom-10 -right-10 border border-light-purple p-6 flex flex-col justify-center items-center gap-2 bg-primary absolute shadow-md">
            <span className="font-medium whitespace-nowrap">{data?.name}</span>
            <span className="font-dm-sans tracking-wider text-xl">{"(" + data?.pronoun.toUpperCase() + ")"}</span>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Landing;
