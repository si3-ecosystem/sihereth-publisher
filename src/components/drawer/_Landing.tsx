import React, { useEffect, useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaCirclePlus } from "react-icons/fa6";
import { countries } from "@/utils/data";
import DrawerHeader from "./DrawerHeader";
import { LandingTypes } from "@/utils/types";
import { useDispatch, useSelector } from "react-redux";
import { updateContent } from "@/redux/contentSlice";
import { RootState } from "@/redux/store";
import { inputStyles } from "@/utils/customStyles";
import { debounce } from "lodash";
import dynamic from "next/dynamic";

// Move debounceDispatch outside the component to avoid re-creation on every render
const debounceDispatch = debounce((dispatch, field, updatedArray, localData) => {
  dispatch(updateContent({ section: "landing", data: { ...localData, [field]: updatedArray } }));
}, 300);

const LandingFieldsComponent = ({ toggleDrawer }: { toggleDrawer: () => void }) => {
  const dispatch = useDispatch();
  const reduxData: LandingTypes = useSelector((state: RootState) => state.content.landing);
  const [localData, setLocalData] = useState<LandingTypes>(reduxData);

  useEffect(() => {
    setLocalData(reduxData);
  }, [reduxData]);

  const handleInputChange = (field: keyof LandingTypes, value: any) => {
    const updatedData = { ...localData, [field]: value };
    setLocalData(updatedData);
    dispatch(updateContent({ section: "landing", data: updatedData }));
  };

  const handleArrayChange = (field: keyof LandingTypes, index: number, value: string) => {
    const updatedArray = [...(localData[field] as string[])];
    updatedArray[index] = value;
    setLocalData({ ...localData, [field]: updatedArray });
    debounceDispatch(dispatch, field, updatedArray, localData);
  };

  const addToArray = (field: keyof LandingTypes, placeholder: string) => {
    const updatedArray = [...(localData[field] as string[]), placeholder];
    handleInputChange(field, updatedArray);
  };

  const removeFromArray = (field: keyof LandingTypes, index: number) => {
    const updatedArray = (localData[field] as string[]).filter((_, i) => i !== index);
    handleInputChange(field, updatedArray);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event?.target?.files?.[0]) {
      const file = event.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      handleInputChange("image", imageUrl);
    }
  };

  return (
    <>
      {/* Header */}
      <DrawerHeader label="Headline Section" toggleDrawer={toggleDrawer} />
      <div className="w-full font-dm-sans font-medium text-lg mb-28 overflow-y-auto max-h-[calc(100vh-5rem)]">
        {/* Title */}
        <section className="p-4 xl:p-6">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            className={inputStyles}
            value={localData?.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
          />
        </section>
        {/* Headline */}
        <section className="p-4 xl:p-6">
          <label htmlFor="headline">Impact Headline</label>
          <textarea
            id="headline"
            className={inputStyles}
            value={localData?.headline}
            onChange={(e) => handleInputChange("headline", e.target.value)}
            rows={4}
          />
        </section>
        {/* Tags */}
        <section className="p-4 xl:p-6">
          <label htmlFor="tags">Tags</label>
          {localData?.hashTags?.map((item, index) => (
            <div className="flex gap-4 items-center w-full" key={`${item}-${index}`}>
              <input
                type="text"
                id={`tag-${index}`}
                className={inputStyles}
                value={item}
                onChange={(e) => handleArrayChange("hashTags", index, e.target.value)}
              />
              <RiDeleteBinLine
                className="mt-2 size-5 text-red-500 cursor-pointer"
                onClick={() => removeFromArray("hashTags", index)}
              />
            </div>
          ))}
          <div
            className="flex gap-2 items-center mt-6 cursor-pointer"
            onClick={() => addToArray("hashTags", "New Tag")}
          >
            <FaCirclePlus className="text-[#a020f0] text-lg ml-1" />
            <p className="text-sm text-gray-600">Add Tag</p>
          </div>
        </section>
        {/* Region */}
        <section className="p-4 xl:p-6">
          <label htmlFor="region">Region</label>
          <select
            value={localData?.region}
            className={inputStyles}
            id="region"
            onChange={(e) => handleInputChange("region", e.target.value)}
          >
            {countries.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </section>
        {/* Organization Affiliations */}
        <section className="p-4 xl:p-6">
          <label htmlFor="organizationAffiliations">Organization Affiliations</label>
          {localData?.organizationAffiliations?.map((item, index) => (
            <div className="flex gap-4 items-center w-full" key={`${item}-${index}`}>
              <input
                type="text"
                className={inputStyles}
                value={item}
                onChange={(e) => handleArrayChange("organizationAffiliations", index, e.target.value)}
              />
              <RiDeleteBinLine
                className="mt-2 size-5 text-red-500 cursor-pointer"
                onClick={() => removeFromArray("organizationAffiliations", index)}
              />
            </div>
          ))}
          <div
            className="flex gap-2 items-center mt-6 cursor-pointer"
            onClick={() => addToArray("organizationAffiliations", "New Organization")}
          >
            <FaCirclePlus className="text-[#a020f0] text-lg ml-1" />
            <p className="text-sm text-gray-600">Add Organization Affiliation</p>
          </div>
        </section>
        {/* Community Affiliations */}
        <section className="p-4 xl:p-6">
          <label htmlFor="communityAffiliations">Community Affiliations</label>
          {localData?.communityAffiliations?.map((item, index) => (
            <div className="flex gap-4 items-center w-full" key={`${item}-${index}`}>
              <input
                type="text"
                className={inputStyles}
                value={item}
                onChange={(e) => handleArrayChange("communityAffiliations", index, e.target.value)}
              />
              <RiDeleteBinLine
                className="mt-2 size-5 text-red-500 cursor-pointer"
                onClick={() => removeFromArray("communityAffiliations", index)}
              />
            </div>
          ))}
          <div
            className="flex gap-2 items-center mt-6 cursor-pointer"
            onClick={() => addToArray("communityAffiliations", "New Community")}
          >
            <FaCirclePlus className="text-[#a020f0] text-lg ml-1" />
            <p className="text-sm text-gray-600">Add Community Affiliation</p>
          </div>
        </section>
        {/* Super Powers */}
        <section className="p-4 xl:p-6">
          <label htmlFor="superPowers">Super Powers</label>
          {localData?.superPowers?.map((item, index) => (
            <div className="flex gap-4 items-center w-full" key={`${item}-${index}`}>
              <input
                type="text"
                className={inputStyles}
                value={item}
                onChange={(e) => handleArrayChange("superPowers", index, e.target.value)}
              />
              <RiDeleteBinLine
                className="mt-2 size-5 text-red-500 cursor-pointer"
                onClick={() => removeFromArray("superPowers", index)}
              />
            </div>
          ))}
          <div
            className="flex gap-2 items-center mt-6 cursor-pointer"
            onClick={() => addToArray("superPowers", "New Super Power")}
          >
            <FaCirclePlus className="text-[#a020f0] text-lg ml-1" />
            <p className="text-sm text-gray-600">Add Super Power</p>
          </div>
        </section>
        {/* Image */}
        <section className="p-4 xl:p-6">
          <label htmlFor="image">Image</label>
          <input type="file" id="image" className="hidden" onChange={handleImageUpload} />
          <div className="flex justify-center items-center pt-5 pb-6 border border-dashed border-gray-300 rounded-lg cursor-pointer h-24 mt-3 hover:bg-[#fceed966] hover:border-[#F6D4A0]">
            <IoIosAddCircle className="text-gray-500" />
            <p className="text-xs text-gray-500 ms-1">ADD AN IMAGE</p>
          </div>
          <span className="mt-6 text-xs text-red-500">*Image must be .jpg, .jpeg, .png</span>
        </section>
        {/* Name */}
        <section className="p-4 xl:p-6">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            className={inputStyles}
            value={localData?.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
        </section>
        {/* Pronoun */}
        <section className="p-4 xl:p-6">
          <label htmlFor="pronoun">Pronoun</label>
          <input
            type="text"
            id="pronoun"
            className={inputStyles}
            value={localData?.pronoun}
            onChange={(e) => handleInputChange("pronoun", e.target.value)}
          />
        </section>
      </div>
    </>
  );
};

const LandingFields = dynamic(() => Promise.resolve(LandingFieldsComponent), { ssr: false });

export default LandingFields;
