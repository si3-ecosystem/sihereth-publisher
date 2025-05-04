import { RiDeleteBinLine } from "react-icons/ri";
import { FaCirclePlus } from "react-icons/fa6";
import DrawerHeader from "./DrawerHeader";
import { TimelineTypes } from "@/utils/types";
import { useDispatch, useSelector } from "react-redux";
import { updateContent } from "@/redux/contentSlice";
import type { RootState } from "@/redux/store";
import { TimelineStyles } from "@/utils/customStyles";
import { useState, useEffect } from "react";

const TimelineFields = ({ toggleDrawer }: { toggleDrawer: () => void }) => {
  const dispatch = useDispatch();
  const data: TimelineTypes[] = useSelector((state: RootState) => state.content.timeline);
  const [localData, setLocalData] = useState<TimelineTypes[]>(data);

  useEffect(() => {
    setLocalData(data);
  }, [data]);

  const handleInputChange = (index: number, field: keyof TimelineTypes, value: string) => {
    let updatedValue = value.toUpperCase();
    if (field === "from") {
      if (
        updatedValue !== "PRESENT" &&
        !updatedValue.startsWith("P") &&
        !updatedValue.startsWith("PR") &&
        !updatedValue.startsWith("PRE") &&
        !updatedValue.startsWith("PRES") &&
        !updatedValue.startsWith("PRESE") &&
        !updatedValue.startsWith("PRESEN")
      ) {
        if (!/^\d*$/.test(updatedValue)) {
          return;
        }
      }
    }
    if (field === "to") {
      if (!/^\d*$/.test(updatedValue)) {
        return;
      }
    }
    const updatedData = [...localData];
    updatedData[index] = { ...updatedData[index], [field]: updatedValue };
    if (field === "from" && updatedValue === "PRESENT") {
      updatedData[index].to = "";
    }
    setLocalData(updatedData);
    dispatch(updateContent({ section: "timeline", data: updatedData }));
  };

  const addTimelineEntry = () => {
    const newEntry: TimelineTypes = { title: "", from: "", to: "" };
    const updatedData = [...localData, newEntry];
    setLocalData(updatedData);
    dispatch(updateContent({ section: "timeline", data: updatedData }));
  };

  const removeTimelineEntry = (index: number) => {
    if (localData.length <= 1) {
      alert("You must have at least one timeline entry.");
      return;
    }

    const updatedData = localData.filter((_, i) => i !== index);
    setLocalData(updatedData);
    dispatch(updateContent({ section: "timeline", data: updatedData }));
  };

  return (
    <>
      {/* Header */}
      <DrawerHeader label="Timeline Section" toggleDrawer={toggleDrawer} />
      <div className="w-full font-dm-sans font-medium text-xs mb-28 overflow-y-auto max-h-[calc(100vh-5rem)]">
        {/* Timeline Entries */}
        <section className="p-4 xl:p-6 space-y-4">
          {localData.map((item, index) => (
            <div
              key={index}
              className="w-full py-5 tracking-wide border rounded-lg border-gray-300 p-3 relative space-y-4"
            >
              <div className="flex gap-6">
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
                <RiDeleteBinLine
                  className="absolute top-1 right-3 size-4 text-red-500 cursor-pointer"
                  onClick={() => removeTimelineEntry(index)}
                />
              )}
            </div>
          ))}

          <div className="flex gap-2 items-center mt-6 cursor-pointer" onClick={addTimelineEntry}>
            <FaCirclePlus className="text-[#a020f0] size-3 ml-1" />
            <p className="text-gray-600">Add Timeline Entry</p>
          </div>
        </section>
      </div>
    </>
  );
};

export default TimelineFields;
