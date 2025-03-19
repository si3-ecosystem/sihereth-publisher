"use client";
import React, { useEffect, useState, useCallback, useRef } from "react";
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
import Image from "next/image";

const LandingFieldsComponent = ({ toggleDrawer }: { toggleDrawer: () => void }) => {
  const dispatch = useDispatch();
  const reduxData = useSelector((state: RootState) => state.content.landing);
  const [localData, setLocalData] = useState<LandingTypes>(reduxData);

  const latestLocalData = useRef(localData);
  latestLocalData.current = localData;

  useEffect(() => {
    if (JSON.stringify(reduxData) !== JSON.stringify(localData)) {
      setLocalData(reduxData);
    }
  }, [reduxData]);

  // Debounced dispatcher to prevent excessive Redux updates
  const debounceDispatch = useRef(
    debounce((field: keyof LandingTypes, updatedArray: string[]) => {
      dispatch(updateContent({ section: "landing", data: { ...latestLocalData.current, [field]: updatedArray } }));
    }, 300)
  ).current;

  // Update single-value fields
  const handleInputChange = useCallback(
    (field: keyof LandingTypes, value: any) => {
      const updatedData = { ...localData, [field]: value };
      setLocalData(updatedData);
      dispatch(updateContent({ section: "landing", data: updatedData }));
    },
    [dispatch, localData]
  );

  // Update array fields with debounce
  const handleArrayChange = useCallback(
    (field: keyof LandingTypes, index: number, value: string) => {
      const updatedArray = [...(localData[field] as string[])];
      updatedArray[index] = value;
      setLocalData({ ...localData, [field]: updatedArray });
      debounceDispatch(field, updatedArray);
    },
    [localData]
  );

  // Add new entry to an array
  const addToArray = useCallback(
    (field: keyof LandingTypes, placeholder: string) => {
      const updatedArray = [...(localData[field] as string[]), placeholder];
      handleInputChange(field, updatedArray);
    },
    [handleInputChange, localData]
  );

  // Remove an entry from an array
  const removeFromArray = useCallback(
    (field: keyof LandingTypes, index: number) => {
      const updatedArray = (localData[field] as string[]).filter((_, i) => i !== index);
      handleInputChange(field, updatedArray);
    },
    [handleInputChange, localData]
  );

  // Create a ref for the file input
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Image upload handling
  const handleImageUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files?.[0]) {
        const file = event.target.files[0];
        const imageUrl = URL.createObjectURL(file);
        handleInputChange("image", imageUrl);

        // Cleanup URL.createObjectURL to prevent memory leaks
        setTimeout(() => URL.revokeObjectURL(imageUrl), 5000);
      }
    },
    [handleInputChange]
  );

  return (
    <>
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

        {/* Reusable Array Field Component */}
        {[
          { label: "Tags", field: "hashTags", placeholder: "New Tag" },
          { label: "Organization Affiliations", field: "organizationAffiliations", placeholder: "New Organization" },
          { label: "Community Affiliations", field: "communityAffiliations", placeholder: "New Community" },
          { label: "Super Powers", field: "superPowers", placeholder: "New Super Power" }
        ].map(({ label, field, placeholder }) => (
          <section key={field} className="p-4 xl:p-6">
            <label htmlFor={field}>{label}</label>
            {(localData[field as keyof LandingTypes] as string[])?.map((item, index) => (
              <div className="flex gap-4 items-center w-full" key={`${item}-${index}`}>
                <input
                  type="text"
                  className={inputStyles}
                  value={item}
                  onChange={(e) => handleArrayChange(field as keyof LandingTypes, index, e.target.value)}
                />
                <RiDeleteBinLine
                  className="mt-2 size-5 text-red-500 cursor-pointer"
                  onClick={() => removeFromArray(field as keyof LandingTypes, index)}
                />
              </div>
            ))}
            <div
              className="flex gap-2 items-center mt-6 cursor-pointer"
              onClick={() => addToArray(field as keyof LandingTypes, placeholder)}
            >
              <FaCirclePlus
                className="text-[#a020f0] text-lg ml-1 cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              />
              <p className="text-sm text-gray-600">Add {label}</p>
            </div>
          </section>
        ))}

        {/* Region Selection */}
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

        {/* Image Upload */}
        <section className="p-4 xl:p-6">
          <label htmlFor="image">Image</label>
          {localData?.image ? (
            <div className="mt-3">
              <Image src={localData?.image} alt="Uploaded" width={100} height={100} className="rounded-lg" />
              <div className="flex gap-2 mt-2">
                <RiDeleteBinLine
                  className="text-red-500 cursor-pointer"
                  onClick={() => handleInputChange("image", "")}
                />
              </div>
            </div>
          ) : (
            <>
              <input type="file" id="image" className="hidden" ref={fileInputRef} onChange={handleImageUpload} />
              <div
                className="flex justify-center items-center pt-5 pb-6 border border-dashed border-gray-300 rounded-lg cursor-pointer h-24 mt-3 hover:bg-[#fceed966] hover:border-[#F6D4A0]"
                onClick={() => fileInputRef.current?.click()}
              >
                <IoIosAddCircle className="text-gray-500" />
                <p className="text-xs text-gray-500 ms-1">ADD AN IMAGE</p>
              </div>
            </>
          )}
        </section>
      </div>
    </>
  );
};

const LandingFields = dynamic(() => Promise.resolve(LandingFieldsComponent), { ssr: false });
export default LandingFields;
