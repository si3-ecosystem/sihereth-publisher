"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaCirclePlus } from "react-icons/fa6";
import { countries, pronouns } from "@/utils/data";
import DrawerHeader from "./DrawerHeader";
import type { LandingTypes } from "@/utils/types";
import { useDispatch, useSelector } from "react-redux";
import { updateContent } from "@/redux/contentSlice";
import type { RootState } from "@/redux/store";
import { inputStyles } from "@/utils/customStyles";
import dynamic from "next/dynamic";
import Image from "next/image";

const LandingFieldsComponent = ({ toggleDrawer }: { toggleDrawer: () => void }) => {
  const dispatch = useDispatch();
  const reduxData = useSelector((state: RootState) => state.content.landing);
  const [localData, setLocalData] = useState<LandingTypes>(reduxData);

  // Only initialize localData from Redux once on mount
  useEffect(() => {
    setLocalData(reduxData);
  }, []);

  // Sync Redux changes to local state (only when Redux is updated from elsewhere)
  useEffect(() => {
    const isInitializing = Object.keys(localData).length === 0;
    if (isInitializing || JSON.stringify(reduxData) !== JSON.stringify(localData)) {
      setLocalData(reduxData);
    }
  }, [reduxData]);

  // Update both local state and dispatch to Redux
  const updateField = useCallback(
    (field: keyof LandingTypes, value: any) => {
      setLocalData((prev) => ({ ...prev, [field]: value }));

      // Small delay before updating Redux to batch potential changes
      setTimeout(() => {
        dispatch(
          updateContent({
            section: "landing",
            data: { [field]: value }
          })
        );
      }, 100);
    },
    [dispatch]
  );

  // Handle array changes
  const handleArrayChange = useCallback(
    (field: keyof LandingTypes, index: number, value: string) => {
      const updatedArray = [...(localData[field] as string[])];
      updatedArray[index] = value;

      setLocalData((prev) => ({ ...prev, [field]: updatedArray }));

      setTimeout(() => {
        dispatch(
          updateContent({
            section: "landing",
            data: { [field]: updatedArray }
          })
        );
      }, 100);
    },
    [dispatch, localData]
  );

  // Add item to array
  const addToArray = useCallback(
    (field: keyof LandingTypes, placeholder: string) => {
      const updatedArray = [...((localData[field] as string[]) || []), placeholder];

      setLocalData((prev) => ({ ...prev, [field]: updatedArray }));

      dispatch(
        updateContent({
          section: "landing",
          data: { [field]: updatedArray }
        })
      );
    },
    [dispatch, localData]
  );

  // Remove item from array
  const removeFromArray = useCallback(
    (field: keyof LandingTypes, index: number) => {
      const updatedArray = (localData[field] as string[]).filter((_, i) => i !== index);

      setLocalData((prev) => ({ ...prev, [field]: updatedArray }));

      dispatch(
        updateContent({
          section: "landing",
          data: { [field]: updatedArray }
        })
      );
    },
    [dispatch, localData]
  );

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Handle image upload
  const handleImageUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files?.[0]) {
        const file = event.target.files[0];
        const imageUrl = URL.createObjectURL(file);

        updateField("image", imageUrl);

        // Clean up the object URL after it's no longer needed
        setTimeout(() => URL.revokeObjectURL(imageUrl), 5000);
      }
    },
    [updateField]
  );

  return (
    <>
      <DrawerHeader label="Headline Section" toggleDrawer={toggleDrawer} />
      <div className="w-full font-dm-sans font-medium text-sm mb-28 overflow-y-auto max-h-[calc(100vh-4rem)]">
        {/* Name */}
        <section className="px-4 py-2">
          <label htmlFor="fullName" className="text-xs">
            Name
          </label>
          <input
            type="text"
            id="fullName"
            className={inputStyles}
            value={localData?.fullName || ""}
            onChange={(e) => updateField("fullName", e.target.value)}
          />
        </section>
        {/* Pronoun */}
        <section className="px-4 py-2">
          <label htmlFor="pronoun" className="text-xs">
            Pronoun
          </label>
          <select
            value={localData?.pronoun || ""}
            className="px-1.5 py-1 mt-2 w-full bg-gray-100 rounded-lg border border-gray-300 hover:border-gray-400 focus:ring-gray-300 focus:border-gray-400 focus:outline-none"
            id="pronoun"
            onChange={(e) => updateField("pronoun", e.target.value)}
          >
            {pronouns.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
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
            onChange={(e) => updateField("headline", e.target.value)}
            rows={4}
          />
        </section>
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
            onChange={(e) => updateField("title", e.target.value)}
          />
        </section>
        {/* Reusable Array Field Component */}
        {[
          { label: "Tags", field: "hashTags", placeholder: "New tag" },
          { label: "Organization Affiliations", field: "organizationAffiliations", placeholder: "New organization" },
          { label: "Community Affiliations", field: "communityAffiliations", placeholder: "New community" },
          { label: "Super Powers", field: "superPowers", placeholder: "New superpower" }
        ].map(({ label, field, placeholder }) => (
          <section key={field} className="px-4 py-2">
            <label htmlFor={field} className="text-xs">
              {label}
            </label>
            {((localData[field as keyof LandingTypes] as string[]) || []).map((item, index) => (
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
            className="px-1.5 py-1 mt-2 w-full bg-gray-100 rounded-lg border border-gray-300 hover:border-gray-400 focus:ring-gray-300 focus:border-gray-400 focus:outline-none"
            id="region"
            onChange={(e) => updateField("region", e.target.value)}
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
                <RiDeleteBinLine className="text-red-500 cursor-pointer" onClick={() => updateField("image", "")} />
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
