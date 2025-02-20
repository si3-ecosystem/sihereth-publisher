import React, { useState } from "react";
import { RxCrossCircled } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { handleWebsiteData } from "../../redux/contentReducer";

function MyValueFields({ toggleDrawer }) {
  const { websiteData } = useSelector((state) => state.content);
  const [linkError, setlinkError] = useState("");
  const dispatch = useDispatch();

  const handleInputVisionChange = (fieldName, value) => {
    const updatedVisionData = { ...websiteData.vision };
    updatedVisionData[fieldName] = value;
    dispatch(handleWebsiteData({ ...websiteData, vision: updatedVisionData }));
  };
  const handleInputChange = (fieldName, value) => {
    if (fieldName === "buttonLink") {
      if (!validateURL(value)) {
        setlinkError("*Invalid Url format");
      } else {
        setlinkError("");
      }
    }
    const updatedMyValueData = { ...websiteData.value };
    updatedMyValueData[fieldName] = value;
    dispatch(handleWebsiteData({ ...websiteData, value: updatedMyValueData }));
  };

  function validateURL(url) {
    // Regular expression pattern for URL validation
    const urlPattern = new RegExp(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    );
    return urlPattern.test(url);
  }

  return (
    <div className="w-full bg-white">
      <div className=" border border-b-gray-200 z-10 bg-gray-100  flex items-center justify-between  w-full p-4">
        <p className="text-lg font-semibold">Value Section</p>
        <button onClick={toggleDrawer}>
          <RxCrossCircled className="text-gray-600 text-2xl" onC />
        </button>
      </div>
      <div className=" overflow-y-auto max-h-screen">
        <form className="mb-10">
          <div className="flex flex-col items-start p-4 mt-4">
            <p className="text-xs font-semibold text-gray-600">My Value</p>
            <div className="w-full">
              <textarea
                value={websiteData?.value?.description}
                type="text"
                id="description"
                class="mt-3  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:ring-gray-300 hover:border-gray-400 focus:ring-gray-300 focus:border-gray-400 block w-full p-2.5  "
                placeholder="Write description here..."
                required
                rows={8}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
              />
            </div>
          </div>
          <div className="flex flex-col items-start p-4 mt-4">
            <p className="text-xs font-semibold text-gray-600">Impact Title</p>
            <div className="w-full">
              <input
                value={websiteData?.vision?.title}
                type="text"
                id="title"
                class="mt-3  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:ring-gray-300 hover:border-gray-400 focus:ring-gray-300 focus:border-gray-400 block w-full p-2.5  "
                placeholder="Image alt text"
                required
                onChange={(e) =>
                  handleInputVisionChange("title", e.target.value)
                }
              />
            </div>
          </div>
          <div className="flex flex-col items-start p-4 mt-4 mb-20">
            <p className="text-xs font-semibold text-gray-600">
              Impact Statement
            </p>
            <div className="w-full">
              <textarea
                value={websiteData?.vision?.description}
                type="text"
                id="description"
                class="mt-3  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:ring-gray-300 hover:border-gray-400 focus:ring-gray-300 focus:border-gray-400 block w-full p-2.5  "
                placeholder="SI HER"
                required
                rows={8}
                onChange={(e) =>
                  handleInputVisionChange("description", e.target.value)
                }
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MyValueFields;
