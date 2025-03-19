import { RiDeleteBinLine } from "react-icons/ri";
import { FaCirclePlus } from "react-icons/fa6";
import DrawerHeader from "./DrawerHeader";
import { TimelineTypes } from "@/utils/types";
import { useDispatch, useSelector } from "react-redux";
import { updateContent } from "@/redux/contentSlice";
import { RootState } from "@/redux/store";
import { inputStyles, TimelineStyles } from "@/utils/customStyles";
import { useState, useEffect } from "react";

const TimelineFields = ({ toggleDrawer }: { toggleDrawer: () => void }) => {
  const dispatch = useDispatch();
  const data: TimelineTypes[] = useSelector((state: RootState) => state.content.timeline);
  const [localData, setLocalData] = useState<TimelineTypes[]>(data);

  // Sync with Redux state when it changes
  useEffect(() => {
    setLocalData(data);
  }, [data]);

  // Function to handle input changes
  const handleInputChange = (index: number, field: keyof TimelineTypes, value: string) => {
    let updatedValue = value.toUpperCase();

    // Validate "From" field: must be "PRESENT" or a 4-digit year
    if (field === "from") {
      // Allow typing "PRESENT" letter by letter
      if (
        updatedValue !== "PRESENT" &&
        !updatedValue.startsWith("P") &&
        !updatedValue.startsWith("PR") &&
        !updatedValue.startsWith("PRE") &&
        !updatedValue.startsWith("PRES") &&
        !updatedValue.startsWith("PRESE") &&
        !updatedValue.startsWith("PRESEN")
      ) {
        // For numeric values, ensure it's only digits and max 4 characters
        if (!/^\d{0,4}$/.test(updatedValue)) {
          return;
        }

        // If it's a complete 4-digit year, verify it's a reasonable year
        if (updatedValue.length === 4) {
          const year = parseInt(updatedValue, 10);
          if (year < 1900 || year > new Date().getFullYear() + 10) {
            return;
          }
        }
      }
    }

    // Validate "To" field: must be a 4-digit year only
    if (field === "to") {
      // Must be digits only and max 4 characters
      if (!/^\d{0,4}$/.test(updatedValue)) {
        return;
      }

      // If it's a complete 4-digit year, verify it's reasonable and later than from (if from is a year)
      if (updatedValue.length === 4) {
        const year = parseInt(updatedValue, 10);
        const fromYear =
          localData[index].from && /^\d{4}$/.test(localData[index].from) ? parseInt(localData[index].from, 10) : null;

        if (year < 1900 || year > new Date().getFullYear() + 10) {
          return;
        }

        if (fromYear && year < fromYear) {
          alert("'To' year must be equal to or later than 'From' year");
          return;
        }
      }
    }

    const updatedData = [...localData];
    updatedData[index] = { ...updatedData[index], [field]: updatedValue };

    // If "From" is set to "PRESENT", clear "To" and disable it
    if (field === "from" && updatedValue === "PRESENT") {
      updatedData[index].to = "";
    }

    setLocalData(updatedData);
    dispatch(updateContent({ section: "timeline", data: updatedData }));
  };

  // Function to add a new timeline entry
  const addTimelineEntry = () => {
    const newEntry: TimelineTypes = { title: "", from: "", to: "" };
    const updatedData = [...localData, newEntry];
    setLocalData(updatedData);
    dispatch(updateContent({ section: "timeline", data: updatedData }));
  };

  // Function to remove a timeline entry
  const removeTimelineEntry = (index: number) => {
    if (localData.length <= 1) {
      alert("You must have at least one timeline entry.");
      return;
    }

    const updatedData = localData.filter((_, i) => i !== index);
    setLocalData(updatedData);
    dispatch(updateContent({ section: "timeline", data: updatedData }));
  };

  // Function to validate input for final submission
  const validateEntry = (item: TimelineTypes, index: number) => {
    if (!item.title.trim()) {
      alert(`Timeline entry #${index + 1} must have a title.`);
      return false;
    }

    if (!item.from) {
      alert(`Timeline entry #${index + 1} must have a From year or PRESENT.`);
      return false;
    }

    if (item.from !== "PRESENT" && !/^\d{4}$/.test(item.from)) {
      alert(`Timeline entry #${index + 1} From must be PRESENT or a 4-digit year.`);
      return false;
    }

    if (item.to && !/^\d{4}$/.test(item.to)) {
      alert(`Timeline entry #${index + 1} To must be a 4-digit year.`);
      return false;
    }

    return true;
  };

  return (
    <>
      {/* Header */}
      <DrawerHeader label="Timeline Section" toggleDrawer={toggleDrawer} />
      <div className="w-full font-dm-sans font-medium text-lg mb-28 overflow-y-auto max-h-[calc(100vh-5rem)]">
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
                  className="absolute top-1 right-3 size-5 text-red-500 cursor-pointer"
                  onClick={() => removeTimelineEntry(index)}
                />
              )}
            </div>
          ))}

          <div className="flex gap-2 items-center mt-6 cursor-pointer" onClick={addTimelineEntry}>
            <FaCirclePlus className="text-[#a020f0] text-lg ml-1" />
            <p className="text-sm text-gray-600">Add Timeline Entry</p>
          </div>
        </section>
      </div>
    </>
  );
};

export default TimelineFields;
