import { RiDeleteBinLine } from "react-icons/ri";
import { FaCirclePlus } from "react-icons/fa6";
import DrawerHeader from "./DrawerHeader";
import { useDispatch, useSelector } from "react-redux";
import { updateContent } from "@/redux/contentSlice";
import { RootState } from "@/redux/store";
import { inputStyles } from "@/utils/customStyles";
import { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";
import toast from "react-hot-toast";

const AvailableFields = ({ toggleDrawer }: { toggleDrawer: () => void }) => {
  const dispatch = useDispatch();
  const { availableFor } = useSelector((state: RootState) => state.content.available) ?? {};
  const [localTags, setLocalTags] = useState<string[]>(availableFor ?? []);
  const [inputValues, setInputValues] = useState<string[]>(availableFor ?? []);

  // Debounced Redux update
  const debouncedUpdate = useCallback(
    debounce((tags: string[]) => {
      dispatch(updateContent({ section: "available", data: { availableFor: tags } }));
    }, 100),
    [dispatch]
  );

  // Sync with Redux on mount
  useEffect(() => {
    setLocalTags(availableFor ?? []);
    setInputValues(availableFor ?? []);
  }, [availableFor]);

  // Update Redux when localTags change
  useEffect(() => {
    debouncedUpdate(localTags);
    return () => debouncedUpdate.cancel();
  }, [localTags, debouncedUpdate]);

  const handleInputChange = (index: number, value: string) => {
    setInputValues((prev) => {
      const newValues = [...prev];
      newValues[index] = value;
      return newValues;
    });

    // Update localTags only when input is complete (on blur or debounced)
    debounce(() => {
      setLocalTags((prev) => {
        const newTags = [...prev];
        newTags[index] = value;
        return newTags;
      });
    }, 100)();
  };

  const handleBlur = () => {
    setLocalTags(inputValues);
  };

  const addToArray = () => {
    if (localTags.length >= 6) {
      toast.error("You can add a maximum of 6 items.");
      return;
    }
    setLocalTags((prev) => [...prev, ""]);
    setInputValues((prev) => [...prev, ""]);
  };

  const removeFromArray = (index: number) => {
    if (localTags.length <= 1) return;
    setLocalTags((prev) => prev.filter((_, i) => i !== index));
    setInputValues((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      <DrawerHeader label="Available Section" toggleDrawer={toggleDrawer} />
      <div className="w-full font-dm-sans font-medium text-xs mb-28 overflow-y-auto max-h-[calc(100vh-5rem)]">
        <section className="p-4">
          <label htmlFor="tags">Available For</label>
          {inputValues.map((item, index) => (
            <div className="flex gap-4 items-center w-full" key={`available-${index}`}>
              <input
                type="text"
                id={`tag-${index}`}
                className={inputStyles}
                value={item}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onBlur={handleBlur}
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
