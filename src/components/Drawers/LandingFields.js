import { useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import FileUpload from "../FileUpload";
import { useDispatch, useSelector } from "react-redux";
import { handleWebsiteData } from "../../reducers/contentReducer";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaCirclePlus } from "react-icons/fa6";
import { handleDeleteFile, handleUpload } from "../../utils/fileUploader";
import ReactSelect from "react-select";
import PropTypes from "prop-types";
import { options } from "../../DataFiles/countries";
import DrawerHeader from "./DrawerHeader";
function LandingFields({ toggleDrawer }) {
  const { websiteData } = useSelector((state) => state.content);
  const [imageLoading, setImageLoading] = useState("");
  const dispatch = useDispatch();

  const handleDeleteImage = async () => {
    setImageLoading("File deleting. Please wait...");
    if (websiteData?.landing?.userimg?.id) {
      await handleDeleteFile(websiteData.landing.userimg.id);
    }
    const updatedLandingData = {
      ...websiteData.landing,
      userimg: { path: null, id: null },
    };
    dispatch(
      handleWebsiteData({
        ...websiteData,
        landing: updatedLandingData,
      })
    );
    setImageLoading("");
  };

  const handleAddImage = async (e) => {
    if (e.target.files.length > 0) {
      setImageLoading("  Uploading image. Please wait...");
      let result = await handleUpload(e.target.files[0], "image");
      const updatedLandingData = { ...websiteData.landing };
      updatedLandingData.userimg = { path: result?.imageUrl, id: result?._id };
      dispatch(handleWebsiteData({ ...websiteData, landing: updatedLandingData }));
      setImageLoading("");
    }
  };

  const handleInputChange = (fieldName, value) => {
    const updatedLandingData = { ...websiteData.landing };
    updatedLandingData[fieldName] = value;
    dispatch(handleWebsiteData({ ...websiteData, landing: updatedLandingData }));
  };

  const handleUpdateTag = (index, newValue) => {
    const updatedHashTags = websiteData?.landing?.hashTags?.map((tag, idx) => {
      if (idx === index) {
        return newValue;
      }
      return tag;
    });

    const updatedLanding = {
      ...websiteData.landing,
      hashTags: updatedHashTags,
    };
    dispatch(handleWebsiteData({ ...websiteData, landing: updatedLanding }));
  };

  const handleCategoryArrayInputChange = (value, textIndex, categoryKey) => {
    let updatedCategories = {
      ...websiteData?.landing?.categories,
      [categoryKey]: websiteData?.landing?.categories[categoryKey].map((text, INDEX) => {
        return INDEX === textIndex ? value : text;
      }),
    };
    const updatedLanding = {
      ...websiteData?.landing,
      categories: updatedCategories,
    };

    dispatch(handleWebsiteData({ ...websiteData, landing: updatedLanding }));
  };

  const handleCategoryInputChange = (field, value) => {
    let updatedCategories = { ...websiteData?.landing?.categories };
    if (field === "region") {
      updatedCategories = {
        ...websiteData?.landing?.categories,
        region: value,
      };
    } else if (field === "organizationAffiliations") {
      updatedCategories = {
        ...websiteData?.landing?.categories,
        organizationAffiliations: value,
      };
    } else if (field === "communityAffiliations") {
      updatedCategories = {
        ...websiteData?.landing?.categories,
        communityAffiliations: value,
      };
    }

    const updatedLanding = {
      ...websiteData?.landing,
      categories: updatedCategories,
    };
    dispatch(handleWebsiteData({ ...websiteData, landing: updatedLanding }));
  };

  const addCategoryTag = (categoryKey, maxTags) => {
    const currentTags = websiteData?.landing?.categories[categoryKey];
    if (currentTags.length < maxTags) {
      const updatedCategories = {
        ...websiteData?.landing?.categories,
        [categoryKey]: [...currentTags, " "],
      };
      const updatedLanding = {
        ...websiteData?.landing,
        categories: updatedCategories,
      };
      dispatch(handleWebsiteData({ ...websiteData, landing: updatedLanding }));
    }
  };

  const deleteCategoryTextIndex = (textIndex, categoryKey) => {
    if (websiteData?.landing?.categories[categoryKey].length === 1) {
      return;
    }
    const updatedCategories = {
      ...websiteData?.landing?.categories,
      [categoryKey]: websiteData?.landing?.categories[categoryKey].filter(
        (ITEM, INDEX) => INDEX !== textIndex
      ),
    };
    dispatch(
      handleWebsiteData({
        ...websiteData,
        landing: { ...websiteData?.landing, categories: updatedCategories },
      })
    );
  };

  return (
    <div className="w-full font-medium text-gray-900 bg-white">
      {/* Header */}
      <DrawerHeader label="Headline Section" toggleDrawer={toggleDrawer} />
      <div className="overflow-y-auto max-h-screen">
        <form className="mb-28">
          <div className="flex flex-col items-start p-4 mt-4">
            <p>Title</p>
            <input
              value={websiteData?.landing?.title}
              type="text"
              id="title"
              className="block p-2.5 mt-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 hover:ring-gray-300 hover:border-gray-400 focus:ring-gray-300 focus:border-gray-400"
              placeholder="I'M KARA,"
              required
              onChange={(e) => handleInputChange("title", e.target.value)}
            />
          </div>
          <div className="flex flex-col items-start p-4 mt-4">
            <p>Impact Headline</p>
            <div className="w-full">
              <textarea
                value={websiteData?.landing?.subTitle}
                type="text"
                id="subTitle"
                class="block p-2.5 mt-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 hover:ring-gray-300 hover:border-gray-400 focus:ring-gray-300 focus:border-gray-400"
                placeholder="& I CREATE EQUITABLE PLATFORMS FOR THE NEW ECONOMY."
                required
                rows={4}
                onChange={(e) => handleInputChange("subTitle", e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col items-start p-4 mt-4">
            <p>Brand Pillars</p>
            <div className="w-full">
              <input
                value={websiteData?.landing?.hashTagTitle}
                type="text"
                disabled
                id="hashTagTitle"
                class="block p-2.5 mt-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-not-allowed hover:ring-gray-300 hover:border-gray-400 focus:ring-gray-300 focus:border-gray-400"
                placeholder="WHAT I STAND FOR:"
                required
                onChange={(e) => handleInputChange("hashTagTitle", e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col items-start p-4 mt-4">
            <p>Tags</p>
            {websiteData?.landing?.hashTags?.map((item, index) => {
              return (
                <div className="flex gap-4 items-center w-full" key={index}>
                  <input
                    value={item}
                    type="text"
                    id="hashTagTitle"
                    class="block p-2.5 mt-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 hover:ring-gray-300 hover:border-gray-400 focus:ring-gray-300 focus:border-gray-400"
                    placeholder="EQUITY"
                    required
                    onChange={(e) => handleUpdateTag(index, e.target.value)}
                  />
                </div>
              );
            })}
          </div>
          <div className="flex flex-col items-start p-4 mt-4">
            <p>Portal Categories:</p>
            <div className="w-full text-gray-600">
              <section>
                <div className="mx-auto max-w-7xl">
                  <div className="mx-auto mt-1 space-y-4 max-w-3xl">
                    {/* REGION */}
                    <div className="w-full">
                      <p className="text-gray-600">Region</p>
                      <div className="">
                        <div className="mt-2 w-full">
                          <ReactSelect
                            options={options}
                            placeholder={websiteData?.landing?.categories?.region}
                            onChange={(value) => {
                              console.log(value);
                              if (value.length === 0) {
                                return;
                              }
                              handleCategoryInputChange("region", value.value);
                            }}
                            className="basic-multi-select"
                            classNamePrefix="select"
                          />
                        </div>
                      </div>
                    </div>

                    {/* SUPER POWER */}
                    <div className="w-full">
                      <p>Superpower</p>

                      {websiteData?.landing?.categories?.superPower?.map((item, textIndex) => {
                        return (
                          <div key={item} className="flex gap-4 items-center">
                            <input
                              value={item}
                              type="text"
                              id="hashTagTitle"
                              className="block p-2.5 mt-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 hover:ring-gray-300 hover:border-gray-400 focus:ring-gray-300 focus:border-gray-400"
                              placeholder="Write here..."
                              required
                              onChange={(e) =>
                                handleCategoryArrayInputChange(
                                  e.target.value,
                                  textIndex,
                                  "superPower"
                                )
                              }
                            />
                            <RiDeleteBinLine
                              onClick={() => deleteCategoryTextIndex(textIndex, "superPower")}
                              className={`mt-2 text-xl text-red-500 cursor-pointer`}
                            />
                          </div>
                        );
                      })}
                      {websiteData?.landing?.categories.superPower?.length < 3 && (
                        <div
                          className="flex gap-2 items-center mt-6 cursor-pointer"
                          onClick={() => addCategoryTag("superPower", 3)}
                        >
                          <FaCirclePlus className="text-[#a020f0] text-lg" />
                          <p className="text-sm">Add Super Power</p>
                        </div>
                      )}
                    </div>

                    {/* organizationAffiliations */}
                    <div className="w-full">
                      <p className="mt-4 text-xs font-semibold text-gray-600 text-start">
                        Organization Affiliations
                      </p>
                      {websiteData?.landing?.categories?.organizationAffiliations?.map(
                        (item, textIndex) => {
                          return (
                            <div className="flex gap-4 items-center">
                              <input
                                value={item}
                                type="text"
                                id="hashTagTitle"
                                class="block p-2.5 mt-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 hover:ring-gray-300 hover:border-gray-400 focus:ring-gray-300 focus:border-gray-400"
                                placeholder="Write here..."
                                required
                                onChange={(e) =>
                                  handleCategoryArrayInputChange(
                                    e.target.value,
                                    textIndex,
                                    "organizationAffiliations"
                                  )
                                }
                              />
                              <RiDeleteBinLine
                                onClick={() =>
                                  deleteCategoryTextIndex(textIndex, "organizationAffiliations")
                                }
                                className={`mt-2 text-xl text-red-500 cursor-pointer`}
                              />
                            </div>
                          );
                        }
                      )}

                      {websiteData?.landing?.categories.organizationAffiliations?.length < 2 && (
                        <div
                          className="flex gap-2 items-center mt-6 cursor-pointer"
                          onClick={() => addCategoryTag("organizationAffiliations", 2)}
                        >
                          <FaCirclePlus className="text-[#a020f0] text-lg" />
                          <p className="text-sm">Add Organization Affiliations</p>
                        </div>
                      )}
                    </div>

                    {/* communityAffiliations */}
                    <div className="w-full">
                      <p className="mt-4 text-xs font-semibold text-gray-600 text-start">
                        Community Affiliations
                      </p>
                      {websiteData?.landing?.categories?.communityAffiliations?.map(
                        (item, textIndex) => {
                          return (
                            <div className="flex gap-4 items-center">
                              <input
                                value={item}
                                type="text"
                                id="hashTagTitle"
                                class="block p-2.5 mt-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 hover:ring-gray-300 hover:border-gray-400 focus:ring-gray-300 focus:border-gray-400"
                                placeholder="Write here..."
                                required
                                onChange={(e) =>
                                  handleCategoryArrayInputChange(
                                    e.target.value,
                                    textIndex,
                                    "communityAffiliations"
                                  )
                                }
                              />
                              <RiDeleteBinLine
                                onClick={() =>
                                  deleteCategoryTextIndex(textIndex, "communityAffiliations")
                                }
                                className={`mt-2 text-xl text-red-500 cursor-pointer`}
                              />
                            </div>
                          );
                        }
                      )}

                      {websiteData?.landing?.categories.communityAffiliations?.length < 5 && (
                        <div
                          className="flex gap-2 items-center mt-6 cursor-pointer"
                          onClick={() => addCategoryTag("communityAffiliations", 5)}
                        >
                          <FaCirclePlus className="text-[#a020f0] text-lg" />
                          <p className="text-sm">Add Community Affiliations</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
          <div className="flex flex-col items-start p-4 mt-4">
            <p className="mb-4 text-xs font-semibold">Image</p>
            {imageLoading ? (
              <div className="mt-5 w-full bg-gray-200 rounded-full">
                <div
                  className="px-1 py-2 text-xs font-medium leading-none text-center text-blue-100 bg-blue-600 rounded-full animate-pulse"
                  style={{ width: "65%" }}
                >
                  {imageLoading}
                </div>
              </div>
            ) : (
              <>
                {websiteData?.landing?.userimg?.path ? (
                  <FileUpload
                    image={websiteData?.landing?.userimg?.path}
                    handleDeleteImage={handleDeleteImage}
                    handleAddImage={handleAddImage}
                  />
                ) : (
                  <>
                    <div className="flex justify-center items-center mt-4 w-full">
                      <label
                        htmlFor="dropzone-file"
                        className="flex flex-col items-center justify-center w-full h-24 border border-[#E5E5EA] border-dashed rounded-lg cursor-pointer  hover:bg-[#fceed966] hover:border-[#F6D4A0]"
                      >
                        <div className="flex justify-center items-center pt-5 pb-6">
                          <IoIosAddCircle className="text-gray-500" />
                          <p className="text-xs text-gray-500 ms-1">ADD AN IMAGE</p>
                        </div>
                        <input
                          id="dropzone-file"
                          type="file"
                          className="hidden"
                          onChange={handleAddImage}
                        />
                      </label>
                    </div>
                    <span className="mt-6 text-xs text-red-500">
                      *Image must be .jpg, .jpeg, .png
                    </span>
                  </>
                )}
              </>
            )}
          </div>
          <div className="flex flex-col items-start p-4 mt-4">
            <p className="text-xs font-semibold text-gray-600">Name</p>
            <div className="w-full">
              <input
                value={websiteData?.landing?.name}
                type="text"
                id="name"
                class="block p-2.5 mt-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 hover:ring-gray-300 hover:border-gray-400 focus:ring-gray-300 focus:border-gray-400"
                placeholder="Kara Howard"
                required
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col items-start p-4 mt-4">
            <p className="text-xs font-semibold text-gray-600">Pronoun</p>
            <div className="w-full">
              <input
                value={websiteData?.landing?.pronoun}
                type="text"
                id="pronoun"
                class="block p-2.5 mt-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 hover:ring-gray-300 hover:border-gray-400 focus:ring-gray-300 focus:border-gray-400"
                placeholder="SI HER"
                required
                onChange={(e) => handleInputChange("pronoun", e.target.value)}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

LandingFields.propTypes = {
  toggleDrawer: PropTypes.func.isRequired,
};

export default LandingFields;
