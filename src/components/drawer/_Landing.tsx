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
import { uploadToCloudinary, removeFromCloudinary } from "@/utils/cloudinary";
import { toast } from "react-hot-toast";
import { compressImage, validateImage } from "@/utils/imageCompression";

const LandingFieldsComponent = ({ toggleDrawer }: { toggleDrawer: () => void }) => {
  const dispatch = useDispatch();
  const reduxData = useSelector((state: RootState) => state.content.landing);
  const [localData, setLocalData] = useState<LandingTypes>(reduxData);
  const [isUploading, setIsUploading] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setLocalData(reduxData);
  }, []);

  const updateField = useCallback(
    (field: keyof LandingTypes, value: any) => {
      setLocalData((prev) => ({ ...prev, [field]: value }));
      dispatch(
        updateContent({
          section: "landing",
          data: { [field]: value }
        })
      );
    },
    [dispatch]
  );

  const handleArrayChange = useCallback(
    (field: keyof LandingTypes, index: number, value: string) => {
      const updatedArray = [...(localData[field] as string[])];
      updatedArray[index] = value;
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

  const handleImageUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files?.[0]) {
        try {
          const file = event.target.files[0];
          if (!validateImage(file)) {
            return;
          }
          setIsUploading(true);
          toast.success("Uploading image...");
          const compressedFile = await compressImage(file);
          const imageUrl = await uploadToCloudinary(compressedFile);
          updateField("image", imageUrl);
          toast.success("Image uploaded successfully!");
        } catch (error) {
          console.error("Upload error:", error);
          toast.error("Failed to upload image");
        } finally {
          setIsUploading(false);
        }
      }
    },
    [updateField]
  );

  const handleRemoveImage = useCallback(async () => {
    if (localData?.image) {
      try {
        setIsRemoving(true);
        toast.success("Removing image...");
        await removeFromCloudinary(localData.image);
        updateField("image", "");
        toast.success("Image removed successfully!");
      } catch (error) {
        console.error("Remove error:", error);
        toast.error("Failed to remove image");
      } finally {
        setIsRemoving(false);
      }
    }
  }, [localData?.image, updateField]);

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
            rows={2}
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
          { label: "Personal Brand Pillars", field: "hashTags", placeholder: "New tag" },
          { label: "Organization Affiliations", field: "organizationAffiliations", placeholder: "New organization" },
          { label: "Community Affiliations", field: "communityAffiliations", placeholder: "New community" },
          { label: "Superpowers", field: "superPowers", placeholder: "New superpower" }
        ].map(({ label, field, placeholder }) => {
          const arr = (localData[field as keyof LandingTypes] as string[]) || [];
          const isMax = arr.length >= 5;
          return (
            <section key={field} className="px-4 py-2">
              <label htmlFor={field} className="text-xs">
                {label}
              </label>
              {arr.map((item, index) => (
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
                className={`flex gap-1 items-center mt-3 cursor-pointer text-xs w-max ${isMax ? "opacity-50 pointer-events-none" : ""}`}
                onClick={() => {
                  if (!isMax && placeholder) addToArray(field as keyof LandingTypes, placeholder);
                }}
              >
                <FaCirclePlus className="text-[#a020f0] size-3 cursor-pointer" />
                <p className="text-gray-600">Add New</p>
                {isMax && <span className="text-red-400 ms-2">(Max 5)</span>}
              </div>
            </section>
          );
        })}
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
                <button
                  onClick={handleRemoveImage}
                  disabled={isRemoving}
                  className={`flex items-center gap-1 text-red-500 ${isRemoving ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                >
                  <RiDeleteBinLine className="size-4" />
                  {isRemoving ? "Removing..." : "Remove"}
                </button>
              </div>
            </div>
          ) : (
            <>
              <input
                type="file"
                id="image"
                className="hidden"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept=".jpg,.jpeg,.png"
                disabled={isUploading}
              />
              <div
                className={`flex justify-center items-center pt-5 pb-6 border border-dashed border-gray-300 rounded-lg cursor-pointer h-24 mt-3 hover:bg-[#fceed966] hover:border-[#F6D4A0] ${
                  isUploading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => !isUploading && fileInputRef.current?.click()}
              >
                {isUploading ? (
                  <div className="flex flex-col items-center gap-2">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-500"></div>
                    <p className="text-gray-500">Uploading...</p>
                  </div>
                ) : (
                  <>
                    <IoIosAddCircle className="text-gray-500" />
                    <p className="text-gray-500 ms-1">ADD AN IMAGE</p>
                  </>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-2">Supported formats: JPG, JPEG, PNG (max 2MB)</p>
            </>
          )}
        </section>
      </div>
    </>
  );
};

const LandingFields = dynamic(() => Promise.resolve(LandingFieldsComponent), { ssr: false });
export default LandingFields;
