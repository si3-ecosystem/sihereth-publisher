import { useDispatch, useSelector } from "react-redux";
import { updateContent } from "@/redux/contentSlice";
import type { RootState } from "@/redux/store";
import { inputStyles } from "@/utils/customStyles";
import DrawerHeader from "./DrawerHeader";
import type { ValueTypes } from "@/utils/types";

const ValueFields = ({ toggleDrawer }: { toggleDrawer: () => void }) => {
  const dispatch = useDispatch();
  const valueData = useSelector((state: RootState) => state.content.value);

  // Memoize input change handlers to avoid recreating functions on each render
  const handleExperienceChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= 500) {
      dispatch(
        updateContent({
          section: "value",
          data: { experience: value }
        })
      );
    }
  };

  const handleValuesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= 500) {
      dispatch(
        updateContent({
          section: "value",
          data: { values: value }
        })
      );
    }
  };

  // Calculate character counts only once
  const experienceLength = valueData?.experience?.length || 0;
  const valuesLength = valueData?.values?.length || 0;

  return (
    <>
      <DrawerHeader label="Value Section" toggleDrawer={toggleDrawer} />
      <div className="w-full font-dm-sans font-medium text-xs mb-28 overflow-y-auto max-h-[calc(100vh-5rem)]">
        {/* Experience Section */}
        <section className="p-4 xl:p-6">
          <label htmlFor="experience" className="block mb-2">
            My Experience Summary
          </label>
          <textarea
            id="experience"
            className={inputStyles}
            value={valueData?.experience || ""}
            onChange={handleExperienceChange}
            rows={4}
            maxLength={500}
            aria-describedby="experience-count"
          />
          <p id="experience-count" className="text-sm text-gray-500 mt-1">
            {experienceLength}/500
          </p>
        </section>

        {/* Values Section */}
        <section className="p-4 xl:p-6">
          <label htmlFor="values" className="block mb-2">
            My Vision
          </label>
          <textarea
            id="values"
            className={inputStyles}
            value={valueData?.values || ""}
            onChange={handleValuesChange}
            rows={4}
            maxLength={500}
            aria-describedby="values-count"
          />
          <p id="values-count" className="text-sm text-gray-500 mt-1">
            {valuesLength}/500
          </p>
        </section>
      </div>
    </>
  );
};

export default ValueFields;
