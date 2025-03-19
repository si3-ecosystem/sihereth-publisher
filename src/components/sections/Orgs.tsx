"use client";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const Orgs = () => {
  const data = useSelector((state: RootState) => state.content.organizations) || [];
  if (!data?.length) return null;

  return (
    <div className="p-10 bg-gray-100 flex flex-col gap-10 justify-center items-center">
      <p className="py-3 md:py-4 px-5 bg-primary border border-light-purple rounded-xl text-md md:text-xl xl:text-2xl font-medium tracking-widest w-fit flex items-center justify-center">
        ORGANIZATIONS I SUPPORT
      </p>
      <section className="w-full flex gap-10 justify-center items-center">
        {data.map((org, index) => {
          const orgSrc = typeof org === "string" ? org.trim() : org.src;
          return orgSrc && <Image key={index} src={orgSrc} alt="" width={150} height={150} />;
        })}
      </section>
    </div>
  );
};

export default Orgs;
