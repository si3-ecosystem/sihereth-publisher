import { RiDeleteBinLine } from "react-icons/ri";
import { FaCirclePlus } from "react-icons/fa6";
import DrawerHeader from "./DrawerHeader";
import { useDispatch, useSelector } from "react-redux";
import { updateContent } from "@/redux/contentSlice";
import type { RootState } from "@/redux/store";
import { useState, useEffect } from "react";
import { socialChannels as availableChannels } from "@/utils/data";

const MAX_SOCIAL_ENTRIES = 3;

const isValidUrl = (url: string) => {
  try {
    // Accept empty string as valid (so user can clear input)
    if (!url) return true;
    // Only accept http/https URLs
    const parsed = new URL(url);
    return ["http:", "https:"].includes(parsed.protocol);
  } catch {
    return false;
  }
};

const FooterFields = ({ toggleDrawer }: { toggleDrawer: () => void }) => {
  const dispatch = useDispatch();
  const socialData = useSelector((state: RootState) => state.content.socialChannels);
  const [localSocials, setLocalSocials] = useState(socialData);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    setLocalSocials(socialData);
    setErrors(socialData.map(() => "")); // Reset errors on data change
  }, [socialData]);

  const handleInputChange = (index: number, field: "icon" | "url", value: string) => {
    const updated = [...localSocials];
    updated[index] = { ...updated[index], [field]: value };
    setLocalSocials(updated);

    // Validate URL if field is "url"
    if (field === "url") {
      const newErrors = [...errors];
      if (!isValidUrl(value)) {
        newErrors[index] = "URL is not valid";
        setErrors(newErrors);
        // Do not update Redux if invalid
        return;
      } else {
        newErrors[index] = "";
        setErrors(newErrors);
      }
    }

    dispatch(updateContent({ section: "socialChannels", data: updated }));
  };

  const addSocialEntry = () => {
    if (localSocials.length >= MAX_SOCIAL_ENTRIES) return;
    const newEntry = { icon: "", url: "" };
    const updated = [...localSocials, newEntry];
    setLocalSocials(updated);
    dispatch(updateContent({ section: "socialChannels", data: updated }));
  };

  const removeSocialEntry = (index: number) => {
    if (localSocials.length <= 1) return;
    const updated = localSocials.filter((_, i) => i !== index);
    setLocalSocials(updated);
    dispatch(updateContent({ section: "socialChannels", data: updated }));
  };

  return (
    <>
      <DrawerHeader label="Footer / Social Links" toggleDrawer={toggleDrawer} />
      <div className="w-full font-dm-sans font-medium text-xs mb-28 overflow-y-auto max-h-[calc(100vh-5rem)]">
        <section className="p-4 xl:p-6">
          <div className="flex flex-col gap-4">
            {localSocials.map((item, index) => (
              <div key={index} className="border rounded-lg border-gray-300 p-4 relative">
                {/* Social Icon Dropdown */}
                <section className="mb-4">
                  <label htmlFor={`icon-${index}`} className="block mb-1">
                    Social Platform
                  </label>
                  <select
                    id={`icon-${index}`}
                    className="w-full border px-3 py-2 rounded text-sm"
                    value={item.icon}
                    onChange={(e) => handleInputChange(index, "icon", e.target.value)}
                  >
                    <option value="">Select a platform</option>
                    {availableChannels.map((channel) => (
                      <option key={channel.name} value={channel.icon}>
                        {channel.name}
                      </option>
                    ))}
                  </select>
                </section>

                {/* URL Input */}
                <section>
                  <label htmlFor={`url-${index}`} className="block mb-1">
                    Link URL
                  </label>
                  <input
                    type="text"
                    id={`url-${index}`}
                    className={`w-full border px-3 py-2 rounded text-sm ${errors[index] ? "border-red-500" : ""}`}
                    placeholder="https://linkedin.com/in/username"
                    value={item.url}
                    onChange={(e) => handleInputChange(index, "url", e.target.value)}
                  />
                  {errors[index] && <p className="text-red-500 mt-2 text-xs">{errors[index]}</p>}
                </section>

                {/* Remove Button */}
                {localSocials.length > 1 && (
                  <button
                    type="button"
                    className="absolute top-2 right-2 p-1 text-red-500 hover:text-red-700"
                    onClick={() => removeSocialEntry(index)}
                    aria-label={`Remove social entry ${index + 1}`}
                  >
                    <RiDeleteBinLine className="size-4" />
                  </button>
                )}
              </div>
            ))}

            {/* Add Button */}
            {localSocials.length < MAX_SOCIAL_ENTRIES && (
              <button
                type="button"
                className="flex gap-2 items-center text-[#a020f0] hover:text-purple-700 p-3 rounded-lg w-full mt-2"
                onClick={addSocialEntry}
                aria-label="Add social link"
              >
                <FaCirclePlus className="size-4" />
                <span>Add Social Link</span>
              </button>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default FooterFields;
