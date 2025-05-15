import { useState, useEffect, type ChangeEvent } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoIosAddCircle } from "react-icons/io";
import { FaCirclePlus } from "react-icons/fa6";
import { BsFillPlayFill } from "react-icons/bs";
import DrawerHeader from "./DrawerHeader";
import { useDispatch, useSelector } from "react-redux";
import { updateContent, updateArrayItem, addArrayItem, removeArrayItem } from "@/redux/contentSlice";
import type { RootState } from "@/redux/store";
import { inputStyles } from "@/utils/customStyles";
import Image from "next/image";

const MAX_DETAILS = 6;

// Define the LiveDetail interface
interface LiveDetail {
  title: string;
  heading: string;
  body: string;
}

// Define the LiveData interface
interface LiveData {
  image: string;
  url: string;
  walletUrl: string;
  details: LiveDetail[];
}

const LiveFields = ({ toggleDrawer }: { toggleDrawer: () => void }) => {
  const dispatch = useDispatch();
  const reduxLive = useSelector((state: RootState) => state.content.live);

  // Local state for form data to prevent focus issues
  const [localLive, setLocalLive] = useState<LiveData>({
    image: reduxLive.image || "",
    url: reduxLive.url || "",
    walletUrl: reduxLive.walletUrl || "",
    details: reduxLive.details || []
  });

  // State for validation
  const [validation, setValidation] = useState({
    error: "",
    isValid: true
  });

  // State to show video preview
  const [showVideoPreview, setShowVideoPreview] = useState(false);

  // Initialize local state from Redux when component mounts
  useEffect(() => {
    setLocalLive({
      image: reduxLive.image ?? "",
      url: reduxLive.url ?? "",
      walletUrl: reduxLive.walletUrl ?? "",
      details: [...(reduxLive.details ?? [])]
    });
  }, [reduxLive]);

  // Validate that user has at least image or URL
  const validateForm = (): boolean => {
    if (!localLive.image && !localLive.url) {
      setValidation({
        error: "You must have at least an image or a video URL",
        isValid: false
      });
      return false;
    }

    setValidation({
      error: "",
      isValid: true
    });
    return true;
  };

  // Handle file upload for image
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = URL.createObjectURL(e.target.files[0]); // Temporary preview
      setLocalLive((prev) => ({ ...prev, image: file }));

      // Update Redux immediately
      dispatch(updateContent({ section: "live", data: { image: file } }));
    }
  };

  // Handle video URL input
  const handleVideoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    setLocalLive((prev) => ({ ...prev, url: newUrl }));

    // Update Redux immediately if validation passes
    if (validateForm()) {
      dispatch(updateContent({ section: "live", data: { url: newUrl } }));
    }
  };

  // Remove image
  const removeImage = () => {
    setLocalLive((prev) => ({ ...prev, image: "" }));

    // Only remove from Redux if URL exists (to maintain at least one media)
    if (localLive.url) {
      dispatch(updateContent({ section: "live", data: { image: "" } }));
    } else {
      setValidation({
        error: "You must have at least an image or a video URL",
        isValid: false
      });
    }
  };

  // Handle details update - using local state and Redux
  const handleDetailChange = (index: number, field: string, value: string) => {
    const updatedDetails = [...localLive.details];
    updatedDetails[index] = {
      ...updatedDetails[index],
      [field]: value
    };

    setLocalLive((prev) => ({
      ...prev,
      details: updatedDetails
    }));

    // Update Redux immediately
    dispatch(
      updateArrayItem({
        section: "live",
        fieldName: "details",
        index,
        value: updatedDetails[index]
      })
    );
  };

  // Add new detail
  const addDetail = () => {
    if (localLive.details.length >= MAX_DETAILS) {
      alert(`You can add a maximum of ${MAX_DETAILS} details`);
      return;
    }

    const newDetail = { title: "", heading: "", body: "" };

    // Update local state
    setLocalLive((prev) => ({
      ...prev,
      details: [...prev.details, newDetail]
    }));

    // Update Redux immediately
    dispatch(
      addArrayItem({
        section: "live",
        fieldName: "details",
        value: newDetail
      })
    );
  };

  // Remove detail
  const removeDetail = (index: number) => {
    // Update local state
    const updatedDetails = [...localLive.details];
    updatedDetails.splice(index, 1);

    setLocalLive((prev) => ({
      ...prev,
      details: updatedDetails
    }));

    // Update Redux immediately
    dispatch(
      removeArrayItem({
        section: "live",
        fieldName: "details",
        index
      })
    );
  };

  // Toggle video preview
  const toggleVideoPreview = () => {
    setShowVideoPreview(!showVideoPreview);
  };

  return (
    <>
      <DrawerHeader label="Personal Media Section" toggleDrawer={toggleDrawer} />
      <div className="w-full font-dm-sans font-medium text-xs mb-28 overflow-y-auto max-h-[calc(100vh-5rem)]">
        {/* Validation Error */}
        {!validation.isValid && (
          <div className="mx-4 xl:mx-6 mt-4 p-3 bg-red-100 text-red-700 rounded-md">{validation.error}</div>
        )}

        {/* Image */}
        <section className="p-4 xl:p-6 bg-white rounded-lg shadow-sm">
          <label htmlFor="live-image" className="block mb-3 font-semibold text-gray-700">
            Featured Image
          </label>
          {localLive.image ? (
            <div className="relative w-full max-w-[280px] aspect-square mt-3">
              <Image
                src={localLive.image}
                alt="Live Section Preview"
                width={280}
                height={280}
                className="w-full h-full object-cover rounded-lg shadow-md"
              />
              <button
                type="button"
                aria-label="Remove image"
                className="absolute top-2 right-2 bg-white/90 text-red-500 p-2 rounded-full shadow-md hover:bg-white hover:text-red-600 transition-all duration-200"
                onClick={removeImage}
              >
                <RiDeleteBinLine className="size-5" />
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
                className="flex justify-center items-center pt-6 pb-7 border-2 border-dashed border-gray-200 rounded-lg cursor-pointer h-32 mt-3 w-full hover:bg-purple-50 hover:border-purple-200 transition-all duration-200"
              >
                <div className="flex flex-col items-center gap-2">
                  <IoIosAddCircle className="text-purple-500 size-8" />
                  <p className="text-gray-600 font-medium">Upload Featured Image</p>
                  <p className="text-xs text-gray-400">JPG, JPEG, or PNG</p>
                </div>
              </label>
            </div>
          )}
        </section>

        {/* Video */}
        <section className="p-4 xl:p-6 bg-white rounded-lg shadow-sm mt-4">
          <label htmlFor="live-video" className="block mb-3 font-semibold text-gray-700">
            Featured Video
          </label>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  id="live-video"
                  value={localLive.url}
                  onChange={handleVideoChange}
                  placeholder="Paste video URL here"
                  className={`${inputStyles} pl-10 bg-gray-50 border-gray-200 focus:border-purple-300 focus:ring-purple-200`}
                />
                <BsFillPlayFill className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-5" />
              </div>
              {localLive.url && (
                <button
                  type="button"
                  onClick={() => {
                    setLocalLive((prev) => ({ ...prev, url: "" }));
                    if (localLive.image) {
                      dispatch(updateContent({ section: "live", data: { url: "" } }));
                    } else {
                      setValidation({
                        error: "You must have at least an image or a video URL",
                        isValid: false
                      });
                    }
                  }}
                  className="p-2.5 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                  aria-label="Remove video URL"
                >
                  <RiDeleteBinLine className="size-5" />
                </button>
              )}
            </div>

            {localLive.url && (
              <div className="mt-4 bg-gray-50 p-4 rounded-lg border border-gray-100">
                <div className="relative aspect-video w-full max-w-2xl mx-auto">
                  <video src={localLive.url} controls className="w-full h-full rounded-lg shadow-sm">
                    <track kind="captions" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Crypto Wallet URL */}
        <section className="p-4 xl:p-6 bg-white rounded-lg shadow-sm mt-4">
          <label htmlFor="crypto-wallet" className="block mb-3 font-semibold text-gray-700">
            Crypto Wallet URL
          </label>
          <div className="relative flex-1">
            <input
              type="text"
              id="crypto-wallet"
              value={localLive.walletUrl || ""}
              onChange={(e) => {
                setLocalLive((prev) => ({ ...prev, walletUrl: e.target.value }));
                dispatch(updateContent({ section: "live", data: { walletUrl: e.target.value } }));
              }}
              placeholder="Enter your crypto wallet URL"
              className={`${inputStyles} pl-10 bg-gray-50 border-gray-200 focus:border-purple-300 focus:ring-purple-200`}
            />
          </div>
        </section>

        {/* Details */}
        <section className="p-4 xl:p-6">
          <div className="flex justify-between items-center mb-3">
            <p className="block font-semibold">
              Supporting Media ({localLive.details.length}/{MAX_DETAILS})
            </p>
          </div>

          {localLive.details.map((detail, index) => {
            const isMin = localLive.details.length <= 3;
            return (
              <div key={`detail-${index}`} className="border p-4 rounded-md mt-4 bg-white shadow-sm">
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

          {localLive.details.length < MAX_DETAILS && (
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

          {localLive.details.length === 0 && (
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
