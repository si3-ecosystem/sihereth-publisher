import { GrDomain } from "react-icons/gr";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import apiClient from "@/utils/interceptor";
import { RiLoaderFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Link from "next/link";

const Domain = () => {
  const domain = useSelector((state: RootState) => state.user?.domain);
  const [isSubDomain, setIsSubDomain] = useState<string>("");
  const [domainLoading, setDomainLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("error");
  const [subDomain, setSubDomain] = useState<string>("");

  useEffect(() => {
    if (domain) {
      setIsSubDomain(domain);
    }
  }, [domain]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSubDomain(value);
    const regex = /\.?siher(?:\.eth)?(?:eth)?(?:eth\b|\b)/i;
    const containsInvalidCharacters = /[^a-zA-Z\s]/.test(value);
    if (regex.test(value) || containsInvalidCharacters) {
      setErrorMessage("Please enter only text without special characters or siher.eth variations.");
    } else {
      setErrorMessage("");
    }
  };

  const AssignDomain = async () => {
    try {
      setDomainLoading(true);
      await apiClient.post(`/api/subDomain`, { subDomain });
      toast.success("Domain assigned successfully");
      setIsSubDomain(subDomain);
    } catch (error: any) {
      console.log("Error assigning domain:", error);
      let errorMessage;
      if (error.response?.data === "Subdomain Already registered") {
        errorMessage = "Subdomain Already registered";
      } else if (error.response?.status === 404) {
        errorMessage = "Please publish the webpage before assigning a subdomain.";
      } else {
        errorMessage = "Server error. Please try again!";
      }
      toast.error(errorMessage);
    } finally {
      setDomainLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center py-4 mx-auto w-full font-serif text-lg tracking-wider border-b border-gray-300 shadow-md">
      {isSubDomain ? (
        <>
          <p>Web page url: </p>
          <Link
            href={`https://${isSubDomain}.${process.env.NEXT_PUBLIC_SIHER_DOMAIN}`}
            target="_blank"
            className="ml-2 font-serif text-blue-600 hover:underline underline-offset-2"
          >{`https://${isSubDomain}.${process.env.NEXT_PUBLIC_SIHER_DOMAIN}`}</Link>
        </>
      ) : (
        <section className="items-center w-[40%] relative text-lg flex border text-gray-500 hover:text-gray-700 border-gray-300 rounded-lg hover:border-gray-500 justify-between">
          <div className="flex justify-center items-center w-full">
            <GrDomain className="mx-4 size-8" />
            <input
              type="text"
              className="w-full leading-4 text-gray-900 border-none outline-none focus:ring-0"
              placeholder="Submit your siher.eth domain of choice"
              value={subDomain}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-center items-center">
            <p className="mr-4 text-gray-500">.siher.eth</p>
            <button
              disabled={domainLoading || !!errorMessage}
              onClick={AssignDomain}
              className="flex gap-3 justify-center items-center px-3 py-1 w-max text-white bg-black rounded-lg border border-black disabled:opacity-80 hover:bg-opacity-80 focus:outline-none focus:ring-none hover:shadow-md"
            >
              {domainLoading && <RiLoaderFill className="animate-spin size-5" />}
              {domainLoading ? "Loading..." : "Publish your domain"}
            </button>
          </div>
        </section>
      )}
    </div>
  );
};

export default Domain;
