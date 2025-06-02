"use client";
import Image from "next/image";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import Heading from "../ui/Heading";

const Orgs = () => {
  const data = useSelector((state: RootState) => state.content.organizations) || [];
  if (!data?.length) return null;

  return (
    <div className="px-4 py-10 bg-gray-100">
      <div className="max-w-[90rem] mx-auto flex flex-col gap-8 justify-center items-center">
        <Heading label="ORGANIZATIONS I SUPPORT" />
        <section className="w-full flex flex-col md:flex-row gap-10 justify-center items-center">
          {data.map((org) => {
            return org && <Image key={org} src={org} alt="" width={100} height={100} />;
          })}
        </section>
      </div>
    </div>
  );
};

export default Orgs;
