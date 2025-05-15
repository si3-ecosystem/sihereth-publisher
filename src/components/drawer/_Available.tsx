import { RiDeleteBinLine } from "react-icons/ri";
import { FaCirclePlus } from "react-icons/fa6";
import DrawerHeader from "./DrawerHeader";
import { useDispatch, useSelector } from "react-redux";
import { addArrayItem, removeArrayItem, updateArrayItem, updateContent } from "@/redux/contentSlice";
import type { RootState } from "@/redux/store";
import { inputStyles } from "@/utils/customStyles";
import { useState, useEffect } from "react";
import { IoIosAddCircle } from "react-icons/io";

const AvailableFields = ({ toggleDrawer }: { toggleDrawer: () => void }) => {
  const dispatch = useDispatch();
  const { availableFor, ctaText, ctaUrl, avatar } = useSelector((state: RootState) => state.content.available) ?? {};

  // Initialize local state with Redux data
  const [inputValues, setInputValues] = useState<string[]>(availableFor ?? []);
  const [localCtaText, setLocalCtaText] = useState<string>(ctaText ?? "");
  const [localCtaUrl, setLocalCtaUrl] = useState<string>(ctaUrl ?? "");
  const [localAvatar, setLocalAvatar] = useState<string>(avatar ?? "");

  // Sync inputValues with Redux availableFor whenever it changes
  useEffect(() => {
    setInputValues(availableFor ?? []);
  }, [availableFor]);

  // Sync other fields with Redux on mount or when they change
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

    // Update Redux in real-time with the raw value
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
    // No need to update inputValues here; useEffect will handle sync
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
    // No need to update inputValues here; useEffect will handle sync
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

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const blobUrl = URL.createObjectURL(file);
      setLocalAvatar(blobUrl);
      dispatch(updateContent({ section: "available", data: { avatar: blobUrl } }));
    }
  };

  const handleRemoveAvatar = () => {
    setLocalAvatar("");
    dispatch(updateContent({ section: "available", data: { avatar: "" } }));
  };

  return (
    <>
      <DrawerHeader label="Representation Section" toggleDrawer={toggleDrawer} />
      <div className="w-full font-dm-sans font-medium text-xs mb-28 overflow-y-auto max-h-[calc(100vh-5rem)]">
        <section className="p-4 space-y-6">
          {/* Avatar */}
          <div>
            <label htmlFor="avatar-upload" className="block mb-1 font-semibold">
              Avatar Image
            </label>
            {localAvatar ? (
              <div className="mt-3">
                <img
                  src={localAvatar}
                  alt="Avatar preview"
                  className="w-24 h-24 rounded-full object-cover border-4 border-purple-200 shadow-md"
                />
                <div className="flex gap-2 mt-2">
                  <RiDeleteBinLine className="text-red-500 cursor-pointer" onClick={handleRemoveAvatar} />
                </div>
              </div>
            ) : (
              <>
                <input
                  type="file"
                  id="avatar-upload"
                  accept=".jpg,.jpeg,.png,.webp"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
                <button
                  type="button"
                  className="flex justify-center items-center pt-5 pb-6 border border-dashed border-gray-300 rounded-lg cursor-pointer h-24 mt-3 hover:bg-[#fceed966] hover:border-[#F6D4A0] w-full"
                  onClick={() => document.getElementById("avatar-upload")?.click()}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      document.getElementById("avatar-upload")?.click();
                    }
                  }}
                >
                  <IoIosAddCircle className="text-gray-500" />
                  <p className="text-gray-500 ms-1">ADD AN AVATAR</p>
                </button>
              </>
            )}
          </div>

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
              <div className="flex gap-4 items-center w-full mb-2" key={`availableFor-${index}`}>
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
