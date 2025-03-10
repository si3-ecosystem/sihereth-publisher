import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const Orgs = () => {
  const data = useSelector((state: RootState) => state.content.organizations) || [];
  if (!data?.length) return null;

  console.log("data orgs", data);

  return (
    <div className="p-10 bg-gray-100 flex flex-col gap-10 justify-center items-center">
      <p className="text-center py-3 px-4 whitespace-nowrap w-96 rounded-2xl border border-light-purple bg-primary text-lg font-medium tracking-wide">
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
