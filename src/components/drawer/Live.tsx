import React, { useState } from "react";
import { RxCrossCircled } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
// import { handleWebsiteData } from "../../redux/contentSlice";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaCirclePlus } from "react-icons/fa6";
import { RootState } from "../../redux/store"; // Assuming you have a RootState type defined

interface LiveFieldsProps {
  toggleDrawer: () => void;
}

interface LinkItem {
  type: string;
  title: string;
  link: string;
}

interface Button {
  text: string;
  link: string;
}

const LiveFields: React.FC<LiveFieldsProps> = ({ toggleDrawer }) => {
  const { websiteData } = useSelector((state: RootState) => state.content);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [linkError, setLinkError] = useState<string>("");
  const [isOpenButton, setIsOpenButton] = useState<boolean>(false);
  const dispatch = useDispatch();

  const toggleAccordion = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleUpdateVideoPath = (fieldName: string, value: string) => {
    const updatedVisionData = { ...websiteData.value };
    updatedVisionData.video = {
      ...updatedVisionData.video,
      path: value
    };

    // dispatch(handleWebsiteData({ ...websiteData, value: updatedVisionData }));
  };

  const handleButton = (fieldName: keyof Button, value: string) => {
    if (fieldName === "link" && !validateURL(value)) {
      setLinkError("*Invalid Url format");
    } else {
      setLinkError("");
    }

    const updatedMyValueData = { ...websiteData.value };
    const updatedButton = { ...updatedMyValueData.button, [fieldName]: value };
    updatedMyValueData.button = updatedButton;
    // dispatch(handleWebsiteData({ ...websiteData, value: updatedMyValueData }));
  };

  const handleLinkText = (index: number, field: keyof LinkItem, value: string) => {
    const updatedLinks = websiteData?.value?.links.map((link, idx) => {
      if (idx === index) {
        return {
          ...link,
          [field]: value
        };
      }
      return link;
    });

    const updatedMyValue = {
      ...websiteData?.value,
      links: updatedLinks
    };
    // dispatch(handleWebsiteData({ ...websiteData, value: updatedMyValue }));
  };

  const handleDeleteLink = (index: number) => {
    const updatedMyValue = { ...websiteData.value };
    updatedMyValue.links = updatedMyValue.links.filter((_, i) => i !== index);
    // dispatch(handleWebsiteData({ ...websiteData, value: updatedMyValue }));
  };

  const handleAddLink = () => {
    const updatedMyValue = { ...websiteData.value };
    const updatedLinks = [...updatedMyValue.links, { type: "", title: "", link: "" }];
    updatedMyValue.links = updatedLinks;
    // dispatch(handleWebsiteData({ ...websiteData, value: updatedMyValue }));
  };

  function validateURL(url: string): boolean {
    const urlPattern = new RegExp(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    );
    return urlPattern.test(url);
  }

  const handleDeleteButton = () => {
    const updatedValueData = { ...websiteData.value };
    delete updatedValueData.button;
    // dispatch(handleWebsiteData({ ...websiteData, value: updatedValueData }));
  };

  const handleAddButton = () => {
    const updatedValueData = { ...websiteData.value, button: { text: "", link: "" } };
    // dispatch(handleWebsiteData({ ...websiteData, value: updatedValueData }));
  };

  return (
    <div className="w-full bg-white">
      <div className="border border-b-gray-200 z-10 bg-gray-100 flex items-center justify-between w-full p-4">
        <p className="text-lg font-semibold">Live Section</p>
        <button onClick={toggleDrawer}>
          <RxCrossCircled className="text-gray-600 text-2xl" />
        </button>
      </div>
      <div className="overflow-y-auto max-h-screen">
        <form className="mb-10">
          <div className="flex flex-col items-start p-4 mt-4">
            <p className="text-sm font-semibold mb-4">Livepeer link</p>
            <div className="w-full">
              <input
                value={websiteData?.value?.video.path}
                type="text"
                id="description"
                className="mt-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:ring-gray-300 hover:border-gray-400 focus:ring-gray-300 focus:border-gray-400 block w-full p-2.5"
                placeholder="SI HER"
                required
                onChange={(e) => handleUpdateVideoPath("video", e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col items-start p-4 mt-4">
            <p className="text-xs font-semibold text-gray-600">Media</p>
            <div className="w-full">
              <section>
                <div className="mx-auto max-w-7xl">
                  <div className="max-w-3xl mx-auto mt-8 space-y-4">
                    {websiteData?.value?.links?.map((item, index) => {
                      const isOpen = openIndex === index;
                      return (
                        <div key={index} className="flex w-full items-center justify-between gap-3">
                          <div className="w-full transition-all duration-200 rounded-md bg-white border border-gray-200 cursor-pointer hover:bg-gray-50">
                            <div>
                              <button
                                type="button"
                                id="question1"
                                data-state="closed"
                                className="flex items-center justify-between w-full px-3 py-2"
                                onClick={() => toggleAccordion(index)}
                              >
                                <span className="flex text-sm font-semibold text-black">
                                  {item?.type?.length > 25 ? item?.type.slice(0, 25) + "..." : item?.type}
                                </span>
                                <svg
                                  id="arrow1"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  className={`w-4 h-4 text-gray-400 transform transition-transform ${
                                    isOpen ? "rotate-180" : ""
                                  }`}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 9l-7 7-7-7"
                                  ></path>
                                </svg>
                              </button>
                            </div>
                            <div style={{ display: isOpen ? "block" : "none" }} className="pb-5 sm:pb-6">
                              <div className="flex flex-col items-start p-4 mt-4">
                                <p className="text-xs font-semibold text-gray-600">Type</p>
                                <div className="w-full">
                                  <input
                                    value={item?.type}
                                    type="text"
                                    id="subTitle"
                                    className="mt-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:ring-gray-300 hover:border-gray-400 focus:ring-gray-300 focus:border-gray-400 block w-full p-2.5"
                                    placeholder="Write label"
                                    required
                                    onChange={(e) => handleLinkText(index, "type", e.target.value)}
                                  />
                                </div>
                              </div>
                              <div className="flex flex-col items-start p-4 mt-4">
                                <p className="text-xs font-semibold text-gray-600">Title</p>
                                <div className="w-full">
                                  <input
                                    value={item?.title}
                                    type="text"
                                    id="subTitle"
                                    className="mt-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:ring-gray-300 hover:border-gray-400 focus:ring-gray-300 focus:border-gray-400 block w-full p-2.5"
                                    placeholder="Write label"
                                    required
                                    onChange={(e) => handleLinkText(index, "title", e.target.value)}
                                  />
                                </div>
                              </div>
                              <div className="flex flex-col items-start p-4 mt-4">
                                <p className="text-xs font-semibold text-gray-600">Link</p>
                                <div className="w-full">
                                  <input
                                    value={item?.link}
                                    type="text"
                                    id="subTitle"
                                    className="mt-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:ring-gray-300 hover:border-gray-400 focus:ring-gray-300 focus:border-gray-400 block w-full p-2.5"
                                    placeholder="Write label"
                                    required
                                    onChange={(e) => handleLinkText(index, "link", e.target.value)}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <RiDeleteBinLine
                            onClick={() => handleDeleteLink(index)}
                            className="text-xl text-red-500 cursor-pointer"
                          />
                        </div>
                      );
                    })}
                    {websiteData?.value?.links.length < 3 && (
                      <div className="flex items-center gap-2 mt-6 cursor-pointer" onClick={handleAddLink}>
                        <FaCirclePlus className="text-[#a020f0] text-lg" />
                        <p className="text-sm">Add Link</p>
                      </div>
                    )}
                  </div>
                </div>
              </section>
            </div>
          </div>

          <div className="flex flex-col items-start p-4 mt-4 mb-20">
            <p className="text-xs font-semibold text-gray-600">Button</p>
            <div className="w-full">
              {websiteData?.value?.button ? (
                <section>
                  <div className="mx-auto max-w-7xl">
                    <div className="max-w-3xl mx-auto mt-8 space-y-4">
                      <div className="flex w-full items-center justify-between gap-3">
                        <div className="w-full transition-all duration-200 rounded-md bg-white border border-gray-200 cursor-pointer hover:bg-gray-50">
                          <div>
                            <button
                              type="button"
                              id="question1"
                              data-state="closed"
                              className="flex items-center justify-between w-full px-3 py-2"
                              onClick={() => setIsOpenButton(!isOpenButton)}
                            >
                              <span className="flex text-sm font-semibold text-black">
                                {websiteData?.value?.button?.text?.length > 25
                                  ? websiteData?.value?.button?.text.slice(0, 25) + "..."
                                  : websiteData?.value?.button?.text}
                              </span>
                              <svg
                                id="arrow1"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className={`w-4 h-4 text-gray-400 transform transition-transform ${
                                  isOpenButton ? "rotate-180" : ""
                                }`}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M19 9l-7 7-7-7"
                                ></path>
                              </svg>
                            </button>
                          </div>
                          <div style={{ display: isOpenButton ? "block" : "none" }} className="pb-5 sm:pb-6">
                            <div className="flex flex-col items-start p-4 mt-4">
                              <p className="text-xs font-semibold text-gray-600">Text</p>
                              <div className="w-full">
                                <input
                                  value={websiteData?.value?.button?.text}
                                  type="text"
                                  id="subTitle"
                                  className="mt-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:ring-gray-300 hover:border-gray-400 focus:ring-gray-300 focus:border-gray-400 block w-full p-2.5"
                                  placeholder="Write label"
                                  required
                                  onChange={(e) => handleButton("text", e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="flex flex-col items-start p-4 mt-4">
                              <p className="text-xs font-semibold text-gray-600">Aurpay Crypto Link</p>
                              <div className="w-full">
                                <input
                                  value={websiteData?.value?.button?.link}
                                  type="text"
                                  id="subTitle"
                                  className="mt-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:ring-gray-300 hover:border-gray-400 focus:ring-gray-300 focus:border-gray-400 block w-full p-2.5"
                                  placeholder="Write label"
                                  required
                                  onChange={(e) => handleButton("link", e.target.value)}
                                />
                              </div>
                              <p className="text-red-500 text-sm">{linkError}</p>
                            </div>
                          </div>
                        </div>
                        <RiDeleteBinLine onClick={handleDeleteButton} className="text-xl text-red-500 cursor-pointer" />
                      </div>
                    </div>
                  </div>
                </section>
              ) : (
                <div className="flex items-center gap-2 mt-6 cursor-pointer" onClick={handleAddButton}>
                  <FaCirclePlus className="text-[#a020f0] text-lg" />
                  <p className="text-sm">Add Button</p>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LiveFields;
