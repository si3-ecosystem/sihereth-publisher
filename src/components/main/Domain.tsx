import { GrDomain } from "react-icons/gr";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import apiClient from "@/utils/interceptor";
import { RiLoaderFill } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/redux/store";
import { updateDomain } from "@/redux/authSlice";
import Link from "next/link";

const Domain = () => {
  const dispatch = useDispatch();
  const existingDomain = useSelector((state: RootState) => state.user?.domain);
  const [subDomain, setSubDomain] = useState<string>("");
  const [domainLoading, setDomainLoading] = useState<boolean>(false);

  useEffect(() => {
    if (existingDomain) {
      setSubDomain(existingDomain);
    }
  }, [existingDomain]);

  const AssignDomain = async () => {
    if (!subDomain) {
      toast.error("Please enter a valid domain name.");
      return;
    }
    if (subDomain.includes(".") || subDomain.includes("siher") || subDomain.includes("eth")) {
      toast.error("Please enter only the name");
      return;
    }
    try {
      setDomainLoading(true);
      const formattedDomain = `${subDomain}.siher.eth.link`;
      const response = await apiClient.post(`/domain/publish`, { domain: formattedDomain });
      if (response.status === 200) {
        toast.success("Domain successfully published!");
        dispatch(updateDomain(formattedDomain));
      } else {
        toast.error(response.data?.message ?? "Failed to register domain.");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message ?? "Something went wrong. Please try again.");
    } finally {
      setDomainLoading(false);
    }
  };

  return (
    <div className="tracking-wider border-b border-gray-300 bg-gray-100 shadow-md text-xs py-1 lg:py-2 px-2">
      <div className="flex justify-center items-center mx-auto">
        {existingDomain ? (
          <div className="flex items-center p-2">
            <p>Web page URL: </p>
            <Link
              href={`https://${existingDomain}`}
              target="_blank"
              className="ml-2 font-serif text-blue-600 hover:underline underline-offset-2"
            >
              {`https://${existingDomain}`}
            </Link>
          </div>
        ) : (
          <section className="items-center relative flex border text-gray-500 hover:text-gray-700 border-gray-300 rounded-lg hover:border-gray-500 justify-between w-full lg:w-[30%]">
            <div className="flex justify-center items-center w-full">
              <GrDomain className="mx-2 size-4" />
              <input
                type="text"
                className="w-full bg-transparent border-none outline-none focus:ring-0"
                placeholder="Enter your domain"
                value={subDomain}
                onChange={(e) => setSubDomain(e.target.value)}
              />
            </div>
            <p className="mr-4 text-gray-500">.siher.eth</p>
            <div className="flex justify-center items-center">
              <button
                disabled={domainLoading || !subDomain}
                onClick={AssignDomain}
                className="flex gap-2 sm:gap-4 items-center px-4 h-8 sm:font-medium text-white bg-gray-900 rounded-lg hover:shadow-md whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {domainLoading && <RiLoaderFill className="animate-spin size-4" />}
                {domainLoading ? "Loading..." : "Publish Domain"}
              </button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Domain;
