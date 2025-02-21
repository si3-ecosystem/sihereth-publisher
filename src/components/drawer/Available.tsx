import React, { useState } from "react";
import { RxCrossCircled } from "react-icons/rx";
import Select, { MultiValue } from "react-select";
import { useDispatch, useSelector } from "react-redux";
// import { handleWebsiteData } from "../../redux/contentSlice";
import { RiDeleteBinLine } from "react-icons/ri";
import { RootState } from "../../redux/store"; // Assuming you have a RootState type defined

interface AvailableFieldsProps {
  toggleDrawer: () => void;
}

interface SocialChannel {
  text: string;
  url: string;
}

interface MarqueItem {
  heading: string;
}

interface Option {
  value: string;
  label: string;
}

const AvailableFields: React.FC<AvailableFieldsProps> = ({ toggleDrawer }) => {
  const { websiteData } = useSelector((state: RootState) => state.content);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const dispatch = useDispatch();

  const handleDeleteSocialChannel = (index: number) => {
    const updatedAvailableData = { ...websiteData.available };

    updatedAvailableData.socialChannels = updatedAvailableData.socialChannels?.filter((_, i) => i !== index);

    const updatedWebsiteData = {
      ...websiteData,
      available: updatedAvailableData
    };

    // dispatch(handleWebsiteData(updatedWebsiteData));
  };

  const handleMarqueInputChange = (selectedOptions: MultiValue<Option>) => {
    const selectedValues: MarqueItem[] = selectedOptions.map((option) => ({
      heading: option.value
    }));

    const updatedAvailableData = {
      ...websiteData?.available,
      marque: selectedValues
    };
    // dispatch(handleWebsiteData({ ...websiteData, available: updatedAvailableData }));
  };

  const toggleAccordion = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleChangeSocialFields = (index: number, field: keyof SocialChannel, value: string) => {
    const updatedHighlights = [...(websiteData?.available?.socialChannels || [])];

    updatedHighlights[index] = {
      ...updatedHighlights[index],
      [field]: value
    };

    const updatedAvailable = {
      ...websiteData.available,
      socialChannels: updatedHighlights
    };

    const updatedWebsiteData = {
      ...websiteData,
      available: updatedAvailable
    };

    // dispatch(handleWebsiteData(updatedWebsiteData));
  };

  const options: Option[] = [
    { value: "speaking", label: "Speaking" },
    { value: "collabs", label: "Collabs" },
    { value: "mentoring", label: "Mentoring" },
    { value: "educating", label: "Educating" },
    { value: "advising", label: "Advising" },
    { value: "hiring", label: "Hiring" }
  ];

  return (
    <div className="w-full bg-white">
      <div className="z-10 flex items-center justify-between w-full p-4 bg-gray-100 border border-b-gray-200">
        <p className="text-lg font-semibold">Connect Section</p>
        <button onClick={toggleDrawer}>
          <RxCrossCircled className="text-2xl text-gray-600" />
        </button>
      </div>
      <div className="max-h-screen overflow-y-auto">
        <form className="mb-10">
          <div className="flex flex-col items-start p-4 mt-4">
            <p className="text-xs font-semibold text-gray-600">I'm Available For</p>
            <div className="w-full mt-4">
              <Select
                options={options}
                isMulti
                value={websiteData?.available?.marque?.map((val: MarqueItem) =>
                  options.find((option) => option.value === val.heading)
                )}
                onChange={(value) => {
                  if (value.length === 0) {
                    return;
                  }
                  handleMarqueInputChange(value);
                }}
                className="basic-multi-select"
                classNamePrefix="select"
              />
            </div>
          </div>
          <div className="flex flex-col items-start p-4 mt-4 mb-20">
            <div className="w-full">
              <div className="mx-auto max-w-7xl">
                <div className="mt-4 space-y-4">
                  {websiteData?.available?.socialChannels?.map((item: SocialChannel, index: number) => {
                    const isOpen = openIndex === index;
                    return (
                      <div key={index} className="flex flex-col items-start justify-start w-full gap-3">
                        <p className="text-xs font-semibold text-gray-600">Social Channels #{index + 1}</p>
                        <div className="flex items-center justify-center w-full gap-3">
                          <div
                            key={index}
                            className="w-full transition-all duration-200 bg-white border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50"
                          >
                            <div>
                              <button
                                type="button"
                                id="question1"
                                data-state="closed"
                                className="flex items-center justify-between w-full px-3 py-2"
                                onClick={() => toggleAccordion(index)}
                              >
                                <span className="flex text-sm font-semibold text-black">{item.text}</span>
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
                                <p className="text-xs font-semibold text-gray-600">Text</p>
                                <div className="w-full">
                                  <input
                                    value={item?.text}
                                    type="text"
                                    id="subTitle"
                                    className="mt-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:ring-gray-300 hover:border-gray-400 focus:ring-gray-300 focus:border-gray-400 block w-full p-2.5"
                                    placeholder="Write text here..."
                                    required
                                    onChange={(e) => handleChangeSocialFields(index, "text", e.target.value)}
                                  />
                                </div>
                              </div>
                              <div className="flex flex-col items-start p-4 mt-4">
                                <p className="text-xs font-semibold text-gray-600">URL</p>
                                <div className="w-full">
                                  <input
                                    value={item?.url}
                                    type="url"
                                    id="url"
                                    className="mt-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:ring-gray-300 hover:border-gray-400 focus:ring-gray-300 focus:border-gray-400 block w-full p-2.5"
                                    placeholder="Write url here..."
                                    required
                                    onChange={(e) => handleChangeSocialFields(index, "url", e.target.value)}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <RiDeleteBinLine
                            onClick={() => handleDeleteSocialChannel(index)}
                            className={`text-xl text-red-500 cursor-pointer`}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AvailableFields;
