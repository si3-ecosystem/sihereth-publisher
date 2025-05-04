"use client";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaCirclePlus, FaUpload } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import DrawerHeader from "./DrawerHeader";
import { useSelector, useDispatch } from "react-redux";
import { updateContent } from "@/redux/contentSlice";
import type { RootState } from "@/redux/store";
import { useState, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import { toast } from "react-hot-toast";
import { inputStyles } from "@/utils/customStyles";

const OrgsFields = ({ toggleDrawer }: { toggleDrawer: () => void }) => {
  const dispatch = useDispatch();

  const organizations: Array<string | StaticImageData> =
    useSelector((state: RootState) => state.content.organizations) || [];
  const [localData, setLocalData] = useState<Array<string | StaticImageData>>(organizations);
  const [shouldUpdateRedux, setShouldUpdateRedux] = useState(false);

  useEffect(() => {
    setLocalData(organizations);
  }, [organizations]);

  useEffect(() => {
    if (shouldUpdateRedux) {
      const validData = localData.filter((item) => item !== null) as string[];
      dispatch(updateContent({ section: "organizations", data: validData }));
      setShouldUpdateRedux(false);
    }
  }, [shouldUpdateRedux, localData, dispatch]);

  const handleImageUpload = (index: number, file: File) => {
    const validTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      toast.error("Only PNG, JPG, and JPEG are allowed.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      toast.error("File size exceeds 2MB.");
      return;
    }
    const imageUrl = URL.createObjectURL(file);
    const updatedArray = [...localData];
    updatedArray[index] = imageUrl;
    setLocalData(updatedArray);
    setShouldUpdateRedux(true);
  };

  const addToArray = () => {
    if (localData.length >= 7) {
      toast.error("You can add a maximum of 7 organizations.");
      return;
    }
    setLocalData([...localData, ""]);
    setShouldUpdateRedux(true);
  };

  const removeFromArray = (index: number) => {
    if (localData.length <= 1) return;
    const updatedArray = localData.filter((_, i) => i !== index);
    setLocalData(updatedArray);
    setShouldUpdateRedux(true);
  };

  return (
    <>
      <DrawerHeader label="Organizations Section" toggleDrawer={toggleDrawer} />
      <div className="w-full font-dm-sans font-medium text-xs mb-28 overflow-y-auto max-h-[calc(100vh-5rem)]">
        <section className="p-4 xl:p-6">
          <label htmlFor="slider" className="block mb-4">
            Organizations I Support
          </label>
          {localData.map((item, index) => (
            <div key={index} className={`${inputStyles} flex gap-4 justify-between items-center w-full mb-4`}>
              {item ? (
                <Image src={item} alt={`Organization ${index}`} width={70} height={70} className="object-cover" />
              ) : (
                <div className="text-gray-500">No image</div>
              )}
              <section className="flex gap-4 items-center">
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  className="hidden"
                  id={`upload-${index}`}
                  onChange={(e) => e.target.files && handleImageUpload(index, e.target.files[0])}
                />
                <label htmlFor={`upload-${index}`} className="cursor-pointer text-blue-500">
                  {item ? (
                    <FaRegEdit className="size-4 text-blue-500" />
                  ) : (
                    <FaUpload className="size-4 text-blue-500" />
                  )}
                </label>
                {localData.length > 1 && (
                  <RiDeleteBinLine
                    className="size-4 text-red-500 cursor-pointer"
                    onClick={() => removeFromArray(index)}
                  />
                )}
              </section>
            </div>
          ))}

          <div className="flex gap-2 items-center mt-6 cursor-pointer" onClick={addToArray}>
            <FaCirclePlus className="text-[#a020f0] size-3 ml-1" />
            <p className="text-gray-600">Add Organization</p>
          </div>
        </section>
      </div>
    </>
  );
};

export default OrgsFields;
