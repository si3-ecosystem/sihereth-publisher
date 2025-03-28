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

  useEffect(() => {
    if (JSON.stringify(reduxData) !== JSON.stringify(localData)) {
      setLocalData(reduxData);
    }
  }, [reduxData]);

  const handleInputChange = useCallback(
    debounce((field: keyof LandingTypes, value: any) => {
      const updatedData = { ...localData, [field]: value };
      setLocalData(updatedData);
      dispatch(updateContent({ section: "landing", data: updatedData }));
    }, 100),
    [dispatch, localData]
  );

  const handleArrayChange = useCallback(
    (field: keyof LandingTypes, index: number, value: string) => {
      const updatedArray = [...(localData[field] as string[])];
      updatedArray[index] = value;
      setLocalData((prev) => ({ ...prev, [field]: updatedArray }));
      debounce(() => {
        dispatch(updateContent({ section: "landing", data: { ...localData, [field]: updatedArray } }));
      }, 100)();
    },
    [dispatch, localData]
  );

  const addToArray = useCallback(
    (field: keyof LandingTypes, placeholder: string) => {
      const updatedArray = [...(localData[field] as string[]), placeholder];
      const updatedData = { ...localData, [field]: updatedArray };
      setLocalData(updatedData);
      dispatch(updateContent({ section: "landing", data: updatedData }));
    },
    [dispatch, localData]
  );

  const removeFromArray = useCallback(
    (field: keyof LandingTypes, index: number) => {
      const updatedArray = (localData[field] as string[]).filter((_, i) => i !== index);
      const updatedData = { ...localData, [field]: updatedArray };
      setLocalData(updatedData);
      dispatch(updateContent({ section: "landing", data: updatedData }));
    },
    [dispatch, localData]
  );

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files?.[0]) {
        const file = event.target.files[0];
        const imageUrl = URL.createObjectURL(file);
        handleInputChange("image", imageUrl);
        setTimeout(() => URL.revokeObjectURL(imageUrl), 5000);
      }
    },
    [handleInputChange]
  );

  return (
    <>
      <DrawerHeader label="Headline Section" toggleDrawer={toggleDrawer} />
      <div className="w-full font-dm-sans font-medium text-sm mb-28 overflow-y-auto max-h-[calc(100vh-4rem)]">
        {/* Title */}
        <section className="px-4 py-2">
          <label htmlFor="title" className="text-xs">
            Title
          </label>
          <input
            type="text"
            id="title"
            className={inputStyles}
            value={localData?.title || ""}
            onChange={(e) => {
              setLocalData((prev) => ({ ...prev, title: e.target.value }));
              handleInputChange("title", e.target.value);
            }}
          />
        </section>

        {/* Headline */}
        <section className="px-4 py-2">
          <label htmlFor="headline" className="text-xs">
            Impact Headline
          </label>
          <textarea
            id="headline"
            className={inputStyles}
            value={localData?.headline || ""}
            onChange={(e) => {
              setLocalData((prev) => ({ ...prev, headline: e.target.value }));
              handleInputChange("headline", e.target.value);
            }}
            rows={4}
          />
        </section>

        {/* Reusable Array Field Component */}
        {[
          { label: "Tags", field: "hashTags", placeholder: "" },
          { label: "Organization Affiliations", field: "organizationAffiliations", placeholder: "" },
          { label: "Community Affiliations", field: "communityAffiliations", placeholder: "" },
          { label: "Super Powers", field: "superPowers", placeholder: "" }
        ].map(({ label, field, placeholder }) => (
          <section key={field} className="px-4 py-2">
            <label htmlFor={field} className="text-xs">
              {label}
            </label>
            {(localData[field as keyof LandingTypes] as string[])?.map((item, index) => (
              <div className="flex gap-2 items-center w-full" key={`${field}-${index}`}>
                <input
                  type="text"
                  className={inputStyles}
                  value={item}
                  onChange={(e) => handleArrayChange(field as keyof LandingTypes, index, e.target.value)}
                />
                <RiDeleteBinLine
                  className="mt-2 size-4 text-red-500 cursor-pointer"
                  onClick={() => removeFromArray(field as keyof LandingTypes, index)}
                />
              </div>
            ))}
            <div
              className="flex gap-1 items-center mt-3 cursor-pointer text-xs w-max"
              onClick={() => addToArray(field as keyof LandingTypes, placeholder)}
            >
              <FaCirclePlus className="text-[#a020f0] size-3 cursor-pointer" />
              <p className="text-gray-600">Add {label}</p>
            </div>
          </section>
        ))}

        {/* Region Selection */}
        <section className="px-4 py-2">
          <label htmlFor="region" className="text-xs">
            Region
          </label>
          <select
            value={localData?.region || ""}
            className={inputStyles}
            id="region"
            onChange={(e) => {
              setLocalData((prev) => ({ ...prev, region: e.target.value }));
              handleInputChange("region", e.target.value);
            }}
          >
            {countries.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </section>

        {/* Image Upload */}
        <section className="px-4 py-2">
          <label htmlFor="image" className="text-xs">
            Image
          </label>
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
                <p className="text-gray-500 ms-1">ADD AN IMAGE</p>
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
