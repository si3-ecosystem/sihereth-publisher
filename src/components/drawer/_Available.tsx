import { RiDeleteBinLine } from "react-icons/ri";
import { FaCirclePlus } from "react-icons/fa6";
import DrawerHeader from "./DrawerHeader";
import { useDispatch, useSelector } from "react-redux";
import { addArrayItem, removeArrayItem, updateArrayItem } from "@/redux/contentSlice";
import type { RootState } from "@/redux/store";
import { inputStyles } from "@/utils/customStyles";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const AvailableFields = ({ toggleDrawer }: { toggleDrawer: () => void }) => {
  const dispatch = useDispatch();
  const { availableFor } = useSelector((state: RootState) => state.content.available) ?? {};
  const [inputValues, setInputValues] = useState<string[]>(availableFor ?? []);

  // Sync local state with Redux on mount or when availableFor changes
  useEffect(() => {
    setInputValues(availableFor ?? []);
  }, [availableFor]);

  const handleInputChange = (index: number, value: string) => {
    setInputValues((prev) => {
      const newValues = [...prev];
      newValues[index] = value;
      return newValues;
    });

    // Update Redux in real-time
    const trimmedValue = value.trim();
    if (trimmedValue !== availableFor[index]) {
      dispatch(
        updateArrayItem({
          section: "available",
          fieldName: "availableFor",
          index,
          value: trimmedValue || "" // Allow empty strings during typing
        })
      );
    }
  };

  const addToArray = () => {
    if (inputValues.length >= 5) {
      toast.error("You can add a maximum of 5 items.");
      return;
    }

    dispatch(
      addArrayItem({
        section: "available",
        fieldName: "availableFor",
        value: ""
      })
    );
    setInputValues((prev) => [...prev, ""]);
    toast.success("Item added successfully!");
  };

  const removeFromArray = (index: number) => {
    if (inputValues.length <= 1) {
      toast.error("You must have at least one item.");
      return;
    }

    dispatch(
      removeArrayItem({
        section: "available",
        fieldName: "availableFor",
        index
      })
    );
    setInputValues((prev) => prev.filter((_, i) => i !== index));
    toast.success("Item removed successfully!");
  };

  return (
    <>
      <DrawerHeader label="Available Section" toggleDrawer={toggleDrawer} />
      <div className="w-full font-dm-sans font-medium text-xs mb-28 overflow-y-auto max-h-[calc(100vh-5rem)]">
        <section className="p-4">
          <label htmlFor="tags" className="block mb-2 text-sm font-medium">
            Available For
          </label>
          {inputValues.map((item, index) => (
            <div className="flex gap-4 items-center w-full mb-2" key={index}>
              <input
                type="text"
                id={`tag-${index}`}
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
        </section>
      </div>
    </>
  );
};

export default AvailableFields;
