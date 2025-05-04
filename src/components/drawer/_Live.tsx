import { RiDeleteBinLine } from "react-icons/ri";
import { IoIosAddCircle } from "react-icons/io";
import { FaCirclePlus } from "react-icons/fa6";
import DrawerHeader from "./DrawerHeader";
import { useDispatch, useSelector } from "react-redux";
import { updateContent } from "@/redux/contentSlice";
import type { RootState } from "@/redux/store";
import { ChangeEvent } from "react";
import { inputStyles } from "@/utils/customStyles";
import Image from "next/image";

const LiveFields = ({ toggleDrawer }: { toggleDrawer: () => void }) => {
  const dispatch = useDispatch();
  const live = useSelector((state: RootState) => state.content.live);

  // Handle file upload for image
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = URL.createObjectURL(e.target.files[0]); // Temporary preview
      dispatch(updateContent({ section: "live", data: { image: file } }));
    }
  };

  // Handle video URL input
  const handleVideoChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(updateContent({ section: "live", data: { video: e.target.value } }));
  };

  // Handle details update
  const handleDetailChange = (index: number, field: string, value: string) => {
    const updatedDetails = [...live.details];
    updatedDetails[index] = { ...updatedDetails[index], [field]: value };
    dispatch(updateContent({ section: "live", data: { details: updatedDetails } }));
  };

  // Add new detail
  const addDetail = () => {
    const newDetail = { title: "", heading: "", body: "" };
    dispatch(updateContent({ section: "live", data: { details: [...live.details, newDetail] } }));
  };

  // Remove detail
  const removeDetail = (index: number) => {
    const updatedDetails = live.details.filter((_, i) => i !== index);
    dispatch(updateContent({ section: "live", data: { details: updatedDetails } }));
  };

  return (
    <>
      <DrawerHeader label="Live Section" toggleDrawer={toggleDrawer} />
      <div className="w-full font-dm-sans font-medium text-xs mb-28 overflow-y-auto max-h-[calc(100vh-5rem)]">
        {/* Image */}
        <section className="p-4 xl:p-6">
          <label htmlFor="image">Image</label>
          {live.image ? (
            <div className="relative w-40 h-40 mt-3">
              <Image src={live.image} alt="Live" width={80} height={80} className="w-full h-full object-cover rounded-lg" />
              <button
                className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
                onClick={() => dispatch(updateContent({ section: "live", data: { image: "" } }))}
              >
                <RiDeleteBinLine />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <input type="file" id="image" className="hidden" onChange={handleImageChange} />
              <label
                htmlFor="image"
                className="flex justify-center items-center pt-5 pb-6 border border-dashed border-gray-300 rounded-lg cursor-pointer h-24 mt-3 w-full hover:bg-[#fceed966] hover:border-[#F6D4A0]"
              >
                <IoIosAddCircle className="text-gray-500" />
                <p className="text-gray-500 ms-1">ADD AN IMAGE</p>
              </label>
              <span className="mt-2 text-red-500">* Image must be .jpg, .jpeg, .png</span>
            </div>
          )}
        </section>

        {/* Video */}
        <section className="p-4 xl:p-6">
          <label htmlFor="video">Video</label>
          <input
            type="text"
            id="video"
            value={live.video}
            onChange={handleVideoChange}
            placeholder="Enter Video URL or Upload"
            className={inputStyles}
          />
          {live.video && (
            <video controls className="mt-3 w-full">
              <source src={live.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </section>

        {/* Details */}
        <section className="p-4 xl:p-6">
          <label>Details</label>
          {live.details.map((detail, index) => (
            <div key={index} className="border p-3 rounded-md mt-3">
              <label htmlFor={`title-${index}`}>Title</label>
              <input
                type="text"
                id={`title-${index}`}
                value={detail.title}
                placeholder="Title"
                onChange={(e) => handleDetailChange(index, "title", e.target.value)}
                className={inputStyles}
              />

              <label htmlFor={`heading-${index}`} className="mt-2 block">
                Heading
              </label>
              <input
                type="text"
                id={`heading-${index}`}
                value={detail.heading}
                placeholder="Heading"
                onChange={(e) => handleDetailChange(index, "heading", e.target.value)}
                className={inputStyles}
              />

              <label htmlFor={`body-${index}`} className="mt-2 block">
                Body
              </label>
              <textarea
                id={`body-${index}`}
                value={detail.body}
                placeholder="Body"
                onChange={(e) => handleDetailChange(index, "body", e.target.value)}
                className={inputStyles}
              />

              <button
                className="text-red-500 text-lg mt-2"
                onClick={() => removeDetail(index)}
              >
                <RiDeleteBinLine className="inline-block mr-1 size-4" />
              </button>
            </div>
          ))}
          <div className="flex gap-2 items-center mt-6 cursor-pointer" onClick={addDetail}>
            <FaCirclePlus className="text-[#a020f0] ml-1 size-3" />
            <p className="text-gray-600 text-xs">Add Detail</p>
          </div>
        </section>
      </div>
    </>
  );
};

export default LiveFields;
