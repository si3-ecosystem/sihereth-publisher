import { RiDeleteBinLine } from "react-icons/ri";
import { IoIosAddCircle } from "react-icons/io";
import { FaCirclePlus } from "react-icons/fa6";
import DrawerHeader from "./DrawerHeader";
import { useDispatch, useSelector } from "react-redux";
import { updateContent, updateArrayItem, addArrayItem, removeArrayItem } from "@/redux/contentSlice";
import type { RootState } from "@/redux/store";
import type { ChangeEvent } from "react";
import { inputStyles } from "@/utils/customStyles";
import Image from "next/image";

const MAX_DETAILS = 6;

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

  // Remove image
  const removeImage = () => {
    dispatch(updateContent({ section: "live", data: { image: "" } }));
  };

  // Handle details update - using updateArrayItem reducer
  const handleDetailChange = (index: number, field: string, value: string) => {
    const currentDetail = live.details[index];
    const updatedDetail = { ...currentDetail, [field]: value };

    dispatch(
      updateArrayItem({
        section: "live",
        fieldName: "details",
        index,
        value: updatedDetail
      })
    );
  };

  // Add new detail - using addArrayItem reducer
  const addDetail = () => {
    if (live.details.length >= MAX_DETAILS) {
      alert(`You can add a maximum of ${MAX_DETAILS} details`);
      return;
    }

    const newDetail = { title: "", heading: "", body: "" };
    dispatch(
      addArrayItem({
        section: "live",
        fieldName: "details",
        value: newDetail
      })
    );
  };

  // Remove detail - using removeArrayItem reducer
  const removeDetail = (index: number) => {
    dispatch(
      removeArrayItem({
        section: "live",
        fieldName: "details",
        index
      })
    );
  };

  return (
    <>
      <DrawerHeader label="Live Section" toggleDrawer={toggleDrawer} />
      <div className="w-full font-dm-sans font-medium text-xs mb-28 overflow-y-auto max-h-[calc(100vh-5rem)]">
        {/* Image */}
        <section className="p-4 xl:p-6">
          <label htmlFor="live-image" className="block mb-2">
            Image
          </label>
          {live.image ? (
            <div className="relative w-40 h-40 mt-3">
              <Image
                src={live.image}
                alt="Live Section Preview"
                width={80}
                height={80}
                className="w-full h-full object-cover rounded-lg"
              />
              <button
                type="button"
                aria-label="Remove image"
                className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
                onClick={removeImage}
              >
                <RiDeleteBinLine />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <input
                type="file"
                id="live-image"
                className="hidden"
                onChange={handleImageChange}
                accept=".jpg,.jpeg,.png"
              />
              <label
                htmlFor="live-image"
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
          <label htmlFor="live-video" className="block mb-2">
            Video
          </label>
          <input
            type="text"
            id="live-video"
            value={live.video ?? ""}
            onChange={handleVideoChange}
            placeholder="Enter Video URL or Upload"
            className={inputStyles}
          />
        </section>

        {/* Details */}
        <section className="p-4 xl:p-6">
          <div className="flex justify-between items-center mb-3">
            <p className="block">
              Details ({live.details.length}/{MAX_DETAILS})
            </p>
          </div>

          {live.details.map((detail, index) => {
            const isMin = live.details.length <= 3;
            return (
              <div key={detail.title} className="border p-4 rounded-md mt-4 bg-white shadow-sm">
                <div className="flex justify-end">
                  <button
                    type="button"
                    className={`text-red-500 hover:text-red-700 ${isMin ? "opacity-50 pointer-events-none" : ""}`}
                    onClick={() => {
                      if (!isMin) removeDetail(index);
                    }}
                    aria-label={`Remove detail ${index + 1}`}
                    title={isMin ? "At least 3 details required" : "Remove"}
                  >
                    <RiDeleteBinLine className="size-4" />
                  </button>
                </div>

                <label htmlFor={`title-${index}`} className="block mt-2 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  id={`title-${index}`}
                  value={detail.title}
                  placeholder="E.g., website, youtube, podcast"
                  onChange={(e) => handleDetailChange(index, "title", e.target.value)}
                  className={inputStyles}
                />

                <label htmlFor={`heading-${index}`} className="block mt-3 mb-1">
                  Heading
                </label>
                <input
                  type="text"
                  id={`heading-${index}`}
                  value={detail.heading}
                  placeholder="Detail heading or main title"
                  onChange={(e) => handleDetailChange(index, "heading", e.target.value)}
                  className={inputStyles}
                />

                <label htmlFor={`body-${index}`} className="block mt-3 mb-1">
                  Body
                </label>
                <textarea
                  id={`body-${index}`}
                  value={detail.body}
                  placeholder="Add description text"
                  onChange={(e) => handleDetailChange(index, "body", e.target.value)}
                  className={`${inputStyles} resize-y`}
                  rows={3}
                />
              </div>
            );
          })}

          {live.details.length < MAX_DETAILS && (
            <div className="mt-6">
              <button
                type="button"
                className="flex gap-2 items-center text-[#a020f0] hover:text-purple-700"
                onClick={addDetail}
                aria-label="Add detail"
              >
                <FaCirclePlus className="size-3" />
                <span className="text-xs">Add Detail</span>
              </button>
            </div>
          )}

          {live.details.length === 0 && (
            <div className="flex flex-col items-center justify-center border border-dashed p-6 rounded-lg mt-2">
              <p className="text-gray-400">No details added yet</p>
              <button
                type="button"
                className="flex gap-2 items-center mt-2 text-[#a020f0] hover:text-purple-700"
                onClick={addDetail}
              >
                <FaCirclePlus className="size-3" />
                <span className="text-xs">Add your first detail</span>
              </button>
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default LiveFields;
