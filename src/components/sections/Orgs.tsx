"use client";
import Image from "next/image";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import Heading from "../ui/Heading";

const Orgs = () => {
  const data = useSelector((state: RootState) => state.content.organizations) || [];
  if (!data?.length) return null;

  const getImageSrc = (item: string | { file: File; fieldName: string }) => {
    if (typeof item === "string") return item;
    return URL.createObjectURL(item.file);
  };

  return (
    <div className="px-4 py-12 bg-gray-100">
      <div className="max-w-[90rem] mx-auto flex flex-col gap-8 justify-center items-center">
        <Heading label="ORGANIZATIONS I SUPPORT" />
        <section className="w-full flex flex-col md:flex-row gap-10 justify-center items-center">
          {data.map((org, index) => {
            if (!org) return null;
            return (
              <Image
                key={index}
                src={getImageSrc(org)}
                alt=""
                width={100}
                height={100}
                onLoad={(e) => {
                  if (typeof org !== "string") {
                    const imgElement = e.target as HTMLImageElement;
                    URL.revokeObjectURL(imgElement.src);
                  }
                }}
              />
            );
          })}
        </section>
      </div>
    </div>
  );
};

export default Orgs;
