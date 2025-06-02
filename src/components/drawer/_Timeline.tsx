import { RiDeleteBinLine } from "react-icons/ri";
import { FaCirclePlus } from "react-icons/fa6";
import DrawerHeader from "./DrawerHeader";
import type { TimelineTypes } from "@/utils/types";
import { useDispatch, useSelector } from "react-redux";
import { updateContent } from "@/redux/contentSlice";
import type { RootState } from "@/redux/store";
import { TimelineStyles } from "@/utils/customStyles";
import { useState, useEffect, useCallback, useRef } from "react";
import { toast } from "react-hot-toast";

const TimelineFields = ({ toggleDrawer }: { toggleDrawer: () => void }) => {
  const dispatch = useDispatch();
  const reduxData = useSelector((state: RootState) => state.content.timeline);
  const [localData, setLocalData] = useState<TimelineTypes[]>([]);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      setLocalData(reduxData);
      isInitialMount.current = false;
    }
  }, [reduxData]);

  const updateRedux = useCallback(
    (data: TimelineTypes[]) => {
      dispatch(updateContent({ section: "timeline", data }));
    },
    [dispatch]
  );

  const handleInputChange = (index: number, field: keyof TimelineTypes, value: string) => {
    let updatedValue = value;
    if (field === "from" || field === "to") {
      updatedValue = value.toUpperCase();
      if (!/^\d{0,4}$/.test(updatedValue)) {
        return;
      }
    }
    setLocalData((prevData) => {
      const newData = [...prevData];
      newData[index] = { ...newData[index], [field]: updatedValue };
      updateRedux(newData);
      return newData;
    });
  };

  const handleCurrentlyWorking = (index: number, isChecked: boolean) => {
    setLocalData((prevData) => {
      const newData = [...prevData];
      newData[index] = {
        ...newData[index],
        to: isChecked ? "PRESENT" : ""
      };
      updateRedux(newData);
      return newData;
    });
  };

  const addTimelineEntry = () => {
    if (localData.length >= 8) {
      toast.error("You can add a maximum of eight timeline entries.");
      return;
    }
    const newEntry: TimelineTypes = { title: "", from: "", to: "" };
    setLocalData((prevData) => {
      const newData = [...prevData, newEntry];
      updateRedux(newData);
      return newData;
    });
  };

  const removeTimelineEntry = (index: number) => {
    if (localData.length <= 1) {
      toast.error("You must have at least one timeline entry.");
      return;
    }
    setLocalData((prevData) => {
      const newData = prevData.filter((_, i) => i !== index);
      updateRedux(newData);
      return newData;
    });
  };

  return (
    <>
      {/* Header */}
      <DrawerHeader label="Timeline Section" toggleDrawer={toggleDrawer} />
      <div className="w-full font-dm-sans font-medium text-xs mb-28 overflow-y-auto max-h-[calc(100vh-5rem)]">
        {/* Timeline Entries */}
        <section className="p-4 xl:p-6">
          <div className="flex flex-col gap-4">
            {localData.length === 0 ? (
              <div className="flex flex-col items-center justify-center border border-dashed p-6 rounded-lg">
                <p className="text-gray-400">No timeline entries added yet</p>
                <button
                  type="button"
                  className="flex gap-2 items-center mt-2 text-[#a020f0] hover:text-purple-700"
                  onClick={addTimelineEntry}
                >
                  <FaCirclePlus className="size-3" />
                  <span className="text-xs">Add your first timeline entry</span>
                </button>
              </div>
            ) : (
              <>
                {localData.map((item, index) => (
                  <div key={index} className="border rounded-lg border-gray-300 p-4 relative">
                    <div className="flex gap-6 mb-4">
                      <section className="flex-1">
                        <label htmlFor={`from-${index}`} className="block mb-1">
                          From Year
                        </label>
                        <input
                          type="text"
                          id={`from-${index}`}
                          className={TimelineStyles}
                          value={item.from}
                          onChange={(e) => handleInputChange(index, "from", e.target.value)}
                          placeholder="YYYY"
                          maxLength={4}
                          pattern="\d{4}"
                        />
                      </section>
                      <section className="flex-1">
                        <label htmlFor={`to-${index}`} className="block mb-1">
                          To Year
                        </label>
                        <input
                          type="text"
                          id={`to-${index}`}
                          className={`${TimelineStyles} ${item.to === "PRESENT" ? "bg-gray-100" : ""}`}
                          value={item.to}
                          onChange={(e) => handleInputChange(index, "to", e.target.value)}
                          placeholder="YYYY"
                          disabled={item.to === "PRESENT"}
                          maxLength={4}
                          pattern="\d{4}"
                        />
                      </section>
                    </div>
                    <div className="mb-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={item.to === "PRESENT"}
                          onChange={(e) => handleCurrentlyWorking(index, e.target.checked)}
                          className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        />
                        <span className="text-sm text-gray-600">I currently work here</span>
                      </label>
                    </div>

                    <section>
                      <label htmlFor={`title-${index}`} className="block mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        id={`title-${index}`}
                        className={TimelineStyles}
                        value={item.title}
                        onChange={(e) => handleInputChange(index, "title", e.target.value)}
                        placeholder="Enter position or achievement"
                      />
                    </section>

                    {localData.length > 1 && (
                      <button
                        type="button"
                        className="absolute top-2 right-2 p-1 text-red-500 hover:text-red-700"
                        onClick={() => removeTimelineEntry(index)}
                        aria-label={`Remove timeline entry ${index + 1}`}
                      >
                        <RiDeleteBinLine className="size-4" />
                      </button>
                    )}
                  </div>
                ))}
                {localData.length < 8 && (
                  <button
                    type="button"
                    className="flex gap-2 items-center justify-center text-[#a020f0] hover:text-purple-700 p-3 border border-dashed rounded-lg w-full mt-2"
                    onClick={addTimelineEntry}
                    aria-label="Add timeline entry"
                  >
                    <FaCirclePlus className="size-4" />
                    <span>Add Timeline Entry</span>
                  </button>
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default TimelineFields;
