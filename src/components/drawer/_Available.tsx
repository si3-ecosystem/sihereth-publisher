import { RiDeleteBinLine } from "react-icons/ri";
import { FaCirclePlus } from "react-icons/fa6";
import DrawerHeader from "./DrawerHeader";
import { useDispatch, useSelector } from "react-redux";
import { updateContent } from "@/redux/contentSlice";
import { RootState } from "@/redux/store";
import { inputStyles } from "@/utils/customStyles";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const AvailableFields = ({ toggleDrawer }: { toggleDrawer: () => void }) => {
  const dispatch = useDispatch();
  const { avatar, availableFor } = useSelector((state: RootState) => state.content.available) ?? {};
  const [tags, setTags] = useState<string[]>(availableFor ?? []);

  useEffect(() => {
    const handler = setTimeout(() => {
      dispatch(updateContent({ section: "available", data: tags }));
    }, 300);
    return () => clearTimeout(handler);
  }, [tags]);

  const handleInputChange = (index: number, value: string) => {
    setTags((prevTags) => {
      const updatedTags = [...prevTags];
      updatedTags[index] = value;
      return updatedTags;
    });
  };

  const addToArray = () => {
    if (tags.length >= 6) {
      toast.error("You can add a maximum of 6 items.");
      return;
    }
    setTags((prev) => [...prev, ""]);
  };

  const removeFromArray = (index: number) => {
    if (tags.length <= 1) return;
    setTags((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      <DrawerHeader label="Available Section" toggleDrawer={toggleDrawer} />
      <div className="w-full font-dm-sans font-medium text-xs mb-28 overflow-y-auto max-h-[calc(100vh-5rem)]">
        <section className="p-4">
          <label htmlFor="tags">Available For</label>
          {availableFor.map((item, index) => (
            <div className="flex gap-4 items-center w-full" key={index}>
              <input
                type="text"
                id={`tag-${index}`}
                className={inputStyles}
                value={item}
                onChange={(e) => handleInputChange(index, e.target.value)}
              />
              <RiDeleteBinLine
                className="mt-2 size-4 text-red-500 cursor-pointer"
                onClick={() => removeFromArray(index)}
              />
            </div>
          ))}
          <div className="flex gap-2 items-center mt-6 cursor-pointer" onClick={addToArray}>
            <FaCirclePlus className="text-[#a020f0] ml-1 size-3" />
            <p className="text-gray-600 text-xs">Add Item</p>
          </div>
        </section>
      </div>
    </>
  );
};

export default AvailableFields;
