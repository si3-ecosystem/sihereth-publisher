import { RiDeleteBinLine } from "react-icons/ri";
import { FaCirclePlus } from "react-icons/fa6";
import DrawerHeader from "./DrawerHeader";
import { useSelector, useDispatch } from "react-redux";
import { updateContent } from "@/redux/contentSlice";
import type { RootState } from "@/redux/store";
import { inputStyles } from "@/utils/customStyles";
import { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";

const SliderFields = ({ toggleDrawer }: { toggleDrawer: () => void }) => {
  const dispatch = useDispatch();
  const sliderData: string[] = useSelector((state: RootState) => state.content.slider) || [];
  const [localData, setLocalData] = useState<string[]>(sliderData);

  // Debounced Redux update
  const debouncedUpdate = useCallback(
    debounce((data: string[]) => {
      dispatch(updateContent({ section: "slider", data }));
    }, 100),
    [dispatch]
  );

  // Sync localData with Redux (initial load)
  useEffect(() => {
    setLocalData(sliderData);
  }, [sliderData]);

  // Update Redux when localData changes (debounced)
  useEffect(() => {
    debouncedUpdate(localData);
    return () => debouncedUpdate.cancel(); // Cleanup
  }, [localData, debouncedUpdate]);

  const handleInputChange = (index: number, value: string) => {
    const updatedArray = [...localData];
    updatedArray[index] = value;
    setLocalData(updatedArray); // Immediate local update
  };

  const addToArray = () => {
    setLocalData([...localData, ""]);
  };

  const removeFromArray = (index: number) => {
    if (localData.length <= 1) return;
    const updatedArray = localData.filter((_, i) => i !== index);
    setLocalData(updatedArray);
  };

  return (
    <>
      <DrawerHeader label="Slider Section" toggleDrawer={toggleDrawer} />
      <div className="w-full font-dm-sans font-medium text-xs mb-28 overflow-y-auto max-h-[calc(100vh-5rem)]">
        <section className="p-4 xl:p-6">
          <label htmlFor="slider">Slider Items</label>
          {localData.map((item: string, index: number) => (
            <div key={`slider-${index}`} className="flex gap-4 items-center w-full">
              <input
                type="text"
                id={`slider-${index}`}
                className={inputStyles}
                value={item}
                onChange={(e) => handleInputChange(index, e.target.value)}
              />
              {localData.length > 1 && (
                <RiDeleteBinLine
                  className="mt-2 size-4 text-red-500 cursor-pointer"
                  onClick={() => removeFromArray(index)}
                />
              )}
            </div>
          ))}
          <div className="flex gap-2 items-center mt-6 cursor-pointer" onClick={addToArray}>
            <FaCirclePlus className="text-[#a020f0] size-4 ml-1" />
            <p className="text-gray-600">Add Item</p>
          </div>
        </section>
      </div>
    </>
  );
};

export default SliderFields;
