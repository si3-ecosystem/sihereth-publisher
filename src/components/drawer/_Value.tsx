import DrawerHeader from "./DrawerHeader";
import { ValueTypes } from "@/utils/types";
import { useDispatch, useSelector } from "react-redux";
import { updateContent } from "@/redux/contentSlice";
import { RootState } from "@/redux/store";
import { inputStyles } from "@/utils/customStyles";

const ValueFields = ({ toggleDrawer }: { toggleDrawer: () => void }) => {
  const dispatch = useDispatch();
  const data: ValueTypes = useSelector((state: RootState) => state.content.value);

  const handleInputChange = (field: keyof ValueTypes, value: string) => {
    if (value.length <= 500) {
      dispatch(updateContent({ section: "value", data: { [field]: value } }));
    }
  };

  return (
    <>
      {/* Header */}
      <DrawerHeader label="Value Section" toggleDrawer={toggleDrawer} />
      <div className="w-full font-dm-sans font-medium text-lg mb-28 overflow-y-auto max-h-[calc(100vh-5rem)]">
        {/* Experience */}
        <section className="p-4 xl:p-6">
          <label htmlFor="experience">Experience</label>
          <textarea
            id="experience"
            className={inputStyles}
            value={data?.experience || ""}
            onChange={(e) => handleInputChange("experience", e.target.value)}
            rows={4}
            maxLength={500}
          />
          <p className="text-sm text-gray-500">{data?.experience?.length || 0}/500</p>
        </section>
        {/* Values */}
        <section className="p-4 xl:p-6">
          <label htmlFor="values">Values</label>
          <textarea
            id="values"
            className={inputStyles}
            value={data?.values || ""}
            onChange={(e) => handleInputChange("values", e.target.value)}
            rows={4}
            maxLength={500}
          />
          <p className="text-sm text-gray-500">{data?.values?.length || 0}/500</p>
        </section>
      </div>
    </>
  );
};

export default ValueFields;
