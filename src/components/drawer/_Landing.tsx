import { IoIosAddCircle } from "react-icons/io";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaCirclePlus } from "react-icons/fa6";
import { countries } from "@/utils/data";
import DrawerHeader from "./DrawerHeader";
import { LandingTypes } from "@/utils/types";
import { useDispatch, useSelector } from "react-redux";
import { updateContent } from "@/redux/contentSlice";
import { RootState } from "@/redux/store";
import { inputStyles } from "@/utils/customStyles";

const LandingFields = ({ toggleDrawer }: { toggleDrawer: () => void }) => {
  const dispatch = useDispatch();
  const data: LandingTypes = useSelector((state: RootState) => state.content.landing);

  const handleInputChange = (field: keyof LandingTypes, value: any) => {
    dispatch(updateContent({ section: "landing", data: { [field]: value } }));
  };

  const handleArrayChange = (field: keyof LandingTypes, index: number, value: string) => {
    const updatedArray = [...(data[field] as string[])];
    updatedArray[index] = value;
    handleInputChange(field, updatedArray);
  };

  const addToArray = (field: keyof LandingTypes, placeholder: string) => {
    const updatedArray = [...(data[field] as string[]), placeholder];
    handleInputChange(field, updatedArray);
  };

  const removeFromArray = (field: keyof LandingTypes, index: number) => {
    const updatedArray = (data[field] as string[]).filter((_, i) => i !== index);
    handleInputChange(field, updatedArray);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event?.target?.files?.[0]) {
      const file = event.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      handleInputChange("image", imageUrl);
    }
  };

  return (
    <>
      {/* Header */}
      <DrawerHeader label="Headline Section" toggleDrawer={toggleDrawer} />
      <div className="w-full font-dm-sans font-medium text-lg text-gray-800 mb-28 overflow-y-auto max-h-[calc(100vh-5rem)]">
        {/* Title */}
        <section className="p-4 xl:p-6">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            className={inputStyles}
            value={data?.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
          />
        </section>
        {/* Headline */}
        <section className="p-4 xl:p-6">
          <label htmlFor="headline">Impact Headline</label>
          <textarea
            id="headline"
            className={inputStyles}
            value={data?.headline}
            onChange={(e) => handleInputChange("headline", e.target.value)}
            rows={4}
          />
        </section>
        {/* Brand Pillars */}
        <section className="p-4 xl:p-6">
          <label htmlFor="brandPillars">Brand Pillars</label>
          <input
            type="text"
            id="brandPillars"
            className={inputStyles}
            value={data?.brandPilars}
            onChange={(e) => handleInputChange("brandPilars", e.target.value)}
          />
        </section>
        {/* Tags */}
        <section className="p-4 xl:p-6">
          <label htmlFor="tags">Tags</label>
          {data?.hashTags?.map((item, index) => (
            <div className="flex gap-4 items-center w-full" key={`${item}-${index}`}>
              <input
                type="text"
                id={`tag-${index}`}
                className={inputStyles}
                value={item}
                onChange={(e) => handleArrayChange("hashTags", index, e.target.value)}
              />
              <RiDeleteBinLine
                className="mt-2 size-5 text-red-500 cursor-pointer"
                onClick={() => removeFromArray("hashTags", index)}
              />
            </div>
          ))}
          <div
            className="flex gap-2 items-center mt-6 cursor-pointer"
            onClick={() => addToArray("hashTags", "New Tag")}
          >
            <FaCirclePlus className="text-[#a020f0] text-lg" />
            <p className="text-sm text-gray-600">Add Tag</p>
          </div>
        </section>
        {/* Region */}
        <section className="p-4 xl:p-6">
          <label htmlFor="region">Region</label>
          <select
            value={data?.region}
            className={inputStyles}
            id="region"
            onChange={(e) => handleInputChange("region", e.target.value)}
          >
            {countries.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </section>
        {/* Image */}
        <section className="p-4 xl:p-6">
          <label htmlFor="image">Image</label>
          <input type="file" id="image" className="hidden" onChange={handleImageUpload} />
          <div className="flex justify-center items-center pt-5 pb-6 border border-dashed border-gray-300 rounded-lg cursor-pointer h-24 mt-3 hover:bg-[#fceed966] hover:border-[#F6D4A0]">
            <IoIosAddCircle className="text-gray-500" />
            <p className="text-xs text-gray-500 ms-1">ADD AN IMAGE</p>
          </div>
          <span className="mt-6 text-xs text-red-500">*Image must be .jpg, .jpeg, .png</span>
        </section>
        {/* Name */}
        <section className="p-4 xl:p-6">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            className={inputStyles}
            value={data?.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
        </section>
        {/* Pronoun */}
        <section className="p-4 xl:p-6">
          <label htmlFor="pronoun">Pronoun</label>
          <input
            type="text"
            id="pronoun"
            className={inputStyles}
            value={data?.pronoun}
            onChange={(e) => handleInputChange("pronoun", e.target.value)}
          />
        </section>
      </div>
    </>
  );
};

export default LandingFields;
