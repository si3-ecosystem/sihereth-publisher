import { RiDeleteBinLine } from "react-icons/ri";
import { FaCirclePlus } from "react-icons/fa6";
import DrawerHeader from "./DrawerHeader";
import { useSelector, useDispatch } from "react-redux";
import { updateContent } from "@/redux/contentSlice";
import { RootState } from "@/redux/store";
import { useState, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
const OrgsFields = ({ toggleDrawer }: { toggleDrawer: () => void }) => {
  const dispatch = useDispatch();

  // Fetch organization images from Redux (stored as URLs)
  const organizations: string[] | StaticImageData[] =
    useSelector((state: RootState) => state.content.organizations) || [];

  // Local state for managing image URLs
  const [localData, setLocalData] = useState<string[]>(organizations);

  // Sync local state with Redux
  useEffect(() => {
    setLocalData(organizations);
  }, [organizations]);

  // Update Redux when localData changes
  useEffect(() => {
    dispatch(updateContent({ section: "organizations", data: localData }));
  }, [localData, dispatch]);

  // Handle image upload
  const handleImageUpload = (index: number, file: File) => {
    const imageUrl = URL.createObjectURL(file); // Temporary preview URL
    const updatedArray = [...localData];
    updatedArray[index] = imageUrl;
    setLocalData(updatedArray);

    // TODO: Upload image to backend and replace with actual URL
  };

  // Add a new empty slot for an organization logo
  const addToArray = () => {
    setLocalData([...localData, ""]);
  };

  // Remove an organization logo
  const removeFromArray = (index: number) => {
    if (localData.length <= 1) return;
    const updatedArray = localData.filter((_, i) => i !== index);
    setLocalData(updatedArray);
  };

  return (
    <>
      <DrawerHeader label="Organizations" toggleDrawer={toggleDrawer} />
      <div className="w-full font-dm-sans font-medium text-lg mb-28 overflow-y-auto max-h-[calc(100vh-5rem)]">
        <section className="p-4 xl:p-6">
          <label className="text-lg font-semibold">Organizations I Support</label>
          {localData.map((image, index) => (
            <div key={index} className="flex gap-6 mb-4 items-center w-full">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files && handleImageUpload(index, e.target.files[0])}
                className="hidden"
                id={`upload-${index}`}
              />
              <label htmlFor={`upload-${index}`} className="cursor-pointer text-blue-500">
                Upload
              </label>
              {image && <Image src={image} alt="Organization Logo" className="w-20 h-auto object-cover rounded" />}
              {localData.length > 1 && (
                <RiDeleteBinLine
                  className="size-5 text-red-500 cursor-pointer"
                  onClick={() => removeFromArray(index)}
                />
              )}
            </div>
          ))}
          <div className="flex gap-2 items-center mt-6 cursor-pointer" onClick={addToArray}>
            <FaCirclePlus className="text-[#a020f0] text-lg ml-1" />
            <p className="text-sm text-gray-600">Add Organization</p>
          </div>
        </section>
      </div>
    </>
  );
};

export default OrgsFields;
