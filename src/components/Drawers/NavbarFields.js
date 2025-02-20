import React, { useState } from "react";
import { RxCrossCircled } from "react-icons/rx";
import { IoIosAddCircle } from "react-icons/io";
import FileUpload from "../FileUpload";
import { useDispatch, useSelector } from "react-redux";
import { handleWebsiteData } from "../../redux/contentReducer";
import { handleDeleteFile, handleUpload } from "../../utils/fileUploader";

function NavbarFields({ toggleDrawer }) {
  const { websiteData } = useSelector((state) => state.content);
  const [imageLoading, setImageLoading] = useState("");
  const dispatch = useDispatch();
  const handleDeleteImage = async () => {
    setImageLoading("File deleting. Please wait...");
    if (websiteData?.navbar?.logo?.id) {
      await handleDeleteFile(websiteData.navbar.logo.id);
    }
    const updatedNavbarData = {
      ...websiteData.navbar,
      logo: { path: null, id: null },
    };
    dispatch(
      handleWebsiteData({
        ...websiteData,
        navbar: updatedNavbarData,
      })
    );
    setImageLoading("");
  };

  const handleAddImage = async (e) => {
    if (e.target.files.length > 0) {
      setImageLoading("  Uploading image. Please wait...");
      let result = await handleUpload(e.target.files[0], "image");
      const updatedNavbarData = { ...websiteData.navbar };
      updatedNavbarData.logo = { path: result?.imageUrl, id: result?._id };
      dispatch(
        handleWebsiteData({ ...websiteData, navbar: updatedNavbarData })
      );
      setImageLoading("");
    }
  };
  const handleInputChange = (fieldName, value) => {
    const updatedNavbarData = { ...websiteData.navbar };
    updatedNavbarData[fieldName] = value;
    dispatch(handleWebsiteData({ ...websiteData, navbar: updatedNavbarData }));
  };
  const handleLinkTextChange = (index, value) => {
    const updatedLinks = [...websiteData.navbar.links];
    updatedLinks[index] = value;

    dispatch(
      handleWebsiteData({
        ...websiteData,
        navbar: {
          ...websiteData.navbar,
          links: updatedLinks,
        },
      })
    );
  };

  return (
    <div className="w-full bg-white">
      <div className=" border border-b-gray-200 z-10 bg-gray-100  flex items-center justify-between  w-full p-4">
        <p className="text-lg font-semibold">Navbar</p>
        <button onClick={toggleDrawer}>
          <RxCrossCircled className="text-gray-600 text-2xl" onC />
        </button>
      </div>
      <div className=" overflow-y-auto max-h-screen">
        <form className="mb-28">
          {/* <div className="flex flex-col items-start p-4 mt-16">
            <p className="text-sm font-semibold">LOGO</p>
            {imageLoading ? (
              <div className="mt-5 w-full bg-gray-200 rounded-full dark:bg-gray-700">
                <div
                  className="bg-blue-600 text-xs font-medium text-blue-100 text-center px-1 py-2 leading-none rounded-full animate-pulse"
                  style={{ width: "65%" }}
                >
                  {imageLoading}
                </div>
              </div>
            ) : (
              <>
                {websiteData?.navbar?.logo?.path ? (
                  <FileUpload
                    image={websiteData?.navbar?.logo?.path}
                    handleDeleteImage={handleDeleteImage}
                    handleAddImage={handleAddImage}
                  />
                ) : (
                  <div className="flex items-center justify-center w-full mt-4">
                    <label
                      htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center w-full h-24 border border-[#E5E5EA] border-dashed rounded-lg cursor-pointer  hover:bg-[#fceed966] hover:border-[#F6D4A0] dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      <div className="flex items-center justify-center pt-5 pb-6">
                        <IoIosAddCircle className="text-gray-500" />
                        <p className="ms-1 text-xs text-gray-500 dark:text-gray-400">
                          ADD AN IMAGE
                        </p>
                      </div>
                      <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        onChange={handleAddImage}
                      />
                    </label>
                  </div>
                )}
              </>
            )}
          </div> */}
          {/* <div className="flex flex-col items-start p-4 mt-4">
            <p className="text-xs font-semibold text-gray-600">
              Image alt text
            </p>
            <div className="w-full">
              <input
                value={websiteData?.navbar?.imageAltText}
                type="text"
                id="image_alt_text"
                class="mt-3  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:ring-gray-300 hover:border-gray-400 focus:ring-gray-300 focus:border-gray-400 block w-full p-2.5  "
                placeholder="Image alt text"
                required
                onChange={(e) =>
                  handleInputChange("imageAltText", e.target.value)
                }
              />
            </div>
          </div> */}
          <div className="flex flex-col items-start p-4 mt-4">
            <p className="text-xs font-semibold text-gray-600">Website Name</p>
            <div className="w-full">
              <input
                value={websiteData?.navbar?.websiteName}
                type="text"
                id="websiteName"
                class="mt-3  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:ring-gray-300 hover:border-gray-400 focus:ring-gray-300 focus:border-gray-400 block w-full p-2.5  "
                placeholder="SI HER"
                required
                onChange={(e) =>
                  handleInputChange("websiteName", e.target.value)
                }
              />
            </div>
          </div>
          {/* <div className="flex flex-col items-start p-4 mt-4 mb-8">
            <p className="text-xs font-semibold text-gray-600">LINKS</p>
            {websiteData?.navbar?.links?.map((link, index) => (
              <div className="w-full" key={index}>
                <p className="text-xs text-start mt-6 font-semibold text-gray-600">
                  Link Text
                </p>
                <input
                  value={link}
                  type="text"
                  id={`linkText${index + 1}`}
                  className="mt-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:ring-gray-300 hover:border-gray-400 focus:ring-gray-300 focus:border-gray-400 block w-full p-2.5"
                  placeholder={link}
                  required
                  onChange={(e) => handleLinkTextChange(index, e.target.value)}
                />
              </div>
            ))}
          </div> */}
          {/* <div className="flex flex-col items-start p-4 mt-4">
            <p className="text-xs font-semibold text-gray-600">Button Text</p>
            <div className="w-full">
              <input
                value={websiteData?.navbar?.buttonText}
                type="text"
                id="buttonText"
                class="mt-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:ring-gray-300 hover:border-gray-400 focus:ring-gray-300 focus:border-gray-400 block w-full p-2.5  "
                placeholder="Login"
                required
                onChange={(e) =>
                  handleInputChange("buttonText", e.target.value)
                }
              />
            </div>
          </div> */}
          {/* <div className="flex flex-col items-start p-4 mt-4 mb-20">
            <p className="text-xs font-semibold text-gray-600">FIXED HEADER</p>
            <div className="flex items-center gap-5">
              <span class="text-xs font-normal text-gray-900 dark:text-gray-300">
                Always show the header on top of the screen
              </span>
              <label className="inline-flex items-center justify-between cursor-pointer">
                <input
                  type="checkbox"
                  checked={websiteData?.navbar?.fixedHeader}
                  className="sr-only peer"
                  onChange={(e) =>
                    handleInputChange(
                      "fixedHeader",
                      !websiteData?.navbar?.fixedHeader
                    )
                  }
                />
                <div className="relative w-9 h-5 bg-gray-200 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div> */}
        </form>
      </div>
    </div>
  );
}

export default NavbarFields;
