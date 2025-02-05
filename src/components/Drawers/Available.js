import React, { useState } from "react";
import { RxCrossCircled } from "react-icons/rx";
import { IoIosAddCircle } from "react-icons/io";
import FileUpload from "../FileUpload";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { handleWebsiteData } from "../../reducers/contentReducer";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaCirclePlus } from "react-icons/fa6";
function AvailableFields({ toggleDrawer }) {
  const { websiteData } = useSelector((state) => state.content);
  const [openIndex, setOpenIndex] = useState(null);
  const dispatch = useDispatch();
  const handleDeleteSocialChannel = (index) => {
    // Clone the available data object from websiteData
    const updatedAvailableData = { ...websiteData.available };

    updatedAvailableData.socialChannels =
      updatedAvailableData.socialChannels?.filter((_, i) => i !== index);

    // Create an updated websiteData object with the modified available data
    const updatedWebsiteData = {
      ...websiteData,
      available: updatedAvailableData,
    };

    // Dispatch the updated websiteData object
    dispatch(handleWebsiteData(updatedWebsiteData));
  };

  const handleMarqueInputChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => {
      return {
        heading: option.value,
      };
    });

    const updatedAvailableData = {
      ...websiteData?.available,
      marque: selectedValues,
    };
    dispatch(
      handleWebsiteData({ ...websiteData, available: updatedAvailableData })
    );
  };
  const toggleAccordion = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  const handleInputChange = (fieldName, value) => {
    const updatedAvailableData = { ...websiteData.available };
    updatedAvailableData[fieldName] = value;
    dispatch(
      handleWebsiteData({ ...websiteData, available: updatedAvailableData })
    );
  };

  const handleAddMarque = () => {
    const updatedAvailableData = { ...websiteData.available };
    const updatedMarque = [
      ...updatedAvailableData.marque,
      { heading: "", image: "eye_logo.png" },
    ];
    updatedAvailableData.marque = updatedMarque;
    dispatch(
      handleWebsiteData({ ...websiteData, available: updatedAvailableData })
    );
  };
  const handleChangeSocialFields = (index, field, value) => {
    const updatedHighlights = [...websiteData?.available?.socialChannels];

    updatedHighlights[index] = {
      ...updatedHighlights[index],
      [field]: value,
    };
    const updatedAvailable = {
      ...websiteData.available,
      socialChannels: updatedHighlights,
    };
    const updatedWebsiteData = {
      ...websiteData,
      available: updatedAvailable,
    };
    dispatch(handleWebsiteData(updatedWebsiteData));
  };
  const options = [
    { value: "speaking", label: "Speaking" },
    { value: "collabs", label: "Collabs" },
    { value: "mentoring", label: "Mentoring" },
    { value: "educating", label: "Educating" },
    { value: "advising", label: "Advising" },
    { value: "hiring", label: "Hiring" },
  ];
  return (
    <div className="w-full bg-white">
      <div className=" border border-b-gray-200 z-10 bg-gray-100  flex items-center justify-between  w-full p-4">
        <p className="text-lg font-semibold">Connect Section</p>
        <button onClick={toggleDrawer}>
          <RxCrossCircled className="text-gray-600 text-2xl" />
        </button>
      </div>
      <div className=" overflow-y-auto max-h-screen">
        <form className="mb-10">
          <div className="flex flex-col items-start p-4 mt-4">
            <p className="text-xs font-semibold text-gray-600">
              I’m Available For
            </p>
            <div className="w-full mt-4">
              <Select
                options={options}
                isMulti
                value={websiteData?.available?.marque?.map((val) =>
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
          {/* <div className="flex flex-col items-start p-4 mt-4">
            <p className="text-xs font-semibold text-gray-600">Description</p>
            <div className="w-full">
              <textarea
                value={websiteData?.available?.description}
                type="text"
                id="description"
                class="mt-3  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:ring-gray-300 hover:border-gray-400 focus:ring-gray-300 focus:border-gray-400 block w-full p-2.5  "
                placeholder="& I CREATE EQUITABLE PLATFORMS FOR THE NEW ECONOMY."
                required
                rows={8}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
              />
            </div>
          </div> */}
          <div className="flex flex-col items-start p-4 mt-4 mb-20">
            <div className="w-full">
              <div className=" mx-auto   max-w-7xl">
                <div className=" mt-4 space-y-4 ">
                  {websiteData?.available?.socialChannels?.map(
                    (item, index) => {
                      const isOpen = openIndex === index;
                      return (
                        <div
                          key={index}
                          className="flex flex-col w-full items-start justify-start gap-3"
                        >
                          <p className="text-xs font-semibold text-gray-600">
                            Social Channels #{index + 1}
                          </p>
                          <div className="flex w-full items-center justify-center gap-3">
                            <div
                              key={index}
                              className="w-full transition-all duration-200 rounded-md bg-white border border-gray-200 cursor-pointer hover:bg-gray-50"
                            >
                              <div>
                                <button
                                  type="button"
                                  id="question1"
                                  data-state="closed"
                                  className="flex items-center justify-between w-full px-3 py-2"
                                  onClick={() => toggleAccordion(index)}
                                >
                                  <span className="flex text-sm font-semibold text-black">
                                    {item.text}
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
                              <div
                                style={{ display: isOpen ? "block" : "none" }}
                                className=" pb-5  sm:pb-6"
                              >
                                <div className="flex flex-col items-start p-4 mt-4">
                                  <p className="text-xs font-semibold text-gray-600">
                                    Text
                                  </p>
                                  <div className="w-full">
                                    <input
                                      value={item?.text}
                                      type="b"
                                      id="subTitle"
                                      className="mt-3  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:ring-gray-300 hover:border-gray-400 focus:ring-gray-300 focus:border-gray-400 block w-full p-2.5  "
                                      placeholder="Write text here..."
                                      required
                                      onChange={(e) =>
                                        handleChangeSocialFields(
                                          index,
                                          "text",
                                          e.target.value
                                        )
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="flex flex-col items-start p-4 mt-4">
                                  <p className="text-xs font-semibold text-gray-600">
                                    URL
                                  </p>
                                  <div className="w-full">
                                    <input
                                      value={item?.url}
                                      type="url"
                                      id="url"
                                      className="mt-3  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:ring-gray-300 hover:border-gray-400 focus:ring-gray-300 focus:border-gray-400 block w-full p-2.5  "
                                      placeholder="Write url here..."
                                      required
                                      onChange={(e) =>
                                        handleChangeSocialFields(
                                          index,
                                          "url",
                                          e.target.value
                                        )
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <RiDeleteBinLine
                              onClick={() => handleDeleteSocialChannel(index)}
                              className={` text-xl text-red-500 cursor-pointer`}
                            />
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            </div>
            {/* <div className="w-full">
              <input
                value={websiteData?.available?.linkedin?.url}
                type="text"
                id="linkedin"
                class="mt-3  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:ring-gray-300 hover:border-gray-400 focus:ring-gray-300 focus:border-gray-400 block w-full p-2.5  "
                placeholder="Write here..."
                required
                onChange={(e) => handleInputChange("linkedin", e.target.value)}
              />
            </div> */}
          </div>

          {/* <div className="flex flex-col items-start p-4 mt-4">
            <p className="text-xs font-semibold text-gray-600">Instagram</p>
            <div className="w-full">
              <input
                value={websiteData?.available?.instagram?.url}
                type="text"
                id="instagram"
                class="mt-3  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:ring-gray-300 hover:border-gray-400 focus:ring-gray-300 focus:border-gray-400 block w-full p-2.5  "
                placeholder="Write here..."
                required
                onChange={(e) => handleInputChange("instagram", e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col items-start p-4 mt-4 ">
            <p className="text-xs font-semibold text-gray-600">Twitter</p>
            <div className="w-full">
              <input
                value={websiteData?.available?.twitter?.url}
                type="text"
                id="twitter"
                class="mt-3  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:ring-gray-300 hover:border-gray-400 focus:ring-gray-300 focus:border-gray-400 block w-full p-2.5  "
                placeholder="Write  here..."
                required
                onChange={(e) => handleInputChange("twitter", e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col items-start p-4 mt-4 mb-20">
            <p className="text-xs font-semibold text-gray-600">Email</p>
            <div className="w-full">
              <input
                value={websiteData?.available?.email?.address}
                type="text"
                id="email"
                class="mt-3  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:ring-gray-300 hover:border-gray-400 focus:ring-gray-300 focus:border-gray-400 block w-full p-2.5  "
                placeholder="Write email here..."
                required
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </div>
          </div> */}
        </form>
      </div>
    </div>
  );
}

export default AvailableFields;
