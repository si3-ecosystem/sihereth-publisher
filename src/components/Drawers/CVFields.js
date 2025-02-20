import React, { useState } from "react";
import { RxCrossCircled } from "react-icons/rx";
import { IoIosAddCircle } from "react-icons/io";
import FileUpload from "../FileUpload";
import { useDispatch, useSelector } from "react-redux";
import { handleWebsiteData } from "../../redux/contentReducer";
import VideoUpload from "../FileUpload/videoUpload";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaCirclePlus } from "react-icons/fa6";

function MyCVFields({ toggleDrawer }) {
  const { websiteData } = useSelector((state) => state.content);
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  const dispatch = useDispatch();
  const handleDeleteImage = () => {
    const updatedValueData = { ...websiteData.value };
    updatedValueData.video = null;
    dispatch(handleWebsiteData({ ...websiteData, value: updatedValueData }));
  };
  const handleAddVideo = (e) => {
    if (e.target.files.length > 0) {
      const updatedValueData = { ...websiteData.value };
      updatedValueData.video = e.target.files[0];
      dispatch(handleWebsiteData({ ...websiteData, value: updatedValueData }));
    }
  };
  const handleFutureChange = (value) => {
    const updatedFutureData = {
      ...websiteData.CV.future,
      text: value,
    };
    dispatch(
      handleWebsiteData({
        ...websiteData,
        CV: { ...websiteData.CV, future: updatedFutureData },
      })
    );
  };

  const handlePresentHighlights = (index, value) => {
    const updatedHighlights = [...websiteData?.CV.present?.highlights];
    updatedHighlights[index] = value;

    const updatedCV = {
      ...websiteData.CV,
      present: {
        ...websiteData.CV.present,
        highlights: updatedHighlights,
      },
    };

    dispatch(handleWebsiteData({ ...websiteData, CV: updatedCV }));
  };
  const handleAddPresentHighlights = () => {
    if (websiteData.CV.present.highlights.length < 7) {
      const updatedCV = {
        ...websiteData.CV,
        present: {
          ...websiteData.CV.present,
          highlights: [...websiteData.CV.present.highlights, ""],
        },
      };
      dispatch(handleWebsiteData({ ...websiteData, CV: updatedCV }));
    }
  };
  const handlePresentDeleteHighlights = (index) => {
    const updatedCV = {
      ...websiteData.CV,
      present: {
        ...websiteData.CV.present,
        highlights: websiteData.CV.present.highlights.filter(
          (_, i) => i !== index
        ),
      },
    };
    dispatch(handleWebsiteData({ ...websiteData, CV: updatedCV }));
  };
  const handlePastHighlightsYear = (index, field, value) => {
    const updatedHighlights = websiteData?.CV.past?.highlights.map(
      (highlight, idx) => {
        if (idx === index) {
          return {
            ...highlight,
            [field]: value,
          };
        }
        return highlight;
      }
    );

    const updatedCV = {
      ...websiteData.CV,
      past: {
        ...websiteData.CV.past,
        highlights: updatedHighlights,
      },
    };

    dispatch(handleWebsiteData({ ...websiteData, CV: updatedCV }));
  };

  const handlePastDeleteHighlights = (index) => {
    const updatedCV = {
      ...websiteData.CV,
      past: {
        ...websiteData.CV.past,
        highlights: websiteData.CV.past.highlights.filter(
          (_, i) => i !== index
        ),
      },
    };
    dispatch(handleWebsiteData({ ...websiteData, CV: updatedCV }));
  };

  const handleAddPastHighlights = () => {
    if (websiteData.CV.past.highlights.length < 7) {
      const updatedCV = {
        ...websiteData.CV,
        past: {
          ...websiteData.CV.past,
          highlights: [...websiteData.CV.past.highlights, ""],
        },
      };
      dispatch(handleWebsiteData({ ...websiteData, CV: updatedCV }));
    }
  };
  console.log(websiteData.CV.past.highlights.length);
  return (
    <div className="w-full bg-white">
      <div className=" border border-b-gray-200 z-10 bg-gray-100  flex items-center justify-between  w-full p-4">
        <p className="text-lg font-semibold">Timeline Section</p>
        <button onClick={toggleDrawer}>
          <RxCrossCircled className="text-gray-600 text-2xl" onC />
        </button>
      </div>
      <div className=" overflow-y-auto max-h-screen">
        <form className="mb-10">
          {/* <div className="flex flex-col items-start p-4 mt-4">
            <p className="text-xs font-semibold text-gray-600">Title</p>
            <div className="w-full">
              <input
                value={websiteData?.CV?.title}
                type="text"
                id="title"
                class="mt-3  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:ring-gray-300 hover:border-gray-400 focus:ring-gray-300 focus:border-gray-400 block w-full p-2.5  "
                placeholder="Write title here..."
                required
                onChange={(e) => handleInputChange("title", e.target.value)}
              />
            </div>
          </div> */}
           <div className="flex flex-col items-start p-4 mt-4 mb-10">
            <p className="text-xs font-semibold text-gray-600">Past</p>
            <div className="w-full">
              <section class="  ">
                <div class=" mx-auto   max-w-7xl">
                  <div class="max-w-3xl mx-auto mt-8 space-y-4 ">
                    {websiteData?.CV?.past?.highlights?.map(
                      (item, index) => {
                        const isOpen = openIndex === index;
                        return (
                          <div
                            key={index}
                            className="flex w-full items-center justify-between gap-3"
                          >
                            <div
                              key={index}
                              class="w-full transition-all duration-200 rounded-md bg-white border border-gray-200 cursor-pointer hover:bg-gray-50"
                            >
                              <div>
                                <button
                                  type="button"
                                  id="question1"
                                  data-state="closed"
                                  class="flex items-center justify-between w-full px-3 py-2"
                                  onClick={() => toggleAccordion(index)}
                                >
                                  <span class="flex text-sm font-semibold text-black">
                                    {item?.year?.length > 25
                                      ? item?.year.slice(0, 25) + "..."
                                      : item?.year}
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
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      stroke-width="2"
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
                                    Year
                                  </p>
                                  <div className="w-full">
                                    <input
                                      value={item?.year}
                                      type="text"
                                      id="year"
                                      class="mt-3  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:ring-gray-300 hover:border-gray-400 focus:ring-gray-300 focus:border-gray-400 block w-full p-2.5  "
                                      placeholder="Write year here..."
                                      required
                                      onChange={(e) =>
                                        handlePastHighlightsYear(
                                          index,
                                          "year",
                                          e.target.value
                                        )
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="flex flex-col items-start p-4 mt-4">
                                  <p className="text-xs font-semibold text-gray-600">
                                    Text
                                  </p>
                                  <div className="w-full">
                                    <textarea
                                      value={item?.text}
                                      type="text"
                                      id="subTitle"
                                      class="mt-3  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:ring-gray-300 hover:border-gray-400 focus:ring-gray-300 focus:border-gray-400 block w-full p-2.5  "
                                      placeholder="Write text here..."
                                      required
                                      rows={4}
                                      onChange={(e) =>
                                        handlePastHighlightsYear(
                                          index,
                                          "text",
                                          e.target.value
                                        )
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            {websiteData.CV.past.highlights.length > 3 && (
                              <RiDeleteBinLine
                                onClick={() =>
                                  handlePastDeleteHighlights(index)
                                }
                                className={` text-xl text-red-500 cursor-pointer`}
                              />
                            )}
                          </div>
                        );
                      }
                    )}
                    {websiteData.CV.past.highlights.length < 7 && (
                      <div
                        className="flex items-center gap-2 mt-6 cursor-pointer "
                        onClick={handleAddPastHighlights}
                      >
                        <FaCirclePlus className="text-[#a020f0] text-lg" />
                        <p className="text-sm">Add Present Highlight</p>
                      </div>
                    )}
                  </div>
                </div>
              </section>
            </div>
          </div>
          <div className="flex flex-col items-start p-4  mb-10">
            <p className="text-xs font-semibold text-gray-600">Present</p>
            <div className="w-full">
              <section class="  ">
                <div class=" mx-auto   max-w-7xl">
                  <div class=" mt-4 space-y-4 ">
                    {websiteData?.CV?.present?.highlights?.map((item, index) => {
                      return (
                        <div key={index} className=" w-full ">
                          <div className="flex flex-col items-start  ">
                            {/* <p className="text-xs font-semibold text-gray-600">
                              Text
                            </p> */}
                            <div className="flex justify-between items-center gap-3 w-full">
                              <input
                                value={item}
                                type="text"
                                id="subTitle"
                                class="mt-3  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:ring-gray-300 hover:border-gray-400 focus:ring-gray-300 focus:border-gray-400 block w-full p-2.5  "
                                placeholder="Write text here..."
                                required
                                rows={4}
                                onChange={(e) =>
                                  handlePresentHighlights(index, e.target.value)
                                }
                              />
                              {websiteData.CV.past.highlights.length > 3 && (
                                <RiDeleteBinLine
                                  onClick={() =>
                                    handlePresentDeleteHighlights(index)
                                  }
                                  className={` text-xl mt-2 text-red-500 cursor-pointer`}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    {websiteData.CV.present.highlights.length < 7 && (
                      <div
                        className="flex items-center gap-2 mt-6 cursor-pointer "
                        onClick={handleAddPresentHighlights}
                      >
                        <FaCirclePlus className="text-[#a020f0] text-lg" />
                        <p className="text-sm">Add Present Highlight</p>
                      </div>
                    )}
                  </div>
                </div>
              </section>
            </div>
          </div>
         

          <div className="flex flex-col items-start p-4  mb-20">
            <p className="text-xs font-semibold text-gray-600">Future</p>
            <div className="w-full">
              <section class="  ">
                <div class=" mx-auto   max-w-7xl">
                  <div class=" mt-4 space-y-4 ">
                    <div className=" w-full ">
                      <div className="flex flex-col items-start  ">
                        <div className="flex justify-between items-center gap-3 w-full">
                          <textarea
                            value={websiteData?.CV?.future?.text}
                            type="text"
                            id="subTitle"
                            class="mt-3  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:ring-gray-300 hover:border-gray-400 focus:ring-gray-300 focus:border-gray-400 block w-full p-2.5  "
                            placeholder="Write text here..."
                            required
                            rows={8}
                            onChange={(e) => handleFutureChange(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MyCVFields;
