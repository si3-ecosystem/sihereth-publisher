import { RiDeleteBinLine } from "react-icons/ri";
import { FaCirclePlus } from "react-icons/fa6";
import DrawerHeader from "./DrawerHeader";
import { useDispatch, useSelector } from "react-redux";
import { addArrayItem, removeArrayItem, updateArrayItem, updateContent } from "@/redux/contentSlice";
import type { RootState } from "@/redux/store";
import { inputStyles } from "@/utils/customStyles";
import { useState, useEffect, useRef } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { uploadToCloudinary, removeFromCloudinary } from "@/utils/cloudinary";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { validateImage, compressImage } from "@/utils/imageCompression";

const AvailableFields = ({ toggleDrawer }: { toggleDrawer: () => void }) => {
  const dispatch = useDispatch();
  const { availableFor, ctaText, ctaUrl, avatar } = useSelector((state: RootState) => state.content.available) ?? {};
  const [inputValues, setInputValues] = useState<string[]>(availableFor ?? []);
  const [localCtaText, setLocalCtaText] = useState<string>(ctaText ?? "");
  const [localCtaUrl, setLocalCtaUrl] = useState<string>(ctaUrl ?? "");
  const [localAvatar, setLocalAvatar] = useState<string>(avatar ?? "");
  const [isUploading, setIsUploading] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setInputValues(availableFor ?? []);
  }, [availableFor]);

  useEffect(() => {
    setLocalCtaText(ctaText ?? "");
    setLocalCtaUrl(ctaUrl ?? "");
    setLocalAvatar(avatar ?? "");
  }, [ctaText, ctaUrl, avatar]);

  const handleInputChange = (index: number, value: string) => {
    setInputValues((prev) => {
      const newValues = [...prev];
      newValues[index] = value;
      return newValues;
    });
    dispatch(
      updateArrayItem({
        section: "available",
        fieldName: "availableFor",
        index,
        value
      })
    );
  };

  const addToArray = () => {
    if (inputValues.length >= 5) {
      return;
    }
    dispatch(
      addArrayItem({
        section: "available",
        fieldName: "availableFor",
        value: ""
      })
    );
  };

  const removeFromArray = (index: number) => {
    if (inputValues.length <= 1) {
      return;
    }
    dispatch(
      removeArrayItem({
        section: "available",
        fieldName: "availableFor",
        index
      })
    );
  };

  const handleCtaTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalCtaText(value);
    dispatch(updateContent({ section: "available", data: { ctaText: value } }));
  };

  const handleCtaUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalCtaUrl(value);
    dispatch(updateContent({ section: "available", data: { ctaUrl: value } }));
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      try {
        const file = e.target.files[0];
        if (!validateImage(file)) {
          toast.error("Invalid image format or size. Please use JPG, JPEG, or PNG under 2MB.");
          return;
        }
        setIsUploading(true);
        toast.success("Uploading avatar...");
        const compressedFile = await compressImage(file);
        const imageUrl = await uploadToCloudinary(compressedFile);
        setLocalAvatar(imageUrl);
        dispatch(updateContent({ section: "available", data: { avatar: imageUrl } }));
        toast.success("Avatar uploaded successfully!");
      } catch (error) {
        console.error("Upload error:", error);
        toast.error("Failed to upload avatar");
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleRemoveAvatar = async () => {
    if (!localAvatar) return;
    try {
      setIsRemoving(true);
      await removeFromCloudinary(localAvatar);
      setLocalAvatar("");
      dispatch(updateContent({ section: "available", data: { avatar: "" } }));
    } catch (error) {
      console.error("Remove error:", error);
    } finally {
      setIsRemoving(false);
    }
  };

  return (
    <>
      <DrawerHeader label="Representation Section" toggleDrawer={toggleDrawer} />
      <div className="w-full font-dm-sans font-medium text-xs mb-28 overflow-y-auto max-h-[calc(100vh-5rem)]">
        <section className="p-4 space-y-6">
          {/* Avatar */}
          <section className="px-4 py-2">
            <label htmlFor="avatar-upload" className="text-xs">
              Image of your choice
            </label>
            {localAvatar ? (
              <div className="mt-3">
                <Image src={localAvatar} alt="Avatar preview" width={100} height={100} className="rounded-lg" />
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={handleRemoveAvatar}
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
                  id="avatar-upload"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleAvatarChange}
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
                      <p className="text-gray-500 ms-1">ADD AN AVATAR</p>
                    </>
                  )}
                </div>
              </>
            )}
          </section>

          {/* CTA Text */}
          <div>
            <label htmlFor="ctaText" className="block mb-1 font-semibold">
              CTA Button Text
            </label>
            <input
              type="text"
              id="ctaText"
              className={inputStyles}
              value={localCtaText}
              onChange={handleCtaTextChange}
              placeholder="Enter button text"
            />
          </div>

          {/* CTA URL */}
          <div>
            <label htmlFor="ctaUrl" className="block mb-1 font-semibold">
              CTA Button URL
            </label>
            <input
              type="text"
              id="ctaUrl"
              className={inputStyles}
              value={localCtaUrl}
              onChange={handleCtaUrlChange}
              placeholder="Enter button URL"
            />
          </div>

          {/* Available For List */}
          <div>
            <label className="block mb-1 font-semibold" htmlFor="availableFor-0">
              Available For
            </label>
            {inputValues.map((item, index) => (
              <div className="flex gap-4 items-center w-full mb-2" key={index}>
                <input
                  type="text"
                  id={`availableFor-${index}`}
                  className={inputStyles}
                  value={item}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  placeholder="Enter availability type"
                />
                <RiDeleteBinLine
                  className="size-4 text-red-500 cursor-pointer hover:text-red-700 transition-colors"
                  onClick={() => removeFromArray(index)}
                  aria-label="Remove item"
                />
              </div>
            ))}
            {inputValues.length < 5 && (
              <button
                className="flex gap-2 items-center mt-6 cursor-pointer hover:text-purple-800 transition-colors"
                onClick={addToArray}
                type="button"
              >
                <FaCirclePlus className="text-[#a020f0] ml-1 size-3" />
                <p className="text-gray-600 text-xs">Add Item</p>
              </button>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default AvailableFields;
