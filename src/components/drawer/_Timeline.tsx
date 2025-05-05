import { RiDeleteBinLine } from "react-icons/ri";
import { FaCirclePlus } from "react-icons/fa6";
import DrawerHeader from "./DrawerHeader";
import type { TimelineTypes } from "@/utils/types";
import { useDispatch, useSelector } from "react-redux";
import { updateContent } from "@/redux/contentSlice";
import type { RootState } from "@/redux/store";
import { TimelineStyles } from "@/utils/customStyles";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

// Maximum number of timeline entries allowed
const MAX_TIMELINE_ENTRIES = 8;

const TimelineFields = ({ toggleDrawer }: { toggleDrawer: () => void }) => {
  const dispatch = useDispatch();
  const data: TimelineTypes[] = useSelector((state: RootState) => state.content.timeline);
  const [localData, setLocalData] = useState<TimelineTypes[]>(data);

  useEffect(() => {
    setLocalData(data);
  }, [data]);

  const handleInputChange = (index: number, field: keyof TimelineTypes, value: string) => {
    const updatedValue = value.toUpperCase();

    // Validate input for "from" field
    if (field === "from") {
      // Allow partial "PRESENT" or up to 4 digits
      if (!"PRESENT".startsWith(updatedValue) && !/^\d{0,4}$/.test(updatedValue)) {
        return;
      }
      // If user has entered 4 digits, but not a valid year, you can add further checks here if needed
    }

    // Validate input for "to" field
    if (field === "to") {
      if (!/^\d*$/.test(updatedValue)) {
        return;
      }
    }

    // Create a new array to update the Redux store
    const updatedData = [...localData];
    updatedData[index] = { ...updatedData[index], [field]: updatedValue };

    // If "from" is set to "PRESENT", clear the "to" field
    if (field === "from" && updatedValue === "PRESENT") {
      updatedData[index].to = "";
    }

    // Update local state and Redux store
    setLocalData(updatedData);
    dispatch(updateContent({ section: "timeline", data: updatedData }));
  };

  const addTimelineEntry = () => {
    if (localData.length >= MAX_TIMELINE_ENTRIES) {
      toast.error(`You can add a maximum of ${MAX_TIMELINE_ENTRIES} timeline entries.`);
      return;
    }

    const newEntry: TimelineTypes = { title: "", from: "", to: "" };
    const updatedData = [...localData, newEntry];

    setLocalData(updatedData);
    dispatch(updateContent({ section: "timeline", data: updatedData }));
    toast.success("New timeline entry added");
  };

  const removeTimelineEntry = (index: number) => {
    if (localData.length <= 1) {
      toast.error("You must have at least one timeline entry.");
      return;
    }

    const updatedData = localData.filter((_, i) => i !== index);
    setLocalData(updatedData);
    dispatch(updateContent({ section: "timeline", data: updatedData }));
    toast.success("Timeline entry removed");
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
                  <div key={`timeline-${index}`} className="border rounded-lg border-gray-300 p-4 relative">
                    <div className="flex gap-6 mb-4">
                      <section className="flex-1">
                        <label htmlFor={`from-${index}`} className="block mb-1">
                          From
                        </label>
                        <input
                          type="text"
                          id={`from-${index}`}
                          className={TimelineStyles}
                          value={item.from}
                          onChange={(e) => handleInputChange(index, "from", e.target.value)}
                          placeholder="YYYY or PRESENT"
                          maxLength={7}
                        />
                      </section>
                      <section className="flex-1">
                        <label htmlFor={`to-${index}`} className="block mb-1">
                          To
                        </label>
                        <input
                          type="text"
                          id={`to-${index}`}
                          className={`${TimelineStyles} ${item.from === "PRESENT" ? "bg-gray-100" : ""}`}
                          value={item.to}
                          onChange={(e) => handleInputChange(index, "to", e.target.value)}
                          placeholder="YYYY"
                          disabled={item.from === "PRESENT"}
                          maxLength={4}
                        />
                      </section>
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

                {/* Add Timeline Entry button below the entries */}
                {localData.length < MAX_TIMELINE_ENTRIES && (
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
