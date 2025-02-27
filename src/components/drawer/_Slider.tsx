import DrawerHeader from "./DrawerHeader";
import { inputStyles } from "@/utils/customStyles";

const SliderFields = ({ toggleDrawer }: { toggleDrawer: () => void }) => {
  return (
    <>
      {/* Header */}
      <DrawerHeader label="Slider Section" toggleDrawer={toggleDrawer} />
      <div className="w-full font-dm-sans font-medium text-lg text-gray-800 mb-28 overflow-y-auto max-h-[calc(100vh-5rem)]">
        {/* Title */}
        <section className="p-4 xl:p-6">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" className={inputStyles} />
        </section>
      </div>
    </>
  );
};

export default SliderFields;
