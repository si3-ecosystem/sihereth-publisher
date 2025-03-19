import { RiDeleteBinLine } from "react-icons/ri";
import { FaCirclePlus } from "react-icons/fa6";
import DrawerHeader from "./DrawerHeader";
import { useSelector, useDispatch } from "react-redux";
import { updateContent } from "@/redux/contentSlice";
import { RootState } from "@/redux/store";
import { inputStyles } from "@/utils/customStyles";
import { useState, useEffect } from "react";

const SliderFields = ({ toggleDrawer }: { toggleDrawer: () => void }) => {
  const dispatch = useDispatch();
  const sliderData: string[] = useSelector((state: RootState) => state.content.slider) || [];
  const [localData, setLocalData] = useState<string[]>(sliderData);

  useEffect(() => {
    dispatch(updateContent({ section: "slider", data: localData }));
  }, [localData, dispatch]);

  const handleInputChange = (index: number, value: string) => {
    const updatedArray = [...localData];
    updatedArray[index] = value;
    setLocalData(updatedArray);
  };

  const addToArray = () => {
    setLocalData([...localData, "New Item"]);
  };

  const removeFromArray = (index: number) => {
    if (localData.length <= 1) return;
    const updatedArray = localData.filter((_, i) => i !== index);
    setLocalData(updatedArray);
  };

  return (
    <>
      <DrawerHeader label="Slider Section" toggleDrawer={toggleDrawer} />
      <div className="w-full font-dm-sans font-medium text-lg mb-28 overflow-y-auto max-h-[calc(100vh-5rem)]">
        <section className="p-4 xl:p-6">
          <label htmlFor="slider">Slider Items</label>
          {localData.map((item: string, index: number) => (
            <div key={`${item}-${index}`} className="flex gap-4 items-center w-full">
              <input
                type="text"
                id={`slider-${index}`}
                className={inputStyles}
                value={item}
                onChange={(e) => handleInputChange(index, e.target.value)}
              />
              {localData.length > 1 && (
                <RiDeleteBinLine
                  className="mt-2 size-5 text-red-500 cursor-pointer"
                  onClick={() => removeFromArray(index)}
                />
              )}
            </div>
          ))}
          <div className="flex gap-2 items-center mt-6 cursor-pointer" onClick={addToArray}>
            <FaCirclePlus className="text-[#a020f0] text-lg ml-1" />
            <p className="text-sm text-gray-600">Add Item</p>
          </div>
        </section>
      </div>
    </>
  );
};

export default SliderFields;
